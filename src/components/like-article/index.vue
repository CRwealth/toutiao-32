<template>
  <div>
    <van-icon
      :class="{
        liked: value === 1
      }"
      :name="value === 1 ? 'good-job' : 'good-job-o'"
      :loading="loading"
      @click="onCollect"
    />
  </div>
</template>

<script>
import { addLikeArticle, delectLikeArticle } from '@/api/new'
export default {
  name: 'LikeArticle',
  props: {
    value: {
      type: Number,
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
      this.loading = false
      try {
        let status = -1
        if (this.value === 1) {
          // 已点赞，取消点赞
          await delectLikeArticle(this.articleId)
        } else {
          // 点赞
          await addLikeArticle(this.articleId)
          status = 1
        }
        // 更新视图
        this.$emit('input', status)
        this.$toast.success(status === 1 ? '点赞成功' : '取消点赞')
      } catch (error) {
        this.$toast.fail('点赞失败，请刷新')
      }
      this.loading = true
    }
  }
}
</script>

<style lang="less" scoped>
:deep(.liked) {
  &.van-icon {
    color: #e5645f;
  }
}
</style>
