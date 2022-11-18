import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User, Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {
    constructor(private prismaService: PrismaService, private configService: ConfigService) { }

    async getUserById(id: number,): Promise<User | null> {
        return this.prismaService.user.findUnique({
            where: { id },
        });
    }

    async validateUser(nickname: string, password: string): Promise<User> {
        const foundUser = await this.prismaService.user.findFirst({
            where: { nickname }
        });

        if (!foundUser) {
            throw new ForbiddenException('Please check nickname and password')
        }

        const isPasswordMatching = await bcrypt.compare(password, foundUser.password);

        if (!isPasswordMatching) {
            throw new ForbiddenException('Please check nickname and password')
        }

        return foundUser;

    }

    async userFromProvider(provider: string, idInProvider: string): Promise<User | undefined> {
        const foundUser = this.prismaService.user.findFirst({
            where: {
                provider,
                idInProvider
            }
        })
        return foundUser;
    }


    async createUser(data: Prisma.UserCreateInput): Promise<User> {
        const { nickname, email, password, provider, idInProvider } = data;

        const userWithThisEmail = await this.prismaService.user.findFirst({
            where: {
                email,
                provider
            }
        });
        const userWithThisNickname = await this.prismaService.user.findFirst({
            where: {
                nickname
            }
        });

        if (userWithThisEmail) {
            throw new ForbiddenException('User with this email existing!')
        }
        if (userWithThisNickname) {
            throw new ForbiddenException('User with this nickname existing!')
        }

        return this.prismaService.user.create({
            data: {
                provider,
                nickname,
                email,
                idInProvider,
                password: data.password ? bcrypt.hashSync(password, Number(this.configService.get('SALT'))) : undefined
            }
        });
    }
}