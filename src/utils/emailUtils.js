//Requerimos el paquete
var nodemailer = require('nodemailer');
require('dotenv').config();

//Creamos el objeto de transporte
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: `${process.env.EMAILUSER}`,
    pass: `${process.env.EMAILPASS}`
  }
});

/**
 * Función que realiza en envió de correo cuando un producto es actualizado
 * @param data información del usuario y producto
 */
exports.sendEmailUpdateProduct = function (data) {
  console.log(data);
  var mensaje = `Estimado(a) ${data.user.firstname} le informamos que se ha realizado una modificación en el producto ${data.updateProduct.name}.`;

  var mailOptions = {
    from: 'ZeBrands <zebrands@zebrands.com>',
    to: data.user.email,
    subject: 'Actualización de producto',
    text: mensaje
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email enviado: ' + info.response);
    }
  });
}
