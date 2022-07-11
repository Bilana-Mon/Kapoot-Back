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
import { UserService } from './user.service';
import { User as UserModel } from '@prisma/client';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {
    constructor
        (
            private readonly userService: UserService
        ) { }

    @Post()
    async signupUser(
        @Body() userData: { nickname?: string; email: string, password: string },
    ): Promise<UserModel> {
        return this.userService.createUser(userData);
    }

    @UseGuards(AuthGuard('local'))
    @Post('auth/login')

    async login(@Request() req) {
        return req.user;
    }



    @Get('/:id')
    async getUserById(@Param('id') id: string): Promise<UserModel> {
        return this.userService.user({ id: Number(id) });
    }

}
