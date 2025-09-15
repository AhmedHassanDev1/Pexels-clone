import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UserServices } from "src/Users/user.services";
import { CreateUserDTO, LoginDTO, TokenPayloadDTO } from "./Auth.dto";
import { hash, compare, genSalt } from "bcrypt";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
@Injectable()
export class AuthServices {
  constructor(
    private userServices: UserServices,
    private config: ConfigService,
    private JwtService: JwtService
  ) {

  }

  async checkPassword(password: string, hash: string): Promise<Boolean> {
    let isValid = await compare(password, hash)
    

    return isValid
  }

  async hashPassword(password: string): Promise<string> {
    let salt = await genSalt()
    let hashing = await hash(password, salt)
    return hashing
  }
  create_token(payload: TokenPayloadDTO): string {
    let token = this.JwtService.sign(payload)
    return token
  }

  async register(user: CreateUserDTO) {
    let { password } = user
    console.log(password);
    
    let hashing = await this.hashPassword(password)
    user = { ...user, password: hashing }
    let newUser = await this.userServices.createUser(user)
    let { _id, first_name, last_name, email } = newUser
    let tokenPayload = { _id, first_name, last_name, email }
    let token: string = this.create_token(tokenPayload)
    return token
  }

  async Login({ email, password }: LoginDTO) {
    let user = await this.userServices.getUserByEmail(email)


    let hashing = user.password
    let passwordIsValid = await this.checkPassword(password, hashing)
    if (!passwordIsValid) throw new UnauthorizedException('password is invalid')
    let Payload = {
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      _id: user._id
    }
    let token = this.create_token(Payload)

    return token

  }

}
