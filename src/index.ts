import { McpServer, ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { tavily } from "@tavily/core";

// 初始化 Tavily 客户端
const tvly = tavily({ apiKey: process.env.TAVILY_API_KEY });

// 创建MCP服务器
const server = new McpServer({
  name: "Tavily Search MCP Server",
  version: "0.3.1"
});

// 添加搜索工具
server.tool(
  "search",
  {
    query: z.string().describe("Search query"),
    options: z
      .object({
        searchDepth: z.enum(["basic", "advanced"]).optional().describe("Search depth"),
        topic: z.enum(["general", "news", "finance"]).optional().describe("Search topic"),
        days: z.number().optional().describe("Number of days to search"),
        maxResults: z.number().optional().describe("Maximum number of results"),
        includeImages: z.boolean().optional().describe("Include images in results"),
        includeImageDescriptions: z.boolean().optional().describe("Include image descriptions"),
        includeAnswer: z.boolean().optional().describe("Include answer in results"),
        includeRawContent: z.boolean().optional().describe("Include raw content"),
        includeDomains: z.array(z.string()).optional().describe("List of domains to include"),
        excludeDomains: z.array(z.string()).optional().describe("List of domains to exclude"),
        maxTokens: z.number().optional().describe("Maximum number of tokens"),
        timeRange: z.enum(["year", "month", "week", "day", "y", "m", "w", "d"]).optional().describe("Time range")
      }).optional().describe("Search options")
  },
  async ({ query, options = {} }) => {
    try {


      const response = await tvly.search(query, options);
      const results = response.results;

      const content = results.map(result => ({
        type: "text" as const,
        text: `${result.title}\n${result.content}\nURL: ${result.url}\n\n`
      }));

      return {
        content: content
      };
    } catch (error:any) {
      throw new Error(`Search failed: ${error.message}`);
    }
  }
);

// 添加搜索工具
server.tool(
  "searchContext",
  {
    query: z.string().describe("Search query"),
    options: z.object({
      searchDepth: z.enum(["basic", "advanced"]).optional().describe("Search depth"),
      topic: z.enum(["general", "news", "finance"]).optional().describe("Search topic"),
      days: z.number().optional().describe("Number of days to search"),
      maxResults: z.number().optional().describe("Maximum number of results"),
      includeImages: z.boolean().optional().describe("Include images in results"),
      includeImageDescriptions: z.boolean().optional().describe("Include image descriptions"),
      includeAnswer: z.boolean().optional().describe("Include answer in results"),
      includeRawContent: z.boolean().optional().describe("Include raw content"),
      includeDomains: z.array(z.string()).optional().describe("List of domains to include"),
      excludeDomains: z.array(z.string()).optional().describe("List of domains to exclude"),
      maxTokens: z.number().optional().describe("Maximum number of tokens"),
      timeRange: z.enum(["year", "month", "week", "day", "y", "m", "w", "d"]).optional().describe("Time range")
    }).optional().describe("Search options")
  },
  async ({ query, options = {} }) => {
    try {

      const response = await tvly.search(query, options);
      const results = response.results;
      
      const content = results.map(result => ({
        type: "text" as const,
        text: `${result.title}\n${result.content}\nURL: ${result.url}\n\n`
      }));

      return {
        content: content
      };
    } catch (error:any) {
      throw new Error(`Search failed: ${error.message}`);
    }
  }
);

// 添加搜索工具
server.tool(
  "searchQNA",
  {
    query: z.string().describe("Search query"),
    options: z.object({
      searchDepth: z.enum(["basic", "advanced"]).optional().describe("Search depth"),
      topic: z.enum(["general", "news", "finance"]).optional().describe("Search topic"),
      days: z.number().optional().describe("Number of days to search"),
      maxResults: z.number().optional().describe("Maximum number of results"),
      includeImages: z.boolean().optional().describe("Include images in results"),
      includeImageDescriptions: z.boolean().optional().describe("Include image descriptions"),
      includeAnswer: z.boolean().optional().describe("Include answer in results"),
      includeRawContent: z.boolean().optional().describe("Include raw content"),
      includeDomains: z.array(z.string()).optional().describe("List of domains to include"),
      excludeDomains: z.array(z.string()).optional().describe("List of domains to exclude"),
      maxTokens: z.number().optional().describe("Maximum number of tokens"),
      timeRange: z.enum(["year", "month", "week", "day", "y", "m", "w", "d"]).optional().describe("Time range")
    }).optional().describe("Search options")
  },
  async ({ query, options = {} }) => {
    try {
    
      const response = await tvly.search(query, options);
      const results = response.results;
      
      const content = results.map(result => ({
        type: "text" as const,
        text: `${result.title}\n${result.content}\nURL: ${result.url}\n\n`
      }));

      return {
        content: content
      };
    } catch (error:any) {
      throw new Error(`Search failed: ${error.message}`);
    }
  }
);
// 添加extract工具
server.tool(
  "extract",
  {
    urls: z.array(z.string()).describe("list of URLs to extract content from (max 20)"),
    options: z.object({
      extractDepth: z.enum(["basic", "advanced"]).optional().describe("Extraction depth"),
      includeImages: z.boolean().optional().describe("Include images in results"),
    }).optional().describe("Extraction options")
  },
  async ({ urls, options={} }) => {
    try {
      // const urlArray = urls.split(",");
      const response = await tvly.extract(urls, options); 
      
      const content = response.results.map(result => ({
        type: "text" as const,
        text: `URL: ${result.url}\n内容: ${result.rawContent}\n\n`
      }));

      // 如果有失败的URL，也返回这些信息
      if (response.failedResults && response.failedResults.length > 0) {
        content.push({
          type: "text" as const,
          text: `\nFailed to extract from URLs:\n${response.failedResults.join('\n')}`
        });
      }

      return {
        content: content
      };
    } catch (error: any) {
      throw new Error(`Failed to extract content: ${error.message}`);
    }
  }
);

// 启动服务器，使用标准输入输出作为传输层
const transport = new StdioServerTransport();
await server.connect(transport);
