import bcrypt from "bcrypt";

export const saltRounds = 10;

export function encryptionPassword(myPlaintextPassword) {
    return bcrypt.hash(myPlaintextPassword, saltRounds);
}

export function comparePassword(myPlaintextPassword, hash) {
    return bcrypt.compare(myPlaintextPassword, hash); 
}

