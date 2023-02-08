const CsvStorage = require('../models/csvStore');

module.exports.showDetails = async (req, res) => {
    
    let fileData = await CsvStorage.findById(req.params.id);

    res.render('details',{
        fileData
    })
}