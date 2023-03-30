import type { UmiApiRequest, UmiApiResponse } from "umi";
import { PrismaClient } from '@prisma/client'
import { verifyToken } from "@/utils/jwt";
import { Redis } from "@upstash/redis";

export default async function (req: UmiApiRequest, res: UmiApiResponse) {
    let prisma: PrismaClient
    switch (req.method) {
        case 'POST':
            try {
                prisma = new PrismaClient()
                let post = await prisma.post.update({
                    where: { id: +req.body.postId },
                    data: {
                        title: req.body.title,
                        content: req.body.content,
                        updatedAt: new Date(),
                        tags: req.body.tags,
                        categoryId: req.body.categoryId,
                        imageUrl: req.body.imageUrl
                    }
                })
                res.status(201).json(post)
                await prisma.$disconnect()
            } catch (error: any) {
                res.status(500).json({
                    result: false,
                    message: typeof error.code === 'string' ? 'https://www.prisma.io/docs/reference/api-reference/error-reference#' + error.code.toLowerCase() : error
                })
            }
            break
        default:
            res.status(405).json({ error: "Method not allowed" })
    }
}