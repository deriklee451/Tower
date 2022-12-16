<template>
  <div class="about text-light text-center">
    <h1>Welcome {{ account.name }}</h1>
    <img class="rounded" :src="account.picture" alt="" />
    <p>{{ account.email }}</p>
  </div>
  <div>
    <h1 class="text-center text-light">My Tickets</h1>
  </div>
  <section>
    <div v-for="t in tickets" class="row justify-content-center mb-2 bg-transparent elevation-5">

      <div class="col-8 card bg-light text-center">

        <!-- {{ tickets }} -->
        <p>Event: {{ t.event.name }}</p>

        <p>Location: {{ t.event.location }}</p>

        <p>Date: {{ new Date(t.event.startDate).toLocaleDateString() }}</p>
        <p>Ticket # {{ t.id }}</p>
      </div>
      <div class="row justify-content-center">
        <div class="col-2 mb-5">
          <button @click="deleteTicket(t.id)" class="btn btn-danger delete-btn rounded-pill">Cancel Ticket<i
              class="  px-2 mdi mdi-delete-forever"></i></button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { computed, onMounted } from 'vue'
import { AppState } from '../AppState'
import { ticketService } from '../services/TicketService.js'
import Pop from '../utils/Pop.js'
export default {
  setup() {

    async function getAll() {
      try {
        await ticketService.getAll()
      } catch (error) {

      }
    }
    onMounted(() => {
      getAll();
    });
    return {
      account: computed(() => AppState.account),
      tickets: computed(() => AppState.myTickets),

      async deleteTicket(id) {
        try {
          if (await Pop.confirm()) {
            await ticketService.deleteTicket(id);
          }

        } catch (error) {

        }
      }
    }
  }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
