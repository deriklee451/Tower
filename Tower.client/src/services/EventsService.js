
import { AppState } from "../AppState.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"



class EventsService {
    async getAll() {
        const res = await api.get('api/events')
        logger.log('[Getting events]', res.data)
        AppState.events = res.data
    }

    async createEvent(body) {
        const res = await api.post('api/events', body)
        logger.log('[create event]', res.data)

        AppState.events.push(res.data)
        return res.data
    }

    async getEventById(eventId) {
        const res = await api.get('api/events/' + eventId)
        logger.log('get event by id', res.data)
        AppState.activeEvent = res.data

    }

    async cancelEvent(eventId) {
        const res = await api.delete('api/events/' + eventId)
        logger.log(res.data)
        AppState.activeEvent.isCanceled = true
    }

}

export const eventsService = new EventsService()