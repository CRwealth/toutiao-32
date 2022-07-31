<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
// 移动端适配
// 1.rem动起来
// amfe-flexible
// 2.将px-->rem
// postcss-pxtorem

// Content-Type 内容类型
export default {
  name: 'App'
}
</script>

<style lang="less" scoped></style>
