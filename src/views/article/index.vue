<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      left-arrow
      title="黑马头条"
      @click-left="$router.back()"
    ></van-nav-bar>
    <!-- /导航栏 -->

    <div class="main-wrap">
      <!-- 加载中 -->
      <div class="loading-wrap" v-if="loading">
        <van-loading color="#3296fa" vertical>加载中</van-loading>
      </div>
      <!-- /加载中 -->

      <!-- 加载完成-文章详情 -->
      <div v-else-if="article.title" class="article-detail">
        <!-- 文章标题 -->
        <h1 class="article-title">{{ article.title }}</h1>
        <!-- /文章标题 -->

        <!-- 用户信息 -->
        <van-cell class="user-badge" center :border="false">
          <van-image
            class="avatar"
            slot="icon"
            round
            fit="cover"
            :src="article.aut_photo"
          />
          <div slot="title" class="user-name">{{ article.aut_name }}</div>
          <div slot="label" class="publish-date">
            {{ article.pubdate | relativeTime }}
          </div>
          <van-button
            v-if="article.is_followed"
            class="follow-btn"
            round
            size="small"
            @click="onfollow"
            :loading="followLoading"
            >已关注</van-button
          >
          <van-button
            v-else
            class="follow-btn"
            type="badge"
            color="#3296fa"
            round
            size="small"
            icon="plus"
            @click="onfollow"
            :loading="followLoading"
            >关注</van-button
          >
        </van-cell>
        <!-- /用户信息 -->

        <!-- 文章内容 -->
        <!-- {{article.content}} 因为都是标签所以需要v-html -->
        <div
          class="article-content markdown-body"
          v-html="article.content"
          ref="article-content"
        ></div>
        <van-divider>正文结束</van-divider>
        <!-- 文章评论列表 -->
        <CommentList
          :source="article.art_id"
          @onload-success="totalCommentCount = $event.total_count"
          :list="commentList"
          @reply-click="onReplyClick"
        ></CommentList>
        <!-- /文章评论列表 -->
        <!-- 底部区域 -->
        <div class="article-bottom">
          <van-button
            class="comment-btn"
            type="default"
            round
            size="small"
            @click="isPostShow = true"
            >写评论</van-button
          >
          <van-icon name="comment-o" :badge="totalCommentCount" color="#777" />
          <CollectArticle
            v-model="article.is_collected"
            :articleId="article.art_id"
          ></CollectArticle>
          <LikeArticle
            v-model="article.attitude"
            :articleId="article.art_id"
          ></LikeArticle>

          <van-icon name="share" color="#777777"></van-icon>
        </div>
        <!-- /底部区域 -->

        <!-- 发布评论 -->
        <van-popup v-model="isPostShow" position="bottom">
          <CommentPost
            :target="article.art_id"
            @post-success="onPostSuccess"
          ></CommentPost>
        </van-popup>
        <!-- / 发布评论 -->
      </div>
      <!-- /加载完成-文章详情 -->

      <!-- 加载失败：404 -->
      <div v-else-if="errStatus === 404" class="error-wrap">
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
      </div>
      <!-- /加载失败：404 -->

      <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <div v-else class="error-wrap">
        <van-icon name="failure" />
        <p class="text">内容加载失败！</p>
        <van-button class="retry-btn" @click="loadArticle">点击重试</van-button>
      </div>
      <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->
    </div>

    <!-- 评论回复 -->
    <!-- 弹出层是懒渲染的：只有在第一次展示的时候才会渲染里面的内容，之后他的关闭和显示都是在切换内容的显示和隐藏，我们得用v-if条件判断 -->
    <van-popup v-model="isReplyShow" position="bottom" style="height: 100%">
      <!-- v-if 条件渲染
            true:渲染元素节点
            false:不渲染
      -->
      <CommentReply
        v-if="isReplyShow"
        :comment="currentComment"
        @close="isReplyShow = false"
      ></CommentReply>
    </van-popup>
    <!-- /评论回复 -->
  </div>
</template>

