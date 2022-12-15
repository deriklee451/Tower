<template>
  <header>
    <Navbar />
  </header>
  <main class="background-img">
    <router-view />
  </main>
  <footer class="bg-dark text-light">
    Made with 🤷🏻‍♂️ by Me!!
  </footer>
  <ModalComponent id="exampleModalLabel">
    <EventForm />
  </ModalComponent>
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
import EventForm from './components/EventForm.vue'
import ModalComponent from './components/ModalComponent.vue'
import Navbar from './components/Navbar.vue'

export default {
  setup() {
    return {
      appState: computed(() => AppState)
    }
  },
  components: { Navbar, ModalComponent, EventForm }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

.background-img {
  background-image: url("https://images.unsplash.com/photo-1614850523011-8f49ffc73908?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80");
  background-size: cover;
}



:root {
  --main-height: calc(100vh - 32px - 64px);
}


footer {
  display: grid;
  place-content: center;
  height: 32px;
}
</style>
