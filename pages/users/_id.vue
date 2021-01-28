<template>
  <el-form
    ref="user"
    :model="user"
    :rules="rules"
    status-icon
    label-width="100px"
    class="pt-3"
    style="width:400px"
  >
    <el-form-item label="用户名" prop="userName">
      <el-input v-model="user.userName" placeholder="请输入用户名" />
    </el-form-item>
    <el-form-item v-if="id === '0'" label="密码" prop="password">
      <el-input v-model="user.password" type="password" placeholder="请输入密码" />
    </el-form-item>
    <el-form-item v-if="id === '0'" label="确认密码" prop="checkPass">
      <el-input v-model="user.checkPass" type="password" placeholder="请再次输入密码" />
    </el-form-item>
    <el-form-item label="角色" prop="userRoles">
      <el-checkbox-group v-model="user.userRoles" size="medium">
        <el-checkbox-button :label="3">
          采购商
        </el-checkbox-button>
        <el-checkbox-button :label="1">
          供应商
        </el-checkbox-button>
      </el-checkbox-group>
    </el-form-item>
    <el-form-item label="问题" prop="question">
      <el-input v-model="user.question" placeholder="请输入找回密码提示问题" />
    </el-form-item>
    <el-form-item label="答案" prop="answer">
      <el-input v-model="user.answer" placeholder="请输入找回密码答案" />
    </el-form-item>
    <el-form-item label="启用">
      <el-switch v-model="user.status" :active-value="1" :inactive-value="0" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" size="medium" :loading="submitting" @click="submitForm('user')">
        确定
      </el-button>
      <el-button size="medium" @click="$refs['user'].resetFields()">
        重置
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'User',
  async fetch () {
    if (this.id !== '0') {
      await this.$store.dispatch('users/getById', this.id).then((res) => {
        res.userRoles = res.userRoles.map(item => item.id)
        this.user = res
      })
    }
  },
  data () {
    const validatePass = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.user.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    const validateAnswer = (rule, value, callback) => {
      if (!value && this.user.question) {
        callback(new Error('请输入提示问题答案'))
      } else {
        callback()
      }
    }
    return {
      user: {
        userName: '',
        password: '',
        checkPass: '',
        question: '',
        answer: '',
        userRoles: [3],
        status: 1
      },
      rules: {
        userName: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        checkPass: [
          { required: true, validator: validatePass, trigger: 'blur' }
        ],
        userRoles: [
          { type: 'array', required: true, message: '请至少选择一个角色注册', trigger: 'change' }
        ],
        answer: [
          { validator: validateAnswer, trigger: 'blur' }
        ]
      },
      submitting: false
    }
  },
  computed: {
    id () {
      return this.$route.params.id
    }
  },
  watch: {
    id () {
      this.$fetch()
    }
  },
  created () {
    this.$store.commit('SET_BREADCRUMBS', [
      {
        text: '客户列表',
        router: '/users'
      },
      {
        text: `${this.id === '0' ? '新增' : '编辑'}客户`,
        router: null
      }
    ])
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.submitting = true
          if (this.id === '0') {
            this.$store.dispatch('users/addUser', this.user).then((res) => {
              this.$router.back()
            }).finally(() => {
              this.submitting = false
            })
          } else {
            this.$store.dispatch('users/editUser', this.user).then((res) => {
              this.$message.success('恭喜，操作成功')
              this.$router.back()
            }).finally(() => {
              this.submitting = false
            })
          }
        }
      })
    }
  }
}
</script>