<script>
import { getArticleById } from '@/api/new'
import { ImagePreview } from 'vant'
import { addFollow, deleteFollow } from '@/api/user'
import CollectArticle from '@/components/collect-article/index.vue'
import LikeArticle from '@/components/like-article/index.vue'
import CommentList from './components/comment-list.vue'
import CommentPost from './components/comment-post.vue'
import CommentReply from './components/comment-reply.vue'
export default {
  name: 'ArticleIndex',
  components: {
    CollectArticle,
    LikeArticle,
    CommentList,
    CommentPost,
    CommentReply
  },
  props: {
    // articleId 是由路由传递过来的，使用组件Props进行解耦路由参数
    // 不懂可以看官方文档
    // 如果是从文章点进来的跳转是Number,如果是在url输入地址进来的是String类型

    articleId: {
      type: [Number, String, Object],
      required: true
    }
  },
  data () {
    return {
      // 文章详情
      article: {},
      loading: true, // 加载中的 loading 状态
      errStatus: 0, // 失败的状态码
      followLoading: false,
      totalCommentCount: 0,
      isPostShow: false, // 控制发布评论的弹出层
      commentList: [], // 评论列表
      isReplyShow: false, // 评论回复
      currentComment: {} // 当前点击回复的品论项
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadArticle()
  },
  // 给所有的后代组件提供数据
  // 注意：不要滥用
  provide: function () {
    return {
      articleId: this.articleId
    }
  },
  mounted () {},
  methods: {
    async loadArticle () {
      this.loading = true
      try {
        const { data } = await getArticleById(this.articleId)
        // console.log(data)

        // 模拟报错
        // if (Math.random() > 0.5) {
        //   JSON.parse('asdasfasfafafa')
        // }

        this.article = data.data

        // 初始化图片点击预览
        // 数据驱动视图这件事儿不是立即的，所以logo打印不出来，需要定时器配合
        // console.log(this.$refs['article-content'])
        setTimeout(() => {
          // console.log(this.$refs['article-content'])
          this.previewImage()
        }, 0)
      } catch (error) {
        if (error.response && error.response.status === 404) {
          this.errStatus = 404
        }
      }
      // 无论成功还是失败，都需要关闭 loading
      this.loading = false
    },
    previewImage () {
      // 得到所有的 img 节点
      const articleContent = this.$refs['article-content']
      const imgs = articleContent.querySelectorAll('img')
      // console.log(imgs)

      // 获取所有img地址
      const images = []
      imgs.forEach((img, index) => {
        images.push(img.src)

        // 给每个 img 注册点击事件、在处理函数中调用预览
        img.onclick = () => {
          ImagePreview({
            // 预览的图片地址数组
            images,
            // 起始位置、从 0 开始
            startPosition: index
          })
        }
      })
      // console.log(images)
    },
    async onfollow () {
      this.followLoading = true // 展示关注按钮的 loading 状态
      try {
        if (this.article.is_followed) {
          await deleteFollow(this.article.aut_id)
          // this.article.is_followed = false
        } else {
          await addFollow(this.article.aut_id)
          // this.article.is_followed = true
        }
        this.article.is_followed = !this.article.is_followed
      } catch (error) {
        let message = '操作失败，请刷新'
        if (error.response && error.response.status === 400) {
          message = '你不能关注自己'
        }
        this.$toast(message)
      }
      this.followLoading = false // 关闭关注按钮的 loading 状态
    },
    onPostSuccess (data) {
      // 关闭弹出层
      this.isPostShow = false
      // 将发布内容显示到评论列表顶部
      this.commentList.unshift(data.new_obj)
    },
    onReplyClick (comment) {
      // console.log(comment)
      this.currentComment = comment

      // 显示评论回复弹出层
      this.isReplyShow = true
    }
  }
}
</script>

<style scoped lang="less">
@import './github-markdown.css';
.article-container {
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 92px;
    bottom: 88px;
    overflow-y: scroll;
    background-color: #fff;
  }
  .article-detail {
    .article-title {
      font-size: 40px;
      padding: 50px 32px;
      margin: 0;
      color: #3a3a3a;
    }

    .user-badge {
      padding: 0 32px;
      .avatar {
        width: 70px;
        height: 70px;
        margin-right: 17px;
      }
      .van-cell__label {
        margin-top: 0;
      }
      .user-name {
        font-size: 24px;
        color: #3a3a3a;
      }
      .publish-date {
        font-size: 23px;
        color: #b7b7b7;
      }
      .follow-btn {
        width: 170px;
        height: 58px;
      }
    }

    .article-content {
      padding: 55px 32px;
      /deep/ p {
        text-align: justify;
      }
    }
  }

  .loading-wrap {
    padding: 200px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .error-wrap {
    padding: 200px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    .van-icon {
      font-size: 122px;
      color: #b4b4b4;
    }
    .text {
      font-size: 30px;
      color: #666666;
      margin: 33px 0 46px;
    }
    .retry-btn {
      width: 280px;
      height: 70px;
      line-height: 70px;
      border: 1px solid #c3c3c3;
      font-size: 30px;
      color: #666666;
    }
  }

  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 88px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 282px;
      height: 46px;
      border: 2px solid #eeeeee;
      font-size: 30px;
      line-height: 46px;
      color: #a7a7a7;
    }
    .van-icon {
      font-size: 40px;
      .van-badge {
        font-size: 16px;
        background-color: #e22829;
      }
    }
  }
}
</style>
