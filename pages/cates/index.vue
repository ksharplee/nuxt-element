<template>
  <div>
    <!-- <div class="pb-3 d-flex align-items-center">
      <div class="ml-auto">
        <el-button
          type="primary"
          size="medium"
          @click="$router.push('/users/0')"
        >
          新增
        </el-button>
      </div>
    </div> -->
    <el-tree
      ref="tree"
      :data="items"
      node-key="id"
      default-expand-all
      :expand-on-click-node="false"
    >
      <span slot-scope="{ node, data }" class="d-flex justify-content-between flex-fill py-2">
        <span>{{ node.label }}</span>
        <span>
          <el-button
            type="text"
            size="mini"
            @click="handleAppend(data)"
          >
            新增
          </el-button>
          <el-button
            type="text"
            size="mini"
            @click="handleRemove(node, data)"
          >
            删除
          </el-button>
        </span>
      </span>
    </el-tree>
  </div>
</template>

<script>
export default {
  name: 'Cates',
  async fetch () {
    await this.$store.dispatch('cates/getList')
  },
  data () {
    return {
      items: [
        {
          id: '0',
          label: '根级',
          children: []
        }
      ]
    }
  },
  computed: {

  },
  created () {
    this.$store.commit('SET_BREADCRUMBS', [
      {
        text: '商品分类',
        router: null
      }
    ])
  },
  methods: {
    handleAppend (data) {
      console.log('函数 ~ file: index.vue ~ line 122 ~ append ~ data', data)
      console.log(this.$refs.tree)
    },
    handleRemove (node, data) {
      console.log('函数 ~ file: index.vue ~ line 126 ~ remove ~ node', node)
    }
  }
}
</script>

<style lang="scss">
.el-tree-node__content {
  height: auto;
  padding-right: 10px;
}
</style>
