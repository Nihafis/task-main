import jwt from 'jsonwebtoken';
import { errorHandler } from './error.js';

const verifyToken = (req, res, next) => {
    const token = req.cookies.jwt
    if (!token) {
         next(errorHandler(402, 'Unauthorized'))
         return res.status(402).send('Unauthorized')
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return next(errorHandler(403, 'Unauthorized'))
        }
        req.user = user;
        next();
    });
}

export default verifyToken; 