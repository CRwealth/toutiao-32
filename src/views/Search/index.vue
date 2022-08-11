<template>
  <div class="search-container">
    <!-- 搜索框 -->
    <form action="/" class="search-form">
      <van-search
        v-model.trim="keyword"
        show-action
        background="#5094f3"
        placeholder="请输入搜索关键词"
        class="search"
        @search="onSearch"
        @focus="onSearchFocus"
        @cancel="$router.back()"
      />
    </form>

    <!-- 搜索历史/建议/结果 -->
    <!-- <SearchSuggestion></SearchSuggestion>
    <SearchResult></SearchResult>
    <SearchHistory></SearchHistory> -->
    <!-- is指定动态组件的名字，字符串，并且名字应该从components -->
    <component
      :is="componentName"
      :keyword="keyword"
      @search="onSearch"
      :search-histories="searchHistories"
      @clear-search-histories="searchHistories = []"
    ></component>
  </div>
</template>

<script>
// 引入组件
import SearchSuggestion from './components/SearchSuggestion.vue'
import SearchResult from './components/SearchResult.vue'
import SearchHistory from './components/SearchHistory.vue'
import storage from '@/utils/storage'
export default {
  name: 'SearchIndex',
  components: {
    SearchSuggestion,
    SearchResult,
    SearchHistory
  },
  data () {
    return {
      keyword: '',
      // 用于记录用户是否搜索了
      isSearchResult: false,
      // 获取本地存储的数据，注意第一次没本地数据，要设置一个空数组
      searchHistories: storage.get('TOUTIAO_SEARCH_HISTORIES') || [] // 搜索的历史记录数据
    }
  },
  computed: {
    componentName () {
      // 如果输入的是空的字符串那么渲染的是搜索历史
      if (this.keyword === '') {
        return 'SearchHistory'
      }
      if (this.isSearchResult) {
        // 当isSearchResult为true的时候，说明用户按下搜索键，那么渲染搜索结果
        return 'SearchResult'
      }
      // 既不现实搜索历史，也不显示搜索结果
      return 'SearchSuggestion'
    }
  },
  watch: {
    // 监视数组发生变化，用与存储本地
    // 简写
    // value是监听到最新的数据
    searchHistories (value) {
      storage.set('TOUTIAO_SEARCH_HISTORIES', value)
    }
    // 常规写
    // searchHistories{
    //   handler(){}
    // }
  },
  methods: {
    // 搜索
    onSearch (val) {
      // 更新文本框内容
      this.keyword = val
      // 存储搜索历史记录
      // 要求：不要有重复历史数据，最新的记录排在最前面
      const index = this.searchHistories.indexOf(val)
      if (index !== -1) {
        this.searchHistories.splice(index, 1)
      }
      this.searchHistories.unshift(val)
      // 用户搜索了，显示搜索结果
      this.isSearchResult = true
    },
    // 当用户聚焦了搜索框
    onSearchFocus () {
      // 如果keyword为'' 显示搜索历史
      // 如果keyword有值,显示搜索建议
      this.isSearchResult = false
    }
  }
}
</script>

<style scoped lang="less">
// 搜索框样式
.search {
  [role='button'] {
    color: #fff;
  }
}
.search-container {
  padding-top: 108px;
  .search-form {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
  }
}
</style>
