import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { PorfileController } from './profile.controller';
import { ProfileRepository } from './profile.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Profile, ProfileModel } from './profile.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Profile.name, schema: ProfileModel, collection: 'profiles' },
    ]),
  ],
  controllers: [PorfileController],
  providers: [ProfileService, ProfileRepository],
  exports: [ProfileService], // Export ProfileService
})
export class ProfileModule {}
