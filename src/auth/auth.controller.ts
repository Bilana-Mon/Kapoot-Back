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
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor
        (
            private readonly userService: UserService,
            private readonly authService: AuthService,
    ) { }

    @Post('/signup')
    async signupUser(
        @Body() userData: { nickname?: string; email: string, password: string },
    ): Promise<UserModel> {
        return this.userService.createUser(userData);
    }

    @UseGuards(LocalAuthGuard)
    @Post('/login')
    async login(@Request() req) {        
        return this.authService.loginUser(req.user);
    }
}