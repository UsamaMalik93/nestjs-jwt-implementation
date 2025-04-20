import { Body, Controller, Post } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { RegisterProfileDto } from 'src/auth/dto/signup-profile.dto';

@Controller('/profiles')
export class PorfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Post()
  async createProfile(@Body() registerProfileDto: RegisterProfileDto) {
    console.log(
      '🚀 ~ PorfileController ~ createProfile ~ registerProfileDto:',
      registerProfileDto,
    );
    return await this.profileService.create(registerProfileDto);
  }
}
