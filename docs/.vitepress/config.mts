import { defineConfig } from "vitepress";
import { resolve } from "path";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "use-el-dialog",
  description: "use-el-dialog",
  vite: {
    resolve: {
      alias: {
        "use-el-dialog": resolve(__dirname, "../../package/index.ts"),
      },
    },
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [{ text: "Guid", link: "/" }],

    sidebar: [
      {
        text: "Guide",
        items: [
          { text: "Getting started", link: "/guide/" },
          { text: "Installation", link: "/guide/installation" },
          { text: "Configuration", link: "/guide/configuration" },
        ],
      },
      {
        text: "Reference",
        items: [{ text: "Api Reference", link: "/reference/" }],
      },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/sunwise-fe/use-el-dialog" },
    ],

    footer: {
      message: "Released under the MIT License.",
    },
  },
});
