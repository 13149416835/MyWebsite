<template>
      <h1>API 문서</h1>
      <p>DeepSeek, Zhipu GLM, MiniMax 등 중국산 대형 모델 API를 제공합니다. 가격은 국제 모델 대비 약 1/10 수준이며, 안정적인 호출 품질로 일본/한국 개발자를 지원합니다.</p>

      <h2>게이트웨이 엔드포인트</h2>
      <p>통합 텍스트 대화: <code>POST https://api.xiaoqiangonline.shop/v1/chat/completions</code>（<code>model</code> 값에 따라 DeepSeek / Zhipu / MiniMax 자동 라우팅）.</p>
      <p>
        <strong>스트리밍 출력(SSE):</strong> 요청 본문에 <code>"stream": true</code>를 추가하면
        응답은 <code>text/event-stream</code> 형식으로 반환됩니다. 클라이언트에서는 <code>data:</code> 라인을 순차적으로 파싱하세요.
      </p>
      <p><strong>Python 스트리밍 수신 예시 (requests + stream=True):</strong></p>
      <pre><code>import json
import requests

url = "https://api.xiaoqiangonline.shop/v1/chat/completions"
headers = {
    "Authorization": "Bearer YOUR_API_KEY",
    "Content-Type": "application/json",
}
payload = {
    "model": "deepseek-chat",
    "stream": True,
    "messages": [{"role": "user", "content": "안녕하세요"}],
}

