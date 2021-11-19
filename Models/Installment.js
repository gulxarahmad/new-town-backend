const mongoose = require('mongoose');

const Installmentreceipt = new mongoose.Schema({
    
    _id: Number,
    registrationNumber:String,
    currDate: Date,
    prevDate:Date,
    prevSrNo:String,
    plotNo:String,
    phase:String,
    plotSize:String,
    type:String,
    clientName:String,
    fhName:String,
    residentialAddress:String,
    contactNumber:Number,
    clientCNIC:String,
    totalPlotCost:Number,
    prevAmount:Number,
    currAmount:Number,
    totalRecAmount:String,
    remainingBalance:String,
    dueData: Date
})

const InstallmentReceipt = mongoose.model("Installmentreceipt",Installmentreceipt);
module.exports = InstallmentReceipt
