/**
 * 测试 monorepo 架构
 * @param msg
 */
export function testHelloMonoRepo(msg = 'World') {
  const str = ` Hello ${msg} Monorepo TypeScript Function!`
  console.log(str)
  return str
}
