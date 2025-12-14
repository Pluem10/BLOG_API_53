import bcrypt from 'bcryptjs';
import User from '../models/user.model.js';


const register = async (req, res) => {
}

authController.singnup = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).send({ message: 'กรุณาใส่ username เเละ password' });
        return;
    }
}