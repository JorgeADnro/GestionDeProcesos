const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const User = require('../models/userRegular');

//POST /user/register
router.post('/registerReg', async (req, res) => {
    try{
        const user = await User.create(req.body);
        res.json(user);
    }catch(err){
        res.json({error: err.message});
    }
});

//POST /users/login
router.post('/loginReg', async (req, res) => {
    try {
        // Buscar al usuario por su correo electrónico
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).json({ error: 'Usuario no encontrado' });
        }

        // Comparar la contraseña enviada con la contraseña almacenada
        if (req.body.password !== user.password) {
            return res.status(400).json({ error: 'Error en usuario / contraseña' });
        }

        // Generar un código de verificación de 6 dígitos
        const verificationCode = Math.floor(100000 + Math.random() * 900000);

        // Guardar el código en la base de datos
        user.code = verificationCode;
        await user.save();

        // Configurar Nodemailer
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

        // Configurar el correo electrónico
        const mailOptions = {
            from: 'jorgelamanrique@gmail.com',
            to: user.email,
            subject: 'Código de verificación',
            text: `Tu código de verificación es: ${verificationCode}`
        };

        // Enviar el correo con el código de verificación
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error al enviar el correo:', error);
                return res.status(500).json({ error: 'Error al enviar el correo' });
            } else {
                console.log('Correo enviado:', info.response);
                return res.json({ success: 'Login correcto, se ha enviado un código de verificación a tu correo' });
            }
        });
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        res.status(500).json({ error: 'Hubo un problema al iniciar sesión' });
    }
});


//POST /users/verify
router.post('/verify', async (req, res) => {
    const { code } = req.body;
    const user = await User.findOne({ code });

    if (user) {
        user.code = null; // Borra el código después de usarlo
        await user.save(); // Guarda el cambio en la base de datos
        res.status(200).json({
            token: createToken(user),
            username: user.username,
            userRole: user.role
        });
    } else {
        res.status(401).json({ error: 'Código incorrecto' });
    }
});



function createToken(user){
    const payload = {
        user_id: user._id,
        user_role : user.role
    }
    return jwt.sign(payload, 'si jala');
}

router.post('/logout', (req, res) => {
    res.json({ success: 'Deslogueo exitoso' });
});

module.exports = router;
