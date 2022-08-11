module.exports = {
  plugins: {
    autoprefixer: {
      browsers: ['Android >= 4.0', 'iOS >= 8']
    },
    // 根节点的rem的大小
    // rootValue:37.5
    'postcss-pxtorem': {
      rootValue: ({ file }) => (/vant/i.test(file) ? 37.5 : 75),
      propList: ['*'],

      // 配置不要转换的样式资源
      exclude: 'github-markdown'
    }
  }
}
