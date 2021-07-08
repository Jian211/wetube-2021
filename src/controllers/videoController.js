export const trending = (req, res) => res.render("home");
export const upload = (req, res) => res.send("Upload Video");
export const see  = (req, res) => res.render("Watch");
export const edit  = (req, res) => res.render("edit");
export const search = (req, res) => {
    return  res.send(`Search Video`);
}
export const deleteVideo = (req, res) => res.send("Delete Video");