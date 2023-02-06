module.exports.home = (req, res) => {
    return res.render('home');
}

module.exports.get_file = (req, res) => {
    console.log(req.file, req.body);
    return res.send("Done !");
};