import User from "../models/User";
import bcrypt from "bcrypt";

export const getJoin = (req, res) => res.render("join",{
    pageTitle : "Join"
});
export const postJoin = async (req, res) => {
    const { name, email, password,password2, username, location } = req.body;
    // 비밀번호 맞는지 체크
    if(password !== password2){
        res.status(400).render("join",{
            pageTitle : "Join",
            errorMessage : "please check password again",
        });
    }
    //이메일과 이름이 같은것이 있는지 체크 
    const exists = await User.exists({ $or : [{email},{name}]})
    if(exists){
        res.status(400).render("join",{
            pageTitle : "Join",
            errorMessage : "please check email/name",
        });
    }
    await User.create({
        name, email,password,username,location
    })
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
export const edit = (req, res) => res.render("edit");
export const remove = (req, res) => res.send("Remove User");
export const logout = (req, res) => res.send("logout");
export const see = (req, res) => res.send("See User");
