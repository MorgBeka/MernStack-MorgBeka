import { default as mongoose, Schema, Document, PaginateModel } from 'mongoose';
import { default as mongoosePaginate } from 'mongoose-paginate';
import { default as slug } from 'slug';
import { IShelter } from './shelter.model';
import { IUser } from './user.model';


interface IDog extends Document {
  name: string;
  gender: string;
  age: Number;
  breed: string;
  info: string;
  walk: boolean;
  imageUrl: string;
  slug: string;
  _createdAt: number;
  _modifiedAt: number;
  _deletedAt: number;

  _shelterId: IShelter['_id'];
  _userId: IUser['_id'];

  slugify(): void;
}

interface IDogModel extends PaginateModel<IDog> {}

const dogSchema: Schema = new Schema(
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
    gender: {
      type: String,
      required: true,
      uppercase: true,
      max: 1,
    },
    age: {
      type: Number,
      required: true,
     
    },
    breed: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    info: {
      type: String,
      required: true,
      max: 800,
    },
    walk: {
      type: Boolean,
      required: true,

    },


    _createdAt: { type: Number, required: true, default: Date.now() },
    _modifiedAt: { type: Number, required: false, default: null },
    _deletedAt: { type: Number, required: false, default: null },
    _shelterId: {
      type: Schema.Types.ObjectId,
      ref: 'Shelter',
      required: false,
    },
    _userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

dogSchema.methods.slugify = function() {
  this.slug = slug(this.name);
};

dogSchema.pre<IDog>('validate', function(next) {
  if (!this.slug) {
    this.slugify();
  }
  return next();
});

dogSchema.virtual('id').get(function(this: IDog) {
  return this._id;
});
dogSchema.virtual('shelter', {
  ref: 'Shelter',
  localField: '_shelterId',
  foreignField: '_id',
  justOne: true,
});
dogSchema.virtual('user', {
  ref: 'User',
  localField: '_userId',
  foreignField: '_id',
  justOne: true,
});

dogSchema.plugin(mongoosePaginate);
const Dog = mongoose.model<IDog, IDogModel>('Dog', dogSchema);

export { IDog, Dog, dogSchema };
