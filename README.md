diff --git a//dev/null b/README.zh.md
index 0000000000000000000000000000000000000000..c1baa14b6d5e09c7f0ee79b78ff6f0cbddc5790b 100644
--- a//dev/null
+++ b/README.zh.md
@@ -0,0 +1,190 @@
+# 🚀 Perplexica - AI 搜索引擎 🔎 <!-- omit in toc -->
+<div align="center" markdown="1">
+   <sup>特别感谢：</sup>
+   <br>
+   <br>
+   <a href="https://www.warp.dev/perplexica">
+      <img alt="Warp sponsorship" width="400" src="https://github.com/user-attachments/assets/775dd593-9b5f-40f1-bf48-479faff4c27b">
+   </a>
+
+### [Warp，驻留在终端中的 AI 开发工具](https://www.warp.dev/perplexica)
+
+[适用于 MacOS、Linux 与 Windows](https://www.warp.dev/perplexica)
+
+</div>
+
+<hr/>
+
+[![Discord](https://dcbadge.vercel.app/api/server/26aArMy8tT?style=flat&compact=true)](https://discord.gg/26aArMy8tT)
+
+![preview](.assets/perplexica-screenshot.png?)
+
+## 目录 <!-- omit in toc -->
+
+- [概述](#概述)
+- [预览](#预览)
+- [功能](#功能)
+- [安装](#安装)
+  - [Docker 快速开始（推荐）](#docker-快速开始推荐)
+  - [非 Docker 安装](#非-docker-安装)
+  - [Ollama 连接错误](#ollama-连接错误)
+- [作为搜索引擎使用](#作为搜索引擎使用)
+- [使用 Perplexica 的 API](#使用-perplexica-的-api)
+- [对外提供 Perplexica](#对外提供-perplexica)
+- [一键部署](#一键部署)
+- [即将推出的功能](#即将推出的功能)
+- [支持我们](#支持我们)
+  - [捐赠](#捐赠)
+- [贡献](#贡献)
+- [帮助与支持](#帮助与支持)
+
+## 概述
+
+Perplexica 是一个开源的 AI 搜索工具或 AI 搜索引擎，能够深入网络寻找答案。它受 Perplexity AI 启发，不仅能检索网络，还能理解你的问题。Perplexica 使用高级机器学习算法，如相似度搜索和嵌入，来优化结果并提供标注来源的清晰答案。
+
+通过使用 SearxNG 保持实时并完全开源，Perplexica 能在不泄露隐私的情况下确保你获得最新的信息。
+
+想了解其架构和运作方式？请阅读 [这里](https://github.com/ItzCrazyKns/Perplexica/tree/master/docs/architecture/README.md)。
+
+## 预览
+
+![video-preview](.assets/perplexica-preview.gif)
+
+## 功能
+
+- **本地 LLM**：可通过 Ollama 使用 Llama3、Mixtral 等本地 LLM。
+- **两种主要模式：**
+  - **副驾模式：**（开发中）通过生成不同的查询来寻找更相关的网络资源。它会访问排名靠前的页面，直接从页面上寻找与用户问题相关的来源。
+  - **普通模式：**处理你的问题并执行网络搜索。
+- **聚焦模式：**针对不同类型的问题提供更合适的回答，目前拥有 6 种聚焦模式：
+  - **全部模式：**在整个网络上搜索最佳结果。
+  - **写作助手模式：**在不需要联网搜索时，帮助完成写作任务。
+  - **学术搜索模式：**查找文章和论文，适合学术研究。
+  - **YouTube 搜索模式：**根据关键词查找 YouTube 视频。
+  - **Wolfram Alpha 模式：**使用 Wolfram Alpha 进行计算或数据分析。
+  - **Reddit 搜索模式：**在 Reddit 上查找相关讨论和观点。
+- **实时信息：**一些搜索工具可能因为使用爬虫结果生成嵌入并存入索引而导致信息过时。Perplexica 通过 SearxNG 这类元搜索引擎获取结果并重新排序，确保始终提供最新信息，而无需频繁更新数据。
+- **API**：可将 Perplexica 集成到现有应用并利用其能力。
+
+此外，它还具备图像和视频搜索等更多功能，更多计划中的特性见 [即将推出的功能](#即将推出的功能)。
+
+## 安装
+
+安装 Perplexica 主要有两种方式：使用 Docker 或不使用 Docker。推荐使用 Docker。
+
+### Docker 快速开始（推荐）
+
+1. 请确保你的系统已安装并运行 Docker。
+2. 克隆 Perplexica 仓库：
+
+   ```bash
+   git clone https://github.com/ItzCrazyKns/Perplexica.git
+   ```
+
+3. 克隆完成后，进入项目目录。
+4. 将 `sample.config.toml` 重命名为 `config.toml`。对于 Docker 设置，你只需填写以下字段：
+
+   - `OPENAI`：你的 OpenAI API 密钥。**若要使用 OpenAI 模型才需要填写。**
+   - `OLLAMA`：你的 Ollama API 地址，应填写为 `http://host.docker.internal:端口号`。若 Ollama 运行在 11434 端口，填写 `http://host.docker.internal:11434`，其他端口以此类推。**若要使用 Ollama 模型而非 OpenAI 模型需要填写。**
+   - `GROQ`：你的 Groq API 密钥。**若要使用 Groq 的托管模型才需要填写。**
+   - `ANTHROPIC`：你的 Anthropic API 密钥。**若要使用 Anthropic 模型才需要填写。**
+
+     **注意**：启动 Perplexica 后，这些设置可在设置对话框中修改。
+
+   - `SIMILARITY_MEASURE`：要使用的相似度度量方式（默认已填，若不确定可保持不变）。
+
+5. 确保位于包含 `docker-compose.yaml` 的目录下，执行：
+
+   ```bash
+   docker compose up -d
+   ```
+
+6. 等待几分钟完成安装，然后在浏览器访问 http://localhost:3000 即可使用。
+
+**注意**：在容器构建完成后，可直接通过 Docker 启动 Perplexica，无需打开终端。
+
+### 非 Docker 安装
+
+1. 安装 SearXNG，并在其设置中启用 `JSON` 输出。
+2. 克隆仓库，并在根目录下将 `sample.config.toml` 重命名为 `config.toml`，并填入所需字段。
+3. 配置完成后运行 `npm i`。
+4. 安装依赖完成后执行 `npm run build`。
+5. 最后运行 `npm run start` 启动应用。
+
+**注意**：推荐使用 Docker，它能简化环境变量和依赖管理。
+
+更多信息（如更新步骤）请参阅 [安装文档](https://github.com/ItzCrazyKns/Perplexica/tree/master/docs/installation)。
+
+### Ollama 连接错误
+
+如果出现 Ollama 连接错误，可能是后端无法连接到 Ollama 的 API。你可以这样修复：
+
+1. **检查 Ollama API 地址：**确保设置菜单中的 API 地址正确。
+2. **根据操作系统更新 API 地址：**
+   - **Windows:** 使用 `http://host.docker.internal:11434`
+   - **Mac:** 使用 `http://host.docker.internal:11434`
+   - **Linux:** 使用 `http://<host 私有 IP>:11434`
+
+   如果使用其他端口，请相应调整。
+
+3. **Linux 用户 - 向网络开放 Ollama：**
+
+   - 在 `/etc/systemd/system/ollama.service` 中加入 `Environment="OLLAMA_HOST=0.0.0.0"`，然后执行 `systemctl restart ollama`。详见 [Ollama 文档](https://github.com/ollama/ollama/blob/main/docs/faq.md#setting-environment-variables-on-linux)。
+   - 确认防火墙未阻止该端口（默认 11434）。
+
+## 作为搜索引擎使用
+
+如果你希望像使用 Google 或 Bing 一样使用 Perplexica，或在浏览器搜索栏添加快捷方式，请按照以下步骤：
+
+1. 打开浏览器设置。
+2. 找到“搜索引擎”部分。
+3. 新增站点搜索，URL 填写 `http://localhost:3000/?q=%s`，若非本地部署，请将 `localhost` 替换为你的 IP 或域名，将端口号 `3000` 根据实际情况修改。
+4. 保存后即可在浏览器地址栏直接使用 Perplexica。
+
+## 使用 Perplexica 的 API
+
+Perplexica 还提供 API，方便开发者将其强大的搜索引擎集成到自己的应用中。你可以进行搜索、使用多种模型并获得答案。
+
+更多细节请参阅完整文档[这里](https://github.com/ItzCrazyKns/Perplexica/tree/master/docs/API/SEARCH.md)。
+
+## 对外提供 Perplexica
+
+Perplexica 基于 Next.js 运行并处理所有 API 请求。配置好端口转发后，它在同一网络上立即可用。
+
+## 一键部署
+
+[![Deploy to Sealos](https://raw.githubusercontent.com/labring-actions/templates/main/Deploy-on-Sealos.svg)](https://usw.sealos.io/?openapp=system-template%3FtemplateName%3Dperplexica)
+[![Deploy to RepoCloud](https://d16t0pc4846x52.cloudfront.net/deploylobe.svg)](https://repocloud.io/details/?app_id=267)
+[![Run on ClawCloud](https://raw.githubusercontent.com/ClawCloud/Run-Template/refs/heads/main/Run-on-ClawCloud.svg)](https://template.run.claw.cloud/?referralCode=U11MRQ8U9RM4&openapp=system-fastdeploy%3FtemplateName%3Dperplexica)
+
+## 即将推出的功能
+
+- [x] 新增设置页面
+- [x] 支持本地 LLM
+- [x] 保存历史记录功能
+- [x] 引入多种聚焦模式
+- [x] 新增 API 支持
+- [x] 添加 Discover
+- [ ] 完善副驾模式
+
+## 支持我们
+
+如果 Perplexica 对你有帮助，请在 GitHub 上给我们一个 Star。这能帮助更多人发现 Perplexica，也能支持我们开发新功能。谢谢你的支持！
+
+### 捐赠
+
+我们接受捐赠以持续维持项目。如果你愿意贡献，请使用以下方式捐赠，感谢支持！
+
+| 以太坊地址                                               |
+| ------------------------------------------------------- |
+| 地址：`0xB025a84b2F269570Eb8D4b05DEdaA41D8525B6DD` |
+
+## 贡献
+
+Perplexica 致力于让 AI 和大型语言模型人人可用。如果你发现任何问题或有新想法，欢迎在 GitHub Issues 提交。更多贡献信息请阅读 [CONTRIBUTING.md](CONTRIBUTING.md)。
+
+## 帮助与支持
+
+如有任何疑问或反馈，欢迎随时与我们联系。你可以在 GitHub 提交 issue，或加入我们的 Discord 服务器，在那里与其他用户交流经验，获得更多帮助。[点击此处](https://discord.gg/EFwsmQDgAu)加入 Discord。如果有其他需求，可在 Discord 上联系 `itzcrazykns`。
+
+感谢你使用旨在提升搜索体验的 AI 搜索引擎 Perplexica。我们会不断改进并拓展功能，期待你的反馈和贡献！别忘了关注更新与新功能！
