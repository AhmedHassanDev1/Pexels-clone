import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { TokenPayloadDTO } from 'src/Auth/Auth.dto';
import { Likes } from 'src/schemas/interactions/likes.schema';

@Injectable()
export class IsLikeInterceptor implements NestInterceptor {
  constructor(
    @InjectModel(Likes.name) private LikesModel: Model<Likes>
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const user: TokenPayloadDTO = req['current_user'];

    return next.handle().pipe(
      map(async (data) => {
        
        if (Array.isArray(data)) {
          const results = await Promise.all(
            data.map(async (el) => {
              const is_like = await this.LikesModel.exists({
                user: user._id,
                media: el._id,
              });
              return { ...el, is_like: !!is_like };
            }),
          );
          return results;
        }

       
        const is_like = await this.LikesModel.exists({
          user: user._id,
          media: data._id,
        });
        return { ...data, is_like: !!is_like };
      }),
    );
  }
}
