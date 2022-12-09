import { model } from 'mongoose';
import { UserSchema } from '../schemas/user-schema';

import { Schema } from 'mongoose';
const SubwayStation = new Schema({
   station_code: String,
});
const subway_stations = model('subway_stations', SubwayStation);

const User = model('users', UserSchema);

class UserModel {
   async create(userInfo) {
      const createdNewUser = await User.create(userInfo);

      await subway_stations.create({
         station_code: 'data[3]',
      });
      return createdNewUser;
   }
}

const userModel = new UserModel();

export { userModel };
