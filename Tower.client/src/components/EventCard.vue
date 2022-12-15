<template>
    <router-link :to="{ name: 'Event', params: { eventId: event.id } }">
        <div class="elevation-6 rounded bg-success">
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

</style>