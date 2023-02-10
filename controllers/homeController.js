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
        parseCsv(req.file.originalname, res);
    }

};

function parseCsv(filename, res) {
    let results = [];
    let tableHeads = [];

    try {

        CsvStorage.findOne({ filename }, function (error, fileBool) {
            if (fileBool) {

                console.log(`File with same filename already exists !`);
                deleteAndRedirect(filename, res);

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

                        deleteAndRedirect(filename, res);
                    });
            }
        })



    } catch (error) {
        console.log(`Error in parsing the file ${error}`);
    }
}

function deleteAndRedirect(filename, res) {
    fs.unlink(`./public/data/uploads/${filename}`, (err) => {
        if (err) {
            console.log(`Error while deleting the file ${err}`);
            return;
        }
        console.log(`File deleted Succesfully ${filename}`);
    })

    return res.redirect("/");
}