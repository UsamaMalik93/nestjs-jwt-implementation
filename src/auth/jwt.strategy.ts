import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from './auth.types';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  /**
   * @param {ConfigService} configService
   * @param {ProfileService} profileService
   */

  constructor(readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('WEBTOKEN_SECRET_KEY'),
    });
  }

  /**
   *
   * @param {JwtPayload} jwtPayload
   * @param {any} done
   * @param {Promise<boolean>}
   */
  async validate(
    { iat, exp, _id }: JwtPayload,
    done: (arg0: null, arg1: any) => void,
  ): Promise<boolean> {
    const timeDiff = exp - iat;
    if (timeDiff <= 0) {
      throw new UnauthorizedException();
    }
    // const user=await profileService.getProfileById(_id)

    // if(!user) {
    //     throw new UnauthorizedException()
    // }
    // done(null , user)
    return true;
  }
}
