import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
//import questions from "@/json/questions.json";
//import _ from "lodash";
Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        name: "",
        loading: false,
        setup_compelte: false,
        questions: [],
        categories: [],
        statistic: {
            current_question_index: 0,
            corrent_answers: 0,
            incorrect_answers: 0,
            score: []
        }
    },

    getters: {
        questions(state) {
            return state.questions;
        },
        statistic(state) {
            return state.statistic;
        },
        name(state) {
            return state.name;
        }
    },

    mutations: {
        set_initializing(state, payload) {
            state.questions = payload.results;
            state.name = payload.name;
            state.setup_compelte = true;
        },

        set_loading(state, payload) {
            state.loading = payload;
        },

        update_score(state, payload) {
            state.statistic.score.push(payload);
        },

        nextQuestion(state) {
            state.statistic.current_question_index++;
        },

        set_categories(state, categories) {
            state.categories = categories;
        },

        reset_state(state) {
            state.setup_compelte = false;
            state.questions = [];
            state.statistic = {
                current_question_index: 0,
                corrent_answers: 0,
                incorrect_answers: 0,
                score: []
            };
        }
    },

    actions: {
        fetch_categories({ commit }) {
            commit("set_loading", true);
            axios
                .get("https://opentdb.com/api_category.php")
                .then(res => {
                    if (res.data.trivia_categories)
                        commit("set_categories", res.data.trivia_categories);
                    commit("set_loading", false);
                })
                .catch(err => {
                    console.log(err);
                    commit("set_loading", false);
                });
        },

        initializing({ commit }, payload) {
            commit("set_loading", true);

            return new Promise((resolve, reject) => {
                let url = `https://opentdb.com/api.php?amount=${payload.api_config.amount}`;

                /*
                 **  if the selected value is 'any', you shouldn't sent it [ *.* it is the api logic]
                 */
                if (payload.api_config.category !== "any") {
                    url += `&category=${payload.api_config.category}`;
                }

                if (payload.api_config.difficulty !== "any") {
                    url += `&difficulty=${payload.api_config.difficulty}`;
                }

                if (payload.api_config.type !== "any") {
                    url += `&type=${payload.api_config.type}`;
                }

                /*
                // this for offline queston.json
                const data = {
                    results: _.shuffle(questions.results).slice(
                        questions.results.length - payload.api_config.amount
                    ),
                    name: payload.name
                };
                commit("set_initializing", data);
                commit("set_loading", false);
                resolve();
                if (!questions.results) return reject();
                */

                axios
                    .get(url)
                    .then(res => {
                        if (!res.data.results) {
                            reject(res.data);
                            commit("set_loading", false);
                            return;
                        }
                        const data = {
                            results: res.data.results,
                            name: payload.name
                        };
                        commit("set_initializing", data);
                        commit("set_loading", false);
                        resolve(true);
                    })
                    .catch(rej => {
                        reject(rej);
                        commit("set_loading", false);
                    });
            });
        }
    }
});
