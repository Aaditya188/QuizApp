<template>
    <div class="question-body">
        <!-- Question -->
        <p v-html="question.question"></p>

        <!-- Answers -->
        <ul class="progress">
            <div
                v-for="(answer, index) in shuffledAnswers"
                :key="index"
                @click="onSelectAnswer(index)"
                :class="[answerClass(index), 'wrapper']"
            >
                <li class="progress-item">
                    <span>
                        <IconBulb />
                    </span>
                </li>
                <li v-html="answer" class="progress-line"></li>
            </div>
        </ul>

        <!-- Buttons -->
        <div class="buttons">
            <input @click="submit()" type="submit" value="Submit" />
            <transition name="next_button" mode="out-in">
                <input
                    v-if="!last_question && showNextBtn"
                    @click="onNext()"
                    type="submit"
                    value="Next"
                    class="btn-next"
                />
            </transition>
        </div>

        <!-- Party -->
        <transition name="go-party" mode="out-in">
            <div v-if="goParty" class="overlay">
                <template v-if="result.status">
                    <div class="icon">
                        <span class="red-hearts"></span>
                        <IconGrinHearts />
                        <span></span>
                    </div>
                    <h2>Congrats</h2>
                    <p>
                        {{
                            `${result.score} of ${result.total}, what a Victory!`
                        }}
                    </p>
                    <a
                        :href="
                            `https://twitter.com/intent/tweet?text=I just scored ${result.score} of ${result.total} in QuizApp. are you up for the challenge?&url=https://quiz-app-619.herokuapp.com/&via=BekYahia`
                        "
                        class="tweet-button"
                    >
                        <IconTwitter /> Tweet your win!
                    </a>
                </template>

                <template v-else>
                    <IconSad />
                    <h2>Bummer</h2>
                    <p>
                        {{
                            `${result.score} of ${result.total}, what a shame!!`
                        }}
                    </p>
                    <p>
                        Lucky you, we believe in second chance 😄,
                        <a @click.prevent @click="reload()" href="">
                            quiz me again 💪.
                        </a>
                    </p>
                </template>
            </div>
        </transition>
    </div>
</template>

<script>
import "@/assets/js/platform.twitter.js";
import IconTwitter from "@/components/base/IconTwitter.vue";
import IconGrinHearts from "@/components/base/IconGrinHearts.vue";
import IconSad from "@/components/base/IconSad.vue";
import _ from "lodash";
import IconBulb from "@/components/base/IconBulb.vue";
export default {
    name: "QuestionBoxMain",

    components: {
        IconBulb,
        IconGrinHearts,
        IconSad,
        IconTwitter
    },

    props: {
        index: Number,
        questions: Array
    },

    data() {
        return {
            shuffledAnswers: null,
            selectAnswer: null,
            correct_answer: null,
            answered: false,
            showNextBtn: false,
            last_question: false,
            goParty: false
        };
    },

    computed: {
        question() {
            return this.questions[this.index];
        },
        result() {
            const score = this.$store.getters.statistic.score;
            let correct_answers = 0;

            score.filter(answer => {
                if (answer === true) correct_answers++;
            });

            const pass = _.round(score.length / 2);
            const status = correct_answers >= pass ? true : false;

            return {
                total: score.length,
                score: correct_answers,
                status
            };
        }
    },

    watch: {
        index: {
            immediate: true,
            handler() {
                this.selectAnswer = null;
                this.answered = false;
                this.showNextBtn = false;
                this.answers();
                if (this.index == this.questions.length - 1)
                    this.last_question = true;
            }
        }
    },

    methods: {
        onSelectAnswer(id) {
            if (this.answered) return;
            this.selectAnswer = id;
        },

        answerClass(id) {
            const answerEqualID = this.selectAnswer === id;

            if (!this.answered && answerEqualID) return "selected";

            if (this.answered && this.correct_answer === id)
                return answerEqualID ? "correct selected" : "correct";

            if (this.answered && this.correct_answer !== id && answerEqualID)
                return "incorrect selected";
        },

        answers() {
            this.shuffledAnswers = _.shuffle([
                ...this.question.incorrect_answers,
                this.question.correct_answer
            ]);
            this.correct_answer = this.shuffledAnswers.indexOf(
                this.question.correct_answer
            );
        },

        submit() {
            if (this.answered || this.selectAnswer === null) return;

            this.answered = true;
            this.showNextBtn = true;
            let isCorrect = false;

            if (this.selectAnswer === this.correct_answer) isCorrect = true;
            this.$store.commit("update_score", isCorrect);

            if (this.last_question) {
                setTimeout(() => {
                    this.goParty = true;
                }, 1500);
            }
        },

        onNext() {
            this.$store.commit("nextQuestion");
        },

        reload() {
            this.$store.commit("reset_state");
            const params = {
                name: this.$store.state.name,
                reset: true
            };
            this.$router.push({ name: "StepTwo", params });
        }
    }
};
</script>

