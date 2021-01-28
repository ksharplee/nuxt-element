<template>
  <el-container style="min-height: 100vh">
    <el-header class="text-white bg-primary">
      <el-row type="flex" align="middle" class="h-100">
        <el-col class="h4 font-weight-bold">
          NUXT EXPRESS APP
        </el-col>
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
      <el-aside width="200px" class="pl-4 pt-4" style="overflow:initial">
        <div class="h-100 bg-white">
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
          <!-- <el-menu ref="menu" :default-active="defaultIndex" router unique-opened active-text-color="#fff">
            <template v-for="(menu, i) in menus">
              <el-submenu v-if="menu.submenu" :key="i" :index="menu.index">
                <template slot="title">
                  <i :class="menu.icon" class="h3 mr-1" />
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
                <i :class="menu.icon" class="h3 mr-1" />
                <span slot="title">{{ menu.title }}</span>
              </el-menu-item>
            </template>
          </el-menu> -->
        </div>
      </el-aside>
      <el-main class="pb-0">
        <div class="d-flex flex-column h-100">
          <el-breadcrumb separator="/" class="mb-3">
            <el-breadcrumb-item :to="{ path: '/' }">
              首页
            </el-breadcrumb-item>
            <el-breadcrumb-item
              v-for="(item, i) in $store.state.breadcrumbs"
              :key="i"
              :to="item.router"
            >
              {{ item.text }}
            </el-breadcrumb-item>
          </el-breadcrumb>
          <div class="p-4 bg-white" style="flex: 1">
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
      // return R.findIndex(R.propEq('index', this.$route.path), this.menus)
      return R.findIndex(menu => this.$route.name.includes(menu.name), this.menus)
    },
    route () {
      return this.$route
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
