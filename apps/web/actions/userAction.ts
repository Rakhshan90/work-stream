'use server';

import prisma from '@repo/db/client';
import { Role } from '@repo/db/client';
import {signUpSchema} from '@repo/validation-schema/zod-schema';
import bcrypt from 'bcrypt';

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
        const user = await prisma.user.findFirst({
            where: { email }
        });

        if (user) {
            return {
                message: "Account is already registered, try to login"
            }
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
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
