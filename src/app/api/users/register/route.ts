import { RegisterUserDto } from "@/utils/dtos";
import { registerSchema } from "@/utils/validationSchemas";
import { prisma } from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcryptjs';
import { generateJWT } from "@/utils/generatToken";
import { JWTPlyload } from "@/utils/types";

/**
 * @method POST 
 * @route ~/api/users/register
 * @desc Create New User [(Register)]
 * @access public 
 */

export async function POST(request: NextRequest) {
    try {
        const body = (await request.json()) as RegisterUserDto;
        const validation = registerSchema.safeParse(body);
        if (!validation.success) {
            return NextResponse.json({ message: validation.error.errors[0].message }, { status: 400 })
        }
        const user = await prisma.user.findUnique({ where: { email: body.email } })
        if (user) {
            return NextResponse.json({ message: 'This user already registered' }, { status: 400 })
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(body.password, salt);
        const newuser = await prisma.user.create({
            data: {
                username: body.username,
                email: body.email,
                password: hashPassword,
            },
            select: {
                username: true,
                id: true,
                isAdmin: true
            }
        });
        const jwtPlyload: JWTPlyload = {
            id: newuser.id,
            username: newuser.username,
            isAdmin: newuser.isAdmin,
        }   
        const token = generateJWT(jwtPlyload);

        return NextResponse.json({...newuser , token}, { status: 201 })

    } catch (error) {
        return NextResponse.json({ message: 'internal server error' }, { status: 500 })
    }
}