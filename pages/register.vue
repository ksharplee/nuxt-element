<template>
  <el-row class="my-5">
    <el-col :span="8" :offset="8">
      <el-form
        ref="user"
        :model="user"
        status-icon
        :rules="rules"
        label-width="100px"
      >
        <el-form-item label="用户名" prop="userName">
          <el-input v-model="user.userName" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="user.password" type="password" autocomplete="off" />
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input v-model="user.checkPass" type="password" autocomplete="off" />
        </el-form-item>
        <el-form-item label="角色" prop="userRoles">
          <el-checkbox-group v-model="user.userRoles" size="medium">
            <el-checkbox-button label="3">
              采购商
            </el-checkbox-button>
            <el-checkbox-button label="1">
              供应商
            </el-checkbox-button>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :loading="submitting" @click="submitForm('user')">
            提交
          </el-button>
          <el-button @click="resetForm('user')">
            重置
          </el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'Register',
  auth: false,
  layout: 'empty',
  data () {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.user.checkPass !== '') {
          this.$refs.user.validateField('checkPass')
        }
        callback()
      }
    }
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.user.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      user: {
        password: '',
        checkPass: '',
        userName: '',
        userRoles: ['3']
      },
      rules: {
        password: [
          { validator: validatePass, required: true, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, required: true, trigger: 'blur' }
        ],
        userName: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        userRoles: [
          { type: 'array', required: true, message: '请至少选择一个角色注册', trigger: 'change' }
        ]
      },
      submitting: false
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.submitting = true
          this.$store.dispatch('register', this.user).then(() => {
            this.$router.push('/')
          }).finally(() => {
            this.submitting = false
          })
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>
