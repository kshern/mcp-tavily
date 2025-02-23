# MCP Tavily

基于Tavily API的模型上下文协议（MCP）服务器实现，提供高级搜索和内容提取功能。

## 功能特点

- **多样化搜索工具**:
  - `search`: 基础搜索功能，支持自定义选项
  - `searchContext`: 上下文感知搜索，提供更好的相关性
  - `searchQNA`: 问答式搜索
- **内容提取**: 支持从URL提取内容，可配置提取选项
- **丰富的配置选项**: 支持搜索深度、过滤和内容包含等多种配置

### MCP配置使用

在你的MCP配置中添加Tavily服务器：

```json
{
  "mcpServers": {
    "tavily": {
      "command": "npx",
      "args": ["-y", "@agtools/mcp-tavily"],
      "env": {
        "TAVILY_API_KEY": "tvly-YOUR_API_KEY"
      }
    }
  }
}
```

## API参考

### 搜索工具

服务器提供三种可通过MCP调用的搜索工具：

#### 1. 基础搜索
```typescript
// 工具名称: search
{
  query: "人工智能",
  options: {
    searchDepth: "advanced",
    topic: "news",
    maxResults: 10
  }
}
```

#### 2. 上下文搜索
```typescript
// 工具名称: searchContext
{
  query: "AI最新发展",
  options: {
    topic: "news",
    timeRange: "week"
  }
}
```

#### 3. 问答搜索
```typescript
// 工具名称: searchQNA
{
  query: "什么是量子计算？",
  options: {
    includeAnswer: true,
    maxResults: 5
  }
}
```

### 内容提取工具

```typescript
// 工具名称: extract
{
  urls: ["https://example.com/article1", "https://example.com/article2"],
  options: {
    extractDepth: "advanced",
    includeImages: true
  }
}
```

### 搜索选项

所有搜索工具共享以下选项：

```typescript
interface SearchOptions {
  searchDepth?: "basic" | "advanced";    // 搜索深度级别
  topic?: "general" | "news" | "finance"; // 搜索主题类别
  days?: number;                         // 搜索天数范围
  maxResults?: number;                   // 最大结果数量
  includeImages?: boolean;               // 是否包含图片
  includeImageDescriptions?: boolean;    // 是否包含图片描述
  includeAnswer?: boolean;               // 是否包含答案
  includeRawContent?: boolean;           // 是否包含原始内容
  includeDomains?: string[];            // 包含的域名列表
  excludeDomains?: string[];            // 排除的域名列表
  maxTokens?: number;                    // 最大token数量
  timeRange?: "year" | "month" | "week" | "day" | "y" | "m" | "w" | "d"; // 时间范围
}
```

### 提取选项

```typescript
interface ExtractOptions {
  extractDepth?: "basic" | "advanced";   // 提取深度级别
  includeImages?: boolean;               // 是否包含图片
}
```

## 响应格式

所有工具返回的响应格式如下：

```typescript
{
  content: Array<{
    type: "text",
    text: string
  }>
}
```

搜索结果包含：
- 标题
- 内容
- URL

提取内容包含：
- URL
- 原始内容
- 失败URL列表（如果有）

## 错误处理

所有工具都包含适当的错误处理，并会在出现问题时抛出描述性的错误消息。

## 许可证

本项目基于MIT许可证开源。

## 支持

如有任何问题：
- Tavily API：请参考 [Tavily文档](https://docs.tavily.com/)
- MCP集成：请参考 [MCP文档](https://docs.mcpcn.org/)
