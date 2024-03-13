import { vi, describe, it, beforeEach } from "vitest";
import { encryptionPassword, comparePassword, saltRounds } from "./crypto-utils.js";
import bcrypt from "bcrypt";

vi.mock('bcrypt', () => ({
    default: { 
        hash: vi.fn(() => 'hashedPassword'),
        compare: vi.fn(() => 'hashedPassword'),
    }
}))


describe('crypto-utils', () => {
    beforeEach(() => {
        bcrypt.hash.mockClear();
    });
    it('should call bcrypt hash' , () => {
        // arrange(given)
        const psw = 'password';
        
        // act(when)
        encryptionPassword(psw);

        // assert(then)
        expect(bcrypt.hash).toHaveBeenCalledWith(psw, saltRounds);
    });
    it('should return hashed password', () => {
        // arrange(given)
        const psw = 'password';
        const hash = encryptionPassword(psw);
        
        // act(when)
        comparePassword(psw, hash);

        // assert(then)
        expect(bcrypt.compare).toHaveBeenCalledWith(psw, hash);
    });
})
