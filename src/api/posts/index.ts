import type { UmiApiRequest, UmiApiResponse } from "umi";
import { PrismaClient } from '@prisma/client'
import { verifyToken } from "@/utils/jwt";

export default async function (req: UmiApiRequest, res: UmiApiResponse) {
    let prisma: PrismaClient
    switch (req.method) {
        case 'GET':
            prisma = new PrismaClient()
            const allPosts = await prisma.post.findMany({ include: { author: true } })
            res.status(200).json(allPosts)
            await prisma.$disconnect()
            break;
        case 'POST':
            if (!req.cookies?.token) {
                return res.status(400).json({ message: "Unauthorized" })
            }
            const authorId = (await verifyToken(req.cookies.token)).id
            // const authorId = 1
            prisma = new PrismaClient()
            const newPost = await prisma.post.create({
                data: {
                    title: req.body.title,
                    content: req.body.content,
                    createdAt: new Date(),
                    tags: req.body.tags,
                    authorId,
                    categoryId: req.body.categoryId,
                    imageUrl: req.body.imageUrl

                }
            })
            res.status(200).json(newPost)
            await prisma.$disconnect()
            break;
        case 'DELETE':
            if (!req.cookies?.token) {
                return res.status(400).json({ message: "Unauthorized" })
            }
            prisma = new PrismaClient()
            const result = await prisma.post.delete({
                where: {
                    id: +req.body.id
                }
            })
            res.status(200).json(result)
            await prisma.$disconnect()
            break;
        default:
            res.status(405).json({ error: "Method not allowed." })
    }
}