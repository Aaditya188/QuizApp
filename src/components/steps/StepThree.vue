<template>
    <div class="step-three">
        <p class="lead">You're finally all set to go!!</p>

        <form @submit.prevent>
            <input @click="onSubmit()" type="submit" value="START THE FUN" />
        </form>
    </div>
</template>

<script>
export default {
    name: "StepThree",

    methods: {
        onSubmit() {
            const payload = {
                api_config: this.$route.params.api_config,
                name: this.$route.params.name || "Ninja"
            };
            this.$store
                .dispatch("initializing", payload)
                .then(() => {
                    this.$router.push({ name: "Home" });
                })
                .catch(rej => console.log(rej));
        }
    }
};
</script>

<style lang="scss" scoped></style>
