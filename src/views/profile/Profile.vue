<template>
  <div id="profile">
    <nav-bar class="profileNav">
      <div class="nav" slot="center">我的档案</div>
    </nav-bar>
    <div class="login">
      <div class="loginText">登录/注册</div>
      <div class="mobile">暂无绑定手机号</div>
    </div>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
export default {
  name: "Profile",
  components: {
    NavBar,
  },
};
</script>

<style scoped>
.profileNav {
  background-color: var(--color-tint);
  color: #fff;
}
.login {
  position: relative;
  display: flex;
  flex-flow: column;
  padding: 0 15px;
  height: 1.875rem;
  background-color: var(--color-tint);
  justify-content: center;
}
.login .loginText {
  color: #fff;
  font-size: 16px;
}
.login .mobile {
  margin-top: 5px;
  font-size: 12px;
  color: #fff;
}
.login::after {
  position: absolute;
  display: inline-block;
  top: 50%;
  right: 0.625rem;
  width: 14px;
  height: 14px;
  border: 1px solid #fff;
  border-left-color: transparent;
  border-bottom-color: transparent;
  content: "";
  transform: translateY(-50%) rotate(45deg);
}
</style>