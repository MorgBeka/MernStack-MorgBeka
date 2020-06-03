import { NextFunction, Request, Response } from 'express';
import { IAdoption, Adoption, Category } from '../../models/mongoose';

import { NotFoundError } from '../../utilities';

class AdoptionController {
  index = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { limit, skip } = req.query;
      let adoptions;

      if (limit && skip) {
        const options = {
          limit: parseInt(limit, 10) || 10,
          page: parseInt(skip, 10) || 1,
          sort: { _createdAt: -1 },
          populate: 'category',
        };
        adoptions = await Adoption.paginate({}, options);
      } else {
        adoptions = await Adoption.find()
          .populate('category')
          .sort({ _createdAt: -1 })
          .exec();
      }

      return res.status(200).json(adoptions);
    } catch (err) {
      next(err);
    }
  };

  show = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      const adoption = await Adoption.findById(id)
        .populate('category')
        .exec();
      return res.status(200).json(adoption);
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
      const adoptionCreate = new Adoption({
        title: req.body.title,
        synopsis: req.body.synopsis,
        body: req.body.body,
        _categoryId: req.body._categoryId,
        imageUrl: req.body.imageUrl,
      });
      const adoption = await adoptionCreate.save();
      return res.status(201).json(adoption);
    } catch (err) {
      next(err);
    }
  };

  edit = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    try {
      const adoption = await Adoption.findById(id).exec();

      if (!adoption) {
        throw new NotFoundError();
      } else {
        const vm = {
          adoption,
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
      const adoptionUpdate = {
        title: req.body.title,
        synopsis: req.body.synopsis,
        body: req.body.body,
        _categoryId: req.body._categoryId,
        imageUrl: req.body.imageUrl,
      };
      const adoption = await Adoption.findOneAndUpdate({ _id: id }, adoptionUpdate, {
        new: true,
      }).exec();

      if (!adoption) {
        throw new NotFoundError();
      }
      return res.status(200).json(adoption);
    } catch (err) {
      next(err);
    }
  };

  destroy = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    try {
      let adoption = null;

      let { mode } = req.query;

      switch (mode) {
        case 'delete':
        default:
          adoption = await Adoption.findOneAndRemove({ _id: id });
          break;
        case 'softdelete':
          adoption = await Adoption.findByIdAndUpdate(
            { _id: id },
            { _deletedAt: Date.now() },
          );
          break;
        case 'softundelete':
          adoption = await Adoption.findByIdAndUpdate(
            { _id: id },
            { _deletedAt: null },
          );
          break;
      }

      if (!adoption) {
        throw new NotFoundError();
      } else {
        return res.status(200).json({
          message: `Successful ${mode} the Adoption with id: ${id}!`,
          adoption,
          mode,
        });
      }
    } catch (err) {
      next(err);
    }
  };
}

export default AdoptionController;
