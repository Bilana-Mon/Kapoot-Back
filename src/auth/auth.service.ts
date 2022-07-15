import { Injectable } from '@nestjs/common';
import { UserService } from 'src/services/user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) { }

    async loginUser(user: { nickname: string; password: string }) {
        const loggedUser = await this.userService.validateUser(user.nickname,user.password);
        return this.jwtService.sign({
            userId: loggedUser.id
        });
    }
}
