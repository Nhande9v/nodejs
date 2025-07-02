const mongoose = require('mongoose');

async function connect(){
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/phongtro_dev';
    try {
        await mongoose.connect(mongoUri);  
        console.log("Connect succesfully!!!");
    } catch (error) {
        console.log("Connect fail!!!");
    }
}

module.exports = { connect };