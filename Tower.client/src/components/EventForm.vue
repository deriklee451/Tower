<template>
    <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Create Event</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
    <!-- Note add onsubmit to form header -->
    <form @submit.prevent="createEvent">
        <div class="modal-body">
            <div class="form-floating mb-3 elevation-5">
                <input v-model="editable.name" type="text" required class="form-control" id="name"
                    placeholder="Event Name">
                <label for="title">Event Name</label>
            </div>

            <div class="form-floating mb-3 elevation-5">
                <input v-model="editable.coverImg" type="url" required class="form-control" id="coverImg"
                    placeholder="Cover Image">
                <label for="coverImg">Cover Image</label>
            </div>

            <div class="form-floating mb-3 elevation-5">
                <input v-model="editable.description" type="text" required class="form-control" id="description"
                    placeholder="Description">
                <label for="title">Event Description</label>
            </div>

            <div class="form-floating mb-3 elevation-5">
                <input v-model="editable.location" type="text" required class="form-control" id="location"
                    placeholder="Location">
                <label for="title">Location</label>
            </div>

            <div class="form-floating mb-3 elevation-5">
                <input v-model="editable.capacity" type="number" required class="form-control" id="capacity"
                    placeholder="Venue Capacity">
                <label for="title">Event Capacity</label>
            </div>

            <div class="form-floating mb-3 elevation-5">
                <input v-model="editable.startDate" type="date" required class="form-control" id="startDate"
                    placeholder="Start Date">
                <label for="title">Start Date</label>
            </div>



            <div class="form-floating mb-3 elevation-5">
                <select v-model="editable.type" class="form-select" id="floatingSelect"
                    aria-label="Floating label select example">
                    <option selected value="concert">Concert</option>
                    <option value="convention">Convention</option>
                    <option value="sport">Sport</option>
                    <option value="digital">Digital</option>
                    <option value="expo">Expo</option>
                    <option value="exhibit">Exhibit</option>
                </select>
                <label for="floatingSelect">Category</label>
            </div>

        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="submit" class="btn btn-primary">Create Event</button>
        </div>
    </form>
</template>


<script>
import { AppState } from '../AppState';
import { Modal } from 'bootstrap';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { eventsService } from '../services/EventsService.js';
import Pop from '../utils/Pop.js';

export default {
    setup() {
        const editable = ref({})
        const router = useRouter()
        return {
            editable,

            async createEvent() {
                try {
                    const event = await eventsService.createEvent(editable.value)

                    editable.value = {}

                    Modal.getOrCreateInstance('#exampleModalLabel').hide()

                    // Modal.getOrCreateInstance('#exampleModal').hide()

                    router.push({ name: 'Event', params: { eventId: event.id } })
                } catch (error) {
                    Pop.error(error.message)
                }
            }
        }
    }
};
</script>


<style lang="scss" scoped>

</style>