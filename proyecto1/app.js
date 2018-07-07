const express = require('express');
const app = express();
const PORT = 3000;

app.get('/',(req,res)=>res.send('hola'));
app.get('/index',(req,res)=>{
    res.sendfile(`${__dirname}/index.html`);
})
app.listen(3000,()=>{
    console.log(`Servidor levantado en http://localhost:${PORT}`);
})

