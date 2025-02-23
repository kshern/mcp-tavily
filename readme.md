# MCP Tavily

[中文文档](./readme.zh-CN.md)

A Model Context Protocol (MCP) server implementation for Tavily API, providing advanced search and content extraction capabilities.

## Features

- **Multiple Search Tools**:
  - `search`: Basic search functionality with customizable options
  - `searchContext`: Context-aware search for better relevance
  - `searchQNA`: Question and answer focused search
- **Content Extraction**: Extract content from URLs with configurable options
- **Rich Configuration Options**: Extensive options for search depth, filtering, and content inclusion


### Usage with MCP

Add the Tavily MCP server to your MCP configuration:

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

## API Reference

### Search Tools

The server provides three search tools that can be called through MCP:

#### 1. Basic Search
```typescript
// Tool name: search
{
  query: "artificial intelligence",
  options: {
    searchDepth: "advanced",
    topic: "news",
    maxResults: 10
  }
}
```

#### 2. Context Search
```typescript
// Tool name: searchContext
{
  query: "latest developments in AI",
  options: {
    topic: "news",
    timeRange: "week"
  }
}
```

#### 3. Q&A Search
```typescript
// Tool name: searchQNA
{
  query: "What is quantum computing?",
  options: {
    includeAnswer: true,
    maxResults: 5
  }
}
```

### Extract Tool

```typescript
// Tool name: extract
{
  urls: ["https://example.com/article1", "https://example.com/article2"],
  options: {
    extractDepth: "advanced",
    includeImages: true
  }
}
```

### Search Options

All search tools share these options:

```typescript
interface SearchOptions {
  searchDepth?: "basic" | "advanced";    // Search depth level
  topic?: "general" | "news" | "finance"; // Search topic category
  days?: number;                         // Number of days to search
  maxResults?: number;                   // Maximum number of results
  includeImages?: boolean;               // Include images in results
  includeImageDescriptions?: boolean;    // Include image descriptions
  includeAnswer?: boolean;               // Include answer in results
  includeRawContent?: boolean;           // Include raw content
  includeDomains?: string[];            // List of domains to include
  excludeDomains?: string[];            // List of domains to exclude
  maxTokens?: number;                    // Maximum number of tokens
  timeRange?: "year" | "month" | "week" | "day" | "y" | "m" | "w" | "d"; // Time range for search
}
```

### Extract Options

```typescript
interface ExtractOptions {
  extractDepth?: "basic" | "advanced";   // Extraction depth level
  includeImages?: boolean;               // Include images in results
}
```

## Response Format

All tools return responses in the following format:

```typescript
{
  content: Array<{
    type: "text",
    text: string
  }>
}
```

For search results, each item includes:
- Title
- Content
- URL

For extracted content, each item includes:
- URL
- Raw content
- Failed URLs list (if any)

## Error Handling

All tools include proper error handling and will throw descriptive error messages if something goes wrong.

## License

This project is licensed under the MIT License.

## Support

For any questions or issues:
- Tavily API: refer to the [Tavily documentation](https://docs.tavily.com/)
- MCP integration: refer to the [MCP documentation](https://modelcontextprotocol.io//)