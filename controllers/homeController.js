const CsvStorage = require('../models/csvStore');
const csv = require('csv-parser');
const fs = require('fs');

module.exports.home = async (req, res) => {
    let filesLoaded = await CsvStorage.find({}, 'filename id');

    return res.render('home', {
        filesLoaded
    });
}

module.exports.get_file = (req, res) => {
    if (!req.file) {
        console.log("didn't get the file !");

        res.redirect('/');
    } else {
        parseCsv(req.file.originalname)
            .then(() => {
                console.log("got till here !");

                if (req.xhr) {
                    return res.status(200).json({
                        filename: req.file.originalname.slice(0, -4),
                        message: "Data Parsed Successfully !"
                    })
                }

                return res.redirect("back");
            }, (err) => {
                console.log(`error while initial load ${err}`);
                return res.redirect('/');
            })
    }

};

async function parseCsv(filename) {
    let results = [];
    let tableHeads = [];

    try {

        CsvStorage.findOne({ filename }, function (error, fileBool) {
            if (fileBool) {
                console.log(`File with same filename already exists !`);
            } else {
                fs.createReadStream(`./public/data/uploads/${filename}`)
                    .pipe(csv())
                    .on('headers', (headers) => { tableHeads = headers; })
                    .on('data', (data) => results.push(data))
                    .on('end', async () => {
                        await CsvStorage.create({
                            filename,
                            headers: tableHeads,
                            data: results
                        });

                        fs.unlink(`./public/data/uploads/${filename}`, (err) => {
                            if (err) {
                                console.log(`Error while deleting the file ${err}`);
                                return;
                            }
                            console.log(`File deleted Succesfully ${filename}`);
                        })
                    });
            }
        })



    } catch (error) {
        console.log(`Error in parsing the file ${error}`);
    }
}