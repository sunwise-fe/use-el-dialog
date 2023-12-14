import { NewDialogProps } from "../type/index";

// 配置项默认值
export const basicProps: Partial<NewDialogProps> = {
  // 确认按钮文字
  subBtuText: "Confirm",
  // 取消按钮文字
  cancelBtuText: "Cancel",
  // 全屏按钮
  fullscreenIcon: false,
  // 弹窗宽度
  width: "50%",
  // 弹窗标题
  title: "",
  // 弹窗内部的内容组件在弹窗组件销毁再次显示后是否也销毁重新加载
  reload: false,
};
