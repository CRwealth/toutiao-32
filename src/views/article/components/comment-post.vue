<template>
  <div class="comment-post">
    <van-field
      class="post-field"
      v-model.trim="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="请输入评论"
      show-word-limit
    />
    <!-- 评论框没有内容发布禁止点击 -->
    <van-button
      class="post-btn"
      @click="onCommentPost"
      :disabled="!message.length"
    >
      发布</van-button
    >
  </div>
</template>

<script>
import { addComment } from '@/api/comment'
export default {
  name: 'CommentPost',
  inject: {
    articleId: {
      type: [Number, String, Object],
      default: null
    }
  },
  props: {
    target: {
      type: [Number, String, Object],
      required: true
    }
  },
  data () {
    return {
      message: ''
    }
  },
  methods: {
    async onCommentPost () {
      this.$toast.loading({
        message: '发布中...',
        forbidClick: true
      })

      try {
        const { data } = await addComment({
          target: this.target, //	评论的目标id（评论文章即为文章id，对评论进行回复则为评论id）
          content: this.message, // 评论内容
          art_id: this.articleId ? this.articleId : null // 文章id，对评论内容发表回复时，需要传递此参数，表明所属文章id。对文章进行评论，不要传此参数。
        })
        console.log(data)
        // 清空文本框
        this.message = ''
        this.$emit('post-success', data.data)

        this.$toast.success('发布成功')
      } catch (error) {
        this.$toast.fail('发布失败')
      }
    }
  }
}
</script>

<style lang="less" scpoed>
.comment-post {
  display: flex;
  align-items: center;
  padding: 32px 0 32px 32px;
  .post-field {
    background-color: #f5f7f9;
  }
  .post-btn {
    width: 150px;
    border: none;
    color: #6ba3d8;
    &::before {
      display: none;
    }
  }
}
</style>
