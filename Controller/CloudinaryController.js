/* const Question = require("../model/Question");
const { uploadToCloudinary } = require('../Utils/cloudinaryHelper');
const fs = require('fs');

const uploadImageController = async (req, res) => {
    try {
        // check if file is missing
        if(!req.file){
            return res.status(400).json({  // ← return added
                success: false,
                message: 'File is required, please upload a file'
            });
        }

        // upload to Cloudinary
        const { URl, PUBLIC_ID } = await uploadToCloudinary(req.file.path);

        // delete temporary file from uploads/ folder
        fs.unlinkSync(req.file.path); // ← delete after Cloudinary upload

        // save url and publicId to database
        const newUploadedImage = new Question({
            url,
            publicId,
            uploadedBy: req.userInfo.userId // ← make sure middleware sets this
        });

        await newUploadedImage.save();

        // send response back ← was missing
        return res.status(201).json({
            success: true,
            message: 'Image uploaded successfully',
            data: {
                url,
                publicId
            }
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Error uploading image'
        });
    }
};
    const fetchImageController = async(req,res)=>{
         //only user who has register can have access/see(userinfo) to the image
        try{
            const page = parseInt(req.query.page) || 1;//
            const limit = parseInt(req.query.limit) || 10; // how many images you want to render; only 2 images at once
            const skip = parseInt(page - 1) * limit;

            const sortBy = req.query.sortBy || 'createdAt';
            const sortOrder = req.query.sortOrder === 'asc' ? 1 : -1;
            const totalImages = await Image.countDocuments();
            const totalpages = Math.ceil(totalImages / limit);

            const sortObj = {};
            sortObj[sortBy ]= sortOrder
             const images = await Image.find().sort(sortObj).skip(skip).limit();
        if(images){
            res.status(200).json({
                success:true,
                //currentpage: page,
                //totalpages: totalpages,
                //totalimages: totalImages,
                       data:images
            });
        };
}catch(error){
            console.log(error);
            res.status(500).json({
                success: false,
                message:'something went wrong'
            })
        }
    }

const deleteImageController = async(req,res)=>{
    try{
const getCurrentIdOfImageToBeDeleted = req.params.id;
const UuserId = req.userInfo.userId;


const image = await Image.findById(getCurrentIdOfImageToBeDeleted);
if(!image){
    return res.status(404).json({
        success:false,
        message:'image not found'
    })

if(image.uploadedBy.toString() !== userId){
return res.status(200).json({
    success:false,
    message:`you are not authorized to delete this image because you haven't uploaded it`
})
}
}

await cloudinary.uploader.destroy(image.publicId);

await Image.findByIdAndDelete(getCurrentIdOfImageToBeDeleted);
res.status(200).json({
    success:true,
    message:'image deleted successfully'
})

    }catch(error){
        console.log(error);
        res.status(500).json({
        success: false,
        message:'something went wrong'
            })
    }
} */