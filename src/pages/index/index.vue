<template>
	<view class="content">
		<view>
			<text class="title">{{title}}</text>
		</view>
		<view class="padding flex flex-direction">
			<button class="cu-btn bg-grey lg">玄灰</button>
			<button class="cu-btn bg-red margin-tb-sm lg">嫣红</button>
		</view>

	</view>
</template>

<script>
import { workList } from "@/api/index";

export default {
  data() {
    return {
      title: "Hello",
    };
  },
  onLoad() {},
  onShow() {
    this.initData();
  },
  methods: {
    initData() {
      this.getIndexList();
    },
    async getIndexList() {
      const data = await this.$http.get(`${workList}`);
      console.log(data);
    },
  },
};
</script>

<style lang="scss">
page {
	background: $color-white;
}
.content {
  display: flex;
  flex-direction: column;
  // align-items: center;
  justify-content: center;
}

</style>
