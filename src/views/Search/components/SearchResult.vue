<template>
  <div class="search-result">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了..."
      @load="onLoad"
    >
      <van-cell
        v-for="(item, index) in list"
        :key="index"
        :title="item.title"
      ></van-cell>
    </van-list>
  </div>
</template>

<script>
import { getSearchResult } from '@/api/search'
export default {
  props: {
    keyword: {
      type: String,
      required: true
    }
  },
  name: 'SearchResult',
  data () {
    return {
      list: [],
      page: 1,
      per_page: 20,
      loading: false,
      finished: false
    }
  },

  methods: {
    async onLoad () {
      try {
        // 1.请求获取数据
        const { data } = await getSearchResult({
          page: this.page, // 页数，不传默认为1
          per_page: this.per_page, // 每页数量，不传每页数量由后端决定
          q: this.keyword // 搜索关键词
        })
        // console.log(data)
        //  console.log(data)
        // 2.将数组添加到数组列表中
        const { results } = data.data

        this.list.push(...results)

        // 3.将本次加载中的loading 关闭
        this.loading = false
        // 4.判断是否还有数据
        if (results.length) {
          // 如果有，则更新获取下一个数据的页码
          this.page++
        } else {
          // 如果没有，则将加载状态 finished 设置为结束
          this.finished = true
        }
      } catch (error) {
        this.$toast.fail('数据加载失败，请刷新')
      }
    }
  }
}
</script>

<style lang="less" scoped></style>
