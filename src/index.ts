#!/usr/bin/env node

import { McpServer, ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { tavily } from "@tavily/core";

// 初始化 Tavily 客户端
const tvly = tavily({ apiKey: process.env.TAVILY_API_KEY });

// 创建MCP服务器
const server = new McpServer({
  name: "Tavily Search MCP Server",
  version: "1.0.0"
});

// 添加搜索工具
server.tool(
  "search",
  "Perform a basic web search. Returns search results including title, content and URL.",
  {
    query: z.string().describe("Enter your search query or question"),
    options: z
      .object({
        searchDepth: z.enum(["basic", "advanced"]).optional().describe("Search depth: basic (simple search) or advanced (in-depth search)"),
        topic: z.enum(["general", "news", "finance"]).optional().describe("Search topic: general (all topics), news (news only), finance (financial content)"),
        days: z.number().optional().describe("Limit search to recent days, e.g.: 7 for last 7 days"),
        maxResults: z.number().optional().describe("Maximum number of results to return, e.g.: 10 for 10 results"),
        includeImages: z.boolean().optional().describe("Include images in results: true or false"),
        includeImageDescriptions: z.boolean().optional().describe("Include image descriptions: true or false"),
        includeAnswer: z.boolean().optional().describe("Include AI-generated answer summary: true or false"),
        includeRawContent: z.boolean().optional().describe("Include raw webpage content: true or false"),
        includeDomains: z.array(z.string()).optional().describe("Only search within these domains, e.g.: ['example.com', 'test.com']"),
        excludeDomains: z.array(z.string()).optional().describe("Exclude these domains from search, e.g.: ['example.com', 'test.com']"),
        maxTokens: z.number().optional().describe("Maximum number of tokens in response, e.g.: 1000"),
        timeRange: z.enum(["year", "month", "week", "day", "y", "m", "w", "d"]).optional().describe("Time range: year/y (within 1 year), month/m (within 1 month), week/w (within 1 week), day/d (within 1 day)")
      }).optional().describe("Search configuration options, all fields are optional")
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
  "Perform a context-aware web search. Optimized for retrieving contextually relevant results.",
  {
    query: z.string().describe("Enter your search query or question"),
    options: z.object({
      searchDepth: z.enum(["basic", "advanced"]).optional().describe("Search depth: basic (simple search) or advanced (in-depth search)"),
      topic: z.enum(["general", "news", "finance"]).optional().describe("Search topic: general (all topics), news (news only), finance (financial content)"),
      days: z.number().optional().describe("Limit search to recent days, e.g.: 7 for last 7 days"),
      maxResults: z.number().optional().describe("Maximum number of results to return, e.g.: 10 for 10 results"),
      includeImages: z.boolean().optional().describe("Include images in results: true or false"),
      includeImageDescriptions: z.boolean().optional().describe("Include image descriptions: true or false"),
      includeAnswer: z.boolean().optional().describe("Include AI-generated answer summary: true or false"),
      includeRawContent: z.boolean().optional().describe("Include raw webpage content: true or false"),
      includeDomains: z.array(z.string()).optional().describe("Only search within these domains, e.g.: ['example.com', 'test.com']"),
      excludeDomains: z.array(z.string()).optional().describe("Exclude these domains from search, e.g.: ['example.com', 'test.com']"),
      maxTokens: z.number().optional().describe("Maximum number of tokens in response, e.g.: 1000"),
      timeRange: z.enum(["year", "month", "week", "day", "y", "m", "w", "d"]).optional().describe("Time range: year/y (within 1 year), month/m (within 1 month), week/w (within 1 week), day/d (within 1 day)")
    }).optional().describe("Search configuration options, all fields are optional")
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
  "Perform a question-answering search. Best suited for direct questions that need specific answers.",
  {
    query: z.string().describe("Enter your search query or question"),
    options: z.object({
      searchDepth: z.enum(["basic", "advanced"]).optional().describe("Search depth: basic (simple search) or advanced (in-depth search)"),
      topic: z.enum(["general", "news", "finance"]).optional().describe("Search topic: general (all topics), news (news only), finance (financial content)"),
      days: z.number().optional().describe("Limit search to recent days, e.g.: 7 for last 7 days"),
      maxResults: z.number().optional().describe("Maximum number of results to return, e.g.: 10 for 10 results"),
      includeImages: z.boolean().optional().describe("Include images in results: true or false"),
      includeImageDescriptions: z.boolean().optional().describe("Include image descriptions: true or false"),
      includeAnswer: z.boolean().optional().describe("Include AI-generated answer summary: true or false"),
      includeRawContent: z.boolean().optional().describe("Include raw webpage content: true or false"),
      includeDomains: z.array(z.string()).optional().describe("Only search within these domains, e.g.: ['example.com', 'test.com']"),
      excludeDomains: z.array(z.string()).optional().describe("Exclude these domains from search, e.g.: ['example.com', 'test.com']"),
      maxTokens: z.number().optional().describe("Maximum number of tokens in response, e.g.: 1000"),
      timeRange: z.enum(["year", "month", "week", "day", "y", "m", "w", "d"]).optional().describe("Time range: year/y (within 1 year), month/m (within 1 month), week/w (within 1 week), day/d (within 1 day)")
    }).optional().describe("Search configuration options, all fields are optional")
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
  "Extract and process content from a list of URLs. Can handle up to 20 URLs at once.",
  {
    urls: z.array(z.string()).describe("List of URLs to extract content from (max 20). e.g.: ['https://example.com', 'https://test.com']"),
    options: z.object({
      extractDepth: z.enum(["basic", "advanced"]).optional().describe("Extraction depth: basic (simple extraction) or advanced (detailed extraction)"),
      includeImages: z.boolean().optional().describe("Include images in extraction: true or false"),
    }).optional().describe("Content extraction configuration options, all fields are optional")
  },
  async ({ urls, options={} }) => {
    try {
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
