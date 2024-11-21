const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'jorgelamanrique@gmail.com',
        pass: 'lyip gnpf itaa nbnk'
    },
    tls: {
        rejectUnauthorized: false // Desactivar la validación del certificado
    },
});

// Función que envía el correo
exports.notificarPaciente = (mail, resetUrl) => {
    const mailOptions = {
        from: 'jorgelamanrique@gmail.com',
        to: mail,
        subject: 'Restablecimiento de contraseña',
        html: `<p>Hola,</p>
               <p>Has solicitado restablecer tu contraseña. Haz clic en el siguiente enlace para restablecerla:</p>
               <a href="${resetUrl}">Restablecer contraseña</a>
               <p>Si no has solicitado este cambio, ignora este mensaje.</p>`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
        } else {
            console.log('Correo enviado: ' + info.response);
        }
    });
};
