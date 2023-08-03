import bcrypt from 'bcrypt';
import {
  Request,
  Response,
} from 'express';
import jwt from 'jsonwebtoken';

import env from '../config/env';
import prisma from '../config/prisma';

const register = async (req: Request, res: Response) => {
  try {
    const { email, password }: { email: string; password: string } = req.body;
    const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

    if (!email.match(regexEmail))
      return res.status(422).json({ msg: "Invalid email input" });

    if (password == undefined || password.length < 7)
      return res
        .status(422)
        .json({ msg: "Password must be atleast have 7 characters" });

    const encryptedPass = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        email,
        password: encryptedPass,
        role: "CUSTOMER",
      },
    });

    res.status(201).json({
      status: 201,
      msg: "USER_CREATED",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: 500,
      msg: "Internal Server Error",
    });
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const { email, password }: { email: string; password: string } = req.body;
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user)
      return res.status(404).json({
        msg: "Invalid email & password combination",
      });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(404).json({
        msg: "Invalid email & password combination",
      });

    const payload = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    const expiredInHour: number = 1;
    const expirationDate = new Date();
    expirationDate.setHours(expirationDate.getHours() + expiredInHour);

    const secret: string = env.JWT_SECRET_KEY ?? "default";
    const token = jwt.sign(payload, secret, {
      expiresIn: `${expiredInHour}h`,
    });

    await prisma.token.create({
      data: {
        token,
        expired_time: expirationDate,
      },
    });

    res.status(201).json({
      status: 201,
      msg: "Token Created",
      data: {
        token,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: 500,
      msg: "Internal Server Error",
    });
  }
};

export default {
  register,
  login,
};
