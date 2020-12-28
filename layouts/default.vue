<template>
  <el-container style="min-height: 100vh">
    <el-header class="text-white" style="background-color: #344a5f">
      <el-row type="flex" align="middle" class="h-100">
        <el-col>NUXT EXPRESS APP</el-col>
        <el-col class="text-right">
          <div v-if="$auth.user">
            Welcome, {{ $auth.user.userName }}!
            <el-button
              type="primary"
              plain
              round
              size="small"
              class="ml-2"
              @click="$auth.logout()"
            >
              退出登录
            </el-button>
          </div>
          <template v-else>
            <el-button
              type="primary"
              plain
              round
              size="small"
              @click="$router.push('/login')"
            >
              登录
            </el-button>
            <el-button
              type="info"
              plain
              round
              size="small"
              class="ml-3"
              @click="$router.push('/register')"
            >
              注册
            </el-button>
          </template>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <!-- <el-aside style="background-color:#2c3e50;box-shadow:2px 0 10px rgba(0,0,0,.1)" width="200px" class="text-white"> -->
      <el-aside style="" width="250px" class="pl-4 pt-4">
        <div class="h-100 bg-white">
          <el-menu ref="menu" :default-active="defaultIndex" router unique-opened>
            <template v-for="(menu, i) in menus">
              <el-submenu v-if="menu.submenu" :key="i" :index="menu.index">
                <template slot="title">
                  <i :class="menu.icon" />
                  <span>{{ menu.title }}</span>
                </template>
                <el-menu-item
                  v-for="submenu in menu.submenu"
                  :key="submenu.index"
                  :index="submenu.index"
                  :class="defaultIndex === menu.index ? 'bg-primary text-white' : ''"
                >
                  {{ submenu.title }}
                </el-menu-item>
              </el-submenu>
              <el-menu-item v-else :key="i" :index="menu.index" :class="defaultIndex === menu.index ? 'bg-primary text-white' : ''">
                <i :class="menu.icon" />
                <span slot="title">{{ menu.title }}</span>
              </el-menu-item>
            </template>
          </el-menu>
        </div>
      </el-aside>
      <el-main class="pb-0">
        <div class="d-flex flex-column h-100">
          <el-breadcrumb separator="/" class="mb-3">
            <el-breadcrumb-item :to="{ path: '/' }">
              首页
            </el-breadcrumb-item>
            <el-breadcrumb-item v-for="(item, i) in $store.state.breadcrumbs" :key="i" :to="item.router">
              {{ item.text }}
            </el-breadcrumb-item>
          </el-breadcrumb>
          <div class="p-4 bg-white" style="flex:1">
            <nuxt />
          </div>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data () {
    return {
      menus: [
        {
          index: '/',
          title: '工作台',
          icon: 'el-icon-menu'
        },
        {
          title: '系统',
          index: 'system',
          icon: 'el-icon-s-tools',
          submenu: [
            {
              index: '/users',
              title: '客户列表'
            }
          ]
        },
        {
          title: '客户',
          index: 'user',
          icon: 'el-icon-s-custom',
          submenu: [
            {
              index: '/users',
              title: '客户列表'
            }
          ]
        }
      ]
    }
  },
  computed: {
    defaultIndex () {
      return this.$route.path
    }
  },
  created () {
    if (this.$auth.loggedIn && !this.$auth.user.username) {
      this.$auth.setUser(this.$auth.$storage.getCookie('user'))
    }
  }
}
</script>

<style>
html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
</style>
