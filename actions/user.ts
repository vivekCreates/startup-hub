"use server";
import bcrypt from 'bcryptjs';


import { signIn } from "@/auth";
import prisma from "@/lib/db";
import { redirect } from "next/navigation";


export const login = async (formData: FormData) => {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    try {
        const user = await prisma.user.findUnique({ where: { email } })
        if (!user) {
            throw new Error("user does not exists")
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password)
        if (!isPasswordMatch) {

            throw new Error("email or password is incorrect")

        } else {
            await signIn('credentials', {
                redirect: false,
                callbackUrl: '/',
                email,
                password
            })
        }
    } catch (error: any) {
        return error.message
    }
    redirect('/')
}