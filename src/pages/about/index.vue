<template>
  <view class='about'>
    <view class="text-center">
			<text class="title text-sl text-bold">{{title}}</text>
		</view>
  </view>
</template>

<script>

export default {
  data() {
    return {
      title: "World",
    }
  },

  onLoad() {

  },

  onShow() {

  },

  methods: {

  }

}
</script>

<style lang="scss">
page {
  background: $color-white;
  height: 100%;
}
.about {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>
