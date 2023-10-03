import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tasks: []
  },
  mutations: {
    setTasks(state, tasks) {
      state.tasks = tasks;
    },
    addTask(state, task) {
      state.tasks.push(task);
    },
    updateTask(state, { index, task }) {
      Vue.set(state.tasks, index, task);
    },
    deleteTask(state, index) {
      state.tasks.splice(index, 1);
    }
  },
  actions: {
    createTask({ commit }, task) {
      commit('addTask', task);
    },
    editTask({ commit }, { index, task }) {
      commit('updateTask', { index, task });
    },
    removeTask({ commit }, index) {
      commit('deleteTask', index);
    }
  },
  getters: {
    getTasks(state) {
      return state.tasks;
    }
  }
})
