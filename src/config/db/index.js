const mongoose = require('mongoose');

async function connect(){
    const mongoUri = process.env.MONGODB_URI || 'mongodb+srv://nguyenkhang28102004:NFXYLHpodTdzSL0h@cluster0.eg2ecgw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
    try {
        await mongoose.connect(mongoUri);  
        console.log("Connect succesfully!!!");
    } catch (error) {
        console.log("Connect fail!!!");
        console.error(error); // In lỗi chi tiết ra log
    }
}

module.exports = { connect };