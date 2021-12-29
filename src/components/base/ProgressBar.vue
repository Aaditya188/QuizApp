<template>
    <ul class="progress">
        <div
            v-for="(counter, index) in loop"
            :key="index"
            :class="wrapperClass(index)"
        >
            <li :class="itemClass(index)">
                <template v-if="score">
                    <IconQuestion v-if="iconName(index) === 'question'" />
                    <IconTimes v-if="iconName(index) === 'times'" />
                    <IconCheck v-if="iconName(index) === 'check'" />
                </template>
                <span v-else>{{ counter }}</span>
            </li>

            <li v-if="counter !== loop" class="progress-line"></li>
        </div>
    </ul>
</template>

<script>
import IconCheck from "@/components/base/IconCheck.vue";
import IconTimes from "@/components/base/IconTimes.vue";
import IconQuestion from "@/components/base/IconQuestion.vue";
export default {
    name: "ProgressBar",

    components: {
        IconQuestion,
        IconTimes,
        IconCheck
    },

    props: {
        loop: Number,
        isActive: Number,
        score: {
            type: Array,
            required: false
        }
    },

    methods: {
        wrapperClass(index) {
            return {
                wrapper: true,
                active: this.isActive === index,
                "score-bar": !!this.score
            };
        },

        itemClass(index) {
            return ["progress-item", this.score ? this.isCorrect(index) : null];
        },

        isCorrect(index) {
            if (this.score[index] === undefined) return;
            return this.score[index] ? "correct" : "incorrect";
        },

        iconName(index) {
            if (this.score[index] === undefined) return "question";
            return this.score[index] ? "check" : "times";
        }
    }
};
</script>

<style lang="scss" scoped>
ul.progress {
    div.wrapper {
        &.score-bar {
            li.progress-item {
                padding: 5px 4px;
            }
            li.progress-line {
                background-color: #dcdcdc;
                padding: 0 0.1em;
            }
            &.active {
                li.progress-item {
                    background-color: #dcdcdc;
                }
            }
        }
    }
}

/** Custom Classes **/
.incorrect {
    background-color: lightcoral !important;
}
.correct {
    background-color: lightgreen !important;
}
</style>