<style lang="scss" scoped>
.question-body {
    & > p {
        margin: 15px 0 10px;
    }
    ul.progress {
        max-width: 500px;
        text-align: center;
        margin: 0 auto;
        div.wrapper {
            cursor: pointer;
            margin-bottom: 2%;
            padding-right: 3px;
            width: 100%;
            &:hover {
                li.progress-item span {
                    @extend .hover-effect;
                }
            }
            li {
                text-align: left;
                &.progress-item {
                    width: 50px;
                    height: 50px;
                    text-align: center;
                    padding: 4px;
                    position: relative;
                    z-index: 2;
                    span {
                        transition: 0.5s;
                        padding: 8px;
                        border-radius: 50%;
                        width: 100%;
                        height: 100%;
                        display: inline-block;
                        color: transparent;
                    }
                }
                &.progress-line {
                    text-align: center;
                    height: auto;
                    width: 410px;
                    width: calc(100% - 50px);
                    margin-left: -5px;
                    border-radius: 25px 10px 10px 25px;
                    padding: 3px 10px;
                    transition: 0.3s;
                }
            }
        }
    }
    div.buttons {
        text-align: left;
        width: 150px;
        margin: 10px auto 0;
        position: relative;
        input[type="submit"] {
            display: inline-block;
            width: 150px;
            background-color: var(--question-btn);
            margin: 0;
            &.btn-next {
                transition: 0.5s;
                width: auto;
                padding: 5px 10px;
                position: absolute;
                top: 6px;
                left: 105%;
                border: 0;
            }
        }
    }
}

/** Custom Classes **/
.selected {
    li.progress-line {
        box-shadow: -4px 2px 10px rgba(0, 0, 0, 0.2);
    }
    li.progress-item span {
        @extend .hover-effect;
    }
}
.incorrect {
    background-color: lightcoral;
}
.correct {
    background-color: lightgreen;
}
.hover-effect {
    box-shadow: 1px 1px 6px rgba(0, 0, 0, 0.4);
    background-color: var(--hover-span-bkg);
    color: inherit !important;
}
.overlay {
    background-color: rgba(0, 0, 0, 0.75);
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    right: 0;
    z-index: 3;
    color: #eee;
    padding-top: 10%;
    overflow: hidden;
    .icon {
        position: relative;
        display: inline-block;
        .red-hearts {
            width: 64px;
            height: 25px;
            background-color: crimson;
            position: absolute;
            top: 24px;
            left: 17px;
        }
        svg {
            position: relative;
        }
    }
    h2 {
        margin: 0;
    }
    p {
        margin-top: 10px;
        a {
            text-decoration: unset;
            color: yellow;
            font-weight: 600;
        }
    }
    .tweet-button {
        color: #fff;
        font-weight: 600;
        text-decoration: none;
        background-color: #1b95e0;
        padding: 3px;
        border-radius: 4px;
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        margin: auto;
        width: 170px;
    }
}

/* Animation classes */
.next_button-enter-active,
.next_button-leave-active {
    transition: all 0.5s ease-in-out;
}
.next_button-enter,
.next_button-leave-to {
    opacity: 0;
}
.next_button-enter {
    transform: translateX(-5em);
}
.next_button-leave-to {
    transform: translateX(5em);
}
.go-party-enter-active,
.go-party-leave-active {
    transition: all 1s ease-in-out;
}
.go-party-enter,
.go-party-leave-to {
    transform: translateY(-100%);
    opacity: 0;
}
@media (max-width: 699px) {
    .question-body ul.progress div.wrapper {
        cursor: unset;
    }
}
</style>
