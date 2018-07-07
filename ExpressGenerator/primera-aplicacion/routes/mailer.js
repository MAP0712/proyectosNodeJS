const express = require('express');
const router = express.Router();
const appRoot = require('app-root-path');
const path = require('path');

const hbs = require('nodemailer-express-handlebars');

const Email = require('../config/emailConf');

router.get('/send',(req,res)=>{
    let message = {
        to: 'jbarealopez@gmail.com',
        subject: 'Email de prueba desde nodemailer',
        html: 'Esto es una prueba',
        attachments: [{
           filename: 'text1.txt',
           content: 'Hello World!'
        },
        {   //aqui usamos path: porque es nodemailer, abajo se usa viewPath porque handlebars lo requiere
            filename: 'express.pdf',
            path: path.join(__dirname, '../files/express.pdf')
        }
        ]
    }
    
    Email.transporter.sendMail(message, (error,info)=>{
        if (error) return res.status(500).send(error,message);
        Email.transporter.close();
        res.status(200).send('Respuesta "%s"' + info.response);
    });
});


router.get('/send/hbs', (req, res) => {
    Email.transporter.use('compile', hbs({
        viewEngine: 'hbs',
        extName: '.hbs',
        //viewPath: path.join(__dirname, '../views/email-templates') Lo comentamos para usar la libreria app-root-path
        viewPath: `${appRoot}/views/email-templates`
    }));
    let message = {
        to: 'jbarealopez@gmail.com',
        subject: 'email con hbs',
        template: 'email',
        context: {
            titulo: 'Handlebars emailer',
            texto: 'Enviamos una prueba para handleabrs'
        },
        attachments: [
            {
                filename: 'texto.txt',
                content: 'hola'
            }
        ]
    }
    Email.transporter.sendMail(message, (error, info) => {
        if (error) {
            res.status(500).send(error);
            return;
        } else {
            Email.transporter.close();
            res.status(200).send('Respuesta "%s"' + info.response);
        }
    })
});

module.exports = router;
