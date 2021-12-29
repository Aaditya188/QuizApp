import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home.vue";
import Setup from "@/views/Setup.vue";
import Guard from "@/router/middleware/index.js";
import NotFound from "@/components/NotFound.vue";
import StepOne from "@/components/steps/StepOne.vue";
import StepTwo from "@/components/steps/StepTwo.vue";
import StepThree from "@/components/steps/StepThree.vue";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
        beforeEnter: Guard.setup
    },
    {
        path: "/setup",
        component: Setup,
        redirect: { name: "StepOne" },
        children: [
            {
                path: "step-one",
                name: "StepOne",
                component: StepOne
            },
            {
                path: "step-two",
                name: "StepTwo",
                component: StepTwo,
                beforeEnter: Guard.fromStepOne
            },
            {
                path: "step-three",
                name: "StepThree",
                component: StepThree,
                beforeEnter: Guard.fromStepTwo
            }
        ]
    },
    {
        path: "*",
        name: "NotFound",
        component: NotFound
    }
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});

export default router;
