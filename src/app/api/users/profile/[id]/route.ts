import { NextRequest, NextResponse } from "next/server";
import { prisma } from '@/utils/db';
import jwt from "jsonwebtoken";
import { JWTPlyload } from "@/utils/types";
interface Props {
    params: { id: string }
}

/**
 * @method DELETE 
 * @route ~/api/users/profile/:id
 * @desc Delete User Profile
 * @access private  
 */

export async function DELETE(register: NextRequest, { params }: Props) {
    try {
        const user = await prisma.user.findUnique({ where: { id: parseInt(params.id) } })
        if (!user) {
            return NextResponse.json({ message: "user not founf" }, { status: 404 })
            
        }
        const authToken = register.headers.get('authToken') as string;
        if (!authToken) {
            return NextResponse.json({ message: "not token provided, access denied" }, { status: 401 })
        }
        const userFromToken = jwt.verify(authToken, process.env.JWT_SECRET as string) as JWTPlyload;
        if (userFromToken.id === user.id) {
            await prisma.user.delete({ where: { id: parseInt(params.id) } });
            return NextResponse.json({ message: 'your profile has been deleted' }, { status: 200 })
        };
        return NextResponse.json({ message: 'only user himself can delete his profule , forbidden' }, { status: 403 })

    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: 'internal server error 32423' }, { status: 500 })
    }
}