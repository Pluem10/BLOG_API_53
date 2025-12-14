import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import { JWT_SECRET } from '../config.js';

const authenticate = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization || req.headers.Authorization;
        const token = authHeader && authHeader.split(' ')[0].toLowerCase() === 'bearer'
            ? authHeader.split(' ')[1]
            : req.cookies?.token;

        if (!token) {
            return res.status(401).json({ message: 'ต้องมี token เพื่อเข้าถึง' });
        }

        const decoded = jwt.verify(token, JWT_SECRET);
        const user = await User.findById(decoded.id).select('-password');
        if (!user) {
            return res.status(401).json({ message: 'ผู้ใช้ไม่พบ' });
        }

        req.user = user;
        next();
    } catch (err) {
        console.error(err);
        return res.status(401).json({ message: 'token ไม่ถูกต้องหรือหมดอายุ' });
    }
};

export default authenticate;