<template>
  <div class="user-profile">
    <!-- 导航栏 -->
    <van-nav-bar
      title="个人信息"
      class="page-nav-bar"
      left-arrow
      @click-left="$router.back()"
    />
    <!-- input:file的属性 hidden：隐藏input：file -->
    <!-- accept:显示file选择的文件后缀名 -->
    <!-- accept=".png,.jfif,.jpg" -->
    <!-- @change选择文件成功 -->
    <input type="file" hidden ref="file" @change="onFileChange" />
    <!-- 个人信息 -->
    <van-cell title="头像" is-link center @click="$refs.file.click()">
      <van-image class="avatar" fit="cover" round :src="user.photo" />
    </van-cell>
    <van-cell
      title="昵称"
      :value="user.name"
      is-link
      @click="isUpdateNameShow = true"
    />
    <van-cell
      title="性别"
      :value="user.gender == 0 ? '男' : '女'"
      is-link
      @click="isUpdateGenderShow = true"
    />
    <van-cell
      title="生日"
      :value="user.birthday"
      is-link
      @click="isUpdateBirthdayShow = true"
    />

    <!-- 编辑昵称 -->
    <van-popup
      v-model="isUpdateNameShow"
      style="height: 100%"
      position="bottom"
    >
      <updataName
        v-if="isUpdateNameShow"
        @close="isUpdateNameShow = false"
        v-model="user.name"
      ></updataName>
    </van-popup>

    <!-- 编辑性别 -->
    <van-popup v-model="isUpdateGenderShow" position="bottom">
      <updataGender
        @close="isUpdateGenderShow = false"
        v-model="user.gender"
        v-if="isUpdateGenderShow"
      ></updataGender>
    </van-popup>

    <!-- 编辑生日 -->
    <van-popup v-model="isUpdateBirthdayShow" position="bottom">
      <updateirthday
        v-if="isUpdateBirthdayShow"
        v-model="user.birthday"
      ></updateirthday>
    </van-popup>

    <!-- 编辑头像 -->
    <van-popup
      v-model="isUpdatePhotoShow"
      position="bottom"
      style="height: 100%"
    >
      <!-- $event接收子组件传过来的值 -->
      <UpdatePhotoShow
        v-if="isUpdatePhotoShow"
        :img="img"
        @close="isUpdatePhotoShow = false"
        @update-photo="user.photo = $event"
      ></UpdatePhotoShow>
    </van-popup>
  </div>
</template>

<script>
import { getUserProfile } from '@/api'
import updataName from './components/updata-name.vue'
import updataGender from './components/updata-gender.vue'
import updateirthday from './components/Update-BirthdayShow.vue'
import UpdatePhotoShow from './components/UpdatePhotoShow.vue'
export default {
  name: 'userProfile',
  data () {
    return {
      user: {}, // 个人信息
      isUpdateNameShow: false,
      isUpdateGenderShow: false,
      isUpdateBirthdayShow: false,
      isUpdatePhotoShow: false,
      img: null // 预览的图片
    }
  },
  components: {
    updataName,
    updataGender,
    updateirthday,
    UpdatePhotoShow
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
        this.$toast.fail('数据获取失败,请刷新')
      }
    },
    onFileChange (e) {
      // 用户选择图片后如何显示图片?
      // 1. 获取file对象  --> e.target.files
      // 2. 把file对象转成img的src可识别的格式
      //    - objectUrl  --> URL.createObjectUrl(file对象)
      // - 缺点: 内存泄露  因为跟document绑定在一起
      // - 优点: 写法简单
      //    - Base64   --> FileReader(读文件对象)
      // - fr.readAsDataURL(file)
      // - fr.onload = (e)=>{  e.target.result  }
      // 1.获取文件对象
      // 获取文件对象第二种方法
      // - e.target 触发事件元素
      // - file.files 伪数组，存储的用户选择所有的文件对象
      const file = this.$refs.file.files[0]

      // 2. 把file文件对象处理完成img标签可识别的url
      // 基于文章对象获取blob数据
      this.img = window.URL.createObjectURL(file)

      // 3.展示预览图片弹出层
      this.isUpdatePhotoShow = true

      // 4.file-input 如果选了同一个文件不会触发 change 事件
      // 解决办法就是每次使用完毕，把它的value清空
      this.$refs.file.value = ''
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
