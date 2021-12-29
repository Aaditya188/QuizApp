<template>
    <div id="app">
        <a
            class="github-corner"
            href="https://github.com/Aaditya188/QuizApp"
            target="_blank"
            rel="noopener noreferrer"
            title="View source on GitHub"
            aria-label="View source on GitHub"
        >
            <IconGithub />
        </a>
        <transition name="pages" mode="out-in">
            <router-view />
        </transition>
    </div>
</template>

<script>
import IconGithub from "@/components/base/IconGithub.vue";
export default {
    name: "App",

    components: {
        IconGithub
    }
};
</script>

<style lang="scss">
@import "./assets/scss/index.scss";

.github-corner {
    &:hover {
        .octo-arm {
            animation: octocat-wave 560ms ease-in-out;
        }
    }
}

@keyframes octocat-wave {
    0%,
    100% {
        transform: rotate(0);
    }
    20%,
    60% {
        transform: rotate(-25deg);
    }
    40%,
    80% {
        transform: rotate(10deg);
    }
}
@media (max-width: 500px) {
    .github-corner:hover .octo-arm {
        animation: none;
    }
    .github-corner .octo-arm {
        animation: octocat-wave 560ms ease-in-out;
    }
}
</style>
