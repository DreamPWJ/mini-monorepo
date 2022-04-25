// package.json script 中 && 连接符前不能有空格 unix与windows环境的设置方式是不同的
// windows x上 set NODE_ENV=test && npm run build:weapp -- --watch
// unix上 export NODE_ENV=test &&
module.exports = {
  env: {
    NODE_ENV: '"test"',
    BASE_URL: '"http://test.com"',
    IS_DEBUG: 'true'
  },
  defineConstants: {},
  mini: {},
  h5: {}
}
