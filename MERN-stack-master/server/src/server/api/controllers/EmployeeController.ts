import { NextFunction, Request, Response } from 'express';
import { IEmployee, Employee, Category } from '../../models/mongoose';

import { NotFoundError } from '../../utilities';

class EmployeeController {
  index = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { limit, skip } = req.query;
      let employees;

      if (limit && skip) {
        const options = {
          limit: parseInt(limit, 10) || 10,
          page: parseInt(skip, 10) || 1,
          sort: { _createdAt: -1 },
          populate: 'category',
        };
        employees = await Employee.paginate({}, options);
      } else {
        employees = await Employee.find()
          .populate('category')
          .sort({ _createdAt: -1 })
          .exec();
      }

      return res.status(200).json(employees);
    } catch (err) {
      next(err);
    }
  };

  show = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      const employee = await Employee.findById(id)
        .populate('category')
        .exec();
      return res.status(200).json(employee);
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
      const employeeCreate = new Employee({
        title: req.body.title,
        synopsis: req.body.synopsis,
        body: req.body.body,
        _categoryId: req.body._categoryId,
        imageUrl: req.body.imageUrl,
      });
      const employee = await employeeCreate.save();
      return res.status(201).json(employee);
    } catch (err) {
      next(err);
    }
  };

  edit = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    try {
      const employee = await Employee.findById(id).exec();

      if (!employee) {
        throw new NotFoundError();
      } else {
        const vm = {
          employee,
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
      const employeeUpdate = {
        title: req.body.title,
        synopsis: req.body.synopsis,
        body: req.body.body,
        _categoryId: req.body._categoryId,
        imageUrl: req.body.imageUrl,
      };
      const employee = await Employee.findOneAndUpdate({ _id: id }, employeeUpdate, {
        new: true,
      }).exec();

      if (!employee) {
        throw new NotFoundError();
      }
      return res.status(200).json(employee);
    } catch (err) {
      next(err);
    }
  };

  destroy = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    try {
      let employee = null;

      let { mode } = req.query;

      switch (mode) {
        case 'delete':
        default:
          employee = await Employee.findOneAndRemove({ _id: id });
          break;
        case 'softdelete':
          employee = await Employee.findByIdAndUpdate(
            { _id: id },
            { _deletedAt: Date.now() },
          );
          break;
        case 'softundelete':
          employee = await Employee.findByIdAndUpdate(
            { _id: id },
            { _deletedAt: null },
          );
          break;
      }

      if (!employee) {
        throw new NotFoundError();
      } else {
        return res.status(200).json({
          message: `Successful ${mode} the Employee with id: ${id}!`,
          employee,
          mode,
        });
      }
    } catch (err) {
      next(err);
    }
  };
}

export default EmployeeController;
