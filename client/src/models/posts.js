export default {
  state: {
    selected: []
  },
  reducers: {
    addSelect(state, id) {
      state.selected.push(id)
    },
    clearSelect(state) {
      state.selected = []
    }
  }
}
