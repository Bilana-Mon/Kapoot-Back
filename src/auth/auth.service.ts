import { Injectable } from '@nestjs/common';
import { UserService } from 'src/services/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/services/prisma/prisma.service';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
        private prismaService: PrismaService
    ) { }

    async loginUser(user: { nickname: string; password: string }) {
        const loggedUser = await this.userService.validateUser(user.nickname, user.password);
        return this.jwtService.sign({
            userId: loggedUser.id
        });
    }

    async getUserIdByToken(token: string) {
        const decoded = this.jwtService.verify(token);
        console.log(decoded);

        const userId = decoded.userId;
        console.log(userId);
        return userId;
    }

    async findUserByToken(userId: number) {
        return this.userService.getUserById(userId)
    }
}
