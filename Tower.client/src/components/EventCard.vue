<template>
    <router-link :to="{ name: 'Event', params: { eventId: event.id } }">
        <div v-if="event.isCanceled" class="elevation-6 rounded bg-danger">
            <img :src="event.coverImg" alt="" class="img img-fluid card-img rounded-top">
            <div class="text-center fw-bold p-1">
                <div><i class="mdi mdi-cancel"></i></div>
                <div>Event Cancelled</div>
                <div>No Capacity</div>
            </div>
        </div>






        <div v-else class="elevation-6 rounded bg-success">
            <img :src="event.coverImg" alt="" class="img-fluid card-img rounded-top">
            <div class="text-center fw-bold p-1">
                <div>{{ event.name }}</div>
                <div>{{ event.location }}</div>
                <div>{{ event.capacity }} Spots Left</div>
            </div>
        </div>
    </router-link>
</template>


<script>

export default {
    props: {
        event: { type: Object, required: true }
    },
    setup() {
        return {}
    }
};
</script>


<style lang="scss" scoped>
.img {
    height: 200px;
    width: 100%;
    object-fit: cover;
    object-position: center;
}
</style>