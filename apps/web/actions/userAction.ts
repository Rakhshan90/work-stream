'use server';

import db from '@repo/db/client';
import { Role } from '@repo/db/client';
import {signUpSchema} from '@repo/validation-schema/zod-schema';

export const signUp = async (name: string, email: string, password: string, role: Role) => {

    const {success} = signUpSchema.safeParse({
        name,
        email,
        password,
        role,
    });

    if(!success){
        return {
            message: "Failed to sign up, due to invalid input type"
        }
    }


    try {
        const user = await db.user.findFirst({
            where: { email }
        });

        if (user) {
            return {
                message: "Account is already registered, try to login"
            }
        }

        await db.user.create({
            data: {
                name,
                email,
                password,
                role: role,
            }
        });

        return {
            message: 'Account is created, now you can login'
        }
        
    } catch (error) {
        return {
            message: 'Error while signing up, please try again'
        }
    }
}
