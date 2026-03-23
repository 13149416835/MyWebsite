<template>
  <section class="contact">
    <h1>联系我们</h1>
    <p class="intro">技术支持与商务合作</p>

    <div class="channels">
      <div class="channel">
        <span class="label">Telegram</span>
        <span class="value">@yourservice_support</span>
      </div>
      <div class="channel">
        <span class="label">邮箱</span>
        <span class="value">support@yourservice.com</span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.contact {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
h1 { font-size: 32px; margin: 0; }
.intro { color: rgba(231, 233, 238, 0.75); margin: 0; }
.channels {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.channel {
  display: flex;
  gap: 12px;
  padding: 12px 16px;
  background: rgba(255,255,255,0.04);
  border-radius: 12px;
}
.label { font-weight: 600; min-width: 80px; }
.value { color: rgba(231, 233, 238, 0.9); }
</style>
