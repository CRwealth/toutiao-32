<template>
  <van-cell class="comment-item">
    <van-image
      slot="icon"
      class="avatar"
      round
      fit="cover"
      :src="comment.aut_photo"
    />
    <div slot="title" class="title-wrap">
      <div class="user-name">{{ comment.aut_name }}</div>
      <van-button
        class="like-btn"
        :class="{
          liked: comment.is_liking
        }"
        :icon="comment.is_liking ? 'good-job' : 'good-job-o'"
        @click="oncommentLike"
        :loading="commentLoading"
        >{{ comment.like_count || '赞' }}</van-button
      >
    </div>

    <div slot="label">
      <p class="comment-content">{{ comment.content }}</p>
      <div class="bottom-info">
        <span class="comment-pubdate">{{
          comment.pubdate | relativeTime
        }}</span>
        <van-button
          class="reply-btn"
          round
          @click="$emit('reply-click', comment)"
          >回复 {{ comment.reply_count }}
        </van-button>
      </div>
    </div>
  </van-cell>
</template>

<script>
import { getLiking, DeleteLiking } from '@/api/comment'
export default {
  name: 'CommentItem',
  props: {
    comment: {
      type: [Object, Number],
      required: true
    }
  },
  data () {
    return {
      commentLoading: false // 上拉加载更多的 loading
    }
  },

  methods: {
    async oncommentLike () {
      this.commentLoading = true
      try {
        if (this.comment.is_liking) {
          //  已经点赞，取消点赞
          await DeleteLiking(this.comment.com_id)
          // 更新视图，取消点赞减减，子组件不能改变父组件所以得$emit
          this.comment.like_count--
        } else {
          // 未点赞，点击赞
          // console.log(this.$parent.$parent)
          await getLiking(this.comment.com_id)
          // 更新视图，点赞加加
          this.comment.like_count++
        }
        this.comment.is_liking = !this.comment.is_liking
      } catch (error) {
        this.$toast('操作失败，请刷新页面')
      }
      this.commentLoading = false
    }
  }
}
</script>

<style scoped lang="less">
.comment-item {
  .avatar {
    width: 72px;
    height: 72px;
    margin-right: 25px;
  }
  .title-wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .user-name {
      color: #406599;
      font-size: 26px;
    }
  }
  .comment-content {
    font-size: 32px;
    color: #222222;
    word-break: break-all;
    text-align: justify;
  }
  .comment-pubdate {
    font-size: 19px;
    color: #222;
    margin-right: 25px;
  }
  .bottom-info {
    display: flex;
    align-items: center;
  }
  .reply-btn {
    // width: 135px;
    height: 48px;
    line-height: 48px;
    font-size: 21px;
    color: #222;
  }
  .like-btn {
    height: 30px;
    padding: 0;
    bottom: none;
    font-size: 19px;
    line-height: 30px;
    margin-right: 7px;
    .van-icon {
      font-size: 30px;
    }
    &.liked {
      color: #e5645f;
    }
  }
}
</style>
