import {
    Controller,
    Get,
    Param,
    Post,
    Body,
    Put,
    Delete,
    Request,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User as UserModel } from '@prisma/client';

@Controller('user')
export class UserController {
    constructor
        (
            private readonly userService: UserService
        ) { }

    
    @Get('/:id')
    async getUserById(@Param('id') id: string): Promise<UserModel> {
        return this.userService.user({ id: Number(id) });
    }

}
