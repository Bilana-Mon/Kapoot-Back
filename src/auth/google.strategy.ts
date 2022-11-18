import { Strategy } from 'passport-google-oauth20';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserService } from 'src/services/user/user.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
    constructor(private configService: ConfigService, private userService: UserService) {
        super({
            clientID: configService.get('GOOGLE_CLIENT_ID'),
            clientSecret: configService.get('GOOGLE_CLIENT_SECRET'),
            callbackURL: configService.get('GOOGLE_CALLBACK_URL'),
            scope: ['email', 'profile']
        });
    }

    async validate(accessToken: string, refreshToken: string, profile: any) {
        const { id, emails } = profile;

        const foundUser = await this.userService.userFromProvider('google', id);
        if (foundUser) {
            return {
                userId: foundUser.id
            }
        }
        const creationPayload = {
            provider: 'google',
            idInProvider: id,
            email: emails[0].value,
            nickname: profile.displayName
        }
        const createdUser = await this.userService.createUser(creationPayload);
        return {
            userId: createdUser.id
        }
    }
}