import {
  BadRequestException,
  Injectable,
  NotAcceptableException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Profile, ProfileDocument } from './profile.model';
import { getFindQueryProps } from 'src/utils/helpers';
import { FindPayloadType } from 'src/utils/types';

@Injectable()
export class ProfileRepository {
  constructor(
    @InjectModel('Profile') private readonly ProfileModel: Model<Profile>,
  ) {}

  async get(id: string): Promise<ProfileDocument> {
    return this.ProfileModel.findById(id).exec();
  }

  async create(payload: Profile): Promise<ProfileDocument> {
    try {
      const findPayload: FindPayloadType<Profile> = {
        filter: {
          email: payload.email,
        },
      };
      const user = await this.findOne(findPayload);
      if (user) {
        throw new NotAcceptableException(
          'The account with the provided email currently exists. Please choose another one.',
        );
      }
      const createdProfile = new this.ProfileModel(payload);
      return createdProfile.save();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findOne(payload: FindPayloadType<Profile>): Promise<ProfileDocument> {
    try {
      const { ref, filter } = getFindQueryProps(payload);
      return await this.ProfileModel.findOne(filter).populate(ref).exec();
    } catch (erro) {
      throw new BadRequestException("Can't find the Profile");
    }
  }

  async findAll(payload: FindPayloadType<Profile>): Promise<ProfileDocument[]> {
    try {
      const { filter, ref } = getFindQueryProps(payload);
      const profiles = this.ProfileModel.find(filter).populate(ref).exec();
      return profiles;
    } catch (error) {
      throw new BadRequestException('Unable to find Profiles');
    }
  }
}
