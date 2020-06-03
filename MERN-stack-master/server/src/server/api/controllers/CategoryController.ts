import { NextFunction, Request, Response } from 'express';
import { IPost, Post, Category } from '../../models/mongoose';

import { NotFoundError } from '../../utilities';

class CategoryController {
  index = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let categories = await Category.find()
          .sort({ _createdAt: -1 })
          .exec();

      return res.status(200).json(categories);
    } catch (err) {
      next(err);
    }
  };
}

export default CategoryController;
