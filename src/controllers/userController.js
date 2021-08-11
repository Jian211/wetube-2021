import User from "../models/User";
import bcrypt from "bcrypt";
import fetch from "node-fetch";
import session from "express-session";

export const getJoin = (req, res) => res.render("join",{
    pageTitle : "Join"
});
export const postJoin = async (req, res) => {
    const { name, email, password,password2, username, location } = req.body;
    console.log("비밀번호 맞는지 체크 ...")
    if(password !== password2){
        res.status(400).render("join",{
            pageTitle : "Join",
            errorMessage : "please check password again",
        });
    }
    console.log("비밀번호 체크 완료");
    //이메일과 이름이 같은것이 있는지 체크 
    console.log("중복 이메일/아이디 체크 ...")
    const exists = await User.exists({ $or : [{email},{name}]})
    if(exists){
        res.status(400).render("join",{
            pageTitle : "Join",
            errorMessage : "please check email/name",
        });
    }
    console.log("중복 체크 완료, 및 아이디 생성 ...")
    await User.create({
        name, email,password,username,location
    })
    console.log("계정 생성완료")
    res.redirect("/login");
}
export const getLogin = (req, res) => res.render("login",{ pageTitle : "Login" });
export const postLogin = async (req, res) =>{
    const { email, password } = req.body;
    const user = await User.findOne({email});
    if(!user){
        res.status(400).render("login",{ 
            pageTitle : "login",
            errorMessage : "write your email or password"
        })
    }
    //비밀번호 맞는지 체킹
    const ok = await bcrypt.compare(password,user.password);
    if(!ok){
        res.status(400).render("login",{ 
            pageTitle : "login",
            errorMessage : "비밀번호 틀렸어요"
        })
    }
    //세션에 로그인 상태와 로그인 유져를 저장.
    req.session.loggedIn = true;
    req.session.user = user;

    res.redirect("/");
}

export const startGithub = (req, res) => {
    // github로 가는 기본 코드
    const baseUrl = "https://github.com/login/oauth/authorize";
    // gitjub에서 필요한 조건들을 설정.
    const config = {
        client_id :process.env.CLIENT_ID,
        allow_signup : false,
        scope : "read:user user:email", // 유저에게서 무엇을 얻고싶은지
    };
    // 필요조건들을 문자열 형식으로 저장
    const params = new URLSearchParams(config).toString();
    // 깃허브로 전달한다.
    return res.redirect(`${baseUrl}?${params}`); 
}
export const finishGithub = async (req, res) => {
    const baseUrl = "https://github.com/login/oauth/access_token";
    // 필요 항목
    const config = {
        client_id : process.env.CLIENT_ID,
        client_secret :process.env.CLIENT_SECRET_ID,
        code : req.query.code,
    }
    const params = new URLSearchParams(config).toString();
    const finalUrl = `${baseUrl}?${params}`;
    const tokenRequest = await (await fetch(finalUrl ,{
        method: "POST",
        headers : {
            Accept : "application/json",
        },
    })).json();
    if("access_token" in tokenRequest){
        // 유저의 정보를 얻기위하여 access API  
        const {access_token} = tokenRequest;
        const userData = await (await fetch("https://api.github.com/user",{
            headers:{
                Authorization : `token ${access_token}`,
            },
        })).json();
        // 유저 이메일 정보 알아내기
        const emailData =await( await fetch("https://api.github.com/user/emails",{
            headers:{
                Authorization : `token ${access_token}`,
            },
        })).json();
        const emailObj = emailData.find( email => email.primary === true && email.verified === true )
        if(!emailObj){
            return res.redirect("/login");
        }
        //DB에서 같은 이멜 주소가 있는지 서칭
        let existingUser = await User.findOne({ email : emailObj.email });
        if(!existingUser){   // 존재 한다면
            console.log(" 같은 이메일이 존재합니다.")
            console.log("회원가입 진행 중")
            const user = await User.create({
                name : userData.name,
                avataUrl : userData.avata_url,
                username : userData.login,
                email : emailObj.email,
                password : "",
                location : userData.location,
                snsOnly : true,
            });
        }
        req.session.loggedIn = true;
        req.session.user = existingUser;
        return res.redirect("/")
    }else{
        // 그것이 아니면 다시 로그인 페이지로
        return res.redirect("/login");
    }
}
export const logout = (req, res) => {
    console.log("bye")
    req.session.destroy();
    res.redirect("/");
}
export const getEdit = (req, res) => {
    return res.render("edit-profile",{
        pageTitle : "Edit Profile"
    });
}
export const postEdit = async (req,res) => {
    const { 
        session : { user : { _id, avataUrl} },
        body : { username, email },
        file
    } = req;
    // +코드챌린지  만약 이메일 등 중복이 된다면.. 
    const updateUser = await User.findByIdAndUpdate(
        _id,{ 
            username,
            email,
            avataUrl : file ? file.path : avataUrl,
        },
        { new : true}
    );
    req.session.user  = updateUser;
    console.log("성공적으로 수정되었습니다.")

    return res.redirect("/")
}

export const getPassword = (req,res) =>{
    return res.render("user/change-password",{
        pageTitle:"Change Password",
    });
}

export const postPassword = async (req,res) => {
    // 현재 또는 바꿀 비밀번호 저장
    const {
        body : { oldPassword, newPassword1,newPassword2},
        session : {
            user : { _id },
        },
    } = req;
    const user = await User.findById(_id);
    // 만약 바꿀 비밀번호가 맞지 않는 경우
    if(newPassword1 !== newPassword2){
        return res.status(400).render("user/change-password",{
            pageTitle:"Change Password",
            errorMessage : "not Same new password"
        });
    }
    const result = await bcrypt.compare(oldPassword, user.password);
    // 만약 기존의 비밀번호가 맞지 않는 경우
    if(!result){
        return res.status(400).render("user/change-password",{
            pageTitle:"Change Password",
            errorMessage : "not Same old ane new password"
        });
    }
    // 만약 위 조건을 만족했을 때 비밀번호 저장.
    // DB에 저장
    user.password = newPassword1;
    await user.save();
    
    //세션에 저장하는 법.
    req.session.user.password = user.password;
    res.redirect("/");
}