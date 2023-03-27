import type { UmiApiRequest, UmiApiResponse } from "umi";
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

export default async function (req: UmiApiRequest, res: UmiApiResponse) {
    let prisma: PrismaClient
    switch (req.method) {
        case 'GET':
            prisma = new PrismaClient()
            const allUser = await prisma.user.findMany()
            res.status(200).json(allUser)
            await prisma.$disconnect()
            break;
        case 'POST':
            try {
                prisma = new PrismaClient()
                //用户数据
                const user = await prisma.user.create({
                    data: {
                        name: req.body.name,
                        email: req.body.email,
                        passwordHash: bcrypt.hashSync(req.body.password, 8),
                        avatarUrl: req.body.avatarUrl,
                        introduce: req.body.introduce,
                        level: req.body.level,
                    }
                })
                //将用户数据（不包含密码）和JWT传回去
                res.status(201).json({ ...user, passwordHash: undefined })
                await prisma.$disconnect()
            } catch (error: any) {
                //发生了错误
                res.status(500).json({
                    result: false,
                    message: typeof error.code === 'string' ? 'https://www.prisma.io/docs/reference/api-reference/error-reference#' + error.code.toLowerCase() : error
                })
            }

            break;
        default:
            res.status(405).json({ error: "Method not allowed." })
    }
}