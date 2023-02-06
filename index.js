const express = require('express');
const port = 8000;
const app = express();
const multer = require('multer');

// Setting view engine
app.set('view engine', 'ejs');
app.set('views', './views');

// Redirecting all requests to router
app.use('/', require('./routes'));
// const multer  = require('multer')
// const upload = multer({ dest: './public/data/uploads/' })
// app.post('/stats', upload.single('uploaded_file'), function (req, res) {
   // req.file is the name of your file in the form above, here 'uploaded_file'
   // req.body will hold the text fields, if there were any 
//    console.log(req.file, req.body);
//    res.send("DONE !");
// });

app.listen(port, (err) => {
    if (err) {
        console.log(`Server unable to start : ${err}`);
        return;
    }
    console.log(`All Set ! Server will be serving on port ${port}`);
})