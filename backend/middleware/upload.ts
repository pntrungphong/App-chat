import multer from 'multer'
import util from 'util'
let storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'upload')
    },
    filename:(req,file,cb)=>{
        cb(null, file.fieldname + '-' + Date.now())
    }
})
let uploadFile=multer({
    storage:storage,
}).single('image');
export const uploadFileMiddleware = util.promisify(uploadFile)