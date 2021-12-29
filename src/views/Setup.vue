<template>
    <div class="setup-view container">
        <div v-if="!loading" class="cart">
            <!-- Steps Progress -->
            <ProgressBar :loop="parseInt(3)" :isActive="step" />

            <router-view />
        </div>

        <p v-else class="loading">Loading</p>
    </div>
</template>

<script>
import ProgressBar from "@/components/base/ProgressBar.vue";
export default {
    name: "Setup",

    components: {
        ProgressBar
    },

    data() {
        return {
            step: 0
        };
    },

    created() {
        const categories = this.$store.state.categories;
        if (!categories.length) {
            this.$store.dispatch("fetch_categories");
        }
    },

    updated() {
        if (this.$router.history.current.name === "StepTwo") {
            this.step = 1;
        } else if (this.$router.history.current.name === "StepThree") {
            this.step = 2;
        }
    },

    computed: {
        loading() {
            return this.$store.state.loading;
        }
    }
};
</script>

<style lang="scss" scoped>
.setup-view {
    margin-top: 6%;
}
.loading {
    background-color: lightcoral;
    text-align: center;
    padding: 20px;
    font-weight: bold;
    margin: auto;
    max-width: 400px;
    color: #f9f9f9;
}

@media (max-width: 700px) {
    form {
        font-size: 14px;
        label {
            flex-direction: column;
            span {
                text-align: left;
                margin: 0 0 5px;
                width: 100%;
            }
        }
    }
    .full-btn {
        width: 100%;
    }
}
</style>
