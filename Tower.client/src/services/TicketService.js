import { AppState } from "../AppState.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"



class TicketService {

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
}

export const ticketService = new TicketService()