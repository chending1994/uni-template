import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const ACCESSTOKEN = uni.getStorageSync('accessToken') || '';

const store = new Vuex.Store({
  state: {
		accessToken: ACCESSTOKEN,
  },
  getters: {
    // 判断用户是否登录
		hasLogin: state => {
			return !!state.accessToken;
		}
  },
  mutations: {
    login(state, provider) {
			state.accessToken = provider.access_token;
			state.user = provider;
			uni.setStorageSync('user', provider);
			uni.setStorageSync('accessToken', provider.access_token);
		},
		logout(state) {
			state.accessToken = '';
			state.userInfo = {};
			uni.removeStorageSync('accessToken');
			uni.removeStorageSync('userInfo');
		},
  },
  actions: {
    logout({ commit }) {
			commit('logout');
		}
  }
});

export default store;
