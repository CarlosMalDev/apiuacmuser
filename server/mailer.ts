/*

import nodemailer = require('nodemailer')

export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: 'carlosmaldev@gmail.com',
    pass: 'mgsfmcidibgyneac'
  },
});

transporter.verify().then(() => {
  console.log('ready for send emails')
})


'use strict';
const express = require('express')
const mysql = require('mysql')
const nodemailer = require('nodemailer')

const PORT = process.env.PORT || 3000
const cors = require('cors')
const app = express()

app.use(cors()) // permita peticiones de otros origenes
app.use(express.json())
// app.use(express.urlencoded())


// mysql
const connection = mysql.createConnection({
  host:       'localhost',
  user:       'uacm',
  password:   'uacm',
  database:   'uacm',
  socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock'
})
// route prueba
app.get('/', (req, res) => {
  res.send('estoy vivo api')
})

const md5 = require('md5');



// Thursday
// i saw the anime in my tv, at eight o'clock and ate a sandwich

// Friday
// i ate a one mom's chocolates, i went to work and come home at seven o'clock

// Saturday
// i went to de cinema and saw the black widow at seven o'clock and ate chips whith cheesse

// Sunday
// i went to grandmother´s house with my mother and ate a mole de olla and rice later i worked in my other work for two hours 
// while drinking a cofee


// MAIL 
// carlosmaldev@gmail.com
// mgsfmcidibgyneac



// const transporter = nodemailer.createTransport({
//   host: "smtp.gmail.com",
//   port: 465,
//   secure: true, // true for 465, false for other ports
//   auth: {
//     user: 'carlosmaldev@gmail.com',
//     pass: 'mgsfmcidibgyneac'
//   },
// });

// transporter.verify().then(() => {
//   console.log('ready for send emails')
// })



// async function main() {
//   console.log("dentro de main email")
  // let testAccount = await nodemailer.createTestAccount();
  // let transporter = nodemailer.createTransport({
  //   host: "smtp.ethereal.email",
  //   port: 587,
  //   secure: false, // true for 465, false for other ports
  //   auth: {
  //     user: testAccount.user, // generated ethereal user
  //     pass: testAccount.pass, // generated ethereal password
  //   },
  // });
  // let info = await transporter.sendMail({
  //   from: '"Fred Foo 👻" <foo@example.com>', // sender address
  //   to: "bar@example.com, baz@example.com", // list of receivers
  //   subject: "Hello ✔", // Subject line
  //   text: "Hello world?", // plain text body
  //   html: "<b>Hello world?</b>", // html body
  // });
  // const { nombre, apaterno, amaterno, matricula, email, fchaCrcn } = req.body;
  
  // console.log("Message sent: %s", info.messageId);
  // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
// }
// main().catch(console.error);


// REGISTROS
app.get('/allusers', (req, res) => {
  const sql = 'SELECT * FROM usuarios';
  connection.query(sql, (error, results) => {
    if (error) throw error;
    if (results.length > 0) {
      res.json(results);
    } else {
      res.send('Not result');
    }
  })
})

app.get('/user/:id', (req, res) => {
  const { id } = req.params
  const sql = `SELECT * FROM usuarios WHERE id = ${id}`;
  connection.query(sql, (error, result) => {
    if (error) throw error;
    if (result.length > 0) {
      res.json(result);
    } else {
      res.send('Not result');
    }
  })
})

app.post('/add', (req, res) => {
  const { nombre, apaterno, amaterno, matricula, email, fchaCrcn } = req.body;
  let prefix = md5('codibox_')+'</br>'
  let pass = md5( prefix + md5(generatePasswordRand(6,'alf')) )
  console.log("pass", pass)
  console.log(typeof pass)
  const sql = `INSERT INTO usuarios 
              (nombre, apaterno, amaterno, matricula, email, contrasena , fchaCrcn) 
              VALUES
              ('${nombre}', '${apaterno}', '${amaterno}', '${matricula}', '${email}', '${pass}', now() )`;
  
  connection.query(sql, error => {
    if (error) throw error
    res.status(200).send({status: 'ok'});
  })

  // res.send('New customer')
})
app.put('/update/:id', (req, res) => {
  const { id } = req.params;
  console.log("update", id)
  const { nombre, contra } = req.body;
  console.log("update nombre", nombre, contra)
  const sql = `UPDATE registro SET nombre = '${nombre}', contra = '${contra}' WHERE id = ${id}`
  connection.query(sql, error => {
    if (error) throw error
    res.send('registro modificado');
  })
  // res.send('udpate customer')
})
app.delete('/delete/:id', (req, res) => {
  const { id } = req.params;
  const sql = `DELETE FROM registro WHERE id = ${id}`
  connection.query(sql, error => {
    if (error) throw error
    res.send('registro eliminado');
  })
  // res.send('delete customer')
})





const generatePasswordRand = async (length,type) => {
  let caracteres = '';
  switch(type){
    case 'num':
      caracteres = "0123456789";
    break;
    case 'alf':
      caracteres = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    break;
    case 'rand':
      //FOR ↓
      break;
    default:
    caracteres = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    break;
  }
  var pass = "";
  for (let i=0; i < length; i++){
    if(type == 'rand'){
      pass += String.fromCharCode((Math.floor((Math.random() * 100)) % 94) + 33);
    }else{
      pass += caracteres.charAt(Math.floor(Math.random()*caracteres.length));   
    }
  }
  return pass;
}










connection.connect(error => {
  if (error) {
    console.log('antes erro data base')
    throw error;
  } else {
    console.log('Data base server running')
  }  
})
// connection.end()
// connection.query



app.listen(PORT, () => console.log(`Server running on port asdf ${PORT}`))




*/