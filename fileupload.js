const multer=require('multer')
const path=require('path')
const fs=require('fs')
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        let fileDestination='public/uploads'
        if(!fs.existsSync(fileDestination)){
            fs.mkdirSync(fileDestination,{
                recursive:true
            })
            cb(null,fileDestination)
        }
        else{
            cb(null,fileDestination)
        }
 
    },
    filename:(req,file,cb)=>{
        const filename=path.basename(file.originalname,path.extname(file.originalname))
        const ext=path.extname(file.originalname)
        cb(null,filename+'_'+Date.now()+ext)
    }
})
const imageFilter=(req,file,cb)=>{
if(!file.originalname.match(/\.(jpg|png|JPG|JPEG|PNG|jfif|JFIF)$/)){
    cb(new Error("Please choose appropriate file type"),false)
}
else{
    cb(null,true)
}

}
const upload=multer({storage:storage,
    fileFilter:imageFilter,
    limits:{
        fileSize:2*1024*1024
    }
})
module.exports=upload