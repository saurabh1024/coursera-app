const JWT_SECRET = process.env.JWT_SECRET_USER
import jwt from 'jsonwebtoken'

export function userAuth(req, res, next){
    const token = req.headers.token
    const tokenDecoded = jwt.verify(token, JWT_SECRET)
    req.userId = tokenDecoded.userId
    next()
}