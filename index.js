const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');

const dotenv = require('dotenv');
const cloudinary = require('cloudinary');

const cors = require('cors');
const Routes = require('./Routes/signuproute');
const loginRoute = require('./Routes/loginroute');
const InstallmentRoute = require('./Routes/installmentroute');
const signUpUser = require('./Models/signUpdata');

const notFound = require('./Data/Middleware/ErrorHandle');
const errorHandle = require('./Data/Middleware/ErrorHandle');


const BookingForm = require('./Models/UserForm');
const InstallmentReceipt = require('./Models/Installment');


require('./cloundinary')


const PORT = 3009

const app = express();
dotenv.config();

const storageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public/image");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});


//const url = 'mongodb+srv://gulloahmad:gulloahmad@cluster0.33a9k.mongodb.net/NewABADI123?retryWrites=true&w=majority'
const url = 'mongodb+srv://gullosheikh:Gullobutt1@cluster0.cani3.mongodb.net/NewTownDB?retryWrites=true&w=majority'
mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true

})

app.use(express.json());
app.use(cors());
app.use(express.static('public'));




const upload = multer({ storage: storageEngine });


app.post('/uploads', upload.single('image'), async(req, res) => {

    console.log('Upload is calling');
    console.log(req.body.registrationNumber);
    console.log(req.body)

    const img = req.file;
    console.log(img)
    const result = await cloudinary.v2.uploader.upload(req.file.path)
    console.log(result)

    const imageURL = result.secure_url;
    console.log(imageURL);

    const newBooking = BookingForm({
        _id: req.body._id,
        registrationNumber: req.body.registrationNumber,
        plotNo: req.body.plotNo,
        street: req.body.street,
        plotSize: req.body.plotSize,
        type: req.body.type,
        phase: req.body.phase,
        clientName: req.body.clientName,
        fhName: req.body.fhName,
        residentialAddress: req.body.residentialAddress,
        permanentAddress: req.body.permanentAddress,
        contactNumber: req.body.contactNumber,
        landLine: req.body.landLine,
        email: req.body.email,
        occupation: req.body.occupation,
        age: req.body.age,
        nationality: req.body.nationality,
        clientCNIC: req.body.clientCNIC,
        nomineeName: req.body.nomineeName,
        nomineeRelation: req.body.nomineeRelation,
        nomineeCNIC: req.body.nomineeCNIC,
        nomineeAddress: req.body.nomineeAddress,
        secondAppName: req.body.secondAppName,
        secondAppCNIC: req.body.secondAppCNIC,
        totalPlotCost: req.body.totalPlotCost,
        downPayment: req.body.downPayment,
        balanceAmount: req.body.balanceAmount,
        bankOrDraft: req.body.bankOrDraft,
        date: req.body.date,
        drawnOn: req.body.drawnOn,
        remarks: req.body.remarks,
        image: imageURL


    });

    try {
        newBooking.save();
        res.send('successful')
    } catch (err) {
        console.log('Something is wrong');
        res.send('Unsuccessful')

    }

})

app.get('/readbookings', async(req, res) => {

    await BookingForm.find({}, (err, result) => {
        if (err) {
            res.send("Error in loading data")
        } else {
            res.send(result);
        }
    })
})

app.delete('/deletebooking/:id', async(req, res) => {
    const id = req.params.id;
    await BookingForm.findByIdAndDelete(id).exec()
    res.send('This is deleted')
})

app.get('/readbookings/:id', async(req, res) => {

    const id = req.params.id

    const booking = await BookingForm.findById(id);
    res.send(booking);
})

app.put('/update-booking/:id', async(req, res) => {

    const id = req.params.id;
    console.log(id);

    console.log(req.body);


    try {
        const booking = await BookingForm.findByIdAndUpdate(id, req.body, { new: true });
        res.send(booking);
    } catch (err) {
        res.send(err);
    }
})

app.get('/search-booking-reg/:reg', async(req, res) => {
    const registrationNumber = req.params.reg;
    const booking = await BookingForm.findOne({ registrationNumber });
    res.send(booking)

})
app.get('/search-booking-cnic/:cnic', async(req, res) => {
    const clientCNIC = req.params.cnic;
    const booking = await BookingForm.findOne({ clientCNIC });
    res.send(booking)

})

app.post('/search-booking-phase/', async(req, res) => {
    try {
        console.log(req.body)
        const { plotNo, phase } = req.body
        const booking = await BookingForm.findOne({ plotNo: plotNo, phase: phase });
        if (booking) {
            res.send(booking)
        } else {
            res.send('No Booking Found')
        }
    } catch (err) {
        console.log(err.message)
    }

})

app.use('/signup', Routes);
app.use('/login', loginRoute);


app.use('/add-installment', InstallmentRoute);

app.get('/installments/:regnum', async(req, res) => {
    const regNum = req.params.regnum;

    await InstallmentReceipt.find({ "registrationNumber": regNum },
        (err, result) => {
            if (err) {
                res.send("Error in loading data")
            } else {
                res.send(result);
            }
        })
})

app.delete('/delete-installment/:id', async(req, res) => {
    const id = req.params.id;
    await InstallmentReceipt.findByIdAndDelete(id).exec()
    res.send('This is deleted')
})

app.get('/installment-preview/:id', async(req, res) => {
    const id = req.params.id

    const installment = await InstallmentReceipt.findById(id);
    res.send(installment);
})


app.put('/change-password/:id', async(req, res) => {

    const id = req.params.id;
    console.log(id);
    console.log(req.body.password)

    // console.log(req.body);


    try {
        const newPassword = await signUpUser.findByIdAndUpdate(id, req.body, { new: true });
        res.send(newPassword);
    } catch (err) {
        res.send(err);
    }
})

// app.get('/phase-to-installment',async(req,res)=>{
//     const bookingsData = await BookingForm.find()
//     for(let i = 0; i<bookingsData.length; i++){
//         const updateInstallment = await InstallmentReceipt.updateMany({registrationNumber:bookingsData[i].registrationNumber},{$set:{phase:bookingsData[i].phase}})

//     }
//     const installments = await InstallmentReceipt.find();
//     res.send(installments)
// })


app.listen(process.env.PORT || PORT, () => {
    console.log('Server is running');
})