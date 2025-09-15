import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly config: ConfigService,
    private readonly JWT: JwtService,
    private reflector: Reflector
  ) { }
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const is_public = this.reflector.get<boolean>('is_public', context.getClass());

    if (is_public) return true

    const request = context.switchToHttp().getRequest();
    const token = request.cookies['access-token'];


    if (!token) throw new UnauthorizedException('you be should login')
    let isValid = this.JWT.verify(token, {
      secret: this.config.get<string>('JWT_SECRET')
    })

    if (!isValid) throw new UnauthorizedException('you are Unauthorized')
    request['current_user'] = isValid


    return true
  }


}