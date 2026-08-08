const Question = require("../model/Question");

const getAllQuestion = async(req,res)=>{
    try{
        const getAllQuestions = await Question.find();
        if(!getAllQuestions || getAllQuestions.length === 0){
            return res.status(400).json({
                message:'Questions are not available yet'
            })
        }
        return res.status(200).json({
            data:getAllQuestions
        })
    }catch(error){
return res.status(500).json({
    message:'Something went wrong',
    data:error.message
})
}}

const getSingleTopic = async(req,res)=>{
    const {topic} = req.params
    try{
        const SingleTopic = await Question.find({topic});
        if(!SingleTopic || SingleTopic.length === 0){
    return res.status(404).json({ message: 'this topic does not exist' })
}
        return res.status(200).json({
        data:SingleTopic
        })
    }catch(error){
        return res.status(500).json({
            message:'something went wrong',
            data:error.message
        })
    }
}

const getDifficulty = async(req,res)=>{
    const{difficulty} = req.query;
try{
    const getDifficultQuestions = await Question.find({difficulty});
    if(!getDifficultQuestions || getDifficultQuestions.length === 0){
        return res.json({
            message:`this does not exist only,${difficulty} options`
        })
    }
return res.status(200).json({ data: getDifficultQuestions })

}catch(error){
        return res.status(500).json({
            message:'something went wrong',
            data:error.message
        })
    }
}

const GetById = async(req,res)=>{
    const {id} = req.params;
    try{
        const question = await Question.findById(id);
        if(!question){
            return res.status(404).json({
                message:'Answer not available'
            })
        }
        return res.status(200).json({
            data: question
        })
    }catch(error){
        return res.status(500).json({
            message:'something went wrong',
            data: error.message
        })
    }
}

const UpDateQuestion = async(req,res)=>{
    const {id} = req.params;
    try{
        const updateQuestion = await Question.findByIdAndUpdate(
            id,
            req.body,
            { returnDocument: 'after', runValidators: true }
        );//check correction
        if(!updateQuestion){
            return res.status(404).json({
                message:'this id or question does not exist'
            })
        }
        return res.status(200).json({
            message:'Question updated Successfully',
            data: updateQuestion
        })
    } catch(error){
        return res.status(500).json({
            message:'something went wrong',
            data: error.message
        })
    }
}

const ReplaceQuestion = async(req,res)=>{
    const {id} = req.params;
    try{
        const replaceQuestion = await Question.findOneAndReplace(
            { _id: id },
            req.body,
            {returnDocument: 'after',// return the document after it has be updated
             runValidators: true // run the validators defined in the schema;update difficulty to an invalid value like "impossible", Mongoose will now reject it and throw a validation error, just like it would on creation.
            }
        );
       
        if(!replaceQuestion){
            return res.status(404).json({ message:'this id or question does not exist' })
        }
        return res.status(200).json({ message:'Question replaced Successfully', data: replaceQuestion })
    } catch(error){
        return res.status(500).json({ message:'something went wrong', data: error.message })
    }
}

const DeleteQuestion = async(req,res)=>{
    try{
    const {id} = req.params.id;
    const deleteBookById = await Question.findByIdAndDelete({id});
    if(!deleteBookById){
        return res.json({
            message:'this book does not exist'
        })
    }
     res.status(200).json({
        success:true,
        message:'question deleted succesfully',
        data:deleteBookById
        })

    }catch(error){
console.log(error);
 res.status(505).json({
    success:false,
    message:'something went wrong',
    })
}
}

const AddQuestion = async(req,res)=>{
    const NewQuestion = req.body;
    try{
    const AddNewQuestion = await Question.create(NewQuestion);
     res.status(200).json({
        success:true,
        message:'Question added succesfully',
        data:AddNewQuestion
    })
    }
    catch(error){
console.log(error);
 res.status(505).json({
    success:false,
    message:'something went wrong',
    })
}
}

module.exports = {getAllQuestion,getSingleTopic,getDifficulty,GetById,UpDateQuestion,ReplaceQuestion,DeleteQuestion,AddQuestion}