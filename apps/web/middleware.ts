import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { isManager } from './actions/userAction';
import { getRole } from './lib/user/userRole';

export async function middleware(request: NextRequest) {

    const authToken = request.cookies.get('next-auth.session-token')?.value;
    if (!authToken) {
        return NextResponse.redirect(new URL('/signin', request.url))
    }

    // const role = await getRole();
    // Define protected routes based on roles
    // const managerRoutes = ['/board/:path/create-task', '/create-project-board', '/board/:path/add'];
    // const employeeRoutes = ['/employee-dashboard', '/task-list', '/employee-profile'];

    // const currentPath = request.nextUrl.pathname;

    // Restrict manager-only routes
    // if (managerRoutes.some(route => currentPath.startsWith(route)) && !role) {
    //     return NextResponse.redirect(new URL('/', request.url));
    // }

    // Restrict employee-only routes
    // if (employeeRoutes.some(route => currentPath.startsWith(route)) && role) {
    //     return NextResponse.redirect(new URL('/', request.url));
    // }
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: ['/board-list', '/create-project-board', '/board/:path*'],
}