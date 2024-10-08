import db from '@repo/db/client';

export async function getUserRole(userId: number) {
    try {
        const user = await db.user.findUnique({
            where: { id: userId },
        });
        return user?.role || null;
    } catch (error) {
        return null;
    }
}