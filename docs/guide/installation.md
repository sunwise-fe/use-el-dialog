# Installation

## Compatibility

| use-el-dialog | element plus | Vue compatibility |
| ------------- | ------------ | ----------------- |
| 1.x           | 1.x          | 3.x               |

## Node

::: code-group

```bash [npm]
npm i @sunwise/use-el-dialog
```

```bash [yarn]
yarn add @sunwise/use-el-dialog
```

```bash [pnpm]
pnpm install @sunwise/use-el-dialog
```

:::

Install the plugin into Vue:

```javascript
import BasicElDialog from "@sunwise/use-el-dialog";
import "@sunwise/use-el-dialog/dist/style.css";

app.use(BasicElDialog, {
  // 确认按钮文字
  subBtuText: "确认",
  // 取消按钮文字
  cancelBtuText: "取消",
});
```

::: tip
remember to introduce the element-plus dialog component
:::
