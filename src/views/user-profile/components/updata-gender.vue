<template>
  <div class="updata-gender">
    <van-picker
      title="标题"
      show-toolbar
      :columns="columns"
      @cancel="$emit('close')"
      @confirm="onConfirm"
      @change="onPickerChange"
      :default-index="value"
    />
  </div>
</template>

<script>
import { updataUserProfile } from '@/api/user'
export default {
  name: 'updataGender',
  props: {
    value: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      columns: ['男', '女'],
      localGender: this.value
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
        const localGender = this.localGender
        await updataUserProfile({
          gender: localGender
        })

        // 更新视图
        this.$emit('input', localGender)
        // 关闭弹层
        this.$emit('close')
        // 提示成功
        this.$toast.success('更新完成')
      } catch (error) {
        this.$toast.fail('更新失败')
      }
    },
    onPickerChange (picker, value, index) {
      this.localGender = index
    }
  }
}
</script>

<style></style>
