function testHello(msg = 'world') {
  const str = `hello ${msg}!`
  console.log(str)
  return str
}

export { testHello }
