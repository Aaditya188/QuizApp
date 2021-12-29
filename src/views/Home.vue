<template>
    <div class="home">
        <TheHeader />
        <Chat />
        <div class="container">
            <Question />
            <Gopher />
        </div>
    </div>
</template>

<script>
import TheHeader from "@/components/TheHeader.vue";
import Question from "@/components/Question.vue";
import Gopher from "@/components/base/Gopher.vue";
import Chat from "@/components/Chat.vue";
export default {
    name: "Home",

    components: {
        TheHeader,
        Question,
        Gopher,
        Chat
    }
};
</script>

<style lang="scss" scoped>
div.home {
    div.container {
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        .cart {
            margin: 30px 0 28px;
        }
    }
}
@media (max-width: 700px) {
    div.container .cart {
        margin: 20px 0 20px !important;
    }
}
</style>
