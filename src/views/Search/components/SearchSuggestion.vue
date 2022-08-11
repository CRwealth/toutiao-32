<template>
  <div>
    <van-cell
      icon="search"
      v-for="(item, index) in highlightSuggestions"
      :key="index"
      @click="search(index)"
    >
      <template #title>
        <span v-html="item"></span>
      </template>
    </van-cell>
  </div>
</template>

<script>
import { getSearchSuggetionAPI } from '@/api'
import { debounce } from 'lodash'
// 1.动态正则
// - 字面量 /aasdasd/ig
// - new RegExp(变量，'ig')

// 2.字符串的replace
// 'Auglar'.replace(/a/ig,function(match){
//   return `<span>${match}</span>`
// })
// 1.第一个参数可以是正则
// 2.第二个参数可以是函数，函数的返回值是要替换的字符串
// 3.match:正则匹配上的字符
export default {
  props: {
    keyword: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      suggetion: []
    }
  },
  computed: {
    // map:映射 返回一个新数组，新数组的长度和原数组一样
    highlightSuggestions () {
      const reg = new RegExp(this.keyword, 'ig')
      return this.suggetion.map((str) =>
        str.replace(
          reg,
          (match) => `<span style="color:red">${match}</span>
      `
        )
      )
    }
  },
  watch: {
    keyword: {
      // 立即监听
      immediate: true,
      handler () {
        this.getSearchSuggetion()
      }
    }
  },
  methods: {
    // 获取搜索建议
    // 防抖
    // 1.延迟执行
    // 2.干掉上一次的定时器
    //  -clearTimeout（id）

    // 处理搜索建议+防抖
    // 单一职责原则

    getSearchSuggetion: debounce(async function () {
      try {
        const { data } = await getSearchSuggetionAPI(this.keyword)
        // console.log(data)
        this.suggetion = data.data.options.filter(Boolean)
      } catch (error) {
        this.$toast.fail('获取搜索建议失败')
      }
    }, 300),
    search (index) {
      const data = this.suggetion[index]
      this.$emit('search', data)
    }
  }
}
</script>

<style></style>
