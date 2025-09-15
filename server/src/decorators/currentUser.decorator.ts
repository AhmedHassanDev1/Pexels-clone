import { createParamDecorator, ExecutionContext} from "@nestjs/common";
import { TokenPayloadDTO } from "src/Auth/Auth.dto";


export let CurrentUser=createParamDecorator((field:string|null,context:ExecutionContext)=>{
         let req=context.switchToHttp().getRequest()
         let user:TokenPayloadDTO=req['current_user']

         if(field) return user[field]
         
         return user 
})