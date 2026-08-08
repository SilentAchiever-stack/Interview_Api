/* const Cloudinary = require('../Config/Cloudinary')

const uploadToCloudinary = async(filepath)=>{
try{
const result = await Cloudinary.uploader.upload(filepath);
return {
    URL:result.secure_url,
    PUBLIC_ID: result.pulic_id
}
    } catch(error){
        console.log('Error while uploading to cloudinary',error)
        throw new Error('Error while uploading to cloudinary')
    }
}

module.exports = {
    uploadToCloudinary
} */
