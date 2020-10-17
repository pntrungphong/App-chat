import multer from 'multer'
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'./uploads/')
    },
    filename:(req,file,cb)=>{
        cb(null, new Date().toISOString() + '-'+ file.originalname)
    }
})
const fileFilter=(req:any,file:any,cb:any)=>{
    if(file.mimetype==='image/jpeg' || file.mimetype === 'image/png'){
        cb(null,true)
    }else{
        cb(null,false)
    }
}
 const upload=multer({
    storage:storage,
    fileFilter:fileFilter
}).single('image');
