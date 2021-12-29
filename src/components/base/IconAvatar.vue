<template>
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 448 512"
        width="35"
        height="35"
        class="user-pic"
    >
        <path style="fill:var(--svg-main)" :d="`${avi}`" />
    </svg>
</template>

<script>
export default {
    name: "IconAvatar",
    props: {
        svgShape: String
    },
    data() {
        return {
            userNinja:
                "M325.4 289.2L224 390.6 122.6 289.2C54 295.3 0 352.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-70.2-54-127.1-122.6-133.2zM32 192c27.3 0 51.8-11.5 69.2-29.7 15.1 53.9 64 93.7 122.8 93.7 70.7 0 128-57.3 128-128S294.7 0 224 0c-50.4 0-93.6 29.4-114.5 71.8C92.1 47.8 64 32 32 32c0 33.4 17.1 62.8 43.1 80-26 17.2-43.1 46.6-43.1 80zm144-96h96c17.7 0 32 14.3 32 32H144c0-17.7 14.3-32 32-32z",
            user:
                "M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"
        };
    },
    computed: {
        avi() {
            return this.svgShape === "user" ? this.user : this.userNinja;
        }
    }
};
</script>

<style></style>
