const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/userEsp');

//POST /user/register
router.post('/registerEsp', async (req, res) => {
    //ENCRIPTAR PASSWORD
    try{
    req.body.password = bcrypt.hashSync(req.body.password, 12)

    const user = await User.create(req.body);
    res.json(user);
    }catch(err){
        res.json({error:error.message});
    }
});

//POST /users/login
router.post('/loginEsp', async (req, res) =>{
    //Comprobar si email existe
    const user = await User.findOne({email: req.body.email});
        if(!user)
        {
            return res.json({error : 'Error en usuario / contraseña'});
        }

        const eq = bcrypt.compareSync(req.body.password, user.password);
        if(!eq){
            return res.json({error : 'Error en usuario / contraseña'})
        }

        res.json({succes: 'Login correcto del especialista', 
        token: createToken(user)
        });
});


function createToken(user){
    const payload = {
        user_id: user._id,
        user_role : user.role
    }
    return jwt.sign(payload, 'si jala');
}

module.exports = router;