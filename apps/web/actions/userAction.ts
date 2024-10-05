'use server';

import { authOptions } from '@/app/config/authOptions';
import db from '@repo/db/client';
import { Role } from '@repo/db/client';
import { signUpSchema } from '@repo/validation-schema/zod-schema';
import bcrypt from 'bcrypt';
import { getServerSession } from 'next-auth';

export const signUp = async (name: string, email: string, password: string, role: Role) => {

    const { success } = signUpSchema.safeParse({
        name,
        email,
        password,
        role,
    });

    if (!success) {
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

        const hashedPassword = await bcrypt.hash(password, 10);

        await db.user.create({
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


export const getEmployees = async (filter: string) => {
    const session = await getServerSession(authOptions);

    // Check if the user is authenticated
    if (!session?.user || !session?.user.id) {
        return {
            message: 'You are not authenticated',
            employees: [],
        };
    }

    try {
        const manager = await db.user.findFirst({
            where: { id: Number(session?.user?.id) }
        });

        if (manager?.role !== 'MANAGER') {
            return {
                message: 'You are not allowed to search employees',
                employees: [],
            }
        }

        const employees = await db.user.findMany({
            where: {
                OR: [
                    {
                        name: {
                            contains: filter,
                            mode: 'insensitive',
                        }
                    },
                    {
                        email: {
                            contains: filter,
                            mode: 'insensitive',
                        }
                    }
                ]
            },
            select: {
                id: true,
                name: true,
                email: true,
            }
        });

        return {
            message: 'Employees have been fetched',
            employees: employees || [],
        }

    } catch (error) {
        return {
            message: 'Failed to get employees, try again',
            employees: [],
        }
    }
}
