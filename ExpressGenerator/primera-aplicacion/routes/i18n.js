const router = require('express').Router();

router.get('/',(req,res)=>{
    res.render('lenguaje', {
        title: 'i18n'
    })
})

module.exports = router;