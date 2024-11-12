const usuarioRepository = require('../repositories/usuarioRepository');

exports.login = async (req, res) => {

    const { username, password } = req.body;

    try {
        const user = await usuarioRepository.getUsuarioByUsername(username);

        if (!user) {
            return res.status(401).json('Usuario o contraseña incorrectos');
        }
        if(user.password !== password){
            return res.status(401).json('Usuario o contraseña incorrectos');
        }
        delete user.password;

        res.json(user);

    } catch (error) {
        console.error(error);
        res.status(500).json('Hubo un error al realizar el login');
    }
}
exports.register = async (req, res) => {
    const { fullName, userName, password, imagenId } = req.body;

    try {
        // Verificar si el usuario ya existe
        const existingUser = await usuarioRepository.getUsuarioByUsername(userName);
        if (existingUser) {
            return res.status(400).json('El nombre de usuario ya está en uso');
        }

        // Registrar el nuevo usuario
        const result = await usuarioRepository.usuarioRegister(fullName, userName, password, imagenId);
        res.status(201).json({ message: 'Usuario registrado exitosamente', result });
    } catch (error) {
        console.error(error);
        res.status(500).json('Hubo un error al registrar el usuario');
    }
};