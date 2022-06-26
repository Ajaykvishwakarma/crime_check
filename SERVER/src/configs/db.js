const mongoose = require('mongoose')
// const mongoDB = "mongodb://localhost:27017/crimeCheck"
const mongoDB = "mongodb+srv://crimecheck:crimecheck@cluster0.c3yjr.mongodb.net/?retryWrites=true&w=majority";

module.exports = ()=>mongoose.connect(mongoDB)