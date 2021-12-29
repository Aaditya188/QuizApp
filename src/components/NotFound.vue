<template>
    <div>
        <h1>this is 404 page</h1>
        <p>
            seem like you got lost,
            <router-link :to="{ name: 'StepOne' }">take me home</router-link>
        </p>
    </div>
</template>

<script>
export default {
    name: "NotFound"
};
</script>

<style lang="scss" scoped></style>
