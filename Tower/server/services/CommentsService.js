import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"
import { eventsService } from "./EventsService.js"


class CommentsService {

    async deleteComment(id, userId) {
        const comment = await dbContext.Comments.findById(id)
        if (!comment) throw new BadRequest('no Comment to delete')

        if (comment.creatorId != userId) throw new Forbidden('Not your comment')



        const event = await eventsService.getEventById(comment.eventId)
        // @ts-ignore
        if (event.isCanceled) throw new Forbidden('event cancelled')

        await comment.remove()



        return 'ticket deleted.'

    }


    async getComments(eventId) {
        const comments = await dbContext.Comments.find({ eventId }).populate('creator')
        return comments
    }

    async create(body) {
        const event = await eventsService.getEventById(body.eventId)


        const comment = await dbContext.Comments.create(body)
        await comment.populate('creator')
        return comment

    }

}


export const commentsService = new CommentsService()