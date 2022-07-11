import { Injectable } from '@nestjs/common';
import { UserService } from 'src/services/user/user.service';

@Injectable()
export class AuthService {
    constructor(private userService: UserService) { }

    async validateUser( userId: number): Promise<any> {
        const user = await this.userService.getUserById(userId);
        if(user && user.id === userId){
            const {id, ...result} = user;
            return result;
        }
        return null;
    }
}
