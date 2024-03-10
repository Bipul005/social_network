// Import Mongoose 
const mongoose = require('mongoose')


// Route Handler 
const postSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true
    } ,
    body : {
        type : String,
        required : true
    } ,
    
})


// Export 
module.exports = mongoose.model("Post",postSchema)