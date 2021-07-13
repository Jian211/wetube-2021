const videos = [
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
        pageTitle : `watching ${video.title}`,
        video,
    })
};
export const upload = (req, res) => res.send("Upload Video");
export const edit  = (req, res) => res.render("edit");
export const search = (req, res) => {
    return  res.send(`Search Video`);
}
export const deleteVideo = (req, res) => res.send("Delete Video");