export const state = () => ({
  list: [],
  groups: [],
  attrs: []
})

export const mutations = {
  'SET_LIST' (state, payload) {
    state.list = payload
  },
  'SET_GROUPS' (state, payload) {
    state.groups = payload
  },
  'SET_ATTRS' (state, payload) {
    state.attrs = payload
  }
}

export const actions = {
  async getGroups (context, payload) {
    try {
      const res = await this.$axios('/groups/list', payload)
      if (res) {
        context.commit('SET_GROUPS', res.data.data)
        return Promise.resolve(true)
      } else {
        return Promise.reject(new Error('获取数据出错了'))
      }
    } catch (error) {
      return Promise.reject(error)
    }
  },
  async addGroup (context, payload) {
    try {
      const res = await this.$axios.post('/groups/add', payload)
      if (res) {
        return Promise.resolve(res.data)
      }
    } catch (error) {
      return Promise.reject(error)
    }
  },
  async editGroup (context, payload) {
    try {
      const res = await this.$axios.put(
               `/groups/${payload.id}`,
               payload
      )
      if (res) {
        return Promise.resolve(res.data)
      }
    } catch (error) {
      return Promise.reject(error)
    }
  },
  async removeGroup (context, payload) {
    try {
      const res = await this.$axios.delete(`/groups/${payload}`)
      if (res) {
        return Promise.resolve(res.data)
      } else {
        return Promise.reject(new Error('删除分组失败'))
      }
    } catch (error) {
      return Promise.reject(error)
    }
  },
  async getAttrs (context, payload) {
    try {
      const res = await this.$axios('/attrs/list', payload)
      if (res) {
        context.commit('SET_ATTRS', res.data.data)
        return Promise.resolve(true)
      } else {
        return Promise.reject(new Error('获取数据出错了'))
      }
    } catch (error) {
      return Promise.reject(error)
    }
  },
  async addAttr (context, payload) {
    try {
      const res = await this.$axios.post('/attrs/add', payload)
      if (res) {
        return Promise.resolve(res.data)
      }
    } catch (error) {
      return Promise.reject(error)
    }
  },
  async getList (context, payload) {
    try {
      const res = await this.$axios('/cates/list', payload)
      if (res) {
        context.commit('SET_LIST', res.data.data)
        return Promise.resolve(true)
      } else {
        return Promise.reject(new Error('获取数据出错了'))
      }
    } catch (error) {
      return Promise.reject(error)
    }
  },
  async getListRoot (context, payload) {
    try {
      const res = await this.$axios('/cates/list', payload)
      if (res) {
        return Promise.resolve(res.data)
      } else {
        return Promise.reject(new Error('获取数据出错了'))
      }
    } catch (error) {
      return Promise.reject(error)
    }
  },
  async getById (context, payload) {
    try {
      const res = await this.$axios(`/cates/${payload}`)
      if (res) {
        return Promise.resolve(res.data)
      } else {
        return Promise.reject(new Error('获取数据出错了'))
      }
    } catch (error) {
      return Promise.reject(error)
    }
  },
  async addCate (context, payload) {
    try {
      const res = await this.$axios.post('/cates/add', payload)
      if (res) {
        return Promise.resolve(res.data)
      }
    } catch (error) {
      return Promise.reject(error)
    }
  },
  async editCate (context, payload) {
    try {
      const res = await this.$axios.put(`/cates/${payload.id}`, payload)
      if (res) {
        return Promise.resolve(res.data)
      }
    } catch (error) {
      return Promise.reject(error)
    }
  },
  async removeCate (context, payload) {
    try {
      const res = await this.$axios.delete(`/cates/${payload}`)
      if (res) {
        return Promise.resolve(res.data)
      } else {
        return Promise.reject(new Error('删除分类失败'))
      }
    } catch (error) {
      return Promise.reject(error)
    }
  }
}
