import ramda from '@/assets/js/ramda'

export default (context, inject) => {
  // Inject $R in Vue, context and store.
  inject('R', () => ramda)
}
