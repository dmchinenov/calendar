import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    events: [
      {
        id: 1, date: '25-02-2022', type: 'green', event: 'Созвон с клиентом',
      },
      {
        id: 2, date: '08-03-2022', type: 'yellow', event: 'Сдать отчет по проекту!',
      },
      {
        id: 3, date: '02-02-2022', type: 'red', event: 'Срочный созвон',
      },
      {
        id: 4, date: '02-02-2022', type: 'green', event: 'День рождения HR)',
      },
      {
        id: 5, date: '02-02-2022', type: 'red', event: 'Срочный созвон',
      },
      {
        id: 6, date: '17-02-2022', type: 'yellow', event: 'Отчет по проекту',
      },
      {
        id: 7, date: '14-02-2022', type: 'yellow', event: 'Отчет по проекту',
      },
      {
        id: 8, date: '25-03-2022', type: 'green', event: 'Свонок клиенту',
      },
      {
        id: 9, date: '25-03-2022', type: 'yellow', event: 'Отчет по проекту',
      },
      {
        id: 10, date: '02-03-2022', type: 'red', event: 'Срочный созвон',
      },
      {
        id: 11, date: '02-03-2022', type: 'green', event: 'День рождения HR)',
      },
      {
        id: 12, date: '07-03-2022', type: 'red', event: 'Срочный созвон',
      },
      {
        id: 13, date: '17-03-2022', type: 'yellow', event: 'Отчет по проекту',
      },
      {
        id: 14, date: '14-04-2022', type: 'yellow', event: 'Отчет по проекту',
      },
      {
        id: 15, date: '15-04-2022', type: 'green', event: 'Свонок клиенту',
      },
    ],
  },
  getters: {
    getEvents: (state) => state.events,
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  },
});
