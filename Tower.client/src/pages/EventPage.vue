<template>
    <div class="container-fluid" v-if="event">
        <div v-if="event.isCanceled">

            <div class="row cover-img" :style="`background-image: url(${event.coverImg})`">
                <div class="col-12 d-flex align-items-center justify-content-around">
                    <img :src="event.coverImg" alt="" class="img-fluid profile-picture rounded-circle elevation-5">
                    <div class="opacity-75 rounded card elevation-5 p-5">
                        <h1 class="elevation-1 text-danger">
                            <del>{{ event.name }}</del>
                            Cancelled
                        </h1>
                        <h5>
                            <del>{{ event.description }}</del>
                        </h5>
                        <p>Where: <del>{{ event.location }}</del></p>
                        <p>When: <del>{{ new Date(event.startDate).toLocaleDateString() }}</del></p>
                        <p class="fw-bold"> Tickets Available : <span class="text-danger">0</span></p>
                        <div class="row">
                            <div class="div">




                            </div>



                        </div>




                    </div>

                </div>
            </div>


        </div>



        <div v-else>

            <div class="row cover-img" :style="`background-image: url(${event.coverImg})`">
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

                                <button v-if="account.id && !foundMe" @click="reserveTicket" type="button"
                                    class="btn btn-info">Reserve Ticket</button>

                                <button v-if="account?.id == event?.creatorId" @click="cancelEvent(event.id)"
                                    type="button" class="btn btn-danger">Cancel
                                    Event</button>

                            </div>



                        </div>




                    </div>

                </div>
            </div>
            <div class="row justify-content-center">

                <h1 class="text-center text-light">attendees</h1>
                <div v-for="t in tickets" class="col-1">

                    <a :href="t.profile.picture" target=_blank>
                        <img :src="t.profile.picture" alt="" class="img-fluid rounded">
                    </a>
                </div>

                <form class="mb-3" @submit.prevent="createComment()">
                    <div class="mb-3">
                        <label for="exampleFormControlTextarea1" class="form-label text-light">Comment</label>
                        <textarea v-model="editable.body" class="form-control" id="exampleFormControlTextarea1"
                            rows="3"></textarea>
                    </div>

                    <button class="btn btn-primary" type="submit">Post</button>
                </form>
            </div>
            <div class="row border mb-2 bg-light elevation-5" v-for="c in comments">
                <div class="col-8 bg-">
                    <img :src="c.creator.picture"
                        class="img-fluid selectable m-1 creator-img rounded-circle elevation-5">
                    <h3 class="">{{ c.creator.name }}</h3>

                    <p>{{ c.body }}</p>

                    <p>{{ new Date(c.createdAt).toLocaleDateString() }}</p>
                    <div class="row">
                        <div class="col-2">
                            <button v-if="(c.creatorId == account.id)" @click="deleteComment(c.id)"
                                class="btn btn-danger delete-btn rounded-pill"><i
                                    class="  px-2 mdi mdi-delete-forever"></i></button>
                        </div>

                    </div>



                </div>
            </div>
        </div>
    </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { eventsService } from '../services/EventsService.js';
import { ticketService } from '../services/TicketService.js'
import { commentsService } from '../services/CommentsService.js'
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
export default {

    setup() {
        const editable = ref({})

        const route = useRoute();

        async function getComments() {
            try {
                await commentsService.getComments(route.params.eventId)
            } catch (error) {
                logger.log('[Getting Comments]')
            }
        }

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
            getComments();
            getEventById();
            getTickets();
        })
        return {
            editable,
            event: computed(() => AppState.activeEvent),
            tickets: computed(() => AppState.tickets),
            comments: computed(() => AppState.comments),
            account: computed(() => AppState.account),

            foundMe: computed(() => AppState.tickets.find(t => t.accountId == AppState.account.id)),

            async reserveTicket() {
                try {
                    await ticketService.reserveTicket({ eventId: route.params.eventId })
                } catch (error) {
                    logger.log(error)
                    Pop.error(error.message)

                }
            },

            async createComment() {
                try {
                    editable.value.eventId = route.params.eventId
                    await commentsService.createComment(editable.value)
                    editable.value = {}
                } catch (error) {

                }
            },

            async deleteComment(id) {
                try {
                    if (await Pop.confirm())
                        await commentsService.deleteComment(id)
                } catch (error) {

                }
            },

            async cancelEvent(eventId) {
                try {
                    if (await Pop.confirm())
                        await eventsService.cancelEvent(eventId)

                } catch (error) {

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

.creator-img {
    height: 10vh;
    width: 10vh;
}
</style>