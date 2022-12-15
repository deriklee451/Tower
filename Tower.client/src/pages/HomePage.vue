<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-12 bg-dark border border-secondary elevation-5 p-2 mt-3 rounded d-flex justify-content-between">
        <button @click="filteredBy = ''" class="btn btn-secondary fw-bold">All</button>
        <button @click="filteredBy = 'expos'" class="btn btn-secondary fw-bold">Expos</button>
        <button @click="filteredBy = 'convention'" class="btn btn-secondary fw-bold">Conventions</button>
        <button @click="filteredBy = 'exhibit'" class="btn btn-secondary fw-bold">Exhibits</button>
        <button @click="filteredBy = 'sport'" class="btn btn-secondary fw-bold">Sports</button>
        <button @click="filteredBy = 'digital'" class="btn btn-secondary fw-bold">Digital</button>
        <button @click="filteredBy = 'concert'" class="btn btn-secondary fw-bold">Concerts</button>
      </div>
    </div>
    <div class="row">
      <div v-for="e in events" class="col-12 col-md-4 mb-3 p-3">
        <EventCard :event="e" />
      </div>
    </div>
  </div>
</template>

<script>

import { onMounted, computed, ref } from 'vue';
import { AppState } from '../AppState.js';
import EventCard from '../components/EventCard.vue';
import { eventsService } from '../services/EventsService.js'

export default {
  setup() {
    const filteredBy = ref("")
    async function getEvents() {
      try {
        await eventsService.getAll();
      } catch (error) {

      }
    }
    onMounted(() => {
      getEvents();
    });
    return {
      filteredBy,
      events: computed(() => {
        if (filteredBy.value == "") {
          return AppState.events;
        }
        else {
          return AppState.events.filter(e => e.type ==
            filteredBy.value);
        }
      })
    };
  },
  components: { EventCard }
}
</script>

<style scoped lang="scss">
.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;

  .home-card {
    width: 50vw;

    >img {
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}
</style>
