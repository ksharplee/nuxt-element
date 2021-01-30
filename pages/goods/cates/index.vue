<template>
  <el-container>
    <el-main class="pb-0">
      <div class="d-flex flex-column h-100">
        <el-breadcrumb separator="/" class="mb-3">
          <el-breadcrumb-item :to="{ path: '/' }">
            首页
          </el-breadcrumb-item>
          <el-breadcrumb-item>
            商品分类
          </el-breadcrumb-item>
        </el-breadcrumb>
        <div class="px-4 py-3 bg-white" style="flex: 1">
          <div class="pb-3 d-flex align-items-center">
            <div class="ml-auto">
              <el-button
                type="primary"
                size="medium"
                @click="dialogAdd = true"
              >
                新增根级分类
              </el-button>
            </div>
          </div>
          <el-table
            :data="$store.state.cates.list"
            class="w-100"
            row-key="id"
            default-expand-all
            :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
          >
            <el-table-column
              prop="name"
              label="分类名称"
            />
            <el-table-column align="right" label="" width="80">
              <template slot-scope="scope">
                <el-dropdown @command="handleAction">
                  <span class="el-dropdown-link">
                    <i class="el-icon-more" />
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item :command="{data: scope.row, type: '1'}">
                      <i class="el-icon-circle-plus-outline" />添加
                    </el-dropdown-item>
                    <el-dropdown-item :command="{data: scope.row, type: '2'}">
                      <i class="el-icon-edit-outline" />编辑
                    </el-dropdown-item>
                    <el-dropdown-item :disabled="!scope.row.leaf" :command="{data: scope.row, type: '3'}">
                      <i class="el-icon-delete" />删除
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </template>
            </el-table-column>
          </el-table>
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
      </div>
    </el-main>
  </el-container>
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
  methods: {
    handleAction ({ data, type }) {
      switch (type) {
        case '1':
          this.dialogAdd = true; this.parent = { id: data.id, level: data.level, parentPath: data.id !== 0 ? data.parentPath + data.id + '|' : '0|' }
          break
        case '2':
          this.dialogEdit = true; this.cateEdit = data
          break
        default:
          this.handleRemove(data)
          break
      }
    },
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
    handleRemove (data) {
      console.log('函数 ~ file: index.vue ~ line 222 ~ handleRemove ~ data', data)
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
