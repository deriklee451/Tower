import { Auth0Provider } from "@bcwdev/auth0provider";
import { commentsService } from "../services/CommentsService.js";
import { eventsService } from "../services/EventsService.js";
import { ticketsService } from "../services/TicketsService.js";
import BaseController from "../utils/BaseController.js";




export class EventsController extends BaseController {
    constructor() {
        super('api/events')
        this.router
            .get('', this.getAll)
            .get('/:id/comments', this.getComments)
            .get('/:id', this.getEventById)
            .get('/:id/tickets', this.getEventTickets)
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.create)
            .put('/:id', this.editEvent)
            .delete('/:id', this.deleteEvent)
    }

    async getComments(req, res, next) {
        try {

            const comments = await commentsService.getComments(req.params.id)
            return res.send(comments)
        } catch (error) {
            next(error)
        }
    }


    async getEventTickets(req, res, next) {
        try {
            const tickets = await ticketsService.getEventTickets(req.params.id)
            return res.send(tickets)
        } catch (error) {
            next(error)
        }
    }


    async deleteEvent(req, res, next) {
        try {
            const event = await eventsService.deleteEvent(req.params.id, req.userInfo.id)
            return res.send(event)
        } catch (error) {
            next(error)
        }
    }

    async editEvent(req, res, next) {
        try {
            const event = await eventsService.editEvent(req.params.id, req.body, req.userInfo.id)

            return res.send(event)
        } catch (error) {
            next(error)
        }
    }

    async getEventById(req, res, next) {
        try {
            const event = await eventsService.getEventById(req.params.id)
            return res.send(event)
        } catch (error) {
            next(error)
        }
    }

    async getAll(req, res, next) {
        try {
            const events = await eventsService.getAll()
            return res.send(events)
        } catch (error) {
            next(error)
        }
    }

    async create(req, res, next) {
        try {
            req.body.creatorId = req.userInfo.id
            const event = await eventsService.create(req.body)
            return res.send(event)

        } catch (error) {
            next(error)
        }
    }
}