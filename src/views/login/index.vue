<template>
  <div class="login">
    <div class="loginForm">
      <el-card style="padding:20px">
        <el-form label-width="40px" >
          <el-form-item label="邮箱" >
            <el-input v-model="loginForm.email"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="loginForm.password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="login" type="primary" style="width:100%">登录</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>

  </div>
</template>

<script>
import { Message } from 'element-ui'
export default {
  name: 'LoginIndex',
  data () {
    return {
      loginForm: {
        email: '2019402980@qq.com',
        password: '111111'
      }
    }
  },
  methods: {
    async  login () {
      try {
        await this.$store.dispatch('user/login', this.loginForm)
        Message.success('login success')
        this.$router.push('/')
      } catch (error) {
        Message.warning('login fail')
      }
    }

  }
}
</script>

<style lang="scss" scoped>
.loginForm{
  width: 400px;
  margin:100px auto;
}
</style>
