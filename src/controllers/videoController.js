import Video from "../models/Video";

export const home = async(req, res) =>{
    const videos = await Video.find({});
    return res.render("home",{ 
        pageTitle: "Home",
        videos,
    });
} 
export const watch  = async (req, res) => {  
    const { id } = req.params;  // ES6 방식 
    const video = await Video.findById(id);
    return res.render("Watch" , { 
        pageTitle : `Watching`,
        video
    })
};
export const getEdit  = async (req, res) => {
    const { id } = req.params;
    const video = await Video.findById(id);
    if(!video){
        return  res.render("404",{pageTitle : "404 Error"})
    }
    return res.render("edit",{
        pageTitle : video.title,
        video,
    });
};

export const postEdit = async (req, res) => {
    const { id } = req.params;
    const { title,description,hashtags }= req.body;

    await Video.findByIdAndUpdate(id,{
        title,
        description,
        hashtags : Video.formatHashTags(hashtags)
    })
    return res.redirect(`/video/${id}`);
};

export const getUpload = (req, res) => {
    return res.render("upload", { pageTitle : "upload video"});
}
export const postUpload = async( req, res ) => {
    const { title, description, hashtags } = req.body;
    try {
        await Video.create({
            title,
            description,
            hashtags : Video.formatHashTags(hashtags),
        })
        return res.redirect("/");
    } catch (error){
        return res.render("upload", { 
            pageTitle : "upload video",
            errorMessage : error._message,
        });
    }
}
export const deleteVideo = async(req, res) => {
    const { id } = req.params;
    await Video.findByIdAndDelete(id);
    res.redirect("/");
}

export const search = async(req, res) => {    
    const { keyword } = req.query;
    let videos = [];
    if(keyword){
        videos = await Video.find({
            title : {
                $regex: new RegExp(keyword,"i")
            }
        })
    }    
    return  res.render("search",{
        pageTitle: "Search",
        videos,
    });
}