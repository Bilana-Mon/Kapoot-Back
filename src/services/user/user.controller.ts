import {
    Controller,
    Get,
    Request,
    UseGuards
} from '@nestjs/common';
import { UserService } from './user.service';
import { User as UserModel } from '@prisma/client';
import { LocalAuthGuard } from '../../auth/local-auth.guard';

@Controller('user')
export class UserController {
    constructor
        (
            private readonly userService: UserService
        ) { }

    @UseGuards(LocalAuthGuard)
    @Get()
    async getUserById(@Request() req): Promise<UserModel> {
        return this.userService.getUserById(req.user.id);
    }

}
