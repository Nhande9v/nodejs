

module.exports = {
    multipleMongooseToObject: function (mongooseArrays){
         return  mongooseArrays.map(mongooseArrays=>mongooseArrays.toObject());
    },
    mongooseToObject: function(mongooseArrays){
        return mongooseArrays ? mongooseArrays.toObject(): mongooseArrays;
    }
};