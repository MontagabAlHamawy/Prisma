import { prisma } from "@/utils/db";
import { LoginUserDto } from "@/utils/dtos";
import { loginSchema } from "@/utils/validationSchemas";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcryptjs';
import { generateJWT } from "@/utils/generatToken";
import { JWTPlyload } from "@/utils/types";


/**
 * @method POST 
 * @route ~/api/users/login
 * @desc login User ([Sign in])
 * @access public 
 */

export async function POST(register: NextRequest) {
    try {
        const body = (await register.json()) as LoginUserDto;
        const validation = loginSchema.safeParse(body);
        if (!validation.success) {
            return NextResponse.json({ message: validation.error.errors[0].message }, { status: 400 })
        }
        const user = await prisma.user.findUnique({ where: { email: body.email } })
        if (!user) {
            return NextResponse.json({ message: 'please make an acount' }, { status: 400 })
        }

        const ispassword = await bcrypt.compare(body.password, user.password);

        if (!ispassword) {
            return NextResponse.json({ message: 'invalid password' }, { status: 400 })
        }

        const jwtPlyload: JWTPlyload = {
            id: user.id,
            isAdmin: user.isAdmin,
            username: user.username
        }
        const token = generateJWT(jwtPlyload);

        return NextResponse.json({ message: 'Authenticated', token }, { status: 200 })

    } catch (error) {
        return NextResponse.json({ message: 'internal server error' }, { status: 500 })
    }
}