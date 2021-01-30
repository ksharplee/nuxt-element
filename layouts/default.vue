<template>
  <el-container style="min-height: 100vh">
    <el-header class="text-white bg-primary">
      <el-row type="flex" align="middle" class="h-100">
        <el-col class="h4 font-weight-bold">
          NUXT EXPRESS APP
        </el-col>
        <el-col v-if="$auth.user" class="align-self-stretch h-100 text-right">
          <ul class="list-unstyled header-menu h-100">
            <li>
              <span class="el-dropdown-link text-white h-100 d-flex align-items-center  px-3">
                {{ $auth.user.userName }}
                <i class="el-icon-user-solid h3 ml-1" />
              </span>
              <div class="menu-content text-info">
                <div
                  class="menu-link"
                  @click="$auth.logout()"
                >
                  <i class="el-icon-remove mr-1 h5" />
                  退出登录
                </div>
              </div>
            </li>
          </ul>
        </el-col>
        <el-col v-else class="text-right">
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
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside width="200px" class="pl-4 pt-4" style="overflow:initial">
        <div class="h-100 bg-white d-flex flex-column">
          <div class="left-menu pt-2">
            <div
              v-for="(menu, i) in menus"
              :key="i"
              class="left-menu-first"
              :class="
                $route.name.includes(menu.name) && menuIndex === i ? 'active' : ''
              "
              @mouseover="menuIndex = i"
              @mouseleave="menuIndex = defaultIndex"
            >
              <nuxt-link
                :to="menu.index"
                class="left-menu-index"
              >
                <i :class="menu.icon" />{{ menu.title }}
              </nuxt-link>
              <div v-if="menu.submenu" class="left-menu-second">
                <el-row :gutter="20">
                  <el-col v-for="(submenu, subi) in menu.submenu" :key="subi" :span="2">
                    <div class="left-menu-second-title">
                      {{ submenu.title }}
                    </div>
                    <div v-for="(path, pi) in submenu.children" :key="pi" class="left-menu-second-menu">
                      <nuxt-link :to="path.index">
                        {{ path.title }}
                      </nuxt-link>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </div>
          </div>
          <div class="mt-auto text-center py-3 text-primary">
            <nuxt-link to="/">
              NUXT EXPRESS APP
            </nuxt-link>
          </div>
        </div>
      </el-aside>
      <nuxt />
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data () {
    return {
      menuIndex: 0,
      menus: [
        {
          index: '/',
          name: 'index',
          title: '工作台',
          icon: 'el-icon-menu'
        },
        {
          title: '客户',
          index: '/users',
          name: 'users',
          icon: 'el-icon-s-custom',
          submenu: [
            {
              title: '客户管理',
              children: [
                {
                  index: '/users',
                  title: '客户列表'
                }
              ]
            }
          ]
        },
        {
          title: '商品',
          index: '/goods',
          name: 'goods',
          icon: 'el-icon-s-goods',
          submenu: [
            {
              title: '分类管理',
              children: [
                {
                  index: '/goods/cates',
                  title: '商品分类'
                },
                {
                  index: '/goods/cates/groups',
                  title: '分类分组'
                },
                {
                  index: '/goods/cates/attrs',
                  title: '平台属性'
                }
              ]
            }
          ]
        },
        {
          title: '系统',
          index: '/system',
          name: 'system',
          icon: 'el-icon-s-tools'
        }
      ]
    }
  },
  computed: {
    defaultIndex () {
      const R = this.$R()
      return R.findIndex(menu => this.$route.name.includes(menu.name), this.menus)
    },
    route () {
      return this.$route
    }
  },
  watch: {
    '$route' () {
      this.menuIndex = this.defaultIndex
    }
  },
  created () {
    if (this.$auth.loggedIn && !this.$auth.user.username) {
      this.$auth.setUser(this.$auth.$storage.getCookie('user'))
    }
    this.menuIndex = this.defaultIndex
  }
}
</script>
