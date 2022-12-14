import idGetter from "mongoose/lib/helpers/schema/idGetter.js"
import { dbContext } from "../db/DbContext.js"
import { BadRequest } from "../utils/Errors.js"


class EventsService {


    async deleteEvent(id) {
        const event = await dbContext.Events.findById(id)
        if (!event) throw new BadRequest('No event')
        await event.remove()
        return 'deleted'
    }

    async editEvent(id, eventData) {
        const event = await dbContext.Events.findById(id)
        if (!event) throw new BadRequest('no event at id')

        event.name = eventData.name ? eventData.name : event.name
        event.description = eventData.description ? eventData.description : event.description
        event.coverImg = eventData.coverImg ? eventData.coverImg : event.coverImg
        event.location = eventData.location ? eventData.location : event.location
        event.capacity = eventData.capacity !== undefined ? eventData.capacity : event.capacity
        event.startDate = eventData.startDate ? eventData.startDate : event.startDate
        event.type = eventData.type ? eventData.type : event.type

        await event.save()
        return event
    }

    async getEventById(id) {
        const event = await dbContext.Events.findById(id).populate('creator')
        return event
    }

    async getAll() {
        const events = await dbContext.Events.find().populate('creator')
        return events
    }
    async create(body) {

        const event = await dbContext.Events.create(body)
        await event.populate('creator', 'name ')
        return event
    }

}

export const eventsService = new EventsService()