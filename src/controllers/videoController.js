let videos = [
    {
        title    : "first",
        rating   :5,
        comments : 5,
        createdAt: "2 minutes ago",
        views    : 20,
        id       : 1,            
    },
    {
        title    : "second",
        rating   : 25,
        comments : 35,
        createdAt: "1 minutes ago",
        views    : 120,
        id       : 2,            
    },
    {
        title    : "third",
        rating   : 10,
        comments : 15,
        createdAt: "5 minutes ago",
        views    : 560,
        id       : 3,            
    },
];

export const trending = (req, res) =>{
    return res.render("home",{ pageTitle: "Home", videos});
} 
export const watch  = (req, res) => {  
    const { id } = req.params;  // ES6 방식 
    const video  = videos[id-1];
    return res.render("Watch" , { 
        pageTitle : `Watching: ${video.title}`,
        video,
    })
};
export const getEdit  = (req, res) => {
    const { id } = req.params;
    const video = videos[id - 1];

    return res.render("edit",{
        pageTitle : `Editing: ${video.title}`, 
        video,
    });
};

export const postEdit = (req, res) => {
    const { id } = req.params;
    const { title }= req.body;
    videos[id-1].title = title;
    return res.redirect(`/video/${id}`);
};

export const getUpload = (req, res) => {

    return res.render("upload", { pageTitle : "upload video"});
}
export const postUpload = ( req, res ) => {
    const { videoTitle } = req.body;
    videos.push({title : videoTitle, id: videos.length+1})
    return res.redirect("/");
}
export const search = (req, res) => {    return  res.send(`Search Video`);}
export const deleteVideo = (req, res) => res.send("Delete Video");