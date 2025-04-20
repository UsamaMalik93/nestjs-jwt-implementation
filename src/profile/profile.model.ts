import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { APP_ROLES, PROFILE_STATUS } from 'src/utils/constanst';

@Schema({ timestamps: true })
export class Profile {
  @Prop({ required: true, type: String })
  email: string;

  @Prop({ required: true, type: String })
  password: string;

  @Prop({ required: true, type: String })
  name: string;

  @Prop({ required: false, enum: PROFILE_STATUS, default: PROFILE_STATUS.NONE })
  isVerified: string;

  @Prop({
    required: false,
    type: String,
    default: 'https://ui-avatars.com/api/?name=Deep Lawn',
  })
  avatar: string;

  @Prop({
    required: true,
    enum: APP_ROLES,
    type: [String],
    default: [APP_ROLES.CONTRACTOR],
  })
  roles: APP_ROLES[];
}

export type ProfileDocument = HydratedDocument<Profile>;
export const ProfileModel = SchemaFactory.createForClass(Profile);
