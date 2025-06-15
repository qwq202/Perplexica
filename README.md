# 🚀 Perplexica - 一个由 AI 驱动的搜索引擎 🔎 <!-- omit in toc -->


[![Discord](https://dcbadge.vercel.app/api/server/26aArMy8tT?style=flat&compact=true)](https://discord.gg/26aArMy8tT)

![preview](.assets/perplexica-screenshot.png?)

## 目录 <!-- omit in toc -->

- [概述](#概述)
- [预览](#预览)
- [功能](#功能)
- [安装](#安装)
  - [通过 Docker 开始 (推荐)](#通过-docker-开始-推荐)
  - [非 Docker 安装](#非-docker-安装)
  - [Ollama 连接错误](#ollama-连接错误)
- [作为搜索引擎使用](#作为搜索引擎使用)
- [使用 Perplexica 的 API](#使用-perplexica-的-api)
- [将 Perplexica 暴露到网络](#将-perplexica-暴露到网络)
- [即将推出的功能](#即将推出的功能)
- [支持我们](#支持我们)
- [贡献](#贡献)
- [帮助与支持](#帮助与支持)

## 概述

Perplexica 是一款开源的 AI 驱动搜索工具或 AI 搜索引擎，它能深入互联网寻找答案。受 Perplexity AI 的启发，它是一个开源选项，不仅能搜索网页，还能理解您的问题。它使用先进的机器学习算法，如相似性搜索和嵌入来优化结果，并提供附带引用来源的清晰答案。

Perplexica 使用 SearxNG 保持信息最新并完全开源，确保您总能获得最新的信息，而不会损害您的隐私。

想了解更多关于其架构和工作原理的信息吗？您可以在[这里](https://github.com/qwq202/Perplexica/tree/master/docs/architecture/README.md)阅读。

## 预览

![video-preview](.assets/perplexica-preview.gif)

## 功能

- **本地大语言模型 (LLM)**：您可以使用 Ollama 来利用本地的 LLM，如 Llama3 和 Mixtral。
- **两种主要模式：**
  - **质量模式：** 通过生成不同的查询来增强搜索，以找到更相关的互联网来源。与普通搜索不同，它不仅仅使用 SearxNG 的上下文，还会访问排名靠前的匹配项，并直接从页面中尝试找到与用户查询相关的来源。
  - **普通模式：** 处理您的查询并执行网络搜索。
- **专注模式：** 为更好地回答特定类型问题而设的特殊模式。Perplexica 目前有 6 种专注模式：
  - **全部模式：** 搜索整个网络以找到最佳结果。
  - **写作助手模式：** 有助于不需要搜索网络的写作任务。
  - **学术搜索模式：** 查找文章和论文，非常适合学术研究。
  - **YouTube 搜索模式：** 根据搜索查询查找 YouTube 视频。
  - **Wolfram Alpha 搜索模式：** 使用 Wolfram Alpha 回答需要计算或数据分析的查询。
  - **Reddit 搜索模式：** 在 Reddit 上搜索与查询相关的讨论和意见。
- **最新信息：** 一些搜索工具可能会给您过时的信息，因为它们使用来自爬虫的数据，并将其转换为嵌入存储在索引中。与它们不同，Perplexica 使用元搜索引擎 SearxNG 来获取结果，并重新排序以获得最相关的来源，确保您总能获得最新的信息，而无需每日更新数据的开销。
- **API**：将 Perplexica 集成到您现有的应用程序中，并利用其功能。
- **小组件与发现**：
  - **发现页面**：一个自动化的新闻聚合器，从指定的新闻网站获取有关 AI 和科技等主题的最新文章。
  - **主页小组件**：主聊天界面包括用于快速浏览天气和精选新闻文章的小组件，无需搜索即可提供有用的信息。
- **多语言支持**：完全支持生成不同语言的响应，包括简体中文。

它还有许多其他功能，如图像和视频搜索。一些计划中的功能在[即将推出的功能](#即将推出的功能)中提到。

## 安装

主要有两种安装 Perplexica 的方法——使用 Docker 和不使用 Docker。强烈推荐使用 Docker。

### 通过 Docker 开始 (推荐)

1.  确保您的系统上已安装并正在运行 Docker。
2.  克隆 Perplexica 仓库：

    ```bash
    git clone https://github.com/qwq202/Perplexica.git
    ```

3.  克隆后，导航到包含项目文件的目录。

4.  将 `sample.config.toml` 文件重命名为 `config.toml`。对于 Docker 设置，您只需填写以下字段：

    - `OPENAI`：您的 OpenAI API 密钥。**只有在希望使用 OpenAI 模型时才需要填写此项**。
    - `OLLAMA`：您的 Ollama API URL。您应输入为 `http://host.docker.internal:PORT_NUMBER`。如果您在端口 11434 上安装了 Ollama，请使用 `http://host.docker.internal:11434`。对于其他端口，请相应调整。**如果您希望使用 Ollama 的模型而不是 OpenAI 的模型，则需要填写此项**。
    - `GROQ`：您的 Groq API 密钥。**只有在希望使用 Groq 托管的模型时才需要填写此项**。
    - `ANTHROPIC`：您的 Anthropic API 密钥。**只有在希望使用 Anthropic 模型时才需要填写此项**。

      **注意**：您可以在启动 Perplexica 后从设置对话框中更改这些内容。

    - `SIMILARITY_MEASURE`：要使用的相似性度量（默认已填写；如果不确定，可以保持原样）。

5.  确保您位于包含 `docker-compose.yaml` 文件的目录中，并执行：

    ```bash
    docker compose up -d
    ```

6.  等待几分钟以完成设置。您可以在 Web 浏览器中通过 http://localhost:3000 访问 Perplexica。

**注意**：容器构建完成后，您可以直接从 Docker 启动 Perplexica，而无需打开终端。

### 非 Docker 安装

1.  安装 SearXNG 并在 SearXNG 设置中允许 `JSON` 格式。
2.  克隆仓库并将根目录中的 `sample.config.toml` 文件重命名为 `config.toml`。确保您填写了此文件中的所有必填字段。
3.  填写配置后，运行 `npm i`。
4.  安装依赖项，然后执行 `npm run build`。
5.  最后，通过运行 `npm run start` 启动应用程序。

**注意**：建议使用 Docker，因为它简化了设置过程，特别是在管理环境变量和依赖项方面。

有关更新等更多信息，请参阅[安装文档](https://github.com/qwq202/Perplexica/tree/master/docs/installation)。

### Ollama 连接错误

如果您遇到 Ollama 连接错误，很可能是因为后端无法连接到 Ollama 的 API。要解决此问题，您可以：

1.  **检查您的 Ollama API URL：** 确保在设置菜单中正确设置了 API URL。
2.  **根据操作系统更新 API URL：**

    - **Windows：** 使用 `http://host.docker.internal:11434`
    - **Mac：** 使用 `http://host.docker.internal:11434`
    - **Linux：** 使用 `http://<主机的私有IP>:11434`

    如果您使用不同的端口，请调整端口号。

3.  **Linux 用户 - 将 Ollama 暴露到网络：**

    - 在 `/etc/systemd/system/ollama.service` 内部，您需要添加 `Environment="OLLAMA_HOST=0.0.0.0"`。然后通过 `systemctl restart ollama` 重启 Ollama。更多信息请参阅 [Ollama 文档](https://github.com/ollama/ollama/blob/main/docs/faq.md#setting-environment-variables-on-linux)

    - 确保端口（默认为 11434）未被防火墙阻止。

## 作为搜索引擎使用

如果您希望将 Perplexica 作为传统搜索引擎（如 Google 或 Bing）的替代品，或者想从浏览器的搜索栏添加快捷方式以便快速访问，请按照以下步骤操作：

1.  打开浏览器的设置。
2.  导航到“搜索引擎”部分。
3.  添加一个新的站点搜索，URL 如下：`http://localhost:3000/?q=%s`。如果 Perplexica 不是本地托管的，请将 `localhost` 替换为您的 IP 地址或域名，并将 `3000` 替换为端口号。
4.  单击添加按钮。现在，您可以直接从浏览器的搜索栏中使用 Perplexica。

## 使用 Perplexica 的 API

Perplexica 还为希望将其强大的搜索引擎集成到自己应用程序中的开发人员提供了 API。您可以运行搜索、使用多个模型并获取查询的答案。

有关更多详细信息，请在此处查看完整文档[这里](https://github.com/qwq202/Perplexica/tree/master/docs/API/SEARCH.md)。

## 将 Perplexica 暴露到网络

Perplexica 在 Next.js 上运行并处理所有 API 请求。它可以在同一网络上立即工作，并且即使通过端口转发也保持可访问。

## 即将推出的功能

- [x] 添加设置页面
- [x] 添加对本地 LLM 的支持
- [x] 历史保存功能
- [x] 引入各种专注模式
- [x] 添加 API 支持
- [x] 添加发现页面
- [x] 完成质量模式

## 支持我们

如果您觉得 Perplexica 有用，请考虑在 GitHub 上给我们一个星。这有助于更多人发现 Perplexica 并支持新功能的开发。非常感谢您的支持。


## 贡献

Perplexica 的建立基于一个理念，即 AI 和大型语言模型应该易于每个人使用。如果您发现错误或有任何想法，请通过 GitHub Issues 分享。有关为 Perplexica 做出贡献的更多信息，您可以阅读 [CONTRIBUTING.md](CONTRIBUTING.md) 文件，以了解有关 Perplexica 的更多信息以及如何为其做出贡献。

## 帮助与支持

如果您有任何问题或反馈，请随时与我们联系。您可以在 GitHub 上创建一个 issue 或加入我们的 Discord 服务器。在那里，您可以与其他用户联系，分享您的经验和评论，并获得更个性化的帮助。[点击这里](https://discord.gg/EFwsmQDgAu)加入 Discord 服务器。

感谢您探索 Perplexica，这款旨在增强您搜索体验的 AI 驱动搜索引擎。我们正在不断努力改进 Perplexica 并扩展其功能。我们重视您的反馈和贡献，这有助于我们使 Perplexica 变得更好。别忘了回来查看更新和新功能！
