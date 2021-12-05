export default {
  state: {
    alert: null,
    error: null,
    loading: false
  },
  mutations: {
    setError(state, error) {
      state.error = error;
    },
    clearError(state) {
      state.error = null;
    },
    setAlert(state, alert) {
      state.alert = alert;
    },
    clearAlert(state) {
      state.alert = null;
    },
    setLoading(state, payload) {
      state.loading = payload;
    },
  },
  getters: {
    getError: state => state.error,
    getAlert: state => state.alert,
    getLoading: state => state.loading,
  }
}