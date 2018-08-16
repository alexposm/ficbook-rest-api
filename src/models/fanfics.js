import mongoose, { Schema } from 'mongoose';
import timestamps from 'mongoose-timestamp';
import mongooseStringQuery from 'mongoose-string-query';

export const FanficSchema = new Schema(
  {
    ficbookId: {
      type: Number,
      index: true,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      lowercase: true,
      trim: true,
      index: true,
      unique: false,
      required: true,
    }
  },
  { collection: 'fanfics' }
);

FanficSchema.plugin(timestamps);
FanficSchema.plugin(mongooseStringQuery);

FanficSchema.index({ ficbookId: 1, email: 1 });

module.exports = exports = mongoose.model('Fanfic', FanficSchema);