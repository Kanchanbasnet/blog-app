import {TOTP} from "totp-generator";
import * as dotenv from 'dotenv';
dotenv.config()


export const verifyEmail = (email)=>{

    const data = TOTP.generate(process.env.TOTP_KEY, {
        digits: 8,
        algorithm: "SHA-512",
        period: 60,
        
    })
     return data;
    

}