<template>
  <div class="updata-name">
    <!-- 导航栏 -->
    <van-nav-bar
      class="nc"
      title="设置昵称"
      left-text="取消"
      right-text="完成"
      @click-left="$emit('close')"
      @click-right="onConfirm"
    />
    <!-- 输入框 -->
    <div class="field-wrap">
      <van-field
        v-model.trim="localName"
        rows="2"
        autosize
        type="textarea"
        maxlength="7"
        placeholder="请输入昵称"
        show-word-limit
      />
    </div>
  </div>
</template>

<script>
import { updataUserProfile } from '@/api/user'
export default {
  name: 'updataName',
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      localName: this.value
    }
  },
  methods: {
    async onConfirm () {
      this.$toast.loading({
        message: '保存中...',
        forbidClick: true, // 禁止背景点击
        duration: 0 // 持续展示
      })
      try {
        const localName = this.localName
        if (!localName.length) {
          this.$toast('昵称不能为空')
          return
        }
        const { data } = await updataUserProfile({
          name: localName
        })
        console.log(data)
        // 更新视图
        this.$emit('input', localName)
        // 关闭弹层
        this.$emit('close')
        // 提示成功
        this.$toast.success('更新完成')
      } catch (error) {
        this.$toast.fail('更新失败')
      }
    }
  }
}
</script>

<style lang="less" scpoed>
.user-profile {
  .updata-name {
    :deep(.van-nav-bar__title) {
      color: #fff;
    }
  }
}
.field-wrap {
  padding: 20px;
}
</style>
