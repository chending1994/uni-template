<template>
	<view class="content">
		<view class="text-center">
			<text class="title text-sl text-bold">{{title}}</text>
		</view>
	</view>
</template>

<script>
import { indexList } from '@/api/product';

export default {
  data() {
    return {
      title: "Hello",
      loading: true,
      appName: this.$mSettingConfig.appName,
    };
  },
  onLoad() {
    
  },
  onShow() {
    this.initData();
  },
  methods: {
    initData() {
      this.getIndexList();
    },
    async getIndexList(type) {
      await this.$http
        .get(`${indexList}`, {})
        .then(async r => {
          uni.setNavigationBarTitle({ title: this.appName });
          if (type === 'refresh') {
            uni.stopPullDownRefresh();
          }
          // 首页参数赋值
          console.log(r.data);
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
          if (type === 'refresh') {
            uni.stopPullDownRefresh();
          }
        })

    }
  },
};
</script>

<style lang="scss">
page {
  background: $color-white;
  height: 100%;
}
.content {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  .title {
    font-family: YouSheBiaoTiHei;
  }
}

</style>
