import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { RegisterProfileDto } from 'src/auth/dto/signup-profile.dto';
import { APP_ROLES, PROFILE_STATUS } from 'src/utils/constanst';
import { createAvatarURL, encryptPassword } from 'src/utils/helpers';
import { ProfileRepository } from './profile.repository';
import { Profile } from './profile.model';

@Injectable()
export class ProfileService {
  constructor(private readonly profileRepository: ProfileRepository) {}
  private readonly logger = new Logger(ProfileService.name);

  get(_id: string): Promise<Profile> {
    throw new Error('Method not implemented.');
  }
  async create(registerProfileDto: RegisterProfileDto) {
    try {
      let password = encryptPassword(registerProfileDto.password);

      const payload = {
        ...registerProfileDto,
        password,
        avatar: createAvatarURL(registerProfileDto.name),
        isVerified: PROFILE_STATUS.NONE,
        roles: [APP_ROLES.CONTRACTOR],
      };
      return this.profileRepository.create(payload);
    } catch (error) {
      this.logger.log('Error creating the Profile');
      throw new BadRequestException(
        'Something went wrong while creating profile',
      );
    }
  }
}
