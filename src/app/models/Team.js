import mongoose, {Schema} from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import mongooseBeautifulUniqueValidation from 'mongoose-beautiful-unique-validation'; // eslint-disable-line

const fields = {
  name: {
    type: String,
    unique: true,
    required: true,
  },
  members: [{
    type: Schema.Types.ObjectId,
    ref: 'Member',
  }],
};

const options = {
  timestamps: true,
};

const Team = new Schema(fields, options);

Team.plugin(mongoosePaginate);
Team.plugin(mongooseBeautifulUniqueValidation);

export default mongoose.model('Team', Team);
