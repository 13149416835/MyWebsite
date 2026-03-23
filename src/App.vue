<template>
  <div class="layout">
    <header class="header">
      <div class="brand">
        <div class="logo">GW</div>
        <div class="title">中国模型 API 网关</div>
      </div>
      <nav class="nav">
        <RouterLink to="/">首页</RouterLink>
        <RouterLink to="/pricing">定价</RouterLink>
        <RouterLink to="/docs">文档</RouterLink>
        <RouterLink to="/contact">联系</RouterLink>
      </nav>
    </header>

    <main class="main">
      <RouterView />
    </main>

    <footer class="footer">
      <span>© {{ new Date().getFullYear() }} YourService</span>
    </footer>
  </div>
</template>

<style scoped>
.layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #0b1020;
  color: #e7e9ee;
}
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(10px);
}
.brand {
  display: flex;
  align-items: center;
  gap: 10px;
}
.logo {
  width: 32px;
  height: 32px;
  border-radius: 10px;
  background: linear-gradient(135deg, #7c5cff, #00d4ff);
  display: grid;
  place-items: center;
  font-weight: 800;
}
.title {
  font-weight: 700;
  letter-spacing: 0.2px;
}
.nav {
  display: flex;
  gap: 14px;
}
.nav a {
  color: rgba(231, 233, 238, 0.9);
  text-decoration: none;
  padding: 8px 10px;
  border-radius: 10px;
}
.nav a.router-link-active {
  background: rgba(255, 255, 255, 0.08);
}
.main {
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
  padding: 28px 20px 40px;
  flex: 1;
}
.footer {
  padding: 18px 20px;
  color: rgba(231, 233, 238, 0.65);
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  text-align: center;
}
</style>
