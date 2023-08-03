import {
  Request,
  Response,
} from 'express';

import { Product } from '@prisma/client';

import imageKit from '../config/imageKit';
import prisma from '../config/prisma';
import { errorResponse } from '../helpers/errorHandler';
import { randomString } from '../helpers/randomString';
import {
  isNumeric,
  validateNumericFields,
} from '../helpers/validation';

const index = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 10, search = "", sortBy = "id" } = req.query;

    const take = Number(limit);
    const skip = (Number(page) - 1) * Number(limit);
    const products = await prisma.product.findMany({
      skip,
      take,
      where: {
        OR: [
          {
            name: {
              contains: String(search) || "",
            },
          },
          {
            category: {
              name: {
                contains: String(search) || "",
              },
            },
          },
        ],
      },
      orderBy: {
        [String(sortBy)]: "asc", // Change 'asc' to 'desc' for descending order
      },
      include: {
        category: true,
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
    const data = await prisma.product.findUnique({
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
    let {
      name,
      description,
      price,
      sku,
      width,
      length,
      height,
      weight,
      categoryId,
    }: Product = req.body;

    price = Number(price);
    width = Number(width);
    length = Number(length);
    height = Number(height);
    weight = Number(weight);
    categoryId = Number(categoryId);

    if (validateNumericFields(price, width, length, height, weight, categoryId))
      res.status(422).json({
        msg: "Invalid type",
      });

    let image = ""; // for default value

    if (req.file) {
      const fileName = `product-${randomString(6)}`;
      const imgUpload = await imageKit.upload({
        file: req.file.buffer,
        fileName,
      });
      image = imgUpload.url;
    }

    const data = await prisma.product.create({
      data: {
        name,
        description,
        price,
        sku,
        width,
        length,
        height,
        weight,
        categoryId,
        image,
      },
    });

    res.status(201).json({
      msg: "Product added",
      data,
    });
  } catch (err) {
    errorResponse(err, res);
  }
};

const update = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    let {
      name,
      description,
      price,
      sku,
      width,
      length,
      height,
      weight,
      categoryId,
    }: Product = req.body;

    if (
      validateNumericFields(price, width, length, height, weight, categoryId)
    ) {
      return res.status(422).json({
        msg: "Invalid type",
      });
    }

    price = Number(price);
    width = Number(width);
    length = Number(length);
    height = Number(height);
    weight = Number(weight);
    categoryId = Number(categoryId);

    const originData = await prisma.product.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!originData)
      return res.status(201).json({
        msg: "Product not found",
        data: {},
      });

    let image = undefined; // for default value

    if (req.file) {
      const fileName = `product-`;
      const imgUpload = await imageKit.upload({
        file: req.file.buffer,
        fileName,
      });
      image = imgUpload.url;
    }

    const updatedData = {
      name: name ?? originData.name,
      description: description ?? originData.description,
      price: isNumeric(price) ? price : originData.price,
      weight: isNumeric(weight) ? weight : originData.weight,
      width: isNumeric(width) ? width : originData.weight,
      length: isNumeric(length) ? length : originData.length,
      height: isNumeric(height) ? height : originData.height,
      sku: sku ?? originData.sku,
      image: image ?? originData.image,
      categoryId: categoryId ?? originData.categoryId,
    };

    const data = await prisma.product.update({
      where: {
        id: Number(id),
      },
      data: updatedData,
    });

    res.status(201).json({
      msg: "Product updated",
      data,
    });
  } catch (err) {
    errorResponse(err, res);
  }
};

const destroy = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = await prisma.product.delete({
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
