import { default as mongoose, Schema, Document, PaginateModel } from 'mongoose';
import { default as mongoosePaginate } from 'mongoose-paginate';
import { default as slug } from 'slug';
import { IShelter } from './shelter.model';

interface IWalk extends Document {
  name: string;
  durationTime: String;
  distance: String;
  startingPoint: string;
  imageUrl: string;
  slug: string;
  _createdAt: number;
  _modifiedAt: number;
  _deletedAt: number;

  _shelterId: IShelter['_id'];

  slugify(): void;
}

interface IWalkModel extends PaginateModel<IWalk> {}

const walkSchema: Schema = new Schema(
  {
    slug: {
      type: String,
      required: true,
      lowercase: true,
    },
    name: {
      type: String,
      required: true,
      max: 128,
    },
    durationTime: {
      type: String,
      required: true,
      uppercase: true,
      
    },
    distance: {
      type: String,
      required: true,
     
    },
    startingPoint: {
      type: String,
      required: true,
      max: 30,
    },
    imageUrl: {
      type: String,
      required: false,
    },



    _createdAt: { type: Number, required: true, default: Date.now() },
    _modifiedAt: { type: Number, required: false, default: null },
    _deletedAt: { type: Number, required: false, default: null },
    _shelterId: {
      type: Schema.Types.ObjectId,
      ref: 'Shelter',
      required: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

walkSchema.methods.slugify = function() {
  this.slug = slug(this.name);
};

walkSchema.pre<IWalk>('validate', function(next) {
  if (!this.slug) {
    this.slugify();
  }
  return next();
});

walkSchema.virtual('id').get(function(this: IWalk) {
  return this._id;
});
walkSchema.virtual('shelter', {
  ref: 'Shelter',
  localField: '_shelterId',
  foreignField: '_id',
  justOne: true,
});

walkSchema.plugin(mongoosePaginate);
const Walk = mongoose.model<IWalk, IWalkModel>('walk', walkSchema);

export { IWalk, Walk, walkSchema };
