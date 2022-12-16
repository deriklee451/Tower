import { AppState } from "../AppState.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"



class TicketService {

    async getAll() {
        const res = await api.get('account/tickets')
        logger.log(res.data)
        AppState.myTickets = res.data
    }

    async getTickets(eventId) {
        const res = await api.get(`api/events/${eventId}/tickets`)
        logger.log('these are tickets.. ', res.data)
        AppState.tickets = res.data
    }

    async reserveTicket(body) {
        const res = await api.post('api/tickets', body)
        logger.log(res.data)

        AppState.tickets.push(res.data)

        AppState.myTickets.push(res.data)

        AppState.activeEvent.capacity--


    }

    async deleteTicket(id) {
        const res = await api.delete('api/tickets/' + id)
        logger.log('[Deleting Tickets]', res.data)

        AppState.tickets = AppState.tickets.filter(t => t.id !== ticketId)

        AppState.myTickets = AppState.myTickets.filter(t => t.id !== ticketId)
    }



}

export const ticketService = new TicketService()