import store from "@/store";
export default {
    setup(_to, _from, next) {
        store.state.setup_compelte ? next() : next({ name: "StepOne" });
    },

    fromStepOne(to, from, next) {
        if (from.name === "StepOne" || to.params.reset) {
            next();
        } else {
            next({ name: "StepOne" });
        }
    },

    fromStepTwo(_to, from, next) {
        from.name === "StepTwo" ? next() : next({ name: "StepOne" });
    }
};
