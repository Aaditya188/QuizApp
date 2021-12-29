<template>
    <div class="step-two">
        <p class="lead">Set your quiz configrations</p>

        <form @submit.prevent>
            <label for="number" :class="validateAmount.class">
                <span>Number of Questions</span>
                <input
                    v-model="api_config.amount"
                    type="number"
                    id="number"
                    min="1"
                    max="50"
                    value="5"
                />
            </label>

            <label for="category">
                <span>Select Category</span>
                <select v-model="api_config.category" id="category">
                    <option value="any">Any Category</option>
                    <option
                        v-for="category in categories"
                        :key="category.id"
                        :value="category.id"
                    >
                        {{ category.name }}
                    </option>
                </select>
            </label>

            <label for="difficulty">
                <span>Select Difficulty</span>
                <select v-model="api_config.difficulty" id="difficulty">
                    <option value="any">Any Difficulty</option>
                    <option
                        v-for="(difficulty, index) in difficulties"
                        :key="index"
                        :value="difficulty"
                    >
                        {{ difficulty.capitalize() }}
                    </option>
                </select>
            </label>

            <label for="type">
                <span>Select Type</span>
                <select v-model="api_config.type" id="type">
                    <option value="any">Any Type</option>
                    <option value="multiple">Multiple Choise</option>
                    <option value="boolean">True / False</option>
                </select>
            </label>

            <input
                @click="OnSubmit()"
                value="Next"
                class="full-btn"
                type="submit"
            />
        </form>
    </div>
</template>

<script>
export default {
    name: "StepTwo",

    data() {
        return {
            api_config: {
                amount: 5,
                category: "any",
                difficulty: "any",
                type: "any"
            },
            difficulties: ["easy", "medium", "hard"]
        };
    },

    computed: {
        categories() {
            return this.$store.state.categories;
        },

        validateAmount() {
            let validator = { error: false };
            const amount = Number(this.api_config.amount);
            if (typeof amount !== "number" || amount < 1 || amount > 50)
                validator.error = true;
            validator.class = validator.error ? "error" : null;
            return validator;
        }
    },

    methods: {
        OnSubmit() {
            const params = {
                name: this.$route.params.name,
                api_config: this.api_config
            };
            if (!this.validateAmount.error)
                this.$router.push({ name: "StepThree", params });
        }
    }
};
</script>

<style lang="scss" scoped>
.step-two {
    form {
        label {
            display: flex;
            justify-content: space-evenly;
            margin-bottom: 17px;
            &.error {
                color: hotpink;
                input {
                    color: hotpink;
                    border-color: hotpink;
                }
            }
            span {
                width: 40%;
                text-align: center;
                margin-top: 10px;
                font-weight: 500;
            }
        }
    }
}
.full-btn {
    width: 72%;
    margin-left: auto;
    display: block;
}

@media (max-width: 700px) {
    form {
        // font-size: 14px;
        label {
            flex-direction: column;
            span {
                text-align: left !important;
                margin: 0 0 5px !important;
                width: 100% !important;
            }
        }
    }
    .full-btn {
        width: 100%;
    }
}
</style>
