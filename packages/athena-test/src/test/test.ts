/**
 * 测试 monorepo 架构
 * @param msg
 */
export function testHelloMonoRepo(msg = 'world') {
  const str = ` hello ${msg} monorepo function!`
  console.log(str)
  return str
}
