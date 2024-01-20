import jwt, { JwtPayload } from "jsonwebtoken";
import express from "express";

const authenticateJWT = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.SECRET_KEY!, (err, userId) => {
      if (err) {
        return res.sendStatus(403);
      }

      req.body.userId = userId;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

export default authenticateJWT;
