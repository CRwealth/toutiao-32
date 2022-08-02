<template>
  <div>
    <van-pull-refresh
      v-model="refreshLoading"
      @refresh="loadNextPafeArticle"
      success-text="刷新成功"
    >
      <van-list
        v-model="loading"
        @load="loadNextPafeArticle"
        offset="0"
        :immediate-check="false"
        :finished="isFinished"
        finished-text="没有更多文章了"
        :error.sync="error"
        error-text="加载文章失败，点击重新加载"
      >
        <Article
          v-for="item in articles"
          :key="item.art_id"
          :acticleInfo="item"
        ></Article>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
// loading为false的时候 可以触发load时间 loading为ture的时候不可以触发load事件
// 触发 load 事件 ，自动将loading为ture
import { getArticleAPI } from '@/api'
import Article from '@/components/Article.vue'
export default {
  name: 'ArticleList',
  data () {
    return {
      articles: [],
      pre_timestamp: '',
      loading: false,
      isFinished: false,
      error: false,
      refreshLoading: false
    }
  },
  components: {
    Article
  },
  props: {
    id: {
      type: [String, Number],
      required: true
    }
  },
  created () {
    this.getFirstPageArticle()
  },
  methods: {
    // 获取第一页的数据
    async getFirstPageArticle () {
      try {
        const { data } = await getArticleAPI(this.id, +new Date())
        console.log(data)
        this.articles = data.data.results
        // 保存下一页的时间戳
        this.pre_timestamp = data.data.pre_timestamp
      } catch (error) {
        this.$toast.fail('请刷新网页')
      }
    },
    // 加载下一页文章
    async loadNextPafeArticle () {
      try {
        // 设置错误，测试重新加载
        // if (Math.random() < 0.5) {
        //   console.log(a)
        // }
        // 1.发送请求
        const { data } = await getArticleAPI(this.id, this.pre_timestamp)

        // 判断是否加载完成
        const timestamp = data.data.pre_timestamp
        if (timestamp === null) {
          this.isFinished = true
        }
        const results = data.data.results
        // 2.存储数据
        if (this.refreshLoading) {
          this.articles.unshift(...results)
        } else {
          this.articles.push(...results)
        }

        // 3.更新时间戳
        this.pre_timestamp = timestamp

        console.log(data)
      } catch (error) {
        this.error = true
      } finally {
        // 4.更新loading
        this.loading = false
        this.refreshLoading = false
      }
    }
  }
}
</script>

<style></style>
