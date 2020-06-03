import { default as mongoose, Schema, Document, PaginateModel } from 'mongoose';
import { default as mongoosePaginate } from 'mongoose-paginate';
import { default as slug } from 'slug';
import { IShelter } from './shelter.model';
import { IUser } from './user.model';


interface ICat extends Document {
  name: string;
  gender: string;
  age: number;
  breed: string;
  info: string;
  imageUrl: string;
  slug: string;
  _createdAt: number;
  _modifiedAt: number;
  _deletedAt: number;

  _shelterId: IShelter['_id'];
  _userId: IUser['_id'];

  slugify(): void;
}

interface ICatModel extends PaginateModel<ICat> {}

const catSchema: Schema = new Schema(
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
      required: false,
    },
    info: {
      type: String,
      required: true,
      max: 600,
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

catSchema.methods.slugify = function() {
  this.slug = slug(this.name);
};

catSchema.pre<ICat>('validate', function(next) {
  if (!this.slug) {
    this.slugify();
  }
  return next();
});

catSchema.virtual('id').get(function(this: ICat) {
  return this._id;
});
catSchema.virtual('shelter', {
  ref: 'Shelter',
  localField: '_shelterId',
  foreignField: '_id',
  justOne: true,
});
catSchema.virtual('user', {
  ref: 'User',
  localField: '_userId',
  foreignField: '_id',
  justOne: true,
});

catSchema.plugin(mongoosePaginate);
const Cat = mongoose.model<ICat, ICatModel>('Cat', catSchema);

export { ICat, Cat, catSchema }; 
