module.exports.showDetails = (req, res) => {
    console.log(req.params.filename);
    const csv = require('csv-parser');
    const fs = require('fs');
    const results = [];
    let tableHeads = [];

    fs.createReadStream('./public/data/uploads/Sample-10.csv')
        .pipe(csv())
        .on('headers', (headers) => {console.log(headers); tableHeads = headers;})
        .on('data', (data) => results.push(data))
        .on('end', () => {
            res.render('details', {
                details: JSON.stringify(results),
                tableHeads
            })
        });
}