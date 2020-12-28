export const state = () => ({
  list: {
    status: 0,
    data: [],
    total: 0,
    timeStamp: null
  }
})

export const mutations = {
  'SET_LIST' (state, payload) {
    state.list = payload
  }
}

export const actions = {
  async getList (context, payload) {
    try {
      const res = await this.$axios('/users/list', payload)
      if (res) {
        context.commit('SET_LIST', res.data)
        return Promise.resolve(true)
      } else {
        return Promise.reject(new Error('获取数据出错了'))
      }
    } catch (error) {
      return Promise.reject(error)
    }
  },
  async getById (context, payload) {
    try {
      const res = await this.$axios(`/users/${payload}`)
      if (res) {
        return Promise.resolve(res.data)
      } else {
        return Promise.reject(new Error('获取数据出错了'))
      }
    } catch (error) {
      return Promise.reject(error)
    }
  },
  async addUser (context, payload) {
    try {
      const res = await this.$axios.post('/users/add', payload)
      if (res) {
        return Promise.resolve(res.data)
      }
    } catch (error) {
      return Promise.reject(error)
    }
  },
  async editUser (context, payload) {
    try {
      const res = await this.$axios.put(`/users/${payload.id}`, payload)
      if (res) {
        return Promise.resolve(res.data)
      }
    } catch (error) {
      return Promise.reject(error)
    }
  },
  async removeUser (context, payload) {
    try {
      const res = await this.$axios.delete(`/users/${payload}`)
      if (res) {
        return Promise.resolve(res.data)
      } else {
        return Promise.reject(new Error('获取数据出错了'))
      }
    } catch (error) {
      return Promise.reject(error)
    }
  }
}
