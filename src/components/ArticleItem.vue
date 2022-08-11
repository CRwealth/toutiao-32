<template>
  <!-- 每一篇文章 -->

  <!-- es5拼接的方法 -->
  <!-- :to="'/article/' + articleInfo.art_id" -->

  <!-- es6拼接的方法-->
  <!-- :to="`/article/${articleInfo.art_id}`" -->

  <!-- 不用拼接，用对象的方式 -->
  <!-- :to="{
    根据路由名称进行跳转
    name:"article",

    传递路由动态参数

    params:{
      属性名：路由路径中设计的动态参数名称
      art_id是后台传过来的id
    }
  }" -->

  <!-- 没有图片 -->
  <van-cell
    v-if="articleInfo.cover.type === 0"
    :title="articleInfo.title"
    :label="label"
    :to="`/article/${articleInfo.art_id}`"
  />

  <!-- 一张图片 -->
  <van-cell
    v-else-if="articleInfo.cover.type === 1"
    :title="articleInfo.title"
    value="内容"
    :label="label"
    :to="`/article/${articleInfo.art_id}`"
  >
    <van-image width="100" height="100" :src="articleInfo.cover.images[0]" />
  </van-cell>

  <!-- 三张图片 -->
  <van-cell
    v-else
    :title="articleInfo.title"
    :label="label"
    :to="`/article/${articleInfo.art_id}`"
  >
    <van-image
      v-for="(item, index) in articleInfo.cover.images"
      :key="index"
      width="100"
      height="100"
      :src="item"
    />
  </van-cell>
</template>

<script>
export default {
  props: {
    articleInfo: {
      type: Object,
      // 对象和数组的默认值, 比如用函数返回
      default: () => ({})
    }
  },
  computed: {
    label () {
      const art = this.articleInfo

      return `${art.aut_name} ${art.comm_count}评论 ${art.pubdate}`
    }
  }
}
</script>

<style></style>
