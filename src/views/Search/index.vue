<template>
  <div>
    <!-- 搜索框 -->
    <form action="/">
      <van-search
        v-model.trim="keyword"
        show-action
        background="#5094f3"
        placeholder="请输入搜索关键词"
        class="search"
        @search="onSearch"
        @focus="onSearchFocus"
      />
    </form>

    <!-- 搜索历史/建议/结果 -->
    <!-- <SearchSuggestion></SearchSuggestion>
    <SearchResult></SearchResult>
    <SearchHistory></SearchHistory> -->
    <!-- is指定动态组件的名字，字符串，并且名字应该从components -->
    <component :is="componentName" :keyword="keyword"></component>
  </div>
</template>

<script>
// 引入组件
import SearchSuggestion from './components/SearchSuggestion.vue'
import SearchResult from './components/SearchResult.vue'
import SearchHistory from './components/SearchHistory.vue'
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
      isSearchResult: false
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
  methods: {
    // 搜索
    onSearch () {
      console.log('搜索')
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
</style>
