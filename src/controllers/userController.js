import User from "../models/User";

export const getJoin = (req, res) => res.render("join",{
    pageTitle : "Join"
});
export const postJoin = async (req, res) => {
    const { name, email, password,password2, username, location } = req.body;
    // 비밀번호 맞는지 체크
    if(password !== password2){
        res.render("join",{
            pageTitle : "Join",
            errorMessage : "please check password again",
        });
    }
    //이메일과 이름이 같은것이 있는지 체크 
    const exists = await User.exists({ $or : [{email},{name}]})
    if(exists){
        res.render("join",{
            pageTitle : "Join",
            errorMessage : "please check email/name",
        });
    }
    console.log(exists)
    
    await User.create({
        name, email,password,username,location
    })
    res.redirect("/login");
}
export const edit = (req, res) => res.render("edit");
export const remove = (req, res) => res.send("Remove User");
export const login = (req, res) => res.send("login");
export const logout = (req, res) => res.send("logout");
export const see = (req, res) => res.send("See User");
