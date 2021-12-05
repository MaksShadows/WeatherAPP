import Vue from 'vue'
import Vuex from 'vuex'
import Cookies from 'js-cookie';
import common from './common'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    data: [],
    details: null,
    cookies: []
  },
  mutations: {
    setCookies(state, payload) {
      state.cookies = payload;
    },
    setGroup(state, data) {
      state.data = data.list;
    },
    setItem(state, city) {
      state.data.push(city);
    },
    setDetails(state, item) {
      state.details = item;
    },
    refreshItem(state, newItem) {
      const idx = state.data.findIndex(item => item.id === newItem.id);
      state.data.splice(idx, 1, newItem);
    },
    removeItem(state, id) {
      const idx = state.data.findIndex(item => item.id === id);
      if (idx !== -1) {
        state.data.splice(idx, 1);
      }
    },
    removeData(state) {
      state.data = [];
    }
  },
  actions: {
    removeItem({ commit, state }, id) {
      commit('clearAlert');

      const cookies = [...state.cookies];
      const idx = cookies.findIndex(item => item === id);
      if (idx !== -1) {
        cookies.splice(idx, 1);
      }
      Cookies.set('weather-cities', cookies, { expires: 7 });
      commit('setCookies', cookies);
      commit('removeItem', id);
      commit('setAlert', "Removed successfuly!");
    },
    async fetchGroupByIds({ commit }, cities) {
      commit('clearError');
      commit('setLoading', true);

      try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/group?id=${cities}&units=metric&appid=4b11194cdd7cf66d55af89b20af02905`);
        const data = await response.json();

        if (data.cnt > 0) {
          commit('setGroup', data);
          commit('setCookies', cities);
        } else {
          commit('setError', data.message);
        }

        commit('setLoading', false);
      } catch (error) {
        commit('setError', error);
        commit('setLoading', false);
        throw error;
      }
    },
    async fetchCityByName({ commit, state }, name) {
      commit('clearAlert');
      commit('clearError');
      commit('setLoading', true);

      try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${name}&units=metric&appid=4b11194cdd7cf66d55af89b20af02905`);
        const city = await response.json();

        if (city.cod == 200) {
          const idx = state.data.findIndex(item => item.name === city.name);

          if (idx !== -1) {
            commit('setError', `Error: ${name} is already added!`);
          } else {
            const cookies = [...state.cookies];
            cookies.push(city.id);
            Cookies.set('weather-cities', cookies, { expires: 7 });

            commit('setItem', city);
            commit('setCookies', cookies);
            commit('setAlert', `${city.name} fetched successfuly!`);
          }
        } else {
          commit('setError', city.message);
        }

        commit('setLoading', false);
      } catch (error) {
        commit('setError', error);
        commit('setLoading', false);
        throw error;
      }
    },
    async refreshItem({ commit }, id) {
      commit('clearAlert');
      commit('clearError');
      commit('setLoading', true);

      try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?id=${id}&units=metric&appid=4b11194cdd7cf66d55af89b20af02905`);
        const city = await response.json();

        if (city.cod == 200) {
          commit('refreshItem', city);
          commit('setAlert', `${city.name} refreshed successfuly!`);
        } else {
          commit('setError', city.message);
        }

        commit('setLoading', false);
      } catch (error) {
        commit('setError', error);
        commit('setLoading', false);
        throw error;
      }
    },
    async detailsById({ commit }, id) {
      commit('clearError');
      commit('setLoading', true);

      try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?id=${id}&units=metric&appid=4b11194cdd7cf66d55af89b20af02905`);
        const city = await response.json();

        if (city.cod == 200) {
          commit('setDetails', city);
        } else {
          commit('setError', city.message);
        }

        commit('setLoading', false);
      } catch (error) {
        commit('setError', error);
        commit('setLoading', false);
        throw error;
      }
    },
    async fetchByGeo({ commit, state }, { lat, lon }) {
      commit('clearAlert');
      commit('clearError');
      commit('setLoading', true);

      try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=4b11194cdd7cf66d55af89b20af02905`);
        const city = await response.json();

        if (city.cod == 200) {

          const idx = state.data.findIndex(item => item.name === city.name);
          if (idx !== -1) {
            commit('setError', `Error: ${city.name} is already added!`);
          } else {
            const cookies = [...state.cookies];
            cookies.push(city.id);
            Cookies.set('weather-cities', cookies, { expires: 7 });

            commit('setItem', city);
            commit('setCookies', cookies);
            commit('setAlert', `${city.name} fetched successfuly!`);
          }
        } else {
          commit('setError', city.message);
        }

        commit('setLoading', false);
      } catch (error) {
        commit('setError', error);
        commit('setLoading', false);
        throw error;
      }
    },
    clearAll({ commit }) {
      commit('clearAlert');

      Cookies.remove('weather-cities');
      commit('setCookies', []);
      commit('removeData');
      commit('setDetails', null);
      commit('setLoading', false);
      commit('clearError');
      commit('setAlert', "Data was cleared!");
    }
  },
  getters: {
    getData: (state) => state.data,
    getDetails: (state) => state.details,
    getChartValues: (state) => state.details.list.slice(0, 7).map(day =>
      Math.round(day.main.temp) > 0
        ? `+${Math.round(day.main.temp)}`
        : Math.round(day.main.temp)
    ) || [],
    getChartLabels: (state) => state.details.list.slice(0, 7).map(day => {
      let h = new Date(day.dt_txt).getHours();
      let m = new Date(day.dt_txt).getMinutes();
      h = h < 10 ? '0' + h : h;
      m = m < 10 ? '0' + m : m;
      return `${h}:${m}`
    }) || []
  },
  modules: {
    common
  }
})
