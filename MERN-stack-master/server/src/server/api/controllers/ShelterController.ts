import { NextFunction, Request, Response } from 'express';
import { IShelter, Shelter, Category } from '../../models/mongoose';

import { NotFoundError } from '../../utilities';

class ShelterController {
  index = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { limit, skip } = req.query;
      let shelters;

      if (limit && skip) {
        const options = {
          limit: parseInt(limit, 10) || 10,
          page: parseInt(skip, 10) || 1,
          sort: { _createdAt: -1 },
          populate: 'category',
        };
        shelters = await Shelter.paginate({}, options);
      } else {
        shelters = await Shelter.find()
          .populate('category')
          .sort({ _createdAt: -1 })
          .exec();
      }

      return res.status(200).json(shelters);
    } catch (err) {
      next(err);
    }
  };

  show = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      const shelter = await Shelter.findById(id)
        .populate('category')
        .exec();
      return res.status(200).json(shelter);
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
    console.log(req.body)
    try {
      const shelterCreate = new Shelter({
        name: req.body.name,
        place: req.body.place,
        info: req.body.info,
        openinghours: req.body.openinghours,
        email: req.body.email,
        phone: req.body.phone,
        imageUrl: req.body.imageUrl,
      });
      const shelter = await shelterCreate.save();
      return res.status(201).json(shelter);
    } catch (err) {
      next(err);
    }
  };

  edit = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    try {
      const shelter = await Shelter.findById(id).exec();

      if (!shelter) {
        throw new NotFoundError();
      } else {
        const vm = {
          shelter,
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
      const shelterUpdate = {
        name: req.body.name,
        place: req.body.place,
        info: req.body.info,
        openinghours: req.body.openinghours,
        email: req.body.email,
        phone: req.body.phone,
        imageUrl: req.body.imageUrl,
      };
      const shelter = await Shelter.findOneAndUpdate({ _id: id }, shelterUpdate, {
        new: true,
      }).exec();

      if (!shelter) {
        throw new NotFoundError();
      }
      return res.status(200).json(shelter);
    } catch (err) {
      next(err);
    }
  };

  destroy = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    try {
      let shelter = null;

      let { mode } = req.query;

      switch (mode) {
        case 'delete':
        default:
          shelter = await Shelter.findOneAndRemove({ _id: id });
          break;
        case 'softdelete':
          shelter = await Shelter.findByIdAndUpdate(
            { _id: id },
            { _deletedAt: Date.now() },
          );
          break;
        case 'softundelete':
          shelter = await Shelter.findByIdAndUpdate(
            { _id: id },
            { _deletedAt: null },
          );
          break;
      }

      if (!shelter) {
        throw new NotFoundError();
      } else {
        return res.status(200).json({
          message: `Successful ${mode} the Shelter with id: ${id}!`,
          shelter,
          mode,
        });
      }
    } catch (err) {
      next(err);
    }
  };
}

export default ShelterController;
