import { NextFunction, Request, Response } from 'express';
import { IWalk, Walk, Category } from '../../models/mongoose';

import { NotFoundError } from '../../utilities';

class WalkController {
  index = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { limit, skip } = req.query;
      let walks;

      if (limit && skip) {
        const options = {
          limit: parseInt(limit, 10) || 10,
          page: parseInt(skip, 10) || 1,
          sort: { _createdAt: -1 },
          populate: 'category',
        };
        walks = await Walk.paginate({}, options);
      } else {
        walks = await Walk.find()
          .populate('category')
          .sort({ _createdAt: -1 })
          .exec();
      }

      return res.status(200).json(walks);
    } catch (err) {
      next(err);
    }
  };

  show = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      const walk = await Walk.findById(id)
        .populate('category')
        .exec();
      return res.status(200).json(walk);
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
      const walkCreate = new Walk({
        name: req.body.name,
        durationTime: req.body.durationTime,
        body: req.body.body,
        distance: req.body.distance,
        info: req.body.info,
        startingPoint: req.body.startingPoint,
        imageUrl: req.body.imageUrl,
      });
      const walk = await walkCreate.save();
      return res.status(201).json(walk);
    } catch (err) {
      next(err);
    }
  };

  edit = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    try {
      const walk = await Walk.findById(id).exec();

      if (!walk) {
        throw new NotFoundError();
      } else {
        const vm = {
          walk,
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
      const walkUpdate = {
        name: req.body.name,
        durationTime: req.body.durationTime,
        body: req.body.body,
        distance: req.body.distance,
        info: req.body.info,
        startingPoint: req.body.startingPoint,
        imageUrl: req.body.imageUrl,
      };
      const walk = await Walk.findOneAndUpdate({ _id: id }, walkUpdate, {
        new: true,
      }).exec();

      if (!walk) {
        throw new NotFoundError();
      }
      return res.status(200).json(walk);
    } catch (err) {
      next(err);
    }
  };

  destroy = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    try {
      let walk = null;

      let { mode } = req.query;

      switch (mode) {
        case 'delete':
        default:
          walk = await Walk.findOneAndRemove({ _id: id });
          break;
        case 'softdelete':
          walk = await Walk.findByIdAndUpdate(
            { _id: id },
            { _deletedAt: Date.now() },
          );
          break;
        case 'softundelete':
          walk = await Walk.findByIdAndUpdate(
            { _id: id },
            { _deletedAt: null },
          );
          break;
      }

      if (!walk) {
        throw new NotFoundError();
      } else {
        return res.status(200).json({
          message: `Successful ${mode} the Walk with id: ${id}!`,
          walk,
          mode,
        });
      }
    } catch (err) {
      next(err);
    }
  };
}

export default WalkController;
