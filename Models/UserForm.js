const mongoose = require('mongoose');

const BookingForm = new mongoose.Schema({
    
    _id:Number,
    registrationNumber:String,
    plotNo:String,
    street:String,
    plotSize:String,
    type:String,
    phase:String,
    clientName:String,
    fhName:String,
    residentialAddress:String,
    permanentAddress:String,
    contactNumber:Number,
    landLine:Number,
    email:String,
    occupation:String,
    age:Number,
    nationality:String,
    clientCNIC:String,
    nomineeName:String,
    nomineeRelation:String,
    nomineeCNIC:String,
    nomineeAddress:String,
    secondAppName:{
        default:"None",
        type:String
    },
    secondAppCNIC:{
        default:"None",
        type:String
    },
    totalPlotCost:Number,
    downPayment:Number,
    balanceAmount:String,
    bankOrDraft:String,
    date: Date,
    drawnOn:Date,
    image:String,
    remarks:String
})

const BookingForms = mongoose.model("BookingData",BookingForm);
module.exports = BookingForms