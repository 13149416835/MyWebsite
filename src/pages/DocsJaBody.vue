<template>
      <h1>API ドキュメント</h1>
      <p>DeepSeek・智譜 GLM・MiniMax など中国国産大規模モデル API を提供します。価格は国際系モデルの約 1/10 で、安定した呼び出し品質を維持し、日本・韓国の開発者にも対応しています。</p>

      <h2>ゲートウェイエンドポイント</h2>
      <p>統一テキスト対話：<code>POST https://api.xiaoqiangonline.shop/v1/chat/completions</code>（<code>model</code> により DeepSeek / 智譜 / MiniMax を自動ルーティング）。</p>
      <p>
        <strong>ストリーミング出力（SSE）：</strong>リクエスト本文に <code>"stream": true</code> を追加すると、
        レスポンスは <code>text/event-stream</code> になります。クライアント側では <code>data:</code> 行を逐次解析してください。
      </p>
      <p><strong>Python ストリーミング受信例（requests + stream=True）：</strong></p>
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
    "messages": [{"role": "user", "content": "こんにちは"}],
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

      <h2>拡張 REST API（GLM ライン / MiniMax ライン）</h2>
      <p>
        統一対話 API に加えて、同一ドメインで追加の REST エンドポイントを提供しています。認証には
        <strong>当プラットフォームが発行した API Key のみ</strong>（<code>Authorization: Bearer sk-...</code>）を使用してください。第三者コンソールで発行した Key は本ドメインでは使用しないでください。
      </p>
      <p><strong>ベース URL：</strong> <code>https://api.xiaoqiangonline.shop</code></p>
      <p class="model-options">非テキスト生成 API（画像・音声・動画など）は回数課金です。成功呼び出し 1 回ごとに固定で <strong>5000</strong> Token を消費します。呼び出し前に残高をご確認ください。</p>

      <h2>モデル</h2>

      <h3>DeepSeek</h3>
      <div class="model-table-wrap">
        <table class="model-table model-table--wide">
          <thead>
            <tr>
              <th>機能</th>
              <th>本プラットフォームでの呼び出し方法</th>
              <th>例（<code>curl</code>）</th>
              <th>指定可能な <code>model</code>（完全一致）</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>一般対話</td>
              <td><code>POST https://api.xiaoqiangonline.shop/v1/chat/completions</code></td>
              <td class="curl-cell"><pre><code>curl -X POST "https://api.xiaoqiangonline.shop/v1/chat/completions" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{"model":"deepseek-chat","messages":[{"role":"user","content":"Hello"}]}'</code></pre></td>
              <td class="mono"><code>deepseek-chat</code></td>
            </tr>
            <tr>
              <td>高推論タスク</td>
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

      <h3>GLM ライン（智譜）</h3>
      <p class="model-options">REST パスは <a href="https://docs.bigmodel.cn/" rel="noopener noreferrer" target="_blank">智譜 OpenAPI</a> に準拠します。<strong>本プラットフォームの課金：</strong>レスポンスに課金可能な <code>usage.total_tokens</code> が無い場合、成功した <code>POST …/images/generations</code>、<code>…/videos/generations</code>、<code>…/async/images/generations</code>、<code>…/audio/transcriptions</code>、<code>…/audio/speech</code>（バイナリ音声成功時）は 1 回あたり <strong>5000</strong> 枠を控除します。<code>GET …/async-result/&lt;TASK_ID&gt;</code> はこの固定課金の対象外です（作成時に課金済み）。</p>
      <div class="model-table-wrap">
        <table class="model-table model-table--wide">
          <thead>
            <tr>
              <th>機能 / API</th>
              <th>例（<code>curl</code>）</th>
              <th>リクエスト本文の <code>model</code>（指定可能値）</th>
              <th>HTTP <code>200</code> サンプル（整形 JSON）</th>
              <th>戻り値サンプル（1 行 <code>JSON</code> 文字列）</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>統一テキスト対話（<code>POST /v1/chat/completions</code>）</td>
              <td class="curl-cell"><pre><code>curl -X POST "https://api.xiaoqiangonline.shop/v1/chat/completions" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{"model":"glm-5","messages":[{"role":"user","content":"Hello"}]}'</code></pre></td>
              <td class="model-options">
                テキスト：<code>glm-5-turbo</code>、<code>glm-5</code>、<code>glm-4.7</code>、<code>glm-4.7-flash</code>、<code>glm-4.7-flashx</code>、<code>glm-4.6</code>、<code>glm-4.5-air</code>、<code>glm-4.5-airx</code>、<code>glm-4.5-flash</code>、<code>glm-4-flash-250414</code>、<code>glm-4-flashx-250414</code>、<code>glm-4-long</code>。
                ビジョン：<code>glm-4.6v</code>、<code>autoglm-phone</code>、<code>glm-4.6v-flash</code>、<code>glm-4.6v-flashx</code>、<code>glm-4v-flash</code>、<code>glm-4.1v-thinking-flashx</code>、<code>glm-4.1v-thinking-flash</code>。
                音声：<code>glm-4-voice</code>。
                ロール / カウンセリング：<code>charglm-4</code>、<code>emohaa</code>。
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
              <td>動画生成（非同期）</td>
              <td class="curl-cell"><pre><code>curl -X POST "https://api.xiaoqiangonline.shop/zhipu/v4/videos/generations" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{"model":"cogvideox-3","prompt":"A cat playing."}'</code></pre></td>
              <td class="model-options"><code>cogvideox-3</code>、<code>cogvideox-2</code>、<code>cogvideox-flash</code>、<code>viduq1-text</code>、<code>viduq1-image</code>、<code>vidu2-image</code>、<code>viduq1-start-end</code>、<code>vidu2-start-end</code>、<code>vidu2-reference</code>（本文バリエーション）。<br><span class="quota-note">作成成功ごとに：<strong>5000</strong> 枠を控除（Token 使用量なし）。</span></td>
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
              <td>画像生成（非同期）</td>
              <td class="curl-cell"><pre><code>curl -X POST "https://api.xiaoqiangonline.shop/zhipu/v4/async/images/generations" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{"model":"glm-image","prompt":"A cute cat."}'</code></pre></td>
              <td class="model-options"><code>glm-image</code><br><span class="quota-note">作成成功ごとに：<strong>5000</strong> 枠を控除（Token 使用量なし）。</span></td>
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
              <td>非同期結果の照会</td>
              <td class="curl-cell"><pre><code>curl -X GET "https://api.xiaoqiangonline.shop/zhipu/v4/async-result/TASK_ID" \
  -H "Authorization: Bearer YOUR_API_KEY"</code></pre></td>
              <td class="model-options"><code>model</code> は不要。パス引数 <code>TASK_ID</code> は非同期作成 API の戻り値を使用。— <a href="https://docs.bigmodel.cn/api-reference/%E6%A8%A1%E5%9E%8B-api/%E6%9F%A5%E8%AF%A2%E5%BC%82%E6%AD%A5%E7%BB%93%E6%9E%9C" rel="noopener noreferrer" target="_blank">非同期結果照会</a><br><span class="quota-note">固定 5000 課金の対象外（作成時に課金済み）。</span></td>
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
              <td>画像生成</td>
              <td class="curl-cell"><pre><code>curl -X POST "https://api.xiaoqiangonline.shop/zhipu/v4/images/generations" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{"model":"cogview-3-flash","prompt":"A cute cat."}'</code></pre></td>
              <td class="model-options"><code>glm-image</code>、<code>cogview-4-250304</code>、<code>cogview-4</code>、<code>cogview-3-flash</code><br><span class="quota-note">成功ごとに：<strong>5000</strong> 枠を控除（Token 使用量なし）。</span></td>
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
              <td>音声文字起こし</td>
              <td class="curl-cell"><pre><code>curl -X POST "https://api.xiaoqiangonline.shop/zhipu/v4/audio/transcriptions" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -F "model=glm-asr-2512" \
  -F "file=@recording.wav"</code></pre></td>
              <td class="model-options"><code>glm-asr-2512</code><br><span class="quota-note">成功ごとに：<strong>5000</strong> 枠を控除（Token 使用量なし）。</span></td>
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
              <td>テキスト音声合成</td>
              <td class="curl-cell"><pre><code>curl -X POST "https://api.xiaoqiangonline.shop/zhipu/v4/audio/speech" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{"model":"glm-tts","input":"Hello","voice":"tongtong","response_format":"wav"}'</code></pre></td>
              <td class="model-options"><code>glm-tts</code><br><span class="quota-note">バイナリ <code>audio/*</code> 成功レスポンスごとに：<strong>5000</strong> 枠を控除（Token 使用量なし）。</span></td>
              <td class="curl-cell"><pre><code>HTTP/1.1 200 OK
Content-Type: audio/wav

[binary WAV body — OpenAPI: string, format binary]</code></pre>
                <span class="response-note">Non-JSON <code>200</code> — <a href="https://docs.bigmodel.cn/api-reference/%E6%A8%A1%E5%9E%8B-api/%E6%96%87%E6%9C%AC%E8%BD%AC%E8%AF%AD%E9%9F%B3" rel="noopener noreferrer" target="_blank">audio/speech</a></span></td>
              <td class="mono json-string-cell">—<br><span class="response-note response-note--inline">No JSON string; body is binary <code>audio/wav</code>.</span></td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3>MiniMax ライン</h3>
      <p class="model-options">機能と HTTP パスは <a href="https://platform.minimaxi.com/docs/api-reference/api-overview" rel="noopener noreferrer" target="_blank">MiniMax API 概要</a> に準拠します。下表は、統一テキスト対話、同期 T2A（HTTP）、動画生成（作成 / 照会 / ファイル取得）、画像生成（T2I + I2I）のみを掲載しています。<strong>本ラインの課金：</strong>上流レスポンスに課金可能な Token 使用量（例：<code>usage.total_tokens</code>）がない場合、同期 T2A 成功、<code>POST /v1/video_generation</code> 作成成功、<code>POST /v1/image_generation</code> 成功ごとに、1 回あたり <strong>5000</strong> 枠を控除します（動画照会・ファイル取得は対象外）。GLM ラインも上表記載のパスで同じ <strong>5000</strong> 固定ルールを適用します。</p>
      <div class="model-table-wrap">
        <table class="model-table model-table--wide">
          <thead>
            <tr>
              <th>機能 / API</th>
              <th>例（<code>curl</code>）</th>
              <th>リクエスト本文の <code>model</code>（備考）</th>
              <th>HTTP <code>200</code> サンプル（整形 JSON）</th>
              <th>戻り値サンプル（1 行 <code>JSON</code> 文字列）</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>統一テキスト対話（<code>POST /v1/chat/completions</code>）</td>
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
              <td>テキスト対話 / 生成（公式 HTTP <code>/v1/text/chatcompletion_v2</code>）</td>
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
              <td>同期 T2A（HTTP <code>/v1/t2a_v2</code>）</td>
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
              <td>動画：テキスト to 動画（タスク作成）</td>
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
              <td>動画：画像 to 動画（タスク作成）</td>
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
              <td>動画：開始 / 終了フレーム（タスク作成）</td>
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
              <td>動画：主体参照（タスク作成）</td>
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
              <td>動画：タスク状態照会</td>
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
              <td>動画 / ファイル：取得（ダウンロード URL）</td>
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
              <td>画像：テキスト to 画像</td>
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
              <td>画像：画像 to 画像</td>
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

      <h2>認証</h2>
      <p>ヘッダー：<code>Authorization: Bearer &lt;お客様 API Key&gt;</code></p>
      <p>API Key は厳重に管理してください。第三者への共有や公開リポジトリへのアップロードはしないでください。</p>

      <h2>残り枠の確認</h2>
      <p>同じ API Key で以下の <strong>GET</strong> を呼び出してください。読み取り専用で、枠は消費しません。</p>
      <p><code>GET https://api.xiaoqiangonline.shop/v1/account/balance</code></p>
      <p>ヘッダー：<code>Authorization: Bearer &lt;お客様 API Key&gt;</code></p>
      <pre><code>{
  "object": "balance",
  "balance": 1234567,
  "platform": null
}</code></pre>
      <p>新しい Key では <code>platform</code> が <code>null</code> の場合があります。ルーティングは各リクエストの <code>model</code> に従います。</p>

      <h2>エラーコード</h2>
      <ul>
        <li><code>401</code> - API Key が未設定、または無効</li>
        <li><code>400</code> - パラメータ不正、または未対応の <code>model</code></li>
        <li><code>402</code> - Token 残高不足</li>
      </ul>

</template>
<script setup lang="ts">
defineOptions({ name: "DocsJaBody" });
</script>
