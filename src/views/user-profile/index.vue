<template>
  <div class="user-profile">
    <!-- 导航栏 -->
    <van-nav-bar
      title="个人信息"
      class="page-nav-bar"
      left-arrow
      @click-left="$router.back()"
    />
    <!-- 个人信息 -->
    <van-cell title="头像" is-link>
      <van-image
        class="avatar"
        fit="cover"
        round
        src="https://img01.yzcdn.cn/vant/cat.jpeg"
      />
    </van-cell>
    <van-cell title="昵称" value="内容" is-link />
    <van-cell title="性别" value="内容" is-link />
    <van-cell title="生日" value="内容" is-link />
  </div>
</template>

<script>
import { getUserProfile } from '@/api'
export default {
  name: 'userProfile',
  data () {
    return {
      user: {} // 个人信息
    }
  },
  created () {
    this.loadUserProfile()
  },
  methods: {
    async loadUserProfile () {
      try {
        const { data } = await getUserProfile()
        console.log(data)
        this.user = data.data
      } catch (error) {
        this.$toast('数据获取失败')
      }
    }
  }
}
</script>

<style lang="less" scoped>
:deep(.page-nav-bar) {
  background-color: #5094f3;
}
:deep(.van-nav-bar__title) {
  color: #fff;
}
:deep(.van-nav-bar .van-icon) {
  color: #fff;
}
.user-profile {
  .avatar {
    width: 60px;
    height: 60px;
  }
}
</style>
