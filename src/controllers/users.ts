import { User } from './../models/users';
import { RequestHandler } from "express";
import { Comment } from '../models/comments';

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Post } from '../models/posts';
import { Reply } from '../models/replies';
import { Nest } from '../models/nesties';

export const createUser: RequestHandler =async (req, res) => {
  try {
    const { userName, email, password } = req.body;
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "User already exists with this email" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      userName,
      email,
      password: hashedPassword,
    });

    res
      .status(200)
      .json({ message: "User registered successfully", user: newUser });
    } catch (error: any) {
      console.error("Error creating user:", error.message);
      res.status(500).json(error.message);
    }
    
};

export const loginUser: RequestHandler = async (req, res) => {
  try {
    let { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    console.log(user);

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    } else {
      const matchPassword = await bcrypt.compare(password, user.password);
      if (matchPassword) {
        const token = jwt.sign({ userId: req.body.userId }, "HMAC-SHA1");
        let { email } = user;
        res.status(200).json({ email, token, user });
        return;
      } else {
        res.status(401).json({ message: "Invalid password" });
      }
    }
  } catch (error) {
    console.error("Error during password comparison:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


export const getUser: RequestHandler = async (req, res) => {
  try {
    const users = await User.findAll({
      include:[
        {
          model:Post,
          as:'posts',
          attributes:["title","content" ],
          include:[
            {
              model:Comment,
              as:'comments',
         /*      include:[
                {
                  model:Reply,
                  as:'replies',
                  include:[{
                    model:Nest,
                    as:'nestedReply',
                    attributes:["content", "replyId"]
                   }]
                }
              ] */

            }
          ]
        }
      ]
    });
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    throw error;
  }
};



