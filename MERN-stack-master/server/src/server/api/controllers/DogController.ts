import { NextFunction, Request, Response } from 'express';
import { IDog, Dog, Category } from '../../models/mongoose';

import { NotFoundError } from '../../utilities';

class DogController {
  index = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { limit, skip } = req.query;
      let dogs;

      if (limit && skip) {
        const options = {
          limit: parseInt(limit, 10) || 10,
          page: parseInt(skip, 10) || 1,
          sort: { _createdAt: -1 },
          populate: 'category',
        };
        dogs = await Dog.paginate({}, options);
      } else {
        dogs = await Dog.find()
          .populate('category')
          .sort({ _createdAt: -1 })
          .exec();
      }

      return res.status(200).json(dogs);
    } catch (err) {
      next(err);
    }
  };

  show = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      const dog = await Dog.findById(id)
        .populate('category')
        .exec();
      return res.status(200).json(dog);
    } catch (err) {
      next(err);
    }
  };

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const vm = {
        categories: await Category.find(),
      };
      return res.status(200).json(vm);
    } catch (err) {
      next(err);
    }
  };

  store = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dogCreate = new Dog({
        name: req.body.name,
        gender: req.body.gender,
        age: req.body.age,
        stay: req.body.stay,
        breed: req.body.breed,
        info: req.body.info,
        walk: req.body.walk,
        imageUrl: req.body.imageUrl,
      });
      const dog = await dogCreate.save();
      return res.status(201).json(dog);
    } catch (err) {
      next(err);
    }
  };

  edit = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    try {
      const dog = await Dog.findById(id).exec();

      if (!dog) {
        throw new NotFoundError();
      } else {
        const vm = {
          dog,
          categories: await Category.find(),
        };
        return res.status(200).json(vm);
      }
    } catch (err) {
      next(err);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    try {
      const dogUpdate = {
        name: req.body.name,
        info: req.body.info,
        breed: req.body.breed,
        age: req.body.age,
        gender: req.body.gender,
        walk: req.body.walk,
        stay: req.body.stay,
        imageUrl: req.body.imageUrl,
      };
      const dog = await Dog.findOneAndUpdate({ _id: id }, dogUpdate, {
        new: true,
      }).exec();

      if (!dog) {
        throw new NotFoundError();
      }
      return res.status(200).json(dog);
    } catch (err) {
      next(err);
    }
  };

  destroy = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    try {
      let dog = null;

      let { mode } = req.query;

      switch (mode) {
        case 'delete':
        default:
          dog = await Dog.findOneAndRemove({ _id: id });
          break;
        case 'softdelete':
          dog = await Dog.findByIdAndUpdate(
            { _id: id },
            { _deletedAt: Date.now() },
          );
          break;
        case 'softundelete':
          dog = await Dog.findByIdAndUpdate(
            { _id: id },
            { _deletedAt: null },
          );
          break;
      }

      if (!dog) {
        throw new NotFoundError();
      } else {
        return res.status(200).json({
          message: `Successful ${mode} the Dog with id: ${id}!`,
          dog,
          mode,
        });
      }
    } catch (err) {
      next(err);
    }
  };
}

export default DogController;
