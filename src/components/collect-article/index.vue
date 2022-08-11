<template>
  <div>
    <!-- collected:value  value如果为ture 则有这个类名，如果为false则没有 -->
    <van-icon
      :class="{
        collected: value
      }"
      :name="value ? 'star' : 'star-o'"
      :loading="loading"
      @click="onCollect"
    />
  </div>
</template>

<script>
import { addCollect, delectCollect } from '@/api/new'
export default {
  name: 'CollectArticle',
  props: {
    value: {
      type: Boolean,
      required: true
    },
    articleId: {
      type: [Number, String, Object],
      required: true
    }
  },
  data () {
    return {
      loading: false
    }
  },
  methods: {
    async onCollect () {
      this.loading = true
      try {
        if (this.value) {
          // 已收藏、取消收藏
          await delectCollect(this.articleId)
        } else {
          // 添加收藏
          await addCollect(this.articleId)
        }
        // 更新视图
        // 自定义事件修改数据并不是立即的，所以需要！this.value
        this.$emit('input', !this.value)
        this.$toast.success(!this.value ? '收藏文章成功' : '取消收藏')
      } catch (error) {
        this.$toast.fail('收藏失败，请刷新页面')
      }
      this.loading = false
    }
  }
}
</script>

<style lang="less" scoped>
:deep(.collected) {
  &.van-icon {
    color: #ffa500;
  }
}
</style>