with requests.post(url, headers=headers, json=payload, stream=True, timeout=120) as resp:
    resp.raise_for_status()
    for raw_line in resp.iter_lines(decode_unicode=True):
        if not raw_line or not raw_line.startswith("data:"):
            continue
        data = raw_line[5:].strip()
        if data == "[DONE]":
            break
        chunk = json.loads(data)
        delta = chunk.get("choices", [{}])[0].get("delta", {})
        text = delta.get("content")
        if text:
            print(text, end="", flush=True)</code></pre>

      <h2>확장 REST API (GLM 라인 / MiniMax 라인)</h2>
      <p>
        통합 대화 API 외에도 동일한 호스트에서 추가 REST 엔드포인트를 제공합니다.
        인증에는 <strong>당사에서 발급한 API Key만</strong> (<code>Authorization: Bearer sk-...</code>) 사용해 주세요. 서드파티 콘솔에서 발급한 키로는 이 호스트를 호출하지 마세요.
      </p>
      <p><strong>기본 URL:</strong> <code>https://api.xiaoqiangonline.shop</code></p>
      <p class="model-options">비텍스트 생성 API(이미지, 음성, 영상 등)는 호출 건수 기준으로 과금됩니다. 성공 호출 1회마다 고정으로 <strong>5000</strong> Token이 차감됩니다. 호출 전에 계정 잔액이 충분한지 확인해 주세요.</p>

      <h2>모델</h2>

      <h3>DeepSeek</h3>
      <div class="model-table-wrap">
        <table class="model-table model-table--wide">
          <thead>
            <tr>
              <th>기능</th>
              <th>플랫폼 호출 방식</th>
              <th>예시 (<code>curl</code>)</th>
              <th>선택 가능한 <code>model</code> (정확히 일치)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>일반 대화</td>
              <td><code>POST https://api.xiaoqiangonline.shop/v1/chat/completions</code></td>
              <td class="curl-cell"><pre><code>curl -X POST "https://api.xiaoqiangonline.shop/v1/chat/completions" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{"model":"deepseek-chat","messages":[{"role":"user","content":"Hello"}]}'</code></pre></td>
              <td class="mono"><code>deepseek-chat</code></td>
            </tr>
            <tr>
              <td>추론 중심 작업</td>
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

      <h3>GLM 라인 (Zhipu)</h3>
      <p class="model-options">REST 경로는 <a href="https://docs.bigmodel.cn/" rel="noopener noreferrer" target="_blank">Zhipu OpenAPI</a> 기준을 따릅니다. <strong>플랫폼 과금 규칙:</strong> 응답에 과금 가능한 <code>usage.total_tokens</code>가 없을 때, 성공한 <code>POST …/images/generations</code>, <code>…/videos/generations</code>, <code>…/async/images/generations</code>, <code>…/audio/transcriptions</code>, <code>…/audio/speech</code>(오디오 바이너리 성공 반환)은 호출당 <strong>5000</strong> 쿼터를 차감합니다. <code>GET …/async-result/&lt;TASK_ID&gt;</code> 는 고정 과금 대상이 아닙니다(생성 시점에 이미 과금).</p>
      <div class="model-table-wrap">
        <table class="model-table model-table--wide">
          <thead>
            <tr>
              <th>기능 / API</th>
              <th>예시 (<code>curl</code>)</th>
              <th>본문 <code>model</code> (사용 가능 옵션)</th>
              <th>HTTP <code>200</code> 예시 (포맷된 JSON)</th>
              <th>반환 예시 (한 줄 <code>JSON</code> 문자열)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>통합 텍스트 대화 (<code>POST /v1/chat/completions</code>)</td>
              <td class="curl-cell"><pre><code>curl -X POST "https://api.xiaoqiangonline.shop/v1/chat/completions" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{"model":"glm-5","messages":[{"role":"user","content":"Hello"}]}'</code></pre></td>
              <td class="model-options">
                텍스트: <code>glm-5-turbo</code>, <code>glm-5</code>, <code>glm-4.7</code>, <code>glm-4.7-flash</code>, <code>glm-4.7-flashx</code>, <code>glm-4.6</code>, <code>glm-4.5-air</code>, <code>glm-4.5-airx</code>, <code>glm-4.5-flash</code>, <code>glm-4-flash-250414</code>, <code>glm-4-flashx-250414</code>, <code>glm-4-long</code>.
                비전: <code>glm-4.6v</code>, <code>autoglm-phone</code>, <code>glm-4.6v-flash</code>, <code>glm-4.6v-flashx</code>, <code>glm-4v-flash</code>, <code>glm-4.1v-thinking-flashx</code>, <code>glm-4.1v-thinking-flash</code>.
                오디오: <code>glm-4-voice</code>.
                역할/상담: <code>charglm-4</code>, <code>emohaa</code>.
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
              <td>동영상 생성 (비동기)</td>
              <td class="curl-cell"><pre><code>curl -X POST "https://api.xiaoqiangonline.shop/zhipu/v4/videos/generations" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{"model":"cogvideox-3","prompt":"A cat playing."}'</code></pre></td>
              <td class="model-options"><code>cogvideox-3</code>, <code>cogvideox-2</code>, <code>cogvideox-flash</code>, <code>viduq1-text</code>, <code>viduq1-image</code>, <code>vidu2-image</code>, <code>viduq1-start-end</code>, <code>vidu2-start-end</code>, <code>vidu2-reference</code> (본문 변형).<br><span class="quota-note">생성 성공 시마다 <strong>5000</strong> 쿼터 차감 (응답에 토큰 사용량 없음).</span></td>
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
              <td>이미지 생성 (비동기)</td>
              <td class="curl-cell"><pre><code>curl -X POST "https://api.xiaoqiangonline.shop/zhipu/v4/async/images/generations" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{"model":"glm-image","prompt":"A cute cat."}'</code></pre></td>
              <td class="model-options"><code>glm-image</code><br><span class="quota-note">생성 성공 시마다 <strong>5000</strong> 쿼터 차감 (응답에 토큰 사용량 없음).</span></td>
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
              <td>비동기 결과 조회</td>
              <td class="curl-cell"><pre><code>curl -X GET "https://api.xiaoqiangonline.shop/zhipu/v4/async-result/TASK_ID" \
  -H "Authorization: Bearer YOUR_API_KEY"</code></pre></td>
              <td class="model-options"><code>model</code> 없음; 경로 파라미터 <code>TASK_ID</code>는 비동기 생성 응답의 id를 사용합니다. — <a href="https://docs.bigmodel.cn/api-reference/%E6%A8%A1%E5%9E%8B-api/%E6%9F%A5%E8%AF%A2%E5%BC%82%E6%AD%A5%E7%BB%93%E6%9E%9C" rel="noopener noreferrer" target="_blank">비동기 결과 조회</a><br><span class="quota-note">고정 5000 과금 대상이 아님(생성 시 이미 과금).</span></td>
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
              <td>이미지 생성</td>
              <td class="curl-cell"><pre><code>curl -X POST "https://api.xiaoqiangonline.shop/zhipu/v4/images/generations" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{"model":"cogview-3-flash","prompt":"A cute cat."}'</code></pre></td>
              <td class="model-options"><code>glm-image</code>, <code>cogview-4-250304</code>, <code>cogview-4</code>, <code>cogview-3-flash</code><br><span class="quota-note">호출 성공 시마다 <strong>5000</strong> 쿼터 차감 (응답에 토큰 사용량 없음).</span></td>
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
              <td>음성 인식(STT)</td>
              <td class="curl-cell"><pre><code>curl -X POST "https://api.xiaoqiangonline.shop/zhipu/v4/audio/transcriptions" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -F "model=glm-asr-2512" \
  -F "file=@recording.wav"</code></pre></td>
              <td class="model-options"><code>glm-asr-2512</code><br><span class="quota-note">호출 성공 시마다 <strong>5000</strong> 쿼터 차감 (응답에 토큰 사용량 없음).</span></td>
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
              <td>음성 합성(TTS)</td>
              <td class="curl-cell"><pre><code>curl -X POST "https://api.xiaoqiangonline.shop/zhipu/v4/audio/speech" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{"model":"glm-tts","input":"Hello","voice":"tongtong","response_format":"wav"}'</code></pre></td>
              <td class="model-options"><code>glm-tts</code><br><span class="quota-note">바이너리 <code>audio/*</code> 응답 성공 시마다 <strong>5000</strong> 쿼터 차감 (토큰 사용량 없음).</span></td>
              <td class="curl-cell"><pre><code>HTTP/1.1 200 OK
Content-Type: audio/wav

[binary WAV body — OpenAPI: string, format binary]</code></pre>
                <span class="response-note">Non-JSON <code>200</code> — <a href="https://docs.bigmodel.cn/api-reference/%E6%A8%A1%E5%9E%8B-api/%E6%96%87%E6%9C%AC%E8%BD%AC%E8%AF%AD%E9%9F%B3" rel="noopener noreferrer" target="_blank">audio/speech</a></span></td>
              <td class="mono json-string-cell">—<br><span class="response-note response-note--inline">No JSON string; body is binary <code>audio/wav</code>.</span></td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3>MiniMax 라인</h3>
      <p class="model-options">기능과 HTTP 경로는 <a href="https://platform.minimaxi.com/docs/api-reference/api-overview" rel="noopener noreferrer" target="_blank">MiniMax API 개요</a>를 따릅니다. 아래 표에는 통합 텍스트 대화, 동기식 T2A(HTTP), 동영상 생성(생성/조회/파일 조회), 이미지 생성(T2I + I2I)만 포함했습니다. <strong>이 라인 과금 규칙:</strong> 상위 응답에 과금 가능한 토큰 사용량(예: <code>usage.total_tokens</code>)이 없으면 동기식 T2A 성공, <code>POST /v1/video_generation</code> 생성 성공, <code>POST /v1/image_generation</code> 성공마다 호출당 <strong>5000</strong> 쿼터를 차감합니다(동영상 조회/파일 조회는 제외). GLM 라인도 위 표에 명시된 경로에서 동일한 <strong>5000</strong> 고정 규칙을 적용합니다.</p>
      <div class="model-table-wrap">
        <table class="model-table model-table--wide">
          <thead>
            <tr>
              <th>기능 / API</th>
              <th>예시 (<code>curl</code>)</th>
              <th>본문 <code>model</code> (설명)</th>
              <th>HTTP <code>200</code> 예시 (포맷된 JSON)</th>
              <th>반환 예시 (한 줄 <code>JSON</code> 문자열)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>통합 텍스트 대화 (<code>POST /v1/chat/completions</code>)</td>
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
              <td>텍스트 대화 / 완성 (공식 HTTP <code>/v1/text/chatcompletion_v2</code>)</td>
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
              <td>동기식 T2A (HTTP <code>/v1/t2a_v2</code>)</td>
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
              <td>동영상: 텍스트→비디오 (작업 생성)</td>
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
              <td>동영상: 이미지→비디오 (작업 생성)</td>
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
              <td>동영상: 시작/끝 프레임 (작업 생성)</td>
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
              <td>동영상: 주체 참조 (작업 생성)</td>
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
              <td>동영상: 작업 상태 조회</td>
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
              <td>동영상 / 파일: 조회 (다운로드 URL)</td>
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
              <td>이미지: 텍스트→이미지</td>
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
              <td>이미지: 이미지→이미지</td>
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

      <h2>인증</h2>
      <p>헤더: <code>Authorization: Bearer &lt;고객 API Key&gt;</code></p>
      <p>API Key는 안전하게 보관하세요. 타인과 공유하거나 공개 코드 저장소에 업로드하지 마세요.</p>

      <h2>남은 쿼터 조회</h2>
      <p>동일한 API Key로 아래 <strong>GET</strong> 요청을 호출하세요. 읽기 전용이며 쿼터를 차감하지 않습니다.</p>
      <p><code>GET https://api.xiaoqiangonline.shop/v1/account/balance</code></p>
      <p>헤더: <code>Authorization: Bearer &lt;고객 API Key&gt;</code></p>
      <pre><code>{
  "object": "balance",
  "balance": 1234567,
  "platform": null
}</code></pre>
      <p>신규 Key에서는 <code>platform</code> 값이 <code>null</code>일 수 있으며, 라우팅은 매 요청의 <code>model</code> 값을 기준으로 동작합니다.</p>

      <h2>오류 코드</h2>
      <ul>
        <li><code>401</code> - API Key 누락 또는 유효하지 않음</li>
        <li><code>400</code> - 잘못된 파라미터 또는 지원하지 않는 <code>model</code></li>
        <li><code>402</code> - Token 잔액 부족</li>
      </ul>

</template>
<script setup lang="ts">
defineOptions({ name: "DocsKoBody" });
</script>
