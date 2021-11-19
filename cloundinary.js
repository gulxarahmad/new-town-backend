const cloudinary = require('cloudinary')




cloudinary.config({
    cloud_name: 'new-abadi',
    api_key: '616189238563173',
    api_secret: 'hbMYOAlyi1vpHyD-wt_BDrRGMXU'
})


exports.cloudinary = cloudinary;