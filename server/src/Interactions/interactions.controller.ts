import { Controller, Delete, Param, Post } from "@nestjs/common";
import { CurrentUser } from "src/decorators/currentUser.decorator";
import { InteractionsServices } from "./interactions.services";


@Controller('/interactions')
export class InteractionsController {
      constructor(
            private readonly interactionsServices: InteractionsServices
      ) { }

      @Post('add-like/:id')
      async addLike(@CurrentUser('_id') user_id: string, @Param('id') id) {
            let message = await this.interactionsServices.addLike(user_id, id)
            return message
      }


      @Delete('remove-like/:id')
      async removeLike(@CurrentUser('_id') user_id: string, @Param('id') id) {
            let message = await this.interactionsServices.RemoveLike(user_id, id)
            return message
      }

      @Post('view/:id')
      async view(@CurrentUser('_id') user_id: string, @Param('id') id) {
            this.interactionsServices.View(user_id, id)

      }

      @Post('add-highlight/:id')
      async addHighlight(@CurrentUser('_id') user_id: string, @Param('id') id) {
            let message = await this.interactionsServices.addHighlight(user_id, id)
            return message
      }


      @Delete('remove-highlight/:id')
      async removeHighlight(@CurrentUser('_id') user_id: string, @Param('id') id) {
            let message = await this.interactionsServices.removeHighlight(user_id, id)
            return message
      }


}