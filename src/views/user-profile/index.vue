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
      <van-image class="avatar" fit="cover" round :src="user.photo" />
    </van-cell>
    <van-cell
      title="昵称"
      :value="user.name"
      is-link
      @click="isUpdateNameShow = true"
    />
    <van-cell title="性别" :value="user.gender === 0 ? '男' : '女'" is-link />
    <van-cell title="生日" :value="user.birthday" is-link />

    <!-- 编辑昵称 -->
    <van-popup
      v-model="isUpdateNameShow"
      style="height: 100%"
      position="bottom"
      get-container="body"
    >
      <updataName
        v-if="isUpdateNameShow"
        @close="isUpdateNameShow = false"
        v-model="user.name"
      ></updataName>
    </van-popup>
  </div>
</template>

<script>
import { getUserProfile } from '@/api'
import updataName from './components/updata-name.vue'
export default {
  name: 'userProfile',
  data () {
    return {
      user: {}, // 个人信息
      isUpdateNameShow: false
    }
  },
  components: {
    updataName
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

:deep(.van-nav-bar .van-icon) {
  color: #fff;
}

.user-profile {
  :deep(.van-nav-bar__title) {
    color: #fff;
  }
  .avatar {
    width: 60px;
    height: 60px;
  }
}
.user-profile {
  width: 100%;
  height: 17rem;
  background-color: #f5f7f9;
}
.van-popup {
  background-color: #f5f7f9;
}
</style>
