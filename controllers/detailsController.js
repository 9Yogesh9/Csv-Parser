const CsvStorage = require('../models/csvStore');

module.exports.showDetails = async (req, res) => {

    try {
        if (req.xhr) {
            let fileDetails = await CsvStorage.findById(req.params.id);
            return res.status(200).json({
                fileData: fileDetails
            })
        } else {
            let fileData = await CsvStorage.findById(req.params.id, 'id filename');

            res.render('details', {
                fileData
            })
        }
    } catch (error) {
        console.log(`Attempted to fetch data for non existing file`);
        res.redirect('/');
    }

}

module.exports.deleteFile = async (req, res) => {

    await CsvStorage.findByIdAndDelete(req.params.id);
    res.redirect('/');
}