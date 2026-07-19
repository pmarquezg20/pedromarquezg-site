import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "pedromarquezg",
    pageTitleSuffix: "",
    enableSPA: true,
    enablePopovers: true,
    analytics: null,
    locale: "es-ES",
    baseUrl: "pedromarquezg.com",
    ignorePatterns: ["private", "templates", ".obsidian", "**/AI-Context.md", "**/books/**"],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Host Grotesk",
        body: "Geist",
        code: "Geist Mono",
      },
      colors: {
        lightMode: {
          light: "#f4f6fa",
          lightgray: "#dbe2ec",
          gray: "#8b97a8",
          darkgray: "#334154",
          dark: "#0d1b2a",
          secondary: "#0d9488",
          tertiary: "#0284c7",
          highlight: "rgba(13, 148, 136, 0.10)",
          textHighlight: "#5eead488",
        },
        darkMode: {
          light: "#0a0e17",
          lightgray: "#1c2534",
          gray: "#5c6678",
          darkgray: "#c3ccd9",
          dark: "#f2f6fb",
          secondary: "#4fd1c5",
          tertiary: "#38bdf8",
          highlight: "rgba(79, 209, 197, 0.14)",
          textHighlight: "#0e7490aa",
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
      // Comment out CustomOgImages to speed up build time
      Plugin.CustomOgImages(),
    ],
  },
}

export default config
