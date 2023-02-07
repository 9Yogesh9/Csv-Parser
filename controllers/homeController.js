const CsvStorage = require('../models/csvStore');
const csv = require('csv-parser');
const fs = require('fs');

module.exports.home = (req, res) => {
    return res.render('home');
}

module.exports.get_file = (req, res) => {
    parseCsv(req.file.originalname);
    // console.log(req.file, req.body);
    return res.redirect("back");
};

function parseCsv(filename) {
    let results = [];
    let tableHeads = [];

    if (!CsvStorage.findOne({ filename })) {
        fs.createReadStream(`./public/data/uploads/${filename}`)
            .pipe(csv())
            .on('headers', (headers) => { tableHeads = headers; })
            .on('data', (data) => results.push(data))
            .on('end', async () => {
                // console.log("Done parsing !", results, tableHeads);
                await CsvStorage.create({
                    filename,
                    headers: tableHeads,
                    data: results
                });

            });
    } else {
        console.log(`File with same filename already exists !`);
    }

    fs.unlink(`./public/data/uploads/${filename}`, (err) => {
        if (err) {
            console.log(`Error while deleting the file ${err}`);
            return;
        }
        console.log(`File deleted Succesfully ${filename}`);
    })
}