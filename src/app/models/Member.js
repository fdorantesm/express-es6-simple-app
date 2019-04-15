import mongoose, {Schema} from 'mongoose';
import mongooseBeautifulUniqueValidation from 'mongoose-beautiful-unique-validation'; // eslint-disable-line
import {isEmail} from 'validator';

const fields = {
  name: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    validate: isEmail,
    required: true,
  },
  image: {
    type: String,
  },
  team: {
    type: Schema.Types.ObjectId,
    ref: 'Team',
    required: true,
  },
};

const options = {
  timestamps: true,
};

const Member = new Schema(fields, options);

Member.plugin(mongooseBeautifulUniqueValidation);

export default mongoose.model('Member', Member);
