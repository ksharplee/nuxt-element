<template>
  <div>
    <el-tree
      ref="tree"
      :data="items"
      :props="{
        label: 'name'
      }"
      node-key="id"
      default-expand-all
      :expand-on-click-node="false"
    >
      <span
        slot-scope="{ node, data }"
        class="d-flex justify-content-between flex-fill py-1"
      >
        <span>{{ node.label }}</span>
        <span>
          <el-button
            v-if="data.id !== 0"
            :disabled="!data.leaf"
            type="text"
            size="mini"
            @click="handleRemove(node, data)"
          >
            删除
          </el-button>
          <el-button
            v-if="data.id !== 0"
            type="text"
            size="mini"
            @click="dialogEdit = true;cateEdit = data"
          >
            编辑
          </el-button>
          <el-button type="text" size="mini" @click="dialogAdd = true;parent = {id: data.id, level:data.level, parentPath: data.id !== 0 ? data.parentPath + data.id + '|' : '0|'}">
            新增
          </el-button>
        </span>
      </span>
    </el-tree>
    <el-dialog
      title="添加分类"
      :visible.sync="dialogAdd"
      width="30%"
    >
      <el-form
        ref="cateAdd"
        :model="cateAdd"
        :rules="rules"
        label-width="100px"
        @submit.native.prevent
      >
        <el-form-item label="分类名称" prop="name">
          <el-input v-model="cateAdd.name" autofocus />
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button size="small" @click="dialogAdd = false">取 消</el-button>
        <el-button size="small" type="primary" :loading="loading" @click="handleAppend">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="编辑分类"
      :visible.sync="dialogEdit"
      width="30%"
      @submit.native.prevent
    >
      <el-form
        ref="cateEdit"
        :model="cateEdit"
        :rules="rules"
        label-width="100px"
      >
        <el-form-item label="分类名称" prop="name">
          <el-input v-model="cateEdit.name" autofocus />
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button size="small" @click="dialogEdit = false">取 消</el-button>
        <el-button size="small" type="primary" :loading="loading" @click="handleEdit">确 定</el-button>
      </span>
    </el-dialog>
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
      dialogAdd: false,
      dialogEdit: false,
      loading: false,
      cateAdd: {},
      cateEdit: {},
      parent: {
        id: 0,
        level: 1,
        parentPath: '0|'
      },
      rules: {
        name: [
          { required: true, message: '请输入分类名称', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    items () {
      return [
        {
          id: 0,
          parentPath: '0|',
          name: '全部分类',
          children: this.$R().clone(this.$store.state.cates.list)
        }
      ]
    }
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
    handleAppend () {
      this.$refs.cateAdd.validate((valid) => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('cates/addCate', { parentPath: this.parent.parentPath, parentId: this.parent.id, level: this.parent.id === 0 ? 1 : this.parent.level + 1, ...this.cateAdd }).then(() => {
            this.$message.success('恭喜，添加成功')
            this.dialogAdd = false
            this.$fetch()
          }).finally(() => {
            this.loading = false
          })
        }
      })
    },
    handleEdit () {
      this.$refs.cateEdit.validate((valid) => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('cates/editCate', { id: this.cateEdit.id, name: this.cateEdit.name }).then(() => {
            this.$message.success('恭喜，编辑成功')
            this.dialogEdit = false
            this.$fetch()
          }).finally(() => {
            this.loading = false
          })
        }
      })
    },
    handleRemove (node, data) {
      this.$confirm('确定删除分类吗?')
        .then(() => {
          this.$store.dispatch('cates/removeCate', data.id).then(() => {
            this.$message.success('删除成功')
            this.$fetch()
          })
        })
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
