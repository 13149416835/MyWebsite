<template>
      <h1>API 문서</h1>

      <h2>Gateway Endpoint</h2>
      <p>Unified text chat: <code>POST https://api.xiaoqiangonline.shop/v1/chat/completions</code>（DeepSeek / Zhipu / MiniMax by <code>model</code>).</p>

      <h2>Extended REST APIs (GLM line &amp; MiniMax line)</h2>
      <p>
        Besides unified chat, this platform exposes additional REST entry points under the same host. Use only the
        <strong>API key we issue to you</strong> (<code>Authorization: Bearer sk-...</code>). Do not use keys from any third-party console for calls to this host.
      </p>
      <p><strong>Base URL:</strong> <code>https://api.xiaoqiangonline.shop</code></p>

      <h2>Models</h2>

      <h3>DeepSeek</h3>
      <div class="model-table-wrap">
        <table class="model-table model-table--wide">
          <thead>
            <tr>
              <th>Capability</th>
              <th>How to call on this platform</th>
              <th>Example (<code>curl</code>)</th>
              <th>Optional <code>model</code> (exact string)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>General chat</td>
              <td><code>POST https://api.xiaoqiangonline.shop/v1/chat/completions</code></td>
              <td class="curl-cell"><pre><code>curl -X POST "https://api.xiaoqiangonline.shop/v1/chat/completions" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{"model":"deepseek-chat","messages":[{"role":"user","content":"Hello"}]}'</code></pre></td>
              <td class="mono"><code>deepseek-chat</code></td>
            </tr>
            <tr>
              <td>Reasoning-heavy tasks</td>
              <td><code>POST https://api.xiaoqiangonline.shop/v1/chat/completions</code></td>
              <td class="curl-cell"><pre><code>curl -X POST "https://api.xiaoqiangonline.shop/v1/chat/completions" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{"model":"deepseek-reasoner","messages":[{"role":"user","content":"Explain step by step."}]}'</code></pre></td>
              <td class="mono"><code>deepseek-reasoner</code></td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3>GLM line (Zhipu)</h3>
      <p class="model-options">REST paths follow <a href="https://docs.bigmodel.cn/" rel="noopener noreferrer" target="_blank">Zhipu OpenAPI</a>. <strong>Gateway billing:</strong> when the response has no billable <code>usage.total_tokens</code>, each successful <code>POST …/images/generations</code>, <code>…/videos/generations</code>, <code>…/async/images/generations</code>, <code>…/audio/transcriptions</code>, and <code>…/audio/speech</code> (successful binary audio) deducts <strong>5000</strong> quota per call on this platform. <code>GET …/async-result/&lt;TASK_ID&gt;</code> is <strong>not</strong> charged at this flat rate (the async create was already billed).</p>
      <div class="model-table-wrap">
        <table class="model-table model-table--wide">
          <thead>
            <tr>
              <th>Capability / API</th>
              <th>Example (<code>curl</code>)</th>
              <th>Body <code>model</code> (Available options)</th>
              <th>HTTP <code>200</code> sample (JSON, formatted)</th>
              <th>Return sample (<code>JSON</code> string, one line)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Unified text chat (<code>POST /v1/chat/completions</code>)</td>
              <td class="curl-cell"><pre><code>curl -X POST "https://api.xiaoqiangonline.shop/v1/chat/completions" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{"model":"glm-5","messages":[{"role":"user","content":"Hello"}]}'</code></pre></td>
              <td class="model-options">
                Text: <code>glm-5-turbo</code>, <code>glm-5</code>, <code>glm-4.7</code>, <code>glm-4.7-flash</code>, <code>glm-4.7-flashx</code>, <code>glm-4.6</code>, <code>glm-4.5-air</code>, <code>glm-4.5-airx</code>, <code>glm-4.5-flash</code>, <code>glm-4-flash-250414</code>, <code>glm-4-flashx-250414</code>, <code>glm-4-long</code>.
                Vision: <code>glm-4.6v</code>, <code>autoglm-phone</code>, <code>glm-4.6v-flash</code>, <code>glm-4.6v-flashx</code>, <code>glm-4v-flash</code>, <code>glm-4.1v-thinking-flashx</code>, <code>glm-4.1v-thinking-flash</code>.
                Audio: <code>glm-4-voice</code>.
                Role / counseling: <code>charglm-4</code>, <code>emohaa</code>.
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
        "content": "Hello — I am the assistant."
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
                <span class="response-note"><code>ChatCompletionResponse</code> — <a href="https://docs.bigmodel.cn/api-reference/%E6%A8%A1%E5%9E%8B-api/%E5%AF%B9%E8%AF%9D%E8%A1%A5%E5%85%A8" rel="noopener noreferrer" target="_blank">chat completions</a></span></td>
              <td class="curl-cell json-string-cell"><pre><code>{"id":"20250101120000.abc123","request_id":"req_demo","created":1735689600,"model":"glm-5","choices":[{"index":0,"message":{"role":"assistant","content":"Hello — I am the assistant."},"finish_reason":"stop"}],"usage":{"prompt_tokens":20,"completion_tokens":15,"total_tokens":35}}</code></pre></td>
            </tr>
            <tr>
              <td>Video generation (async)</td>
              <td class="curl-cell"><pre><code>curl -X POST "https://api.xiaoqiangonline.shop/zhipu/v4/videos/generations" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{"model":"cogvideox-3","prompt":"A cat playing."}'</code></pre></td>
              <td class="model-options"><code>cogvideox-3</code>, <code>cogvideox-2</code>, <code>cogvideox-flash</code>, <code>viduq1-text</code>, <code>viduq1-image</code>, <code>vidu2-image</code>, <code>viduq1-start-end</code>, <code>vidu2-start-end</code>, <code>vidu2-reference</code> (body variant).<br><span class="quota-note">Each successful create: <strong>−5000</strong> quota (no token usage in response).</span></td>
              <td class="curl-cell"><pre><code>{
  "model": "cogvideox-3",
  "id": "7593127498661400000",
  "request_id": "req_demo",
  "task_status": "PROCESSING"
}</code></pre>
                <span class="response-note"><code>AsyncResponse</code> — <a href="https://docs.bigmodel.cn/api-reference/%E6%A8%A1%E5%9E%8B-api/%E8%A7%86%E9%A2%91%E7%94%9F%E6%88%90%E5%BC%82%E6%AD%A5" rel="noopener noreferrer" target="_blank">videos/generations (async)</a></span></td>
              <td class="curl-cell json-string-cell"><pre><code>{"model":"cogvideox-3","id":"7593127498661400000","request_id":"req_demo","task_status":"PROCESSING"}</code></pre></td>
            </tr>
            <tr>
              <td>Image generation (async)</td>
              <td class="curl-cell"><pre><code>curl -X POST "https://api.xiaoqiangonline.shop/zhipu/v4/async/images/generations" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{"model":"glm-image","prompt":"A cute cat."}'</code></pre></td>
              <td class="model-options"><code>glm-image</code><br><span class="quota-note">Each successful create: <strong>−5000</strong> quota (no token usage in response).</span></td>
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
              <td>Query async result</td>
              <td class="curl-cell"><pre><code>curl -X GET "https://api.xiaoqiangonline.shop/zhipu/v4/async-result/TASK_ID" \
  -H "Authorization: Bearer YOUR_API_KEY"</code></pre></td>
              <td class="model-options">No <code>model</code>; path parameter <code>TASK_ID</code> from the async create response. — <a href="https://docs.bigmodel.cn/api-reference/%E6%A8%A1%E5%9E%8B-api/%E6%9F%A5%E8%AF%A2%E5%BC%82%E6%AD%A5%E7%BB%93%E6%9E%9C" rel="noopener noreferrer" target="_blank">query async result</a><br><span class="quota-note">Not billed at the flat 5000 rate; creation was already charged.</span></td>
              <td class="curl-cell"><pre><code>{
  "id": "7593127498661400000",
  "task_status": "SUCCESS",
  "video_result": [
    { "url": "https://example.com/generated.mp4", "cover_image_url": "https://example.com/cover.jpg" }
  ]
}</code></pre>
                <span class="response-note">Shape varies by task type (chat / video / image); see vendor OpenAPI.</span></td>
              <td class="curl-cell json-string-cell"><pre><code>{"id":"7593127498661400000","task_status":"SUCCESS","video_result":[{"url":"https://example.com/generated.mp4","cover_image_url":"https://example.com/cover.jpg"}]}</code></pre></td>
            </tr>
            <tr>
              <td>Image generation</td>
              <td class="curl-cell"><pre><code>curl -X POST "https://api.xiaoqiangonline.shop/zhipu/v4/images/generations" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{"model":"cogview-3-flash","prompt":"A cute cat."}'</code></pre></td>
              <td class="model-options"><code>glm-image</code>, <code>cogview-4-250304</code>, <code>cogview-4</code>, <code>cogview-3-flash</code><br><span class="quota-note">Each successful call: <strong>−5000</strong> quota (no token usage in response).</span></td>
              <td class="curl-cell"><pre><code>{
  "created": 1735689600,
  "data": [
    {
      "url": "https://example.com/tmp/generated.png"
    }
  ]
}</code></pre>
                <span class="response-note"><code>ImageGenerationResponse</code> — <a href="https://docs.bigmodel.cn/api-reference/%E6%A8%A1%E5%9E%8B-api/%E5%9B%BE%E5%83%8F%E7%94%9F%E6%88%90" rel="noopener noreferrer" target="_blank">images/generations</a></span></td>
              <td class="curl-cell json-string-cell"><pre><code>{"created":1735689600,"data":[{"url":"https://example.com/tmp/generated.png"}]}</code></pre></td>
            </tr>
            <tr>
              <td>Speech-to-text</td>
              <td class="curl-cell"><pre><code>curl -X POST "https://api.xiaoqiangonline.shop/zhipu/v4/audio/transcriptions" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -F "model=glm-asr-2512" \
  -F "file=@recording.wav"</code></pre></td>
              <td class="model-options"><code>glm-asr-2512</code><br><span class="quota-note">Each successful call: <strong>−5000</strong> quota (no token usage in response).</span></td>
              <td class="curl-cell"><pre><code>{
  "id": "asr_0000000000000000000",
  "created": 1735689600,
  "request_id": "req_demo",
  "model": "glm-asr-2512",
  "text": "Transcribed text from the audio."
}</code></pre>
                <span class="response-note"><code>AudioTranscriptionResponse</code> — <a href="https://docs.bigmodel.cn/api-reference/%E6%A8%A1%E5%9E%8B-api/%E8%AF%AD%E9%9F%B3%E8%BD%AC%E6%96%87%E6%9C%AC" rel="noopener noreferrer" target="_blank">audio/transcriptions</a></span></td>
              <td class="curl-cell json-string-cell"><pre><code>{"id":"asr_0000000000000000000","created":1735689600,"request_id":"req_demo","model":"glm-asr-2512","text":"Transcribed text from the audio."}</code></pre></td>
            </tr>
            <tr>
              <td>Text-to-speech</td>
              <td class="curl-cell"><pre><code>curl -X POST "https://api.xiaoqiangonline.shop/zhipu/v4/audio/speech" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{"model":"glm-tts","input":"Hello","voice":"tongtong","response_format":"wav"}'</code></pre></td>
              <td class="model-options"><code>glm-tts</code><br><span class="quota-note">Each successful binary <code>audio/*</code> response: <strong>−5000</strong> quota (no token usage).</span></td>
              <td class="curl-cell"><pre><code>HTTP/1.1 200 OK
Content-Type: audio/wav

[binary WAV body — OpenAPI: string, format binary]</code></pre>
                <span class="response-note">Non-JSON <code>200</code> — <a href="https://docs.bigmodel.cn/api-reference/%E6%A8%A1%E5%9E%8B-api/%E6%96%87%E6%9C%AC%E8%BD%AC%E8%AF%AD%E9%9F%B3" rel="noopener noreferrer" target="_blank">audio/speech</a></span></td>
              <td class="mono json-string-cell">—<br><span class="response-note response-note--inline">No JSON string; body is binary <code>audio/wav</code>.</span></td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3>MiniMax line</h3>
      <p class="model-options">Capabilities and HTTP paths follow <a href="https://platform.minimaxi.com/docs/api-reference/api-overview" rel="noopener noreferrer" target="_blank">MiniMax API overview</a>. Below lists only unified text chat, synchronous T2A over HTTP, video generation (all create/query/file steps), and image generation (T2I + I2I). <strong>Gateway billing (this line):</strong> when upstream responses have no billable token usage (e.g. <code>usage.total_tokens</code>), each successful synchronous T2A request, each successful <code>POST /v1/video_generation</code> (create task only), and each successful <code>POST /v1/image_generation</code> deducts <strong>5000</strong> quota per call on this platform (video query and file retrieve are not under this flat rule). Zhipu GLM uses the same <strong>5000</strong> flat rule on the paths listed in the GLM table above.</p>
      <div class="model-table-wrap">
        <table class="model-table model-table--wide">
          <thead>
            <tr>
              <th>Capability / API</th>
              <th>Example (<code>curl</code>)</th>
              <th>Body <code>model</code> (and notes)</th>
              <th>HTTP <code>200</code> sample (JSON, formatted)</th>
              <th>Return sample (<code>JSON</code> string, one line)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Unified text chat (<code>POST /v1/chat/completions</code>)</td>
              <td class="curl-cell"><pre><code>curl -X POST "https://api.xiaoqiangonline.shop/v1/chat/completions" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{"model":"MiniMax-M2.7","messages":[{"role":"user","content":"Hello"}]}'</code></pre></td>
              <td class="model-options"><code>MiniMax-M2.7</code>, <code>MiniMax-M2.7-highspeed</code>, <code>MiniMax-M2.5</code>, <code>MiniMax-M2.5-highspeed</code>, <code>MiniMax-M2.1</code>, <code>MiniMax-M2.1-highspeed</code>, <code>MiniMax-M2</code>, <code>M2-her</code> — per <a href="https://platform.minimaxi.com/docs/api-reference/api-overview" rel="noopener noreferrer" target="_blank">text generation</a> / OpenAI-compatible routing on this gateway.</td>
              <td class="curl-cell"><pre><code>{
  "id": "chatcmpl_demo",
  "model": "MiniMax-M2.7",
  "choices": [
    { "index": 0, "message": { "role": "assistant", "content": "Hello." }, "finish_reason": "stop" }
  ],
  "usage": { "prompt_tokens": 10, "completion_tokens": 5, "total_tokens": 15 }
}</code></pre>
                <span class="response-note">OpenAI-compatible shape on this gateway — vendor <a href="https://platform.minimaxi.com/docs/api-reference/text-openai-api" rel="noopener noreferrer" target="_blank">text-openai-api</a></span></td>
              <td class="curl-cell json-string-cell"><pre><code>{"id":"chatcmpl_demo","model":"MiniMax-M2.7","choices":[{"index":0,"message":{"role":"assistant","content":"Hello."},"finish_reason":"stop"}],"usage":{"prompt_tokens":10,"completion_tokens":5,"total_tokens":15}}</code></pre></td>
            </tr>
            <tr>
              <td>Text chat / completion (vendor HTTP <code>/v1/text/chatcompletion_v2</code>)</td>
              <td class="curl-cell"><pre><code>curl -X POST "https://api.xiaoqiangonline.shop/minimax/v1/text/chatcompletion_v2" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{"model":"M2-her","messages":[{"role":"user","content":"Hello"}]}'</code></pre></td>
              <td class="model-options"><code>M2-her</code> and other IDs in vendor OpenAPI — <a href="https://platform.minimaxi.com/docs/api-reference/text-chat" rel="noopener noreferrer" target="_blank">text-chat</a>, <a href="https://platform.minimaxi.com/docs/api-reference/text-post" rel="noopener noreferrer" target="_blank">text-post</a>.</td>
              <td class="curl-cell"><pre><code>{
  "id": "05b81ca0cde9e60c3ae4ce7f60103250",
  "model": "M2-her",
  "choices": [
    { "index": 0, "finish_reason": "stop", "message": { "role": "assistant", "content": "Hi — I am M2-her." } }
  ],
  "usage": { "total_tokens": 199 },
  "base_resp": { "status_code": 0, "status_msg": "" }
}</code></pre>
                <span class="response-note">Vendor <code>ChatCompletionResp</code> — <a href="https://platform.minimaxi.com/docs/api-reference/text-chat" rel="noopener noreferrer" target="_blank">text-chat</a></span></td>
              <td class="curl-cell json-string-cell"><pre><code>{"id":"05b81ca0cde9e60c3ae4ce7f60103250","model":"M2-her","choices":[{"index":0,"finish_reason":"stop","message":{"role":"assistant","content":"Hi — I am M2-her."}}],"usage":{"total_tokens":199},"base_resp":{"status_code":0,"status_msg":""}}</code></pre></td>
            </tr>
            <tr>
              <td>Synchronous T2A (HTTP <code>/v1/t2a_v2</code>)</td>
              <td class="curl-cell"><pre><code>curl -X POST "https://api.xiaoqiangonline.shop/minimax/v1/t2a_v2" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{"model":"speech-2.8-hd","text":"Hello","stream":false,"voice_setting":{"voice_id":"male-qn-qingse","speed":1,"vol":1,"pitch":0},"audio_setting":{"sample_rate":32000,"bitrate":128000,"format":"mp3","channel":1}}'</code></pre></td>
              <td class="model-options"><code>speech-2.8-hd</code>, <code>speech-2.8-turbo</code>, <code>speech-2.6-hd</code>, <code>speech-2.6-turbo</code>, <code>speech-02-hd</code>, <code>speech-02-turbo</code> — <a href="https://platform.minimaxi.com/docs/api-reference/speech-t2a-http" rel="noopener noreferrer" target="_blank">speech-t2a-http</a>.<br><span class="quota-note">Each successful call: <strong>−5000</strong> quota (no token usage in response).</span></td>
              <td class="curl-cell"><pre><code>{
  "data": { "audio": "[hex-encoded audio]", "status": 2 },
  "extra_info": { "audio_format": "mp3", "audio_length": 9900 },
  "trace_id": "01b8bf9bb7433cc75c18eee6cfa8fe21",
  "base_resp": { "status_code": 0, "status_msg": "success" }
}</code></pre>
                <span class="response-note"><code>T2aV2Resp</code> — <a href="https://platform.minimaxi.com/docs/api-reference/speech-t2a-http" rel="noopener noreferrer" target="_blank">speech-t2a-http</a></span></td>
              <td class="curl-cell json-string-cell"><pre><code>{"data":{"audio":"[hex-encoded audio]","status":2},"extra_info":{"audio_format":"mp3","audio_length":9900},"trace_id":"01b8bf9bb7433cc75c18eee6cfa8fe21","base_resp":{"status_code":0,"status_msg":"success"}}</code></pre></td>
            </tr>
            <tr>
              <td>Video: text-to-video (create task)</td>
              <td class="curl-cell"><pre><code>curl -X POST "https://api.xiaoqiangonline.shop/minimax/v1/video_generation" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{"model":"MiniMax-Hailuo-2.3","prompt":"A cat playing."}'</code></pre></td>
              <td class="model-options"><code>MiniMax-Hailuo-2.3</code>, <code>MiniMax-Hailuo-02</code>, <code>T2V-01-Director</code>, <code>T2V-01</code> — <a href="https://platform.minimaxi.com/docs/api-reference/video-generation-t2v" rel="noopener noreferrer" target="_blank">video-generation-t2v</a>.<br><span class="quota-note">Each successful create: <strong>−5000</strong> quota (no token usage in response).</span></td>
              <td class="curl-cell"><pre><code>{
  "task_id": "106916112212032",
  "base_resp": { "status_code": 0, "status_msg": "success" }
}</code></pre>
                <span class="response-note"><code>VideoGenerationResp</code> — <a href="https://platform.minimaxi.com/docs/api-reference/video-generation-t2v" rel="noopener noreferrer" target="_blank">t2v</a></span></td>
              <td class="curl-cell json-string-cell"><pre><code>{"task_id":"106916112212032","base_resp":{"status_code":0,"status_msg":"success"}}</code></pre></td>
            </tr>
            <tr>
              <td>Video: image-to-video (create task)</td>
              <td class="curl-cell"><pre><code>curl -X POST "https://api.xiaoqiangonline.shop/minimax/v1/video_generation" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{"model":"MiniMax-Hailuo-2.3","first_frame_image":"https://example.com/frame.jpg","prompt":"Camera pushes in."}'</code></pre></td>
              <td class="model-options"><code>MiniMax-Hailuo-2.3</code>, <code>MiniMax-Hailuo-2.3-Fast</code>, <code>MiniMax-Hailuo-02</code>, <code>I2V-01-Director</code>, <code>I2V-01-live</code>, <code>I2V-01</code> — <a href="https://platform.minimaxi.com/docs/api-reference/video-generation-i2v" rel="noopener noreferrer" target="_blank">video-generation-i2v</a>.<br><span class="quota-note">Each successful create: <strong>−5000</strong> quota (no token usage in response).</span></td>
              <td class="curl-cell"><pre><code>{
  "task_id": "106916112212032",
  "base_resp": { "status_code": 0, "status_msg": "success" }
}</code></pre>
                <span class="response-note">Same path as T2V; body per <a href="https://platform.minimaxi.com/docs/api-reference/video-generation-i2v" rel="noopener noreferrer" target="_blank">i2v</a></span></td>
              <td class="curl-cell json-string-cell"><pre><code>{"task_id":"106916112212032","base_resp":{"status_code":0,"status_msg":"success"}}</code></pre></td>
            </tr>
            <tr>
              <td>Video: first &amp; last frame (create task)</td>
              <td class="curl-cell"><pre><code>curl -X POST "https://api.xiaoqiangonline.shop/minimax/v1/video_generation" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{"model":"MiniMax-Hailuo-02","prompt":"A girl grows up.","first_frame_image":"https://example.com/a.jpg","last_frame_image":"https://example.com/b.jpg"}'</code></pre></td>
              <td class="model-options"><code>MiniMax-Hailuo-02</code> — <a href="https://platform.minimaxi.com/docs/api-reference/video-generation-fl2v" rel="noopener noreferrer" target="_blank">video-generation-fl2v</a>.<br><span class="quota-note">Each successful create: <strong>−5000</strong> quota (no token usage in response).</span></td>
              <td class="curl-cell"><pre><code>{
  "task_id": "106916112212032",
  "base_resp": { "status_code": 0, "status_msg": "success" }
}</code></pre>
                <span class="response-note">Same <code>POST /v1/video_generation</code> — <a href="https://platform.minimaxi.com/docs/api-reference/video-generation-fl2v" rel="noopener noreferrer" target="_blank">fl2v</a></span></td>
              <td class="curl-cell json-string-cell"><pre><code>{"task_id":"106916112212032","base_resp":{"status_code":0,"status_msg":"success"}}</code></pre></td>
            </tr>
            <tr>
              <td>Video: subject-reference (create task)</td>
              <td class="curl-cell"><pre><code>curl -X POST "https://api.xiaoqiangonline.shop/minimax/v1/video_generation" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{"model":"S2V-01","prompt":"A girl runs and smiles.","subject_reference":[{"type":"character","image":["https://example.com/ref.jpg"]}]}'</code></pre></td>
              <td class="model-options"><code>S2V-01</code> — <a href="https://platform.minimaxi.com/docs/api-reference/video-generation-s2v" rel="noopener noreferrer" target="_blank">video-generation-s2v</a>.<br><span class="quota-note">Each successful create: <strong>−5000</strong> quota (no token usage in response).</span></td>
              <td class="curl-cell"><pre><code>{
  "task_id": "106916112212032",
  "base_resp": { "status_code": 0, "status_msg": "success" }
}</code></pre>
                <span class="response-note">Same <code>POST /v1/video_generation</code> — <a href="https://platform.minimaxi.com/docs/api-reference/video-generation-s2v" rel="noopener noreferrer" target="_blank">s2v</a></span></td>
              <td class="curl-cell json-string-cell"><pre><code>{"task_id":"106916112212032","base_resp":{"status_code":0,"status_msg":"success"}}</code></pre></td>
            </tr>
            <tr>
              <td>Video: query task status</td>
              <td class="curl-cell"><pre><code>curl -G "https://api.xiaoqiangonline.shop/minimax/v1/query/video_generation" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  --data-urlencode "task_id=TASK_ID"</code></pre></td>
              <td class="model-options">Query <code>task_id</code> (required). — <a href="https://platform.minimaxi.com/docs/api-reference/video-generation-query" rel="noopener noreferrer" target="_blank">video-generation-query</a>.</td>
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
              <td>Video / file: retrieve (download URL)</td>
              <td class="curl-cell"><pre><code>curl -G "https://api.xiaoqiangonline.shop/minimax/v1/files/retrieve" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  --data-urlencode "file_id=FILE_ID"</code></pre></td>
              <td class="model-options">Query <code>file_id</code> from successful query. — <a href="https://platform.minimaxi.com/docs/api-reference/video-generation-download" rel="noopener noreferrer" target="_blank">video-generation-download</a>.</td>
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
              <td>Image: text-to-image</td>
              <td class="curl-cell"><pre><code>curl -X POST "https://api.xiaoqiangonline.shop/minimax/v1/image_generation" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{"model":"image-01","prompt":"A cute cat","aspect_ratio":"1:1","response_format":"url","n":1}'</code></pre></td>
              <td class="model-options"><code>image-01</code>, <code>image-01-live</code> — <a href="https://platform.minimaxi.com/docs/api-reference/image-generation-t2i" rel="noopener noreferrer" target="_blank">image-generation-t2i</a>.<br><span class="quota-note">Each successful call: <strong>−5000</strong> quota (no token usage in response).</span></td>
              <td class="curl-cell"><pre><code>{
  "id": "03ff3cd0820949eb8a410056b5f21d38",
  "data": { "image_urls": ["https://example.com/out.png"] },
  "metadata": { "success_count": 1, "failed_count": 0 },
  "base_resp": { "status_code": 0, "status_msg": "success" }
}</code></pre>
                <span class="response-note"><code>ImageGenerationResp</code> — <a href="https://platform.minimaxi.com/docs/api-reference/image-generation-t2i" rel="noopener noreferrer" target="_blank">t2i</a></span></td>
              <td class="curl-cell json-string-cell"><pre><code>{"id":"03ff3cd0820949eb8a410056b5f21d38","data":{"image_urls":["https://example.com/out.png"]},"metadata":{"success_count":1,"failed_count":0},"base_resp":{"status_code":0,"status_msg":"success"}}</code></pre></td>
            </tr>
            <tr>
              <td>Image: image-to-image</td>
              <td class="curl-cell"><pre><code>curl -X POST "https://api.xiaoqiangonline.shop/minimax/v1/image_generation" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{"model":"image-01","prompt":"Same person, sunset","subject_reference":[{"type":"character","image_file":"https://example.com/ref.jpg"}],"n":1}'</code></pre></td>
              <td class="model-options"><code>image-01</code>, <code>image-01-live</code> — <a href="https://platform.minimaxi.com/docs/api-reference/image-generation-i2i" rel="noopener noreferrer" target="_blank">image-generation-i2i</a> (body includes <code>subject_reference</code>).<br><span class="quota-note">Each successful call: <strong>−5000</strong> quota (no token usage in response).</span></td>
              <td class="curl-cell"><pre><code>{
  "id": "03ff3cd0820949eb8a410056b5f21d38",
  "data": { "image_urls": ["https://example.com/out.png"] },
  "metadata": { "success_count": 1, "failed_count": 0 },
  "base_resp": { "status_code": 0, "status_msg": "success" }
}</code></pre>
                <span class="response-note">Same <code>POST /v1/image_generation</code> — <a href="https://platform.minimaxi.com/docs/api-reference/image-generation-i2i" rel="noopener noreferrer" target="_blank">i2i</a></span></td>
              <td class="curl-cell json-string-cell"><pre><code>{"id":"03ff3cd0820949eb8a410056b5f21d38","data":{"image_urls":["https://example.com/out.png"]},"metadata":{"success_count":1,"failed_count":0},"base_resp":{"status_code":0,"status_msg":"success"}}</code></pre></td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>Authentication</h2>
      <p>Header: <code>Authorization: Bearer &lt;your customer API key&gt;</code></p>

      <h2>Check Remaining Quota</h2>
      <p>Use <strong>GET</strong> below with the same API key. It is read-only and does not consume quota.</p>
      <p><code>GET https://api.xiaoqiangonline.shop/v1/account/balance</code></p>
      <p>Header: <code>Authorization: Bearer &lt;your customer API key&gt;</code></p>
      <pre><code>{
  "object": "balance",
  "balance": 1234567,
  "platform": null
}</code></pre>
      <p><code>platform</code> may be <code>null</code> for newer keys; routing always follows <code>model</code> on each request.</p>

      <h2>Error Codes</h2>
      <ul>
        <li><code>401</code> - missing/invalid API key</li>
        <li><code>400</code> - invalid parameters or unsupported <code>model</code></li>
      </ul>

</template>
<script setup lang="ts">
defineOptions({ name: "DocsKoBody" });
</script>
