import {
    Controller,
    Get,
    Param,
    Post,
    Body,
    Put,
    Delete,
    Request,
    UseGuards
} from '@nestjs/common';
import { UserService } from '../services/user/user.service';
import { User as UserModel } from '@prisma/client';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
    constructor
        (
            private readonly userService: UserService
        ) { }

    @Post('/signup')
    async signupUser(
        @Body() userData: { nickname?: string; email: string, password: string },
    ): Promise<UserModel> {
        return this.userService.createUser(userData);
    }

    @UseGuards(AuthGuard('local'))
    @Post('/login')

    async login(@Request() req) {
        return req.user;
    }
}