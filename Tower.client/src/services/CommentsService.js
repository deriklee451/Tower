import { AppState } from "../AppState.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"


class CommentsService {

    async getComments(eventId) {
        const res = await api.get(`api/events/${eventId}/comments`)
        logger.log('these are comments.. ', res.data)
        AppState.comments = res.data
    }

    async createComment(body) {
        const res = await api.post('api/comments', body)
        logger.log('created comment', res.data)
        AppState.comments.push(res.data)
    }

    async deleteComment(id) {
        const res = await api.delete('api/comments/' + id)

        AppState.comments = AppState.comments.filter(c => c.id !== id)

    }
}



export const commentsService = new CommentsService()