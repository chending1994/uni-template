import Vue from 'vue'
import App from './App'
import store from '@/store';
import { http } from '@/utils/request';
import $mHelper from '@/utils/helper';
import $mRouter from '@/utils/router';
import moment from '@/common/moment';

import $mAssetsPath from '@/config/assets.config.js';
import $mRoutesConfig from '@/config/routes.config.js';
import $mSettingConfig from '@/config/setting.config.js';


Vue.prototype.$http = http;
Vue.prototype.$mStore = store;
Vue.prototype.$mRoutesConfig = $mRoutesConfig;
Vue.prototype.$mAssetsPath = $mAssetsPath;
Vue.prototype.$mHelper = $mHelper;
Vue.prototype.$mRouter = $mRouter;
Vue.prototype.$mSettingConfig = $mSettingConfig;

if (process.env.NODE_ENV === 'production') {
	Vue.config.productionTip = false;
}

// 路由导航
$mRouter.beforeEach((navType, to) => {
	if (to.route === undefined) {
		throw '路由钩子函数中没有找到to对象，路由信息:' + JSON.stringify(to);
	}
	if (to.route === $mRoutesConfig.login.path && store.getters.hasLogin) {
		uni.reLaunch({
			url: $mHelper.objParseUrlAndParam($mRoutesConfig.main.path)
		});
		return;
	}
	// 过滤需要权限的页面
	if (to.route.requiresAuth) {
		if (store.getters.hasLogin) {
			// 已经登录
			uni[navType]({
				url: $mHelper.objParseUrlAndParam(to.route.path, to.query)
			});
		} else {
			// 登录成功后的重定向地址和参数
			const query = {
				redirectUrl: to.route.path,
				...to.query
			};
			// 没有登录 是否强制登录?
			if (store.state.forcedLogin) {
				uni.redirectTo({
					url: $mHelper.objParseUrlAndParam($mRoutesConfig.login.path, query)
				});
			} else {
				uni.navigateTo({
					url: $mHelper.objParseUrlAndParam($mRoutesConfig.login.path, query)
				});
			}
		}
	} else {
		uni[navType]({
			url: $mHelper.objParseUrlAndParam(to.route, to.query)
		});
	}
});

App.mpType = 'app'

// 保留小数点后两位
Vue.filter('keepTwoDecimal', value => {
  return (Math.floor((value || 0) * 100) / 100).toFixed(2);
});

// 定义时间格式全局过滤器
Vue.filter('dateFormat', (daraStr, pattern = 'YYYY-MM-DD HH:mm:ss') => moment(daraStr).format(pattern));

const app = new Vue({
  ...App,
	store: store
})
app.$mount()
