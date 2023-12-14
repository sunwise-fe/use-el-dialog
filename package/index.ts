import Dialog from "./src/component/index.vue";
import { NewDialogProps } from "./src/type";
import { assign } from "./src/utils";

export { useElDialog } from "./src/hooks/useElDialog";

const config = {};

// 定义install方法，接收Vue作为参数。如果使用use注册插件，则BasicElDialog组件将被注册到全局
export function install(app: any, options?: Partial<NewDialogProps>) {
  if (app.$_vUseElDialogInstalled) return;
  app.$_vUseElDialogInstalled = true;

  assign(config, options || {});

  app.component(Dialog.name, Dialog);
}

const plugin = {
  install,
  options: config,
};

export default plugin;
