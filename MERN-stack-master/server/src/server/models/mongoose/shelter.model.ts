import { default as mongoose, Schema, Document, PaginateModel } from 'mongoose';
import { default as mongoosePaginate } from 'mongoose-paginate';
import { default as slug } from 'slug';

interface IShelter extends Document {   
  name: string;
  place: string;
  openinghours: string;
  info: string; 
  imageUrl: string;
  slug: string;
  _createdAt: number;
  _modifiedAt: number;
  _deletedAt: number;


  slugify(): void;
}

interface IShelterModel extends PaginateModel<IShelter> {}

const shelterSchema: Schema = new Schema(
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
    place: {
      type: String,
      required: true,
      uppercase: true,
      max: 1,
    },
    openinghours: {
      type: String,
      required: true,
     
    },
    info: {
      type: String,
      required: true,
      max: 600,
    },

    imageUrl: {
      type: String,
      required: false,
    },

    _createdAt: { type: Number, required: true, default: Date.now() },
    _modifiedAt: { type: Number, required: false, default: null },
    _deletedAt: { type: Number, required: false, default: null },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

shelterSchema.methods.slugify = function() {
  this.slug = slug(this.name);
};

shelterSchema.pre<IShelter>('validate', function(next) {
  if (!this.slug) {
    this.slugify();
  }
  return next();
});

shelterSchema.virtual('id').get(function(this: IShelter) {
  return this._id;
});


shelterSchema.plugin(mongoosePaginate);
const Shelter = mongoose.model<IShelter, IShelterModel>('Shelter', shelterSchema);

export { IShelter, Shelter, shelterSchema };
