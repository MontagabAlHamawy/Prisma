import { NextRequest, NextResponse } from "next/server";
import { articles } from "@/utils/data";
import { UpdateArticlData } from "@/utils/dtos";
import { prisma } from "@/utils/db";
import { date } from "zod";
import { title } from "process";

interface Props {
    params: { id: string },

}

/**
 * @method GET 
 * @route ~/api/articles/:id
 * @desc Get Single Article By id
 * @access public 
 */

export async function GET(request: NextRequest, { params }: Props) {
    try {
        const article = await prisma.article.findUnique({ where: { id: parseInt(params.id) } });
        if (!article) {
            return NextResponse.json({ massage: 'Article Not Found' }, { status: 404 })
        }
        return NextResponse.json(article, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: 'internal server error' }, { status: 500 })
    }
}


/**
 * @method PUT 
 * @route ~/api/articles/:id
 * @desc Update Article
 * @access public 
 */

export async function PUT(request: NextRequest, { params }: Props) {
    try {
        const article = await prisma.article.findUnique({ where: { id: parseInt(params.id) } });
        if (!article) {
            return NextResponse.json({ massage: 'Article Not Found' }, { status: 404 })
        }
        const body = (await request.json()) as UpdateArticlData
        await prisma.article.update({
            where: { id: parseInt(params.id) },
            data: {
                title: body.title,
                description: body.description
            }
        });
        return NextResponse.json({ massage: 'Article Updated' }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: 'internal server error' }, { status: 500 })
    }
}


/**
 * @method DELETE
 * @route ~/api/articles/:id
 * @desc Deleted Article
 * @access public 
 */

export async function DELETE(request: NextRequest, { params }: Props) {
    try {
        const article = await prisma.article.findUnique({ where: { id: parseInt(params.id) } });
        if (!article) {
            return NextResponse.json({ massage: 'Article Not Found' }, { status: 404 })
        }
        await prisma.article.delete({ where: { id: parseInt(params.id) } })
        return NextResponse.json({ massage: 'Article Deleted' }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: 'internal server error' }, { status: 500 })
    }
}