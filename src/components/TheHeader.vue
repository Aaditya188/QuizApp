<template>
    <nav>
        <div class="user-info">
            <IconAvatar :svgShape="avatar" />
            <span>{{ name }}</span>
        </div>
        <div class="question-info">
            <p>
                <IconList />
                <span>{{ question.category }}</span>
            </p>
            <p>
                <IconBulb />
                <span>{{ question.difficulty.capitalize() }}</span>
            </p>
        </div>
    </nav>
</template>

<script>
import { mapGetters } from "vuex";
import IconAvatar from "@/components/base/IconAvatar.vue";
import IconList from "@/components/base/IconList.vue";
import IconBulb from "@/components/base/IconBulb.vue";
export default {
    name: "TheHeader",

    components: {
        IconAvatar,
        IconList,
        IconBulb
    },

    computed: {
        ...mapGetters(["questions", "statistic", "name"]),

        avatar() {
            return this.name === "Ninja" ? "userNinja" : "user";
        },

        question() {
            return this.questions[this.statistic.current_question_index];
        }
    }
};
</script>

<style lang="scss" scoped>
nav {
    padding: 1% 7%;
    background-color: var(--nav-bkg);
    box-shadow: 10px 1px 9px rgba(0, 0, 0, 0.2);
    display: flex;
    justify-content: space-between;
    .user-info {
        display: flex;
        align-items: center;
        .user-pic {
            margin-right: 10px;
        }
    }
    .question-info {
        max-width: 80%;
        min-width: 30%;
        text-align: left;
        margin-left: 10px;
        p {
            &:first-child {
                margin-bottom: 5px;
            }
            margin: 0;
            display: flex;
            align-items: center;
            svg {
                width: 20px;
                margin-right: 10px;
            }
        }
    }
}
@media (max-width: 700px) {
    nav {
        padding: 2% 3%;
        .user-info {
            .user-pic {
                margin-right: 5px;
                width: 35px;
            }
        }
        .question-info {
            svg {
                width: 17px;
            }
        }
    }
}
@media (max-width: 469px) {
    .question-info {
        display: none;
    }
}
</style>
