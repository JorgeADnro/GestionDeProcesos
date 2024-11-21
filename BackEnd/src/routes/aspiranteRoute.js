const express = require("express");
const pacienteController = require('../controllers/pacienteController.js');
const router = express.Router();
const multer = require('multer');
const nodemailer = require('nodemailer');

const { checkToken } = require('../../utils/middlewares.js');
const userEsp = require("../models/userEsp.js");
const userReg = require("../models/userRegular.js");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const bcrypt = require('bcryptjs');

router.use('/usersReg', require('./usersReg.js'));

router.use('/usersEsp', require('./userEsp.js'));

router.post('/pac', upload.fields([{ name: 'foto' }, { name: 'cert' }]), pacienteController.guardarPaciente);

router.get('/pac', pacienteController.obtenerPacientes);

router.get('/pac/ciu', checkToken, pacienteController.obtenerCiudades);

router.get('/pac/:id', checkToken, pacienteController.obtenerPaciente);

router.delete('/pac/:id', pacienteController.eliminarPaciente);

// Configurar el transporte de correo
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

// Endpoint para solicitar restablecimiento de contraseña
router.post('/forgot-password', async (req, res) => {
    const { email } = req.body;
    const user = await userReg.findOne({ email });
    if (!user) {
        return res.status(400).json({ error: 'Usuario no encontrado' });
    }
    
    // Envío del correo electrónico con la contraseña existente
    try {
        const mailOptions = {
            from: 'jorgelamanrique@gmail.com',
            to: email,
            subject: 'Recuperación de Contraseña',
            html: `<p>Hola,</p>
                   <p>Tu contraseña es: ${user.password}</p>
                   <p>Si no has solicitado este cambio, ignora este mensaje.</p>`
        };

        await transporter.sendMail(mailOptions);
        res.json({ message: 'Se ha enviado un correo electrónico con tu contraseña' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Hubo un error al enviar el correo electrónico' });
    }
});


module.exports = router;