import {
    Controller,
    Get,
    Param,
    Post,
    Body,
    Put,
    Delete,
    Request,
    UseGuards,
    Req,
    UnauthorizedException
} from '@nestjs/common';
import { UserService } from '../services/user/user.service';
import { User as UserModel } from '@prisma/client';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
    constructor
        (
            private readonly userService: UserService,
            private readonly authService: AuthService,
        ) { }

    @Post('/signup')
    async signupUser(
        @Body() userData: { nickname: string; email: string, password: string },
    ): Promise<UserModel> {
        // const token = await this.authService.loginUser(userData);
        const user = this.userService.createUser(userData);
        return user;
    }

    @Post('/login')
    async login(@Body() loginPayload: { nickname: string; password: string }) {
        const token = await this.authService.loginUser(loginPayload);
        return {
            token
        }
    }

    @UseGuards(JwtAuthGuard)
    @Get('/me')
    async getUserByToken(@Request() req) {
        const userId = req.user.userId;
        return this.userService.getUserById(userId);
    }
}