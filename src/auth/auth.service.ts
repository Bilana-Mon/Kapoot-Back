import { Injectable } from '@nestjs/common';
import { UserService } from 'src/services/user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) { }

    async validateUser(userId: number): Promise<any> {        
        const user = await this.userService.getUserById(userId);
        if (user && user.id === userId) {
            const { id, ...result } = user;            
            return result;
        }
        return null;
    }

    async loginUser(user: any) {
        const payload = { nickname: user.nickname, sub: user.userId };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
