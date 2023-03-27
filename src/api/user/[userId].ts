import type { UmiApiRequest, UmiApiResponse } from "umi";
import { PrismaClient } from '@prisma/client'
// import { Redis } from "@upstash/redis";

export default async function (req: UmiApiRequest, res: UmiApiResponse) {
    let prisma: PrismaClient
    let user: any
    switch (req.method) {
        case 'GET':
            // const redis = Redis.fromEnv()
            // user = await redis.get('user-' + req.params.userId)
            // if (user) {
            //     res.status(200).json(user)
            //     return
            // } else {
            prisma = new PrismaClient()
            user = await prisma.user.findUnique({
                where: { id: +req.params.userId },

            })
            if (user) {
                res.status(200).json(user)
            }
            else {
                res.status(404).json({ merror: "page not found" })
            }
            // await redis.set('user-' + req.params.userId, JSON.stringify(user))
            prisma.$disconnect()
            // }
            break;
        case 'POST':
            try {
                prisma = new PrismaClient()
                user = await prisma.user.update({
                    where: { id: +req.body.userId },
                    data: {
                        name: req.body.name,
                        avatarUrl: req.body.avatarUrl,
                        introduce: req.body.introduce,
                        isAvailable: Boolean(req.body.isAvailable)
                    }
                })
                res.status(201).json({ ...user, passwordHash: undefined })
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