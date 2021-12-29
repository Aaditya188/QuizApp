<template>
    <div class="question-box cart">
        <ProgressBar
            :loop="questions.length"
            :isActive="statistic.current_question_index"
            :score="statistic.score"
        />

        <QuestionBody
            :questions="questions"
            :index="statistic.current_question_index"
        />
    </div>
</template>

<script>
import ProgressBar from "@/components/base/ProgressBar.vue";
import QuestionBody from "@/components/QuestionBody.vue";
import { mapGetters } from "vuex";
export default {
    name: "TheQuestion",

    components: {
        ProgressBar,
        QuestionBody
    },

    computed: {
        ...mapGetters(["questions", "statistic"])
    }
};
</script>

<style lang="scss" scoped>
.question-box {
    font-size: 18px;
    font-weight: 500;
}
</style>
