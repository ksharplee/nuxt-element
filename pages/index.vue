<template>
  <el-container>
    <el-main class="pb-0">
      <div class="container bg-white h-100">
        <div class="d-flex flex-column ">
          <div>
            <Logo />
            <h1 class="title">
              nuxt-element
            </h1>
            <div class="links">
              <a
                href="https://nuxtjs.org/"
                target="_blank"
                rel="noopener noreferrer"
                class="button--green"
              >
                Documentation
              </a>
              <a
                href="https://github.com/nuxt/nuxt.js"
                target="_blank"
                rel="noopener noreferrer"
                class="button--grey"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: 'Index',
  // 当前路由不需登录
  auth: false,
  // async fetch () {
  //   try {
  //     this.test = await this.$axios.get('/test', {
  //       // headers: {
  //       //   'content-type': 'multipart/form-data'
  //       // },
  //       data: {
  //       }
  //     }).then(res => res.data)
  //   } catch (error) {
  //     console.log('函数 ~ file: index.vue ~ line 37 ~ fetch ~ error', error)
  //   }
  // },
  data () {
    return {
      test: ''
    }
  },
  created () {
    this.$store.commit('SET_BREADCRUMBS', [
      {
        text: '工作台',
        router: null
      }
    ])
  },
  mounted () {
    // console.log(this.$R())
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 50vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family:
    'Quicksand',
    'Source Sans Pro',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
