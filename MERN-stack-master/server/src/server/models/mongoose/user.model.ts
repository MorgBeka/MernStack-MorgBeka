import { default as mongoose, Schema, Document } from 'mongoose';
import { default as bcrypt } from 'bcrypt';

import { ICat } from './cat.model';
import { IDog} from './dog.model';


interface ILocalProvider {
  password: string;
}

interface IFacebookProvider {
  id: string;
  token: string;
}

interface IProfile {
  firstName: string;
  lastName: string;
  avatar: string;
}

interface IUser extends Document {
  firstName:string;
  lastName: string;
  email: string;
  age: Number;
  domicile: string,
  memberNumber: string,
  favorites: string,
  _createdAt: number;
  _modifiedAt: number;
  _deletedAt: number;

  localProvider?: ILocalProvider;
  facebookProvider?: IFacebookProvider;

  role: string;
  profile?: IProfile;

  _catId: ICat['_id'];
  _dogId: IDog['_id'];


  comparePassword(candidatePassword: String, cb: Function): void;
}

const userSchema: Schema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    age: {
      type: Number,
      required: true,
    },
    domicile: {
      type: String,
      required: true,
    },
    memberNumber: {
      type: String,
      required: true,
      unique: true,
    },
    favorites: {
      type: String,
      required: true,
    },




    _createdAt: { type: Number, required: true, default: Date.now() },
    _modifiedAt: { type: Number, required: false, default: null },
    _deletedAt: { type: Number, required: false, default: null },
    localProvider: {
      password: {
        type: String,
        required: false,
      },
    },
    facebookProvider: {
      id: {
        type: String,
        required: false,
      },
      token: {
        type: String,
        required: false,
      },
    },
    role: {
      type: String,
      enum: ['user', 'administrator'],
      default: 'user',
      required: true,
    },
    profile: {
      firstName: String,
      lastName: String,
      avatar: String,
    },
    _dogId: {
      type: Schema.Types.ObjectId,
      ref: 'Dog',
      required: false,
    },
    _catId: {
      type: Schema.Types.ObjectId,
      ref: 'Cat',
      required: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

userSchema.pre<IUser>('save', function(next) {
  const user: IUser = this as IUser;

  if (!user.isModified('localProvider.password')) return next();

  try {
    return bcrypt.genSalt(10, (errSalt, salt) => {
      if (errSalt) throw errSalt;

      bcrypt.hash(user.localProvider.password, salt, (errHash, hash) => {
        if (errHash) throw errHash;

        user.localProvider.password = hash;
        return next();
      });
    });
  } catch (err) {
    return next(err);
  }
});

userSchema.virtual('id').get(function(this: IUser) {
  return this._id;
});
userSchema.virtual('dog', {
  ref: 'Dog',
  localField: '_dogIds',
  foreignField: '_id',
  justOne: false,
});
userSchema.virtual('cat', {
  ref: 'Cat',
  localField: '_catIds',
  foreignField: '_id',
  justOne: false,
});

userSchema.methods.comparePassword = function(
  candidatePassword: String,
  cb: Function,
) {
  const user = this;
  bcrypt.compare(candidatePassword, user.password, (err, isMatch) => {
    if (err) return cb(err, null);
    return cb(null, isMatch);
  });
};

const User = mongoose.model<IUser>('User', userSchema);

export { IUser, User, userSchema };
