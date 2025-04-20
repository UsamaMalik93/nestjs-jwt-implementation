import { FilterQuery, QueryOptions } from 'mongoose';

export type FindPayloadType<Model> = {
  filter?: FilterQuery<Model>;
  options?: QueryOptions;
  ref?: any;
  where?: Record<string, any>;
  sort?: Record<string, 1 | -1>;
  projection?: Record<string, 1 | 0>;
};
