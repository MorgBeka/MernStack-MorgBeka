import { NextFunction, Request, Response } from 'express';
import { ICat, Cat, Category } from '../../models/mongoose';

import { NotFoundError } from '../../utilities';

class CatController {
  index = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { limit, skip } = req.query;
      let cats;

      if (limit && skip) {
        const options = {
          limit: parseInt(limit, 10) || 10,
          page: parseInt(skip, 10) || 1,
          sort: { _createdAt: -1 },
          populate: 'category',
        };
        cats = await Cat.paginate({}, options);
      } else {
        cats = await Cat.find()
          .populate('category')
          .sort({ _createdAt: -1 })
          .exec();
      }

      return res.status(200).json(cats);
    } catch (err) {
      next(err);
    }
  };

  show = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      const cat = await Cat.findById(id)
        .populate('category')
        .exec();
      return res.status(200).json(cat);
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
      const catCreate = new Cat({
        name: req.body.name,
        gender: req.body.gender,
        age: req.body.age,
        stay: req.body.stay,
        breed: req.body.breed,
        info: req.body.info,
        imageUrl: req.body.imageUrl,
      });
      const cat = await catCreate.save();
      return res.status(201).json(cat);
    } catch (err) {
      next(err);
    }
  };

  edit = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    try {
      const cat = await Cat.findById(id).exec();

      if (!cat) {
        throw new NotFoundError();
      } else {
        const vm = {
          cat,
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
      const catUpdate = {
        name: req.body.name,
        info: req.body.info,
        breed: req.body.breed,
        age: req.body.age,
        gender: req.body.gender,
        stay: req.body.stay,
        imageUrl: req.body.imageUrl,
      };
      const cat = await Cat.findOneAndUpdate({ _id: id }, catUpdate, {
        new: true,
      }).exec();

      if (!cat) {
        throw new NotFoundError();
      }
      return res.status(200).json(cat);
    } catch (err) {
      next(err);
    }
  };

  destroy = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    try {
      let cat = null;

      let { mode } = req.query;

      switch (mode) {
        case 'delete':
        default:
          cat = await Cat.findOneAndRemove({ _id: id });
          break;
        case 'softdelete':
          cat = await Cat.findByIdAndUpdate(
            { _id: id },
            { _deletedAt: Date.now() },
          );
          break;
        case 'softundelete':
          cat = await Cat.findByIdAndUpdate(
            { _id: id },
            { _deletedAt: null },
          );
          break;
      }

      if (!cat) {
        throw new NotFoundError();
      } else {
        return res.status(200).json({
          message: `Successful ${mode} the Cat with id: ${id}!`,
          cat,
          mode,
        });
      }
    } catch (err) {
      next(err);
    }
  };
}

export default CatController;
