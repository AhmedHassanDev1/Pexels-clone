import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Follow } from 'src/schemas/interactions/follow.schema';
import { UserServices } from '../user.services';
import { TokenPayloadDTO } from 'src/Auth/Auth.dto';

@Injectable()
export class IsFollowInterceptor implements NestInterceptor {
  constructor(
    private userServices: UserServices
  ) { }
  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    let req = context.switchToHttp().getRequest()
    let user: TokenPayloadDTO = req['current_user']


    return next.handle().pipe(
      map(async (data) => {

        if (Array.isArray(data)) {
          const results = await Promise.all(
            data.map(async (el) => {
              let is_follow = await this.userServices.isFollow(user._id, el._id)

              return { ...el, is_follow: !!is_follow };
            }),
          );
          return results;
        }


        let is_follow = await this.userServices.isFollow(user._id, data._id)

        return { ...data, is_follow: !!is_follow };
      }),
    );
  }
}