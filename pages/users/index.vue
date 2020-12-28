<template>
  <div>
    <div class="pb-3 d-flex align-items-center">
      <el-dropdown trigger="click" class="mr-4" @command="getUsersByStatus">
        <span class="el-dropdown-link">
          {{ currentStatus }}
          <i class="el-icon-arrow-down el-icon--right" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item
            v-for="status in statuses"
            :key="status.id"
            :class="statusId === status.id ? 'bg-light' : ''"
            :command="{ status: status.id, name: status.name }"
          >
            {{ status.name }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-dropdown trigger="click" class="mr-4" @command="getUsersByRole">
        <span class="el-dropdown-link">
          {{ currentRole }}
          <i class="el-icon-arrow-down el-icon--right" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item
            v-for="role in roles"
            :key="role.id"
            :class="currentRole === role.name ? 'bg-light' : ''"
            :command="{ id: role.id, name: role.name }"
          >
            {{ role.name }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <div>
        <el-input v-model="search" placeholder="请输入用户名" size="medium" clearable @clear="getUsersByName">
          <el-button slot="append" size="mini" icon="el-icon-search" @click="getUsersByName" />
        </el-input>
      </div>
      <div class="ml-auto">
        <el-button
          type="primary"
          size="medium"
          @click="$router.push('/users/0')"
        >
          新增
        </el-button>
      </div>
    </div>
    <el-table :data="tableData.data" stripe border class="w-100">
      <el-table-column prop="id" label="ID" min-width="180" />
      <el-table-column prop="userName" label="用户名" min-width="180" />
      <el-table-column prop="userRoles" label="角色" min-width="180">
        <template slot-scope="scope">
          {{ scope.row.userRoles | role }}
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态" min-width="180">
        <template slot-scope="scope">
          {{ scope.row.status === 1 ? "启用" : "停用" }}
        </template>
      </el-table-column>
      <el-table-column prop="createdAt" label="注册时间" min-width="220" />
      <el-table-column align="right" label="操作" min-width="220">
        <template slot-scope="scope">
          <el-button
            :disabled="disableBtn(scope.row)"
            size="mini"
            @click="handleEdit(scope.$index, scope.row)"
          >
            编辑
          </el-button>
          <el-button
            :disabled="disableBtn(scope.row)"
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'Users',
  filters: {
    role (arr) {
      return arr.length ? arr.map(item => item.name).join(',') : '无'
    }
  },
  async fetch () {
    await this.$store.dispatch('users/getList', {
      params: {
        ...this.$route.query,
        p: this.$route.query.p || 1,
        pageSize: process.env.PAGE_SIZE,
        timeStamp: this.tableData.timeStamp
      }
    })
    await this.$store.dispatch('getRoles')
  },
  data () {
    return {
      search: '',
      statuses: [
        {
          id: -1,
          name: '全部状态'
        },
        {
          id: 0,
          name: '停用'
        },
        {
          id: 1,
          name: '启用'
        }

      ]
    }
  },
  computed: {
    tableData () {
      return this.$store.state.users.list
    },
    roles () {
      return this.$R().prepend({
        id: -1,
        name: '全部角色'
      }, this.$store.state.roles.data)
    },
    statusId () {
      return this.$route.query.status ? +this.$route.query.status : -1
    },
    currentStatus () {
      return this.$R().prop('name', this.$R().find(this.$R().propEq('id', this.statusId), this.statuses))
    },
    roleId () {
      return this.$route.query.role ? +this.$route.query.role : -1
    },
    currentRole () {
      return this.$R().prop('name', this.$R().find(this.$R().propEq('id', this.roleId), this.roles))
    }
  },
  watch: {
    '$route.query': '$fetch'
  },
  created () {
    this.$store.commit('SET_BREADCRUMBS', [
      {
        text: '客户列表',
        router: null
      }
    ])
  },
  methods: {
    handleEdit (index, row) {
      this.$router.push(`/users/${row.id}`)
    },
    handleDelete (index, row) {
      this.$confirm('确定删除用户吗?')
        .then(() => {
          this.$store.dispatch('users/removeUser', row.id).then(() => {
            this.$message.success('删除成功')
            this.$fetch()
          })
        })
        .catch((err) => {
          this.$message.error(err.message)
        })
    },
    disableBtn (item) {
      return !!item.userRoles.find(item => item.id === 2)
    },
    getUsersByStatus ({ status, name }) {
      this.$router.push({
        name: 'users',
        query: status !== -1 ? { ...this.$route.query, status } : this.$R().dissoc('status', this.$route.query)
      })
    },
    getUsersByRole ({ id, name }) {
      this.$router.push({
        name: 'users',
        query: id !== -1 ? { ...this.$route.query, role: id } : this.$R().dissoc('role', this.$route.query)
      })
    },
    getUsersByName () {
      this.$router.push({
        name: 'users',
        query: this.search ? { ...this.$route.query, name: this.search } : this.$R().dissoc('name', this.$route.query)
      })
    }
  }
}
</script>
