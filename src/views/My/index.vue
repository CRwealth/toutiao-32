<template>
  <div>
    <!-- 头部区域 -->
    <header>
      <div class="login" v-if="isLogin">登录盒子</div>
      <div class="logout" v-else>未登录盒子</div>
    </header>

    <!-- 中间 -->
    <main>675576</main>

    <!-- 底部 -->
    <footer>
      <button v-if="isLogin" @click="logout">退出</button>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'myIndex',
  computed: {
    isLogin () {
      return !!this.$store.state.tokenObj.token
    }
  },
  methods: {
    logout () {
      // 清除token
      this.$store.commit('SET_TOKEN', {})
    }
  }
}
</script>

<style></style>
