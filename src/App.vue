<template>
  <div class="layout">
    <header class="header">
      <RouterLink to="/" class="brand">
        <span class="logo">XQ</span>
        <span class="site">xiaoqiangonline.shop</span>
      </RouterLink>
      <nav class="nav">
        <RouterLink to="/">主页</RouterLink>
        <RouterLink to="/docs">文档</RouterLink>
      </nav>
    </header>

    <main class="main">
      <RouterView />
    </main>

    <footer class="footer">
      <span>© {{ new Date().getFullYear() }} xiaoqiangonline.shop</span>
    </footer>
  </div>
</template>

<style scoped>
.layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #0a0e18;
  color: #e7e9ee;
}
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 22px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}
.brand {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  color: inherit;
}
.logo {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: linear-gradient(145deg, #5b4fd4, #2eb8e0);
  display: grid;
  place-items: center;
  font-weight: 800;
  font-size: 13px;
  color: #fff;
}
.site {
  font-weight: 500;
  font-size: 14px;
  color: rgba(231, 233, 238, 0.88);
  letter-spacing: 0.02em;
}
.nav {
  display: flex;
  align-items: center;
  gap: 6px;
}
.nav a {
  color: rgba(231, 233, 238, 0.78);
  text-decoration: none;
  padding: 8px 12px;
  border-radius: 8px;
  font-size: 14px;
}
.nav a.router-link-active {
  color: #fff;
  background: rgba(255, 255, 255, 0.08);
}
.main {
  width: 100%;
  max-width: 880px;
  margin: 0 auto;
  padding: 32px 22px 48px;
  flex: 1;
}
.footer {
  padding: 16px 22px;
  color: rgba(231, 233, 238, 0.4);
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  text-align: center;
  font-size: 13px;
}
</style>
