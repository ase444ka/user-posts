export default {
  set(itemName, value) {
    localStorage.setItem(itemName, JSON.stringify(value));
  },

  get(itemName) {
    const json = localStorage.getItem(itemName);
    if (!json) {
      return null
    } else {
      return JSON.parse(json)
    }
  }
}

