const router = require('express').Router();
const upload = require('../config/multer');
router.get('/',(req,res)=>{
    res.render('multer.hbs');
})

router.post('/upload',upload.single('file'),(req,res)=>{
    if(!req.file){
        return res.status(500).send('No has seleccionado un archivo valido');
    }else{
        res.send('Se ha subido el archivo =>' + req.file);
    }
})

module.exports = router;