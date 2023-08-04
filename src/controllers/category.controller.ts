import {
  Request,
  Response,
} from 'express';

import prisma from '../config/prisma';
import { errorResponse } from '../helpers/errorHandler';

const index = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 10, search = "", sortBy = "id" } = req.query;

    const take = Number(limit);
    const skip = (Number(page) - 1) * Number(limit);
    const products = await prisma.category.findMany({
      skip,
      take,
      where: {
        OR: [
          {
            name: {
              contains: String(search) || "",
            },
          },
        ],
      },
      orderBy: {
        [String(sortBy)]: "asc", // Change 'asc' to 'desc' for descending order
      },
    });
    res.status(200).json({
      msg: "Fetched",
      data: products,
    });
  } catch (err) {
    errorResponse(err, res);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = await prisma.category.findUnique({
      where: {
        id: Number(id),
      },
    });

    res.status(200).json({
      msg: "Fetched",
      data,
    });
  } catch (err) {
    errorResponse(err, res);
  }
};

const store = async (req: Request, res: Response) => {
  try {
    let { name }: Product = req.body;

    const data = await prisma.category.create({
      data: {
        name,
      },
    });

    res.status(201).json({
      msg: "Category added",
      data,
    });
  } catch (err) {
    errorResponse(err, res);
  }
};

const update = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    let { name }: Product = req.body;

    const originData = await prisma.category.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!originData)
      return res.status(201).json({
        msg: "Category not found",
        data: {},
      });

    const updatedData = {
      name: name ?? originData.name,
    };

    const data = await prisma.product.update({
      where: {
        id: Number(id),
      },
      data: updatedData,
    });

    res.status(201).json({
      msg: "Category updated",
      data,
    });
  } catch (err) {
    errorResponse(err, res);
  }
};

const destroy = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = await prisma.category.delete({
      where: {
        id: Number(id),
      },
    });

    res.status(200).json({
      msg: "Data was destroyed",
      data,
    });
  } catch (err) {
    errorResponse(err, res);
  }
};

export default {
  index,
  show,
  store,
  update,
  destroy,
};
