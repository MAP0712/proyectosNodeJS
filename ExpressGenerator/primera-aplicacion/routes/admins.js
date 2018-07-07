const express = require('express');
var router = express.Router();

router.get('/',(req,res)=>{
    res.status(200).json(req.session.username || 'La sesión no se ha creado');
})
//este segundo router esta definiendo create dentro de admins, por lo que para acceder a el necesitaria usar /admins/create
//no create directamente
router.get('/create',(req,res)=>{
    req.session.username = 'Ivanrr';
    res.redirect('/admins');
})

router.get('/remove', (req,res)=>{
    req.session.username = null;
    res.redirect('/admins');
})

router.get('/destroy',(req,res)=>{
    req.session.destroy();
    res.redirect('/admins');
});
module.exports = router;