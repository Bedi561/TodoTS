import jwt from "jsonwebtoken";
import { Response } from 'express';
const SECRET = 'SECr3t';
import { Request, NextFunction } from "express";


// this request, resposne and next function wala sirf authenticate wale mei HI KRNA HAI BS ie the middleware ONLY
const authenticateJwt = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).send('Unauthorized');
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(token, SECRET, (err, payload) => {
        if (err || !payload || typeof payload === "string") {
            return res.sendStatus(403);
        }

        req.headers["userId"] = payload.id;
        next();
    });
};

export {
    authenticateJwt,
    SECRET
};



// A very major error userId wala --- the best way to fix it is
//  one way could be us making our own interface like
/*
interface updateRequest extends Request{
    userId: string;
} */

//  but will do like this

//  req.headers["userId"] = user.id
// but initially it will give error for the (user)--- thus instead of the user
// we set it as payload as it could be anything not explicitally defined
// could be a string, undefined

// cuz we know ki headers can have keys and they can be a key





// If the JWT verification is successful but the payload is empty (indicating that the
// token is not valid or expired), it responds with an HTTP status code 403 (Forbidden). This typically means that the user is not authenticated.

// If the payload is a string (which would be unexpected for a JWT), it also responds with an HTTP status code 403. This additional check helps ensure that the payload is not just a string.

//   req.headers["userId"] = payload.id;
// Assuming the JWT verification is successful and the payload contains an 'id' field, this line adds a 'userId' header to the req object, storing the 'id' value from the payload.





//    THE LAST UPDATION WE WILL BE DOING IS TO DEFINE THE TYPE OF req.body   ie ki user excatly kis type ka input dega hmne