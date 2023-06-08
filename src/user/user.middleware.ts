import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as bcrypt from 'bcrypt'

@Injectable()
export class userMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const saltOrRounds = 10;
const password = req.body.password;
const hash = await bcrypt.hash(password, saltOrRounds);
    console.log(req.body);
    next();
  }
}
