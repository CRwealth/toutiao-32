<template>
  <div class="my">
    <!-- 头部区域 -->
    <header>
      <!-- 登录的盒子 -->
      <div class="login" v-if="isLogin">
        <div></div>
        <div class="two">
          <div class="left">
            <img src="../../assets/images/cx.webp" alt="" />
            <span>洪涛11</span>
          </div>
          <div class="right">
            <van-button size="mini" round class="edit">编辑资料</van-button>
          </div>
        </div>
        <div class="three">
          <div>
            <span>5029</span>
            <span>头条</span>
          </div>
          <div>
            <span>16</span>
            <span>粉丝</span>
          </div>
          <div>
            <span>0</span>
            <span>关注</span>
          </div>
          <div>
            <span>0</span>
            <span>获赞</span>
          </div>
        </div>
      </div>
      <!-- 未登录的盒子 -->
      <div class="logout" v-else @click="$router.push('/login')">
        <div class="container">
          <img src="../../assets/images/mobile.png" alt="" />
          <span>登录 / 注册</span>
        </div>
      </div>
    </header>
    <!-- 中间 -->
    <main>
      <!-- 历史收藏消息通知 -->
      <div class="collect">
        <van-grid :column-num="2" :border="false">
          <van-grid-item icon="star-o" text="收藏" />
          <van-grid-item icon="clock-o" text="历史" />
        </van-grid>
      </div>
      <div class="notice">
        <van-nav-bar>
          <template #left>
            <span>消息通知</span>
          </template>
          <template #right>
            <van-icon name="arrow" />
          </template>
        </van-nav-bar>
        <van-nav-bar>
          <template #left>
            <span>小智同学</span>
          </template>
          <template #right>
            <van-icon name="arrow" />
          </template>
        </van-nav-bar>
      </div>
    </main>
    <!-- 底部 -->
    <footer>
      <!-- 退出按钮 -->
      <div class="footer" @click="logout">
        <span>退出</span>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'myIndex',
  // data() {
  //   return {
  //     isLogin: !!this.$store.state.tokenObj.token
  //   }
  // }
  computed: {
    isLogin () {
      // 一个！是取反 两个！！ 是转换成布尔值
      return !!this.$store.state.tokenObj.token
    }
  },
  methods: {
    logout () {
      // this.$store.commit('SET_TOKEN', {})
      this.$dialog
        .confirm({
          title: '黑马头条',
          message: '是否确认退出该账户？'
        })
        .then(() => {
          // on confirm
          this.$store.commit('SET_TOKEN', {})
        })
        .catch(() => {
          // on cancel
        })
    }
  }
}
</script>

<style scoped lang="less">
.my {
  height: 100%;
  background-color: #f5f7f9;
  .logout {
    width: 750px;
    height: 401px;
    background: url(http://110.42.202.109/toutiao/img/banner.d4257372.png)
      no-repeat 0 0;
    background-size: contain;
    display: flex;
    .container {
      height: 175px;
      width: 145px;
      display: flex;
      flex-direction: column;
      margin: auto;
      img {
        margin: 0 6px;
      }
      span {
        margin-top: 15px;
        font-size: 28px;
        color: #fff;
      }
    }
  }
  .login {
    width: 750px;
    height: 401px;
    background: url(http://110.42.202.109/toutiao/img/banner.d4257372.png)
      no-repeat 0 0;
    background-size: contain;
    display: flex;
    flex-direction: column;
    div {
      flex: 1;
      &.two {
        display: flex;
        div {
          flex: 1;
          &.left {
            display: flex;
            align-items: center;
            img {
              width: 120px;
              height: 120px;
              margin: 0 22px;
            }
            span {
              font-size: 30px;
              color: #fff;
            }
          }
          &.right {
            position: relative;
            .edit {
              position: absolute;
              right: 33px;
              top: 50%;
              transform: translateY(-50%);
              width: 116px;
              height: 33px;
              background-color: #ffffff;
              border-radius: 16px;
              .van-button__text {
                font-size: 20px;
                color: #666666;
              }
            }
          }
        }
      }
      &.three {
        display: flex;
        div {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          span {
            color: #fff;
            font-size: 23px;
            &:nth-child(1) {
              font-size: 32px;
            }
          }
        }
      }
    }
  }
}
:deep(.collect) {
  background-color: #fff;
  .van-grid-item:nth-child(1) {
    .van-grid-item__icon {
      color: #eb5253;
    }
  }
  .van-grid-item__text {
    font-size: 28px;
  }
  .van-grid-item__icon {
    color: #ff9d1d;
  }
  .van-grid-item__content {
    box-sizing: border-box;
    margin: 0.42667rem 0.21333rem;
    padding: 0;
    height: 80px;
  }
  .van-grid-item:nth-child(1) .van-grid-item__content {
    border-right: 1px solid #eee;
  }
}
:deep(.notice) {
  margin: 10px 0;
  .van-nav-bar__content {
    height: 100px;
    margin-left: 10px;
    .van-nav-bar__left {
      font-size: 30px;
    }
    .van-icon {
      color: #9f9f9f;
    }
  }
}
.footer {
  height: 104px;
  width: 100%;
  background-color: #fff;
  text-align: center;
  line-height: 104px;
  color: #d86262;
  font-size: 30px;
}
.left img {
  border-radius: 50%;
}
.my {
  background-color: #f5f7f9;
  height: calc(100vh - 1.33333rem);
}
</style>
