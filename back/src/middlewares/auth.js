// import jwt from "jsonwebtoken"

// JWT_SECRET = process.env.JWT_SECRET

// const authenticateToken = (req, res, enxt) => {
//     const token = req.header.authorization

//     if(!token){
//         res.status(401).json({error: "Acesso negado!"})
//     }

//     try {
//         const decoded = jwt.verify(token.replace("Bearer ", ''), JWT_SECRET)
//         req.userId = decoded.id
//         next()
//     } catch (error) {
//         return res.status(401).json({error: "Token inválido"})
//     }
// }

// import { verifyToken } from "@clerk/express";


// export const authenticateVerification = async (req, res, next) => {
//     const authHeader = req.headers.authorization;

//     if(!authHeader || !authHeader.startsWith("Bearer ")){
//         return res.status(401).json({error: "Acesso negado! Token não fornecido."})
//     }

//     const token = authHeader.split(" ")[1];

//     try {
//         const payload = await verifyToken(token);
//         req.user = payload;


//     //     // Exemplo de checagem por cargo
//     // if (payload?.metadata?.cargo !== "admin") {
//     //   return res.status(403).json({ error: "Acesso negado" });
//     // }

//     next();
//     } catch (error) {
//         return res.status(401).json({error: "Token inválido ou expirado."});
//     }
// }