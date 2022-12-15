<template>
    <div class="container-fluid">
        <div v-if="event" class="row cover-img" :style="`background-image: url(${event.coverImg})`">
            <div class="col-12 d-flex align-items-center justify-content-around">
                <img :src="event.coverImg" alt="" class="img-fluid profile-picture rounded-circle elevation-5">
                <div class="opacity-75 rounded card elevation-5 p-5">
                    <h1 class="elevation-1">
                        {{ event.name }}
                    </h1>
                    <h5>
                        {{ event.description }}
                    </h5>
                    <p>Where: {{ event.location }}</p>
                    <p>When: {{ new Date(event.startDate).toLocaleDateString() }}</p>
                    <p class="fw-bold"> Tickets Available : {{ event.capacity }}</p>
                    <div class="row">
                        <div class="div">

                            <button @click="reserveTicket" type="button" class="btn btn-info">Reserve Ticket</button>

                        </div>



                    </div>




                </div>

            </div>
        </div>
        <div class="row text-light">
            {{ tickets }}
        </div>
    </div>

</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { eventsService } from '../services/EventsService.js';
import { ticketService } from '../services/TicketService.js'
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
export default {

    setup() {
        const route = useRoute();

        async function getTickets() {
            try {
                await ticketService.getTickets(route.params.eventId)
            } catch (error) {
                logger.log('[GETTING TICKETS]', error)
            }
        }


        async function getEventById() {
            try {
                await eventsService.getEventById(route.params.eventId)
            } catch (error) {
                logger.error(error.message)
                Pop.error(error.message)
            }
        }

        onMounted(() => {
            getEventById();
            getTickets();
        })
        return {
            event: computed(() => AppState.activeEvent),
            tickets: computed(() => AppState.tickets),



            async reserveTicket() {
                try {
                    await ticketService.reserveTicket({ eventId: route.params.eventId })
                } catch (error) {
                    logger.log(error)
                    Pop.error(error.message)

                }
            }


        }
    }
};
</script>


<style lang="scss" scoped>
.cover-img {
    min-height: 50vh;
    background-size: cover;
    background-position: center;
}

.profile-picture {
    height: 30vh;
    width: 30vh;
}
</style>