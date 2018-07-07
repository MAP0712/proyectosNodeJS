//hemos hecho la configuracion mediante un JSON, en los apuntes sale con una variable y funciona también (archivo config.json)
'use strict';
const config = require('./config.json')
// const config = {
//     "development": {
//         "PORT": 3000,
//         "MYSQL": {
//             "host": "localhost",
//             "user": "root",
//             "password": "",
//             "database": "sakila"
//         }
//     }
// }

const env = process.env.NODE_ENV || 'development';
console.log('process.env.NODE_ENV',env);

//process.env.MiVariable = 'funciona!!!!'
// if(env==='development'){
//     const config = require('./config.json');
//     const envConfig = config[env];
//     //console.log(envConfig);
//     Object.keys(envConfig).forEach(key=>{
//         process.env[key] = envConfig[key];
//         //console.log(process.env[key]);
//     })
// }

if (env==='development'||env==='production'){
    process.env ={
        ...process.env,
        ...config[env]
    }
    console.log(process.env.PORT);
}
