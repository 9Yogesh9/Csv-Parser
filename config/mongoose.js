const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
// const URI = process.env.DB_URI;

launch().catch(err => console.log(`Error talking to MongoDB : ${err}`));

async function launch(){
    await mongoose.connect("mongodb://127.0.0.1:27017/csv_parser");
}

const db = mongoose.connection.once('open', ()=>{
    console.log(`Data flowing through Mongo...`);
});

module.exports = db;