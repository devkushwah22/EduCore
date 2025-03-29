const cloudinary = require('cloudinary').v2

// here file is the file object that we get from the request
// folder is the folder name in which we want to upload the image
// height and qauality are optional parameters
exports.uploadImageToCloudinary  = async (file, folder, height, quality) => {
    const options = {folder};
    if(height) {
        options.height = height;
    }
    if(quality) {
        options.quality = quality;
    }
    options.resource_type = "auto";
    

    // file.tempFilePath is the path where the file is stored temporarily
    // we upload the file to cloudinary using the upload method
    // we pass the file path and options to the upload method
    return await cloudinary.uploader.upload(file.tempFilePath, options);
}