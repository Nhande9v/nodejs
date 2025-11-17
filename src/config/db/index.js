const mongoose = require('mongoose');

async function connect(){
    const mongoUri = process.env.MONGODB_URI || 'mongodb+srv://Khang:123@nguyenhoangnhan.8pkj78u.mongodb.net/?appName=NguyenHoangNhan&retryWrites=true&w=majority';
    try {
        await mongoose.connect(mongoUri);  
        console.log("Connect succesfully!!!");
    } catch (error) {
        console.log("Connect fail!!!");
        console.error(error); // In lỗi chi tiết ra log
    }
}

module.exports = { connect };