import type { CSSProperties } from "vue";
import type { DialogProps } from "element-plus";

type CustomDialogProps = {
  subBtuText: string;
  cancelBtuText: string;
  fullscreenIcon?: boolean;
  width: number | string;
  title: string;
  reload?: boolean;
  /** `Dialog` 的自定义样式 */
  style?: CSSProperties;
};

/**
 *  @description: 对DialogOptions参数扩展
 */
export type NewDialogProps = DialogProps & CustomDialogProps;

/**
 * @description: 弹窗对外暴露的方法
 */
export interface ModalMethods {
  setProps: (props: Partial<NewDialogProps>) => void;
  openModal: () => void;
  closeModal: () => void;
  setSubDisabled: (status: boolean) => void;
  setSubLoading: (status: boolean) => void;
}

export type RegisterFn = (ModalInstance: ModalMethods) => void;

export type UseModalReturnType = [RegisterFn, ModalMethods];

export type Nullable<T> = T | null;
