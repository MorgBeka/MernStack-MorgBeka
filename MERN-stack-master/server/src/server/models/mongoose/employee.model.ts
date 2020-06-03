import { default as mongoose, Schema, Document, PaginateModel } from 'mongoose';
import { default as mongoosePaginate } from 'mongoose-paginate';
import { default as slug } from 'slug';
import { ICategory } from './category.model';

interface IEmployee extends Document {
  title: string;
  slug: string;
  synopsis: string;
  body: string;
  imageUrl: string;
  _createdAt: number;
  _modifiedAt: number;
  _deletedAt: number;

  _categoryId: ICategory['_id'];

  slugify(): void;
}

interface IEmployeeModel extends PaginateModel<IEmployee> {}

const employeeSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true,
      max: 128,
    },
    slug: {
      type: String,
      required: true,
      lowercase: true,
    },
    synopsis: {
      type: String,
      required: true,
      max: 512,
    },
    body: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: false,
    },
    _createdAt: { type: Number, required: true, default: Date.now() },
    _modifiedAt: { type: Number, required: false, default: null },
    _deletedAt: { type: Number, required: false, default: null },
    _categoryId: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

employeeSchema.methods.slugify = function() {
  this.slug = slug(this.title);
};

employeeSchema.pre<IEmployee>('validate', function(next) {
  if (!this.slug) {
    this.slugify();
  }
  return next();
});

employeeSchema.virtual('id').get(function(this: IEmployee) {
  return this._id;
});
employeeSchema.virtual('category', {
  ref: 'Category',
  localField: '_categoryId',
  foreignField: '_id',
  justOne: true,
});

employeeSchema.plugin(mongoosePaginate);
const Employee = mongoose.model<IEmployee, IEmployeeModel>('Employee', employeeSchema);

export { IEmployee, Employee, employeeSchema };
