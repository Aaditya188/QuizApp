<template>
    <div class="step-one">
        <p class="lead">Your name to increase the challenge interactivity</p>

        <form @submit.prevent>
            <div :class="[validateName.class, 'name']">
                <input
                    v-model="name"
                    type="text"
                    placeholder="Type your name..."
                    autofocus
                />
                <span>{{ validateName.msg }}</span>
            </div>

            <input @click="onSubmit()" value="Next" type="submit" />
        </form>
    </div>
</template>

<script>
export default {
    name: "StepOne",

    data() {
        return {
            name: ""
        };
    },

    mounted() {
        document.querySelector(".step-one form .name input").focus();
    },

    computed: {
        validateName() {
            let validator = { error: false };
            const name = this.name.replace(/[^a-zA-Z0-9_-]/g, "");
            if (name.length > 25) {
                validator.error = true;
                validator.msg = "Too long, max length is 25.";
            }
            validator.class = validator.error ? "error" : null;
            return validator;
        }
    },

    methods: {
        onSubmit() {
            const params = { name: this.name };
            if (!this.validateName.error)
                this.$router.push({ name: "StepTwo", params });
        }
    }
};
</script>

<style lang="scss" scoped>
.step-one {
    form {
        div.name {
            display: inline-block;
            width: 60%;
            span {
                display: none;
                color: crimson;
                padding-top: 5px;
            }
            &.error {
                input {
                    border-color: crimson;
                    color: crimson;
                }
                span {
                    display: table-cell;
                }
            }
        }
    }
}
</style>
