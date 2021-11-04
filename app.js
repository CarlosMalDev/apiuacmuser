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

const md5 = require('md5');




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





const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: 'carlosmaldev@gmail.com',
    pass: 'mgsfmcidibgyneac'
  },
});

/**
 * EMAIL
 * @param {*} contrainventada 
 * @param {*} nombre 
 * @param {*} apaterno 
 * @param {*} amaterno 
 * @param {*} matricula 
 * @param {*} email 
 * @returns 
 */
async function mainMail(contrainventada, nombre, apaterno, amaterno, matricula, email) {
  console.log("dentro de mainMail")
  try {
    let texto = '';
    await transporter.sendMail({
      // para completar el registro de su cuenta , haga clic en el enlace de abajo:
      // enlace 
      // repositorio UACM 
      from: '"Notificación UACM Tesis👻" <carlosmaldev@gmail.com>', // sender address
      to: email, //"kmbcmb@hotmail.com", // list of receivers
      subject: "Registro de cuenta - UACM Tesis", // Subject line
      text: "Hello world?a", // plain text body <b>Hello world?</b>", // html body
      html: `<div>
             <div>
              <span><h3>Bienvenido/a: <br><br> <b>${nombre} ${apaterno} ${amaterno}</b>, a las Tesis de UACM</h3></span>
             </div>
             <br>
             <div>
              <span><h3>Su contraseña es la siguiente, guardela en un lugar seguro: <br><br> <b>${contrainventada}</b><h3></span>
             </div>
             <br>
             <div>
              <span><h4>UACM</h4></span>
             </div>
            </div>`
    });
  } catch (error) {
    emailStatus = error;
    return res.status(400).json({ message: 'Something goes worng!'})
  }
  // const { nombre, apaterno, amaterno, matricula, email, fchaCrcn } = req.body;
  // console.log("Message sent: %s", info.messageId);
  // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}

/**
 * Add user
 */
app.post('/add', (req, res) => {
  const { nombre, apaterno, amaterno, matricula, email, fchaCrcn } = req.body;
  let randString = makeid(5);
  console.log("randString",randString);
  let contrainventada = nombre+randString;
  console.log("contrainvetnada", contrainventada)
  // let pass = contrainventada;
  let prefix = md5('codibox_')+'</br>'
  let pass = md5( prefix + md5(contrainventada) )
  console.log("pass", pass)
  console.log(typeof pass)
  const sql = `INSERT INTO usuarios 
              (User_Nombre, User_Paterno, User_Materno, User_Matricula, User_Mail, User_Contrasena, User_FchaCrcn	) 
              VALUES
              ('${nombre}', '${apaterno}', '${amaterno}', '${matricula}', '${email}', '${pass}', now() )`;
  
  connection.query(sql, error => {
    if (error) {
      throw error
    } else {
      mainMail(contrainventada, nombre, apaterno, amaterno, matricula, email).catch(console.error);
      res.status(200).send({status: 'ok'});  
    }
  })
  // res.send('New customer')
})







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






function makeid (length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * 
    charactersLength));
  }
  console.log("result",result)
  return result;
}





// const generatePasswordRand = async (length,type) => {
//   let caracteres = '';
//   switch(type){
//     case 'num':
//       caracteres = "0123456789";
//     break;
//     case 'alf':
//       caracteres = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
//     break;
//     case 'rand':
//       //FOR ↓
//       break;
//     default:
//     caracteres = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
//     break;
//   }
//   var pass = "";
//   for (let i=0; i < length; i++){
//     if(type == 'rand'){
//       pass += String.fromCharCode((Math.floor((Math.random() * 100)) % 94) + 33);
//     }else{
//       pass += caracteres.charAt(Math.floor(Math.random()*caracteres.length));   
//     }
//   }
//   console.log("cree pass", pass)
//   return pass;
// }



















connection.connect(error => {
  if (error) {
    console.log('antes erro dat a base')
    throw error;
  } else {
    console.log('Data base server running')
  }  
})
// connection.end()
// connection.query



app.listen(PORT, () => console.log(`Server running on port asdf ${PORT}`))




