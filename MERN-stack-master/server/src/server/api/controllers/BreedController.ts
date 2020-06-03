import { NextFunction, Request, Response } from 'express';
import { IBreed, Breed, Category } from '../../models/mongoose';

import { NotFoundError } from '../../utilities';

class BreedController {
  index = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { limit, skip } = req.query;
      let breeds;

      if (limit && skip) {
        const options = {
          limit: parseInt(limit, 10) || 10,
          page: parseInt(skip, 10) || 1,
          sort: { _createdAt: -1 },
          populate: 'category',
        };
        breeds = await Breed.paginate({}, options);
      } else {
        breeds = await Breed.find()
          .populate('category')
          .sort({ _createdAt: -1 })
          .exec();
      }

      return res.status(200).json(breeds);
    } catch (err) {
      next(err);
    }
  };

  show = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      const breed = await Breed.findById(id)
        .populate('category')
        .exec();
      return res.status(200).json(breed);
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
      const breedCreate = new Breed({
        title: req.body.title,
        synopsis: req.body.synopsis,
        body: req.body.body,
        _categoryId: req.body._categoryId,
        imageUrl: req.body.imageUrl,
      });
      const breed = await breedCreate.save();
      return res.status(201).json(breed);
    } catch (err) {
      next(err);
    }
  };

  edit = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    try {
      const breed = await Breed.findById(id).exec();

      if (!breed) {
        throw new NotFoundError();
      } else {
        const vm = {
          breed,
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
      const breedUpdate = {
        title: req.body.title,
        synopsis: req.body.synopsis,
        body: req.body.body,
        _categoryId: req.body._categoryId,
        imageUrl: req.body.imageUrl,
      };
      const breed = await Breed.findOneAndUpdate({ _id: id }, breedUpdate, {
        new: true,
      }).exec();

      if (!breed) {
        throw new NotFoundError();
      }
      return res.status(200).json(breed);
    } catch (err) {
      next(err);
    }
  };

  destroy = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    try {
      let breed = null;

      let { mode } = req.query;

      switch (mode) {
        case 'delete':
        default:
          breed = await Breed.findOneAndRemove({ _id: id });
          break;
        case 'softdelete':
          breed = await Breed.findByIdAndUpdate(
            { _id: id },
            { _deletedAt: Date.now() },
          );
          break;
        case 'softundelete':
          breed = await Breed.findByIdAndUpdate(
            { _id: id },
            { _deletedAt: null },
          );
          break;
      }

      if (!breed) {
        throw new NotFoundError();
      } else {
        return res.status(200).json({
          message: `Successful ${mode} the Post with id: ${id}!`,
          breed,
          mode,
        });
      }
    } catch (err) {
      next(err);
    }
  };
}

export default BreedController;
