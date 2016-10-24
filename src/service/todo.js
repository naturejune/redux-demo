export default {
  getTodos() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(['server action', 'server reducer', 'server store'])
      }, 300)
    })
  }
}