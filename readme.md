# MCP Tavily

[![smithery badge](https://smithery.ai/badge/@kshern/mcp-tavily)](https://smithery.ai/server/@kshern/mcp-tavily)

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
        "TAVILY_API_KEY": "your-api-key"
      }
    }
  }
}
```

> Note: Make sure to replace `your-api-key` with your actual Tavily API key. You can also set it as an environment variable `TAVILY_API_KEY` before running the server.

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

## Installation

### Installing via Smithery

To install Tavily API Server for Claude Desktop automatically via [Smithery](https://smithery.ai/server/@kshern/mcp-tavily):

```bash
npx -y @smithery/cli install @kshern/mcp-tavily --client claude
```

### Manual Installation
```bash
npm install @agtools/mcp-tavily
```

Or use it directly with npx:

```bash
npx @agtools/mcp-tavily
```

## Development

### Prerequisites

- Node.js 16 or higher
- npm or yarn
- Tavily API key (get one from [Tavily](https://tavily.com))

### Setup

1. Clone the repository
2. Install dependencies:
```bash
npm install
```
3. Set your Tavily API key:
```bash
export TAVILY_API_KEY=your_api_key
```

### Running Tests

```bash
npm test
```

### Building

```bash
npm run build
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Support

For any questions or issues:
- Tavily API: refer to the [Tavily documentation](https://docs.tavily.com/)
- MCP integration: refer to the [MCP documentation](https://modelcontextprotocol.io//)