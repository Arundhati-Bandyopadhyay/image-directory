const fileupload=require('express-fileupload')

const uploadPhotos=async(req,res)=>{
    let sampleFile;
    let uploadPath;
    if(!req.files || Object.keys(req.files).length==0){
        return res.status(400).send("no files were uploaded");
    }
    sampleFile=req.files.sampleFile;
    uploadPath='upload/'+sampleFile.name;
    console.log(uploadPath);

    console.log(sampleFile);

    sampleFile.mv(uploadPath,function(err){
        if(err)return res.status(500).send(err);

        res.send("File uploaded")
    })


}

const addComment=async(req,res)=>{
    
}

module.exports={
    uploadPhotos
}