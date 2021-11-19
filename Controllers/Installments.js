const asyncHandler = require('express-async-handler');
const multer = require('multer');

const Installment = require('../Models/Installment');


const upload = multer();
const installmentReceipt = asyncHandler( 
    
    async(req,res)=>{
        console.log(req.body);

        const newInstallment = Installment({
            _id:req.body._id,
            registrationNumber:req.body.registrationNumber,
            currDate:req.body.currDate,
            prevDate:req.body.prevDate,
            prevSrNo:req.body.prevSrNo,
            plotNo:req.body.plotNo,
            plotSize:req.body.plotSize,
            type:req.body.type,
            clientName:req.body.clientName,
            fhName:req.body.fhName,
            residentialAddress:req.body.residentialAddress,
            contactNumber:req.body.contactNumber,
            clientCNIC:req.body.clientCNIC,
            totalPlotCost:req.body.totalPlotCost,
            prevAmount:req.body.prevAmount,
            currAmount:req.body.currAmount,
            totalRecAmount:req.body.totalRecAmount,
            remainingBalance:req.body.remainingBalance,
            plotNo:req.body.plotNo,
            dueData:req.body.dueData,
            phase:req.body.phase

        });
        try{
            newInstallment.save();
        }
        catch(err){
            console.log("Some things wrong")
        }
    }
)

module.exports = installmentReceipt;