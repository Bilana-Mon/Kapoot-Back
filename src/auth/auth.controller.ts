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
    Response,
    Req,
    UnauthorizedException
} from '@nestjs/common';
import { UserService } from '../services/user/user.service';
import { User as UserModel } from '@prisma/client';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { GoogleAuthGuard } from './google.guard';
import { ConfigService } from '@nestjs/config';

@Controller('auth')
export class AuthController {
    constructor
        (
            private readonly userService: UserService,
            private readonly authService: AuthService,
            private readonly configService: ConfigService
        ) { }

    @Post('/signup')
    async signupUser(
        @Body() userData: { nickname: string; email: string, password: string },
    ): Promise<UserModel> {

        const creationPayload = {
            ...userData,
            provider: 'sign-up'
        }

        const user = this.userService.createUser(creationPayload);
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

    @UseGuards(GoogleAuthGuard)
    @Get('/google')
    async authWithGoogle(@Request() req) {
        console.log(req);
    }

    @UseGuards(GoogleAuthGuard)
    @Get('/google/redirect')
    async redirectFromGoogle(@Request() req, @Response() res) {
        const { userId } = req.user;
        return res.redirect(`${this.configService.get('CLIENT_URL')}/fromRedirect/?userToken=${this.authService.createUserToken(userId)}`);
    }
}