# use-el-dialog

在过去使用 el-dialog 过程中，我常常需要声明一系列的变量，来进行弹框加载状态的控制，弹框的展示与隐藏。

use-el-dialog 集成了常用的与弹框相关的功能，它包括了确认按钮的状态加载，嵌套组件的重新挂载等功能。实现了通过 hook 方式，直接调用 el-dialog 。

支持环境：vue3 + element-plus

## 你可能以往这样使用 <el-dialog />

```vue
<template>
  <el-button text @click="dialogVisible = true"> open the Dialog </el-button>

  <el-dialog v-model="dialogVisible" title="Tips" width="30%">
    <span>This is a message</span>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const dialogVisible = ref(false);
</script>
```

如果实现表单的弹框嵌套，实际逻辑更复杂，涉及到了表单的数据获取，弹框按钮的 loading 状态，弹框的展示与隐藏等控制，实现这些功能，需要通过声明大量的额外变量进行控制。

## 通过 use-el-dialog 的使用方式

main.js 中

```js
import BasicElDialog from "../../package/index.ts";

import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

createApp(App)
  .use(BasicElDialog, {
    subBtuText: "确认",
    cancelBtuText: "取消",
  })
  .use(ElementPlus)
  .mount("#app");
```

vue file

```vue
<template>
  <div class="box-container">
    <el-button size="large" @click="handleOpen">Open Dialog</el-button>

    <basic-el-dialog @register="registerDialog" />
  </div>
</template>

<script lang="ts" setup>
import { useElDialog } from "use-el-dialog";

const [registerDialog, dialogMethods] = useElDialog({
  title: "Custom",
});

const handleOpen = () => {
  dialogMethods.openModal();
};
</script>
```

## Attributes

use-el-dialog 继承了 el-dialog 的属性，在此基础之上还实现了其他属性

| 参数 | 说明 | 类型 | 可选值 | 默认值 | 是否必填 |
|subBtuText| 弹框确认按钮文案| string| 确认| 否|
|cancelBtuText |弹框取消按钮文案| string| 取消 |否|
|reload| 是否每次弹框展示时触发子组件重载| boolean|false| 否|
|fullscreenIcon |是否显示全屏按钮|boolean|false|否|

## Methods

|名称| 说明| 参数|
|openModal| 打开弹框 |-|
|closeModal |关闭弹框 |-|
|setSubLoading| 设置“确认”按钮加载状态 |(state: boolean)|
|setSubDisabled| 设置“确认”按钮不可点击状态 |(state: boolean)|
|setProps| 动态设置属性 |use-el-dialog attr|

## Events

|名称| 说明| 参数|
|on-open |弹窗打开后回调 |Function|
|on-ok |按钮“确认”回调| Function|
|on-cancel |按钮“取消”回调 |Function|

## Slots

|名称| 说明| 参数|
|header| 头部插槽 |-|
|default| 中间插槽 |-|
|footer| 脚部插槽 |-|

> use-el-dialog 使用的前提，需要保证 element-plus 正确引入并使用。use-el-dialog 本身并不携带 element-plus。
