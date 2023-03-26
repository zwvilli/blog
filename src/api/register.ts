import type { UmiApiRequest, UmiApiResponse } from "umi";
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import { signToken } from "@/utils/jwt";


export default async function (req: UmiApiRequest, res: UmiApiResponse) {
    switch (req.method) {
        case 'POST':
            try {
                //prisma连续到数据库
                const prisma = new PrismaClient()

                //用户数据
                const user = await prisma.user.create({
                    data: {
                        name: req.body.name,
                        email: req.body.email,
                        passwordHash: bcrypt.hashSync(req.body.password, 8),
                        avatarUrl: req.body.avatarUrl

                    }
                })

                //将用户数据（不包含密码）和JWT传回去
                res.status(201).setCookie('token', signToken(user.id)).json({ ...user, passwordHash: undefined })

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
            //正在以一种错误的方式访问这个API
            res.status(405).json({ error: "Method not allowed." })
    }

}