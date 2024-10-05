import { z } from 'zod';

export const signUpSchema = z.object({
    name: z.string().min(2, {
        message: "Name must be at least 2 characters.",
    }),
    email: z.string().email({
        message: "Please enter a valid email address.",
    }),
    password: z.string().min(8, {
        message: "Password must be at least 8 characters.",
    }),
    role: z.enum(["MANAGER", "EMPLOYEE"], {
        required_error: "Please select a role.",
    }),
});

export const signInSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});

export const projectSchema = z.object({
    name: z.string().min(2, {
        message: "Name must be at least 2 characters",
    }),
    description: z.string().min(5, {
        message: "Description must be at least 5 characters",
    }),
    startDate: z.date({
        message: "Start date of the project is required",
    }),
    endDate: z.date({
        message: "End date of the project is required",
    }),
    status: z.enum(['NOT_STARTED', 'IN_PROGRESS', 'COMPLETED'], {
        required_error: "Please provide a valid status",
    }),
});


export const taskSchema = z.object({
    projectId: z.number({
        message: "Project ID must be in digit",
    }),
    employeeId: z.number({
        message: "Employee ID must be in digit",
    }),
    title: z.string().min(2, {
        message: "Title must be at least 2 characters",
    }),
    description: z.string().min(5, {
        message: "Description must be at least 5 characters",
    }),
    startDate: z.date({
        message: "Start date of the project is required",
    }),
    endDate: z.date({
        message: "End date of the project is required",
    }),
    status: z.enum(['PENDING', 'ONGOING', 'COMPLETED'], {
        required_error: "Please provide a valid status",
    }),
    priority: z.enum(['LOW', 'MEDIUM', 'HIGH'], {
        required_error: "Please provide a valid priority",
    }),
});


export type SignUpSchemaType = z.infer<typeof signUpSchema>;
export type SignInSchemaType = z.infer<typeof signInSchema>;
export type ProjectSchemaType = z.infer<typeof projectSchema>;
export type taskSchemaType = z.infer<typeof taskSchema>;
