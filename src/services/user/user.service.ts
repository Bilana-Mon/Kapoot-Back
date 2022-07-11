import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User, Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { UnauthorizedException } from '@nestjs/common';

@Injectable()
export class UserService {
    constructor(private prismaService: PrismaService, private configService: ConfigService) { }

    async getUserById(id:number,): Promise<User | null> {
        return this.prismaService.user.findUnique({
            where: {id},
        });
    }

    async users(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.UserWhereUniqueInput;
        where?: Prisma.UserWhereInput;
        orderBy?: Prisma.UserOrderByWithRelationInput;
    }): Promise<User[]> {
        const { skip, take, cursor, where, orderBy } = params;
        return this.prismaService.user.findMany({
            skip,
            take,
            cursor,
            where,
            orderBy,
        });
    }

    async createUser(data: Prisma.UserCreateInput): Promise<User> {
        const { nickname, email, password } = data;

        const userWithThisEmail = await this.prismaService.user.findFirst({
            where: {
                email
            }
        });
        const userWithThisNickname = await this.prismaService.user.findFirst({
            where: {
                nickname
            }
        });

        if (userWithThisEmail) {
            throw new UnauthorizedException('User with this email existing!')
        }
        if (userWithThisNickname) {
            throw new UnauthorizedException('User with this nickname existing!')
        }

        const saltedPassword = await bcrypt.hash(password, Number(this.configService.get('SALT')))
        return this.prismaService.user.create({
            data: {
                nickname,
                email,
                password: saltedPassword
            }
        });
    }

    // async findOne(data: Prisma.UserWhereUniqueInput): Promise<User> {
    //     const userId = data;
    //     return await this.prismaService.user.findUnique({
    //         where: {
    //             userId : userId
    //         }
            
    //     })
        
    // }

    async updateUser(params: {
        where: Prisma.UserWhereUniqueInput;
        data: Prisma.UserUpdateInput;
    }): Promise<User> {
        const { where, data } = params;
        return this.prismaService.user.update({
            data,
            where,
        });
    }

    async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
        return this.prismaService.user.delete({
            where,
        });
    }
}