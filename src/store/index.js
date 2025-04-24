import { createStore } from 'vuex'
import movie from './modules/movie'

const options = {
    strict: true,
    state() {
        return {
            counter: 0,
        }
    },
    mutations: {
        increment(state) {
            state.counter++
        },
        incrementBy(state, { by }) {
            state.counter += by
        },
    },
    actions: {
        incrementLater({ commit }) {
            setTimeout(() => commit({ type: 'increment' }), 1000)
        },
        incrementLaterBy({ commit }, { by }) {
            setTimeout(() => commit({ type: 'incrementBy', by }), 1000)
        },
    },
    getters: {
        counter(state) {
            return state.counter
        }
    },
    modules: {
        movie,
    }
}

const store = createStore(options)
export default store