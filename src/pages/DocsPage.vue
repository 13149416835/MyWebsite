<template>
  <section class="docs">
    <template v-if="siteLang === 'en'">
      <DocsEnBody />
    </template>

    <template v-else-if="siteLang === 'ja'">
      <DocsJaBody />
    </template>

    <template v-else-if="siteLang === 'ko'">
      <DocsKoBody />
    </template>

    <template v-else-if="siteLang === 'zh'">
      <h1>API 文档</h1>

      <h2>网关地址</h2>
      <p>统一文本对话：<code>POST https://api.xiaoqiangonline.shop/v1/chat/completions</code>（按 <code>model</code> 走 DeepSeek / 智谱 / MiniMax）。</p>
      <p>
        <strong>流式输出（SSE）：</strong>在请求体中加入 <code>"stream": true</code>，响应为 <code>text/event-stream</code>（Server-Sent Events 分块），与 OpenAI Chat Completions 流式一致；客户端需按 <code>data:</code> 行解析增量内容，末包或最后一帧可能含 <code>usage</code> 用于计费。
      </p>

      <h2>扩展 REST 接口（GLM 线 / MiniMax 线）</h2>
      <p>
        除统一文本对话外，本平台在同一域名下提供更多 REST 入口。调用时请<strong>仅使用我方发放的 API Key</strong>（<code>Authorization: Bearer sk-...</code>），<strong>不要使用</strong>任何第三方平台控制台申请的 Key 访问本域名。
      </p>
      <p><strong>基址：</strong><code>https://api.xiaoqiangonline.shop</code></p>

      <h2>模型</h2>

      <h3>DeepSeek</h3>
      <div class="model-table-wrap">
        <table class="model-table model-table--wide">
          <thead>
            <tr>
              <th>能力方向</th>
              <th>在本平台的调用方式</th>
              <th>示例（<code>curl</code>）</th>
              <th>可选 <code>model</code>（须完全一致）</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>通用对话</td>
              <td><code>POST https://api.xiaoqiangonline.shop/v1/chat/completions</code></td>
              <td class="curl-cell"><pre><code>curl -X POST "https://api.xiaoqiangonline.shop/v1/chat/completions" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{"model":"deepseek-chat","messages":[{"role":"user","content":"你好"}]}'</code></pre></td>
              <td class="mono"><code>deepseek-chat</code></td>
            </tr>
            <tr>
              <td>深度推理</td>
              <td><code>POST https://api.xiaoqiangonline.shop/v1/chat/completions</code></td>
              <td class="curl-cell"><pre><code>curl -X POST "https://api.xiaoqiangonline.shop/v1/chat/completions" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{"model":"deepseek-reasoner","messages":[{"role":"user","content":"请分步说明。"}]}'</code></pre></td>
              <td class="mono"><code>deepseek-reasoner</code></td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3>智谱 GLM 线</h3>
      <p class="model-options">路径与能力以 <a href="https://docs.bigmodel.cn/" rel="noopener noreferrer" target="_blank">智谱 OpenAPI</a> 为准。<strong>本平台计费：</strong>响应中无可用于计费的 <code>usage.total_tokens</code> 时，每次成功的 <code>POST …/images/generations</code>、<code>…/videos/generations</code>、<code>…/async/images/generations</code>、<code>…/audio/transcriptions</code>，以及 <code>…/audio/speech</code> 返回成功二进制音频时，均扣减 <strong>5000</strong> 额度。<code>GET …/async-result/&lt;TASK_ID&gt;</code> <strong>不</strong>按此固定额扣费（创建任务时已扣）。</p>
      <div class="model-table-wrap">
        <table class="model-table model-table--wide">
          <thead>
            <tr>
              <th>能力 / 接口</th>
              <th>示例（<code>curl</code>）</th>
              <th>请求体 <code>model</code>（Available options）</th>
              <th>HTTP <code>200</code> 示例（格式化 JSON）</th>
              <th>返回示例（<code>JSON</code> 字符串，单行）</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>统一文本对话（<code>POST /v1/chat/completions</code>）</td>
              <td class="curl-cell"><pre><code>curl -X POST "https://api.xiaoqiangonline.shop/v1/chat/completions" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{"model":"glm-5","messages":[{"role":"user","content":"你好"}]}'</code></pre></td>
              <td class="model-options">
                文本：<code>glm-5-turbo</code>、<code>glm-5</code>、<code>glm-4.7</code>、<code>glm-4.7-flash</code>、<code>glm-4.7-flashx</code>、<code>glm-4.6</code>、<code>glm-4.5-air</code>、<code>glm-4.5-airx</code>、<code>glm-4.5-flash</code>、<code>glm-4-flash-250414</code>、<code>glm-4-flashx-250414</code>、<code>glm-4-long</code>。
                视觉：<code>glm-4.6v</code>、<code>autoglm-phone</code>、<code>glm-4.6v-flash</code>、<code>glm-4.6v-flashx</code>、<code>glm-4v-flash</code>、<code>glm-4.1v-thinking-flashx</code>、<code>glm-4.1v-thinking-flash</code>。
                音频：<code>glm-4-voice</code>。
                角色 / 心理咨询：<code>charglm-4</code>、<code>emohaa</code>。
              </td>
              <td class="curl-cell"><pre><code>{
  "id": "20250101120000.abc123",
  "request_id": "req_demo",
  "created": 1735689600,
  "model": "glm-5",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "你好，我是人工智能助手，可以回答你的问题。"
      },
      "finish_reason": "stop"
    }
  ],
  "usage": {
    "prompt_tokens": 20,
    "completion_tokens": 15,
    "total_tokens": 35
  }
}</code></pre>
                <span class="response-note"><code>ChatCompletionResponse</code> — <a href="https://docs.bigmodel.cn/api-reference/%E6%A8%A1%E5%9E%8B-api/%E5%AF%B9%E8%AF%9D%E8%A1%A5%E5%85%A8" rel="noopener noreferrer" target="_blank">对话补全</a></span></td>
              <td class="curl-cell json-string-cell"><pre><code>{"id":"20250101120000.abc123","request_id":"req_demo","created":1735689600,"model":"glm-5","choices":[{"index":0,"message":{"role":"assistant","content":"你好，我是人工智能助手，可以回答你的问题。"},"finish_reason":"stop"}],"usage":{"prompt_tokens":20,"completion_tokens":15,"total_tokens":35}}</code></pre></td>
            </tr>
            <tr>
              <td>视频生成（异步）</td>
              <td class="curl-cell"><pre><code>curl -X POST "https://api.xiaoqiangonline.shop/zhipu/v4/videos/generations" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{"model":"cogvideox-3","prompt":"一只猫在玩耍。"}'</code></pre></td>
              <td class="model-options"><code>cogvideox-3</code>、<code>cogvideox-2</code>、<code>cogvideox-flash</code>、<code>viduq1-text</code>、<code>viduq1-image</code>、<code>vidu2-image</code>、<code>viduq1-start-end</code>、<code>vidu2-start-end</code>、<code>vidu2-reference</code>（按 body 变体）。<br><span class="quota-note">每次创建成功：<strong>扣 5000</strong> 额度（无 Token 用量）。</span></td>
              <td class="curl-cell"><pre><code>{
  "model": "cogvideox-3",
  "id": "7593127498661400000",
  "request_id": "req_demo",
  "task_status": "PROCESSING"
}</code></pre>
                <span class="response-note"><code>AsyncResponse</code> — <a href="https://docs.bigmodel.cn/api-reference/%E6%A8%A1%E5%9E%8B-api/%E8%A7%86%E9%A2%91%E7%94%9F%E6%88%90%E5%BC%82%E6%AD%A5" rel="noopener noreferrer" target="_blank">videos/generations（异步）</a></span></td>
              <td class="curl-cell json-string-cell"><pre><code>{"model":"cogvideox-3","id":"7593127498661400000","request_id":"req_demo","task_status":"PROCESSING"}</code></pre></td>
            </tr>
            <tr>
              <td>图像生成（异步）</td>
              <td class="curl-cell"><pre><code>curl -X POST "https://api.xiaoqiangonline.shop/zhipu/v4/async/images/generations" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{"model":"glm-image","prompt":"一只可爱的猫。"}'</code></pre></td>
              <td class="model-options"><code>glm-image</code><br><span class="quota-note">每次创建成功：<strong>扣 5000</strong> 额度（无 Token 用量）。</span></td>
              <td class="curl-cell"><pre><code>{
  "model": "glm-image",
  "id": "img_task_0000000000000000000",
  "request_id": "req_demo",
  "task_status": "PROCESSING"
}</code></pre>
                <span class="response-note"><code>AsyncResponse</code> — <a href="https://docs.bigmodel.cn/api-reference/%E6%A8%A1%E5%9E%8B-api/%E5%9B%BE%E5%83%8F%E7%94%9F%E6%88%90%E5%BC%82%E6%AD%A5" rel="noopener noreferrer" target="_blank">async images/generations</a></span></td>
              <td class="curl-cell json-string-cell"><pre><code>{"model":"glm-image","id":"img_task_0000000000000000000","request_id":"req_demo","task_status":"PROCESSING"}</code></pre></td>
            </tr>
            <tr>
              <td>查询异步结果</td>
              <td class="curl-cell"><pre><code>curl -X GET "https://api.xiaoqiangonline.shop/zhipu/v4/async-result/TASK_ID" \
  -H "Authorization: Bearer YOUR_API_KEY"</code></pre></td>
              <td class="model-options">无 <code>model</code>；路径参数 <code>TASK_ID</code> 为异步创建接口返回的 id。 — <a href="https://docs.bigmodel.cn/api-reference/%E6%A8%A1%E5%9E%8B-api/%E6%9F%A5%E8%AF%A2%E5%BC%82%E6%AD%A5%E7%BB%93%E6%9E%9C" rel="noopener noreferrer" target="_blank">查询异步结果</a><br><span class="quota-note">不按单次 5000 固定扣费；创建任务时已扣。</span></td>
              <td class="curl-cell"><pre><code>{
  "id": "7593127498661400000",
  "task_status": "SUCCESS",
  "video_result": [
    { "url": "https://example.com/generated.mp4", "cover_image_url": "https://example.com/cover.jpg" }
  ]
}</code></pre>
                <span class="response-note">随任务类型（对话 / 视频 / 图像）字段不同，以厂商 OpenAPI 为准。</span></td>
              <td class="curl-cell json-string-cell"><pre><code>{"id":"7593127498661400000","task_status":"SUCCESS","video_result":[{"url":"https://example.com/generated.mp4","cover_image_url":"https://example.com/cover.jpg"}]}</code></pre></td>
            </tr>
            <tr>
              <td>图像生成</td>
              <td class="curl-cell"><pre><code>curl -X POST "https://api.xiaoqiangonline.shop/zhipu/v4/images/generations" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{"model":"cogview-3-flash","prompt":"一只可爱的猫"}'</code></pre></td>
              <td class="model-options"><code>glm-image</code>、<code>cogview-4-250304</code>、<code>cogview-4</code>、<code>cogview-3-flash</code><br><span class="quota-note">每次成功：<strong>扣 5000</strong> 额度（无 Token 用量）。</span></td>
              <td class="curl-cell"><pre><code>{
  "created": 1735689600,
  "data": [
    {
      "url": "https://example.com/tmp/generated.png"
    }
  ]
}</code></pre>
                <span class="response-note"><code>ImageGenerationResponse</code> — <a href="https://docs.bigmodel.cn/api-reference/%E6%A8%A1%E5%9E%8B-api/%E5%9B%BE%E5%83%8F%E7%94%9F%E6%88%90" rel="noopener noreferrer" target="_blank">图像生成</a></span></td>
              <td class="curl-cell json-string-cell"><pre><code>{"created":1735689600,"data":[{"url":"https://example.com/tmp/generated.png"}]}</code></pre></td>
            </tr>
            <tr>
              <td>语音转文本</td>
              <td class="curl-cell"><pre><code>curl -X POST "https://api.xiaoqiangonline.shop/zhipu/v4/audio/transcriptions" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -F "model=glm-asr-2512" \
  -F "file=@recording.wav"</code></pre></td>
              <td class="model-options"><code>glm-asr-2512</code><br><span class="quota-note">每次成功：<strong>扣 5000</strong> 额度（无 Token 用量）。</span></td>
              <td class="curl-cell"><pre><code>{
  "id": "asr_0000000000000000000",
  "created": 1735689600,
  "request_id": "req_demo",
  "model": "glm-asr-2512",
  "text": "这是根据音频转写得到的文本。"
}</code></pre>
                <span class="response-note"><code>AudioTranscriptionResponse</code> — <a href="https://docs.bigmodel.cn/api-reference/%E6%A8%A1%E5%9E%8B-api/%E8%AF%AD%E9%9F%B3%E8%BD%AC%E6%96%87%E6%9C%AC" rel="noopener noreferrer" target="_blank">语音转文本</a></span></td>
              <td class="curl-cell json-string-cell"><pre><code>{"id":"asr_0000000000000000000","created":1735689600,"request_id":"req_demo","model":"glm-asr-2512","text":"这是根据音频转写得到的文本。"}</code></pre></td>
            </tr>
            <tr>
              <td>文本转语音</td>
              <td class="curl-cell"><pre><code>curl -X POST "https://api.xiaoqiangonline.shop/zhipu/v4/audio/speech" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{"model":"glm-tts","input":"你好","voice":"tongtong","response_format":"wav"}'</code></pre></td>
              <td class="model-options"><code>glm-tts</code><br><span class="quota-note">每次成功返回二进制 <code>audio/*</code>：<strong>扣 5000</strong> 额度（无 Token 用量）。</span></td>
              <td class="curl-cell"><pre><code>HTTP/1.1 200 OK
Content-Type: audio/wav

[二进制 WAV 响应体 — OpenAPI：string，format binary]</code></pre>
                <span class="response-note">非 JSON 的 <code>200</code> — <a href="https://docs.bigmodel.cn/api-reference/%E6%A8%A1%E5%9E%8B-api/%E6%96%87%E6%9C%AC%E8%BD%AC%E8%AF%AD%E9%9F%B3" rel="noopener noreferrer" target="_blank">文本转语音</a></span></td>
              <td class="mono json-string-cell">—<br><span class="response-note response-note--inline">无 JSON 字符串；响应体为二进制 <code>audio/wav</code>。</span></td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3>MiniMax 线</h3>
      <p class="model-options">能力与 HTTP 路径以 <a href="https://platform.minimaxi.com/docs/api-reference/api-overview" rel="noopener noreferrer" target="_blank">MiniMax 接口概览</a> 为准。下表仅列：统一文本对话、同步语音合成（HTTP）、视频生成（创建 / 查询 / 文件检索）、图像生成（文生图 + 图生图）。<strong>本平台计费（本线）：</strong>同步语音 <code>/v1/t2a_v2</code>、视频「创建任务」<code>POST /v1/video_generation</code>、文生图 / 图生图 <code>POST /v1/image_generation</code> 等若响应中无可用于计费的 Token 用量，则每次生成成功扣减 <strong>5000</strong> 额度；查询任务、文件检索不在此按次固定扣费规则内。智谱 GLM 线同额 <strong>5000</strong> 规则见上表所列路径。</p>
      <div class="model-table-wrap">
        <table class="model-table model-table--wide">
          <thead>
            <tr>
              <th>能力 / 接口</th>
              <th>示例（<code>curl</code>）</th>
              <th>请求体 <code>model</code>（及说明）</th>
              <th>HTTP <code>200</code> 示例（格式化 JSON）</th>
              <th>返回示例（<code>JSON</code> 字符串，单行）</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>统一文本对话（<code>POST /v1/chat/completions</code>）</td>
              <td class="curl-cell"><pre><code>curl -X POST "https://api.xiaoqiangonline.shop/v1/chat/completions" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{"model":"MiniMax-M2.7","messages":[{"role":"user","content":"你好"}]}'</code></pre>
                <span class="response-note">流式：<code>-d</code> 中加 <code>"stream":true</code>，响应为 SSE；也可用 OpenAI SDK，<code>base_url</code> 指向本域名。</span></td>
              <td class="model-options"><code>MiniMax-M2.7</code>、<code>MiniMax-M2.7-highspeed</code>、<code>MiniMax-M2.5</code>、<code>MiniMax-M2.5-highspeed</code>、<code>MiniMax-M2.1</code>、<code>MiniMax-M2.1-highspeed</code>、<code>MiniMax-M2</code>、<code>M2-her</code> — 见 <a href="https://platform.minimaxi.com/docs/api-reference/api-overview" rel="noopener noreferrer" target="_blank">文本生成</a>；本平台统一入口为 OpenAI 兼容路由。</td>
              <td class="curl-cell"><pre><code>{
  "id": "chatcmpl_demo",
  "model": "MiniMax-M2.7",
  "choices": [
    { "index": 0, "message": { "role": "assistant", "content": "你好。" }, "finish_reason": "stop" }
  ],
  "usage": { "prompt_tokens": 10, "completion_tokens": 5, "total_tokens": 15 }
}</code></pre>
                <span class="response-note">本平台 OpenAI 兼容形态 — 官方 <a href="https://platform.minimaxi.com/docs/api-reference/text-openai-api" rel="noopener noreferrer" target="_blank">OpenAI API 兼容</a></span></td>
              <td class="curl-cell json-string-cell"><pre><code>{"id":"chatcmpl_demo","model":"MiniMax-M2.7","choices":[{"index":0,"message":{"role":"assistant","content":"你好。"},"finish_reason":"stop"}],"usage":{"prompt_tokens":10,"completion_tokens":5,"total_tokens":15}}</code></pre></td>
            </tr>
            <tr>
              <td>文本对话 / 文本合成（官方 HTTP <code>/v1/text/chatcompletion_v2</code>）</td>
              <td class="curl-cell"><pre><code>curl -X POST "https://api.xiaoqiangonline.shop/minimax/v1/text/chatcompletion_v2" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{"model":"M2-her","messages":[{"role":"user","content":"你好"}]}'</code></pre></td>
              <td class="model-options"><code>M2-her</code> 及官方 OpenAPI 中其他 <code>model</code> — <a href="https://platform.minimaxi.com/docs/api-reference/text-chat" rel="noopener noreferrer" target="_blank">文本对话</a>、<a href="https://platform.minimaxi.com/docs/api-reference/text-post" rel="noopener noreferrer" target="_blank">文本合成</a>。</td>
              <td class="curl-cell"><pre><code>{
  "id": "05b81ca0cde9e60c3ae4ce7f60103250",
  "model": "M2-her",
  "choices": [
    { "index": 0, "finish_reason": "stop", "message": { "role": "assistant", "content": "你好，我是 M2-her。" } }
  ],
  "usage": { "total_tokens": 199 },
  "base_resp": { "status_code": 0, "status_msg": "" }
}</code></pre>
                <span class="response-note">官方 <code>ChatCompletionResp</code> — <a href="https://platform.minimaxi.com/docs/api-reference/text-chat" rel="noopener noreferrer" target="_blank">文本对话</a></span></td>
              <td class="curl-cell json-string-cell"><pre><code>{"id":"05b81ca0cde9e60c3ae4ce7f60103250","model":"M2-her","choices":[{"index":0,"finish_reason":"stop","message":{"role":"assistant","content":"你好，我是 M2-her。"}}],"usage":{"total_tokens":199},"base_resp":{"status_code":0,"status_msg":""}}</code></pre></td>
            </tr>
            <tr>
              <td>同步语音合成（HTTP <code>/v1/t2a_v2</code>）</td>
              <td class="curl-cell"><pre><code>curl -X POST "https://api.xiaoqiangonline.shop/minimax/v1/t2a_v2" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{"model":"speech-2.8-hd","text":"你好","stream":false,"voice_setting":{"voice_id":"male-qn-qingse","speed":1,"vol":1,"pitch":0},"audio_setting":{"sample_rate":32000,"bitrate":128000,"format":"mp3","channel":1}}'</code></pre></td>
              <td class="model-options"><code>speech-2.8-hd</code>、<code>speech-2.8-turbo</code>、<code>speech-2.6-hd</code>、<code>speech-2.6-turbo</code>、<code>speech-02-hd</code>、<code>speech-02-turbo</code> — <a href="https://platform.minimaxi.com/docs/api-reference/speech-t2a-http" rel="noopener noreferrer" target="_blank">同步语音合成 HTTP</a>。<br><span class="quota-note">每次成功：<strong>扣 5000</strong> 额度（无 Token 用量）。</span></td>
              <td class="curl-cell"><pre><code>{
  "data": { "audio": "[hex 编码音频]", "status": 2 },
  "extra_info": { "audio_format": "mp3", "audio_length": 9900 },
  "trace_id": "01b8bf9bb7433cc75c18eee6cfa8fe21",
  "base_resp": { "status_code": 0, "status_msg": "success" }
}</code></pre>
                <span class="response-note"><code>T2aV2Resp</code> — <a href="https://platform.minimaxi.com/docs/api-reference/speech-t2a-http" rel="noopener noreferrer" target="_blank">speech-t2a-http</a></span></td>
              <td class="curl-cell json-string-cell"><pre><code>{"data":{"audio":"[hex-encoded audio]","status":2},"extra_info":{"audio_format":"mp3","audio_length":9900},"trace_id":"01b8bf9bb7433cc75c18eee6cfa8fe21","base_resp":{"status_code":0,"status_msg":"success"}}</code></pre></td>
            </tr>
            <tr>
              <td>视频：文生视频（创建任务）</td>
              <td class="curl-cell"><pre><code>curl -X POST "https://api.xiaoqiangonline.shop/minimax/v1/video_generation" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{"model":"MiniMax-Hailuo-2.3","prompt":"一只猫在玩耍"}'</code></pre></td>
              <td class="model-options"><code>MiniMax-Hailuo-2.3</code>、<code>MiniMax-Hailuo-02</code>、<code>T2V-01-Director</code>、<code>T2V-01</code> — <a href="https://platform.minimaxi.com/docs/api-reference/video-generation-t2v" rel="noopener noreferrer" target="_blank">文生视频</a>。<br><span class="quota-note">每次创建成功：<strong>扣 5000</strong> 额度（无 Token 用量）。</span></td>
              <td class="curl-cell"><pre><code>{
  "task_id": "106916112212032",
  "base_resp": { "status_code": 0, "status_msg": "success" }
}</code></pre>
                <span class="response-note"><code>VideoGenerationResp</code> — <a href="https://platform.minimaxi.com/docs/api-reference/video-generation-t2v" rel="noopener noreferrer" target="_blank">文生视频</a></span></td>
              <td class="curl-cell json-string-cell"><pre><code>{"task_id":"106916112212032","base_resp":{"status_code":0,"status_msg":"success"}}</code></pre></td>
            </tr>
            <tr>
              <td>视频：图生视频（创建任务）</td>
              <td class="curl-cell"><pre><code>curl -X POST "https://api.xiaoqiangonline.shop/minimax/v1/video_generation" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{"model":"MiniMax-Hailuo-2.3","first_frame_image":"https://example.com/frame.jpg","prompt":"镜头推进"}'</code></pre></td>
              <td class="model-options"><code>MiniMax-Hailuo-2.3</code>、<code>MiniMax-Hailuo-2.3-Fast</code>、<code>MiniMax-Hailuo-02</code>、<code>I2V-01-Director</code>、<code>I2V-01-live</code>、<code>I2V-01</code> — <a href="https://platform.minimaxi.com/docs/api-reference/video-generation-i2v" rel="noopener noreferrer" target="_blank">图生视频</a>。<br><span class="quota-note">每次创建成功：<strong>扣 5000</strong> 额度（无 Token 用量）。</span></td>
              <td class="curl-cell"><pre><code>{
  "task_id": "106916112212032",
  "base_resp": { "status_code": 0, "status_msg": "success" }
}</code></pre>
                <span class="response-note">路径同文生视频；请求体见 <a href="https://platform.minimaxi.com/docs/api-reference/video-generation-i2v" rel="noopener noreferrer" target="_blank">图生视频</a></span></td>
              <td class="curl-cell json-string-cell"><pre><code>{"task_id":"106916112212032","base_resp":{"status_code":0,"status_msg":"success"}}</code></pre></td>
            </tr>
            <tr>
              <td>视频：首尾帧（创建任务）</td>
              <td class="curl-cell"><pre><code>curl -X POST "https://api.xiaoqiangonline.shop/minimax/v1/video_generation" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{"model":"MiniMax-Hailuo-02","prompt":"女孩长大","first_frame_image":"https://example.com/a.jpg","last_frame_image":"https://example.com/b.jpg"}'</code></pre></td>
              <td class="model-options"><code>MiniMax-Hailuo-02</code> — <a href="https://platform.minimaxi.com/docs/api-reference/video-generation-fl2v" rel="noopener noreferrer" target="_blank">首尾帧生成视频</a>。<br><span class="quota-note">每次创建成功：<strong>扣 5000</strong> 额度（无 Token 用量）。</span></td>
              <td class="curl-cell"><pre><code>{
  "task_id": "106916112212032",
  "base_resp": { "status_code": 0, "status_msg": "success" }
}</code></pre>
                <span class="response-note">同 <code>POST /v1/video_generation</code> — <a href="https://platform.minimaxi.com/docs/api-reference/video-generation-fl2v" rel="noopener noreferrer" target="_blank">首尾帧</a></span></td>
              <td class="curl-cell json-string-cell"><pre><code>{"task_id":"106916112212032","base_resp":{"status_code":0,"status_msg":"success"}}</code></pre></td>
            </tr>
            <tr>
              <td>视频：主体参考（创建任务）</td>
              <td class="curl-cell"><pre><code>curl -X POST "https://api.xiaoqiangonline.shop/minimax/v1/video_generation" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{"model":"S2V-01","prompt":"女孩跑向镜头并微笑","subject_reference":[{"type":"character","image":["https://example.com/ref.jpg"]}]}'</code></pre></td>
              <td class="model-options"><code>S2V-01</code> — <a href="https://platform.minimaxi.com/docs/api-reference/video-generation-s2v" rel="noopener noreferrer" target="_blank">主体参考视频</a>。<br><span class="quota-note">每次创建成功：<strong>扣 5000</strong> 额度（无 Token 用量）。</span></td>
              <td class="curl-cell"><pre><code>{
  "task_id": "106916112212032",
  "base_resp": { "status_code": 0, "status_msg": "success" }
}</code></pre>
                <span class="response-note">同 <code>POST /v1/video_generation</code> — <a href="https://platform.minimaxi.com/docs/api-reference/video-generation-s2v" rel="noopener noreferrer" target="_blank">主体参考</a></span></td>
              <td class="curl-cell json-string-cell"><pre><code>{"task_id":"106916112212032","base_resp":{"status_code":0,"status_msg":"success"}}</code></pre></td>
            </tr>
            <tr>
              <td>视频：查询任务状态</td>
              <td class="curl-cell"><pre><code>curl -G "https://api.xiaoqiangonline.shop/minimax/v1/query/video_generation" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  --data-urlencode "task_id=TASK_ID"</code></pre></td>
              <td class="model-options">必填 Query <code>task_id</code> — <a href="https://platform.minimaxi.com/docs/api-reference/video-generation-query" rel="noopener noreferrer" target="_blank">查询视频生成任务状态</a>。</td>
              <td class="curl-cell"><pre><code>{
  "task_id": "176843862716480",
  "status": "Success",
  "file_id": "176844028768320",
  "video_width": 1920,
  "video_height": 1080,
  "base_resp": { "status_code": 0, "status_msg": "success" }
}</code></pre>
                <span class="response-note"><code>QueryVideoGenerationTaskResp</code></span></td>
              <td class="curl-cell json-string-cell"><pre><code>{"task_id":"176843862716480","status":"Success","file_id":"176844028768320","video_width":1920,"video_height":1080,"base_resp":{"status_code":0,"status_msg":"success"}}</code></pre></td>
            </tr>
            <tr>
              <td>视频 / 文件：检索（下载链接）</td>
              <td class="curl-cell"><pre><code>curl -G "https://api.xiaoqiangonline.shop/minimax/v1/files/retrieve" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  --data-urlencode "file_id=FILE_ID"</code></pre></td>
              <td class="model-options">使用查询成功返回的 <code>file_id</code> — <a href="https://platform.minimaxi.com/docs/api-reference/video-generation-download" rel="noopener noreferrer" target="_blank">视频下载</a>。</td>
              <td class="curl-cell"><pre><code>{
  "file": {
    "file_id": 176844028768320,
    "filename": "output_aigc.mp4",
    "purpose": "video_generation",
    "download_url": "https://example.com/signed-url"
  },
  "base_resp": { "status_code": 0, "status_msg": "success" }
}</code></pre>
                <span class="response-note"><code>RetrieveFileResp</code></span></td>
              <td class="curl-cell json-string-cell"><pre><code>{"file":{"file_id":176844028768320,"filename":"output_aigc.mp4","purpose":"video_generation","download_url":"https://example.com/signed-url"},"base_resp":{"status_code":0,"status_msg":"success"}}</code></pre></td>
            </tr>
            <tr>
              <td>图像：文生图</td>
              <td class="curl-cell"><pre><code>curl -X POST "https://api.xiaoqiangonline.shop/minimax/v1/image_generation" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{"model":"image-01","prompt":"一只可爱的猫","aspect_ratio":"1:1","response_format":"url","n":1}'</code></pre></td>
              <td class="model-options"><code>image-01</code>、<code>image-01-live</code> — <a href="https://platform.minimaxi.com/docs/api-reference/image-generation-t2i" rel="noopener noreferrer" target="_blank">文生图</a>。<br><span class="quota-note">每次成功：<strong>扣 5000</strong> 额度（无 Token 用量）。</span></td>
              <td class="curl-cell"><pre><code>{
  "id": "03ff3cd0820949eb8a410056b5f21d38",
  "data": { "image_urls": ["https://example.com/out.png"] },
  "metadata": { "success_count": 1, "failed_count": 0 },
  "base_resp": { "status_code": 0, "status_msg": "success" }
}</code></pre>
                <span class="response-note"><code>ImageGenerationResp</code> — <a href="https://platform.minimaxi.com/docs/api-reference/image-generation-t2i" rel="noopener noreferrer" target="_blank">文生图</a></span></td>
              <td class="curl-cell json-string-cell"><pre><code>{"id":"03ff3cd0820949eb8a410056b5f21d38","data":{"image_urls":["https://example.com/out.png"]},"metadata":{"success_count":1,"failed_count":0},"base_resp":{"status_code":0,"status_msg":"success"}}</code></pre></td>
            </tr>
            <tr>
              <td>图像：图生图</td>
              <td class="curl-cell"><pre><code>curl -X POST "https://api.xiaoqiangonline.shop/minimax/v1/image_generation" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{"model":"image-01","prompt":"同人物，夕阳","subject_reference":[{"type":"character","image_file":"https://example.com/ref.jpg"}],"n":1}'</code></pre></td>
              <td class="model-options"><code>image-01</code>、<code>image-01-live</code> — <a href="https://platform.minimaxi.com/docs/api-reference/image-generation-i2i" rel="noopener noreferrer" target="_blank">图生图</a>（含 <code>subject_reference</code>）。<br><span class="quota-note">每次成功：<strong>扣 5000</strong> 额度（无 Token 用量）。</span></td>
              <td class="curl-cell"><pre><code>{
  "id": "03ff3cd0820949eb8a410056b5f21d38",
  "data": { "image_urls": ["https://example.com/out.png"] },
  "metadata": { "success_count": 1, "failed_count": 0 },
  "base_resp": { "status_code": 0, "status_msg": "success" }
}</code></pre>
                <span class="response-note">同 <code>POST /v1/image_generation</code> — <a href="https://platform.minimaxi.com/docs/api-reference/image-generation-i2i" rel="noopener noreferrer" target="_blank">图生图</a></span></td>
              <td class="curl-cell json-string-cell"><pre><code>{"id":"03ff3cd0820949eb8a410056b5f21d38","data":{"image_urls":["https://example.com/out.png"]},"metadata":{"success_count":1,"failed_count":0},"base_resp":{"status_code":0,"status_msg":"success"}}</code></pre></td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>认证</h2>
      <p>请求头携带：<code>Authorization: Bearer &lt;您的客户 API Key&gt;</code></p>

      <h2>查询剩余额度</h2>
      <p>使用与对话接口相同认证方式，发起 <strong>GET</strong> 请求即可查询当前 Key 的剩余 Token 额度（不扣费）。</p>
      <p><code>GET https://api.xiaoqiangonline.shop/v1/account/balance</code></p>
      <p>请求头：<code>Authorization: Bearer &lt;您的客户 API Key&gt;</code></p>
      <pre><code>{
  "object": "balance",
  "balance": 1234567,
  "platform": null
}</code></pre>
      <p>字段 <code>platform</code> 在新 Key 上可能为 <code>null</code>；每次请求均以 <code>model</code> 为准路由。</p>

      <h2>常见错误码</h2>
      <ul>
        <li><code>401</code> — API Key 无效或未提供</li>
        <li><code>400</code> — 参数错误（如缺少 <code>messages</code> / <code>model</code>，或 <code>model</code> 不在网关支持的模型列表内）</li>
      </ul>
    </template>
  </section>
</template>

<script setup lang="ts">
import DocsEnBody from "./DocsEnBody.vue";
import DocsJaBody from "./DocsJaBody.vue";
import DocsKoBody from "./DocsKoBody.vue";
import { siteLang } from "../i18n";
</script>

<style scoped>
.docs {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
h1 { font-size: 32px; margin: 0; }
h2 { font-size: 18px; margin: 14px 0 6px 0; }
h3 { font-size: 15px; margin: 12px 0 6px 0; color: rgba(231,233,238,0.85); }
.model-table-wrap {
  overflow-x: auto;
}
.model-table {
  width: 100%;
  border-collapse: collapse;
  min-width: 760px;
}
.model-table--wide {
  min-width: 1280px;
}
.response-note {
  display: block;
  margin-top: 8px;
  font-size: 11px;
  line-height: 1.4;
  color: rgba(231, 233, 238, 0.68);
}
.response-note--inline {
  display: inline;
  margin-top: 0;
}
.quota-note {
  display: block;
  margin-top: 6px;
  font-size: 11px;
  line-height: 1.45;
  color: rgba(200, 210, 230, 0.85);
}
.json-string-cell pre {
  font-size: 10px;
  line-height: 1.4;
}
.curl-cell pre {
  margin: 0;
  padding: 8px 10px;
  border-radius: 8px;
  background: rgba(0,0,0,0.28);
  font-size: 11px;
  line-height: 1.45;
  white-space: pre-wrap;
  word-break: break-word;
  overflow-x: auto;
}
.curl-cell pre code {
  background: none;
  padding: 0;
  font-size: inherit;
}
.model-table th,
.model-table td {
  text-align: left;
  padding: 10px 12px;
  border-bottom: 1px solid rgba(255,255,255,0.1);
  vertical-align: top;
}
.model-table th {
  color: rgba(231,233,238,0.9);
  font-weight: 700;
}
.model-table td {
  color: rgba(231,233,238,0.86);
}
code {
  background: rgba(255,255,255,0.08);
  padding: 2px 6px;
  border-radius: 6px;
  font-size: 14px;
}
pre {
  background: rgba(0,0,0,0.3);
  padding: 14px;
  border-radius: 12px;
  overflow-x: auto;
  margin: 0;
}
pre code {
  padding: 0;
  background: none;
}
ul {
  margin: 0;
  padding-left: 20px;
}
.model-options {
  font-size: 13px;
  line-height: 1.55;
  color: rgba(231,233,238,0.88);
}
</style>
