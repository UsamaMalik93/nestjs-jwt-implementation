import * as crypto from 'crypto';

export const createAvatarURL = (role: string) => {
  return `https://ui-avatars.com/api/?name=${role}`;
};

export const getFindQueryProps = (payload: any) => {
  const {
    filter = {},
    options = {},
    ref = [],
    sort = {},
    where = {},
    projection = {},
  } = payload;

  return { filter, options, ref, sort, where, projection };
};

export const encryptPassword = (password: string) => {
  return crypto.createHmac('sha256', password).digest('hex');
};
