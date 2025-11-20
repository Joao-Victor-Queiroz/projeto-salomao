import { clerkClient, getAuth } from "@clerk/express";

export const authorizedRoles = (allowedRoles) => (req, res, next) => {
  const { sessionClaims } = getAuth(req);

  const cargo = sessionClaims?.cargo;

  if (!cargo) {
    console.log("Cargo não encontrado!");
    return res.status(403).json({ error: "Cargo não encontrado." });
  }

  if (!allowedRoles.includes(cargo)) {
    console.log("Acesso negado");
    return res.status(403).json({ error: "Acesso negado para esta função." });
  }

  next();
};
