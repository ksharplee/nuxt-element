export const state = () => ({
  roles: {
    status: 0,
    data: []
  }
})

export const mutations = {
  'SET_ROLES' (state, payload) {
    state.roles = payload
  }
}

export const actions = {
  async login (context, payload) {
    try {
      const res = await this.$auth.loginWith('local', {
        data: payload
      })
      if (res) {
        const user = res.data.data
        this.$auth.setUser(user)
        this.$auth.$storage.setUniversal('user', user, true)
        return Promise.resolve(true)
      } else {
        return Promise.reject(new Error('登录失败'))
      }
    } catch (error) {
      return Promise.reject(error)
    }
  },
  async register (context, payload) {
    try {
      const res = await this.$axios.post('/register', payload)
      if (res) {
        this.$auth.setUserToken(res.data.token)
        this.$auth.setUser(res.data.data)
        this.$auth.$storage.setUniversal('user', res.data.data, true)
        return Promise.resolve(true)
      } else {
        return Promise.reject(new Error('注册失败'))
      }
    } catch (error) {
      return Promise.reject(error)
    }
  },
  async getRoles (context, payload) {
    if (context.state.roles.status) { return }
    try {
      const res = await this.$axios('/roles/list', payload)
      if (res) {
        context.commit('SET_ROLES', res.data)
        return Promise.resolve(true)
      } else {
        return Promise.reject(new Error('获取数据出错了'))
      }
    } catch (error) {
      return Promise.reject(error)
    }
  }
}
