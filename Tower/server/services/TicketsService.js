import { hasUserDefinedProperty } from "mongoose/lib/utils.js"
import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"
import { eventsService } from "./EventsService.js"



class TicketsService {

    async deleteTicket(id, userId) {
        const ticket = await dbContext.Tickets.findById(id).populate('event profile')
        if (!ticket) throw new BadRequest('no Ticket to delete')

        if (ticket.accountId != userId) throw new Forbidden('Not your comment')



        const event = await eventsService.getEventById(ticket.eventId)
        // @ts-ignore
        if (event.isCanceled) throw new Forbidden('event cancelled')

        await ticket.delete()

        // @ts-ignore
        event.capacity += 1;
        // @ts-ignore
        await event.save()

        return 'ticket deleted.'

    }

    async create(body) {

        const event = await eventsService.getEventById(body.eventId)
        if (event) {
            if (event.isCanceled) throw new Forbidden('Event Cancelled, Tickets not available')
            // @ts-ignore
            if (event.capacity <= 0) throw new BadRequest('No tickets available. ')

            const ticket = await dbContext.Tickets.create(body)
            await ticket.populate('event profile')
            // @ts-ignore
            event.capacity -= 1
            await event.save()


            return ticket
        }
    }

    async getMyTickets(accountId) {
        const tickets = await dbContext.Tickets.find({ accountId }).populate('event')
        return tickets
    }

    async getEventTickets(eventId) {
        const tickets = await dbContext.Tickets.find({ eventId }).populate('event profile')
        return tickets

    }

}

export const ticketsService = new TicketsService()