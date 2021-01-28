<template>
  <div>
    <div class="pb-3 d-flex align-items-center">
      <div class="ml-auto">
        <el-button
          type="primary"
          size="medium"
          @click="dialogAdd = true"
        >
          新增
        </el-button>
      </div>
    </div>
    <el-table :data="attrs" stripe class="w-100">
      <el-table-column prop="id" label="ID" min-width="80" />
      <el-table-column prop="name" label="属性名称" min-width="180" />
      <el-table-column prop="option" label="属性值" min-width="180">
        <!-- <template slot-scope="scope">
          {{ scope.row.baseCates | cates }}
        </template> -->
      </el-table-column>
      <el-table-column align="right" label="" min-width="80">
        <template slot-scope="scope">
          <el-dropdown @command="handleAction">
            <span class="el-dropdown-link">
              <i class="el-icon-more" />
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item :command="{item: scope.row, type: '1'}">
                <i class="el-icon-edit-outline" />编辑
              </el-dropdown-item>
              <el-dropdown-item :command="{item: scope.row, type: '2'}">
                <i class="el-icon-delete" />删除
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="添加属性"
      :visible.sync="dialogAdd"
      width="30%"
    >
      <el-form
        ref="attrAdd"
        :model="attrAdd"
        :rules="rules"
        label-width="100px"
      >
        <el-form-item label="属性名称" prop="name">
          <el-input v-model="attrAdd.name" />
        </el-form-item>
        <el-form-item label="添加属性值" prop="decription">
          <el-select
            v-model="attrAdd.cates"
            no-data-text="暂无属性值,请先添加"
            multiple
            placeholder="请选择"
            class="w-100"
          >
            <el-option
              v-for="item in cates"
              :key="item.id"
              :label="item.name"
              :value="item.id"
              :disabled="!!item.groupId"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button size="small" @click="dialogAdd = false">取 消</el-button>
        <el-button size="small" type="primary" :loading="loading" @click="handleAdd">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="编辑属性"
      :visible.sync="dialogEdit"
      width="30%"
    >
      <el-form
        ref="groupEdit"
        :model="groupEdit"
        :rules="rules"
        label-width="100px"
      >
        <el-form-item label="属性名称" prop="name">
          <el-input v-model="groupEdit.name" />
        </el-form-item>
        <el-form-item label="添加属性值" prop="decription">
          <el-select
            v-model="groupEdit.cates"
            no-data-text="暂无属性值,请先添加"
            multiple
            placeholder="请选择"
            class="w-100"
          >
            <el-option
              v-for="item in cates"
              :key="item.id"
              :label="item.name"
              :value="item.id"
              :disabled="!!item.groupId"
            />
          </el-select>
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
import { mapState } from 'vuex'

export default {
  name: 'Attrs',
  async fetch () {
    await this.$store.dispatch('cates/getAttrs')
  },
  data () {
    return {
      dialogAdd: false,
      dialogEdit: false,
      loading: false,
      attrAdd: {},
      groupEdit: {},
      parent: {
        id: 0,
        level: 1,
        parentPath: '0|'
      },
      cates: [],
      rules: {
        name: [
          { required: true, message: '请输入属性名称', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapState('cates', ['attrs'])
  },
  created () {
    this.$store.commit('SET_BREADCRUMBS', [
      {
        text: '平台属性',
        router: null
      }
    ])
  },
  methods: {
    handleAction ({ item, type }) {
      if (type === '1') {
        const obj = this.$R().clone(item)
        obj.cates = this.$R().pluck('id', obj.baseCates)
        this.groupEdit = obj
        this.dialogEdit = true
      } else {
        this.$confirm('确定删除属性吗?')
          .then(() => {
            this.$store.dispatch('cates/removeGroup', item.id).then(() => {
              this.$message.success('删除成功')
              this.$fetch()
            })
          }).catch(() => {})
      }
    },
    handleAdd () {
      this.$refs.attrAdd.validate((valid) => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('cates/addAttr', this.attrAdd).then(() => {
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
      this.$refs.groupEdit.validate((valid) => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('cates/editGroup', this.groupEdit).then(() => {
            this.$message.success('恭喜，编辑成功')
            this.dialogEdit = false
            this.$fetch()
          }).finally(() => {
            this.loading = false
          })
        }
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
