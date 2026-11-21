const JWT_SECRET = process.env.JWT_SECRET_ADMIN
import jwt from 'jsonwebtoken'

export function adminAuth(req, res, next){
    const token = req.headers.token
    const tokenDecoded = jwt.verify(token, JWT_SECRET)
    console.log(tokenDecoded)
    req.userId = tokenDecoded.userId
    next()
}