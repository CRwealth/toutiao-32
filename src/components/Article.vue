<template>
  <!-- 没有图片 -->
  <van-cell
    v-if="acticleInfo.cover.type === 0"
    :title="acticleInfo.title"
    :label="label"
  />
  <!-- 有一张图片 -->
  <van-cell
    v-else-if="acticleInfo.cover.type === 1"
    :title="acticleInfo.title"
    :label="label"
  >
    <van-image width="100" height="100" :src="acticleInfo.cover.images[0]" />
  </van-cell>
  <!-- 有三张图片 -->
  <van-cell v-else :title="acticleInfo.title" :label="label">
    <div class="imgs">
      <van-image
        width="100"
        height="100"
        v-for="(item, index) in acticleInfo.cover.images"
        :key="index"
        :src="item"
      />
    </div>
  </van-cell>
</template>

<script>
export default {
  name: 'ArticleIndex',
  props: {
    acticleInfo: {
      type: Object,
      // 对象和数组的默认值，必须用函数返回
      default: () => ({})
    }
  },
  computed: {
    label () {
      const art = this.acticleInfo
      return `${art.aut_name} ${art.comm_count} ${art.pubdate}`
    }
  }
}
</script>

<style lang="less" scoped>
.imgs {
  display: flex;
}
</style>
