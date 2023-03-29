import type { UmiApiRequest, UmiApiResponse } from "umi";
import { PrismaClient } from '@prisma/client'
import { verifyToken } from "@/utils/jwt";

export default async function (req: UmiApiRequest, res: UmiApiResponse) {
    let prisma: PrismaClient
    let authorId: any
    switch (req.method) {
        case 'GET':
            prisma = new PrismaClient()
            const allCategory = await prisma.category.findMany()
            res.status(200).json(allCategory)
            await prisma.$disconnect()
            break;
        case 'POST':
            if (!req.cookies?.token) {
                return res.status(400).json({ message: "Unauthorized" })
            }
            authorId = (await verifyToken(req.cookies.token)).id
            // const authorId = 1
            prisma = new PrismaClient()
            const newCategory = await prisma.category.create({
                data: {
                    name: req.body.name
                }
            })
            res.status(200).json(newCategory)
            await prisma.$disconnect()
            break;
        case 'DELETE':
            if (!req.cookies?.token) {
                return res.status(400).json({ message: "Unauthorized" })
            }
            authorId = (await verifyToken(req.cookies.token)).id
            // const authorId = 1
            prisma = new PrismaClient()
            const result = await prisma.category.delete({
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