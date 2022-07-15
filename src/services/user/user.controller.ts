import {
    Controller,
    Get,
    Request,
    UseGuards
} from '@nestjs/common';
import { UserService } from './user.service';
import { User as UserModel } from '@prisma/client';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';

@Controller('user')
export class UserController {
    constructor
        (
            private readonly userService: UserService
        ) { }

    @UseGuards(JwtAuthGuard)
    @Get()
    async getUserById(@Request() req): Promise<UserModel> {
        return this.userService.getUserById(req.user.userId);
    }

}
