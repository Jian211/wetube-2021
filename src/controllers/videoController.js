export const trending = (req, res) => res.send("Home Page Video");
export const upload = (req, res) => res.send("Upload Video");

export const see  = (req, res) => res.send("Watch Video");
export const edit  = (req, res) => {
    console.log(req.params);
    return res.send(`Edit Video ${req.params.id}`);
} 
export const search = (req, res) => {
    return  res.send(`Search Video`);
}
export const deleteVideo = (req, res) => res.send("Delete Video");