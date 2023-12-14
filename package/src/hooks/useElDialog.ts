import { ref, unref, getCurrentInstance, watch, onUnmounted } from "vue";
import { ModalMethods, UseModalReturnType } from "../type";
import { NewDialogProps, Nullable } from "../type";

/**
 *
 * @param props 传给BasiDialog组件的props
 * @returns
 */
export function useElDialog(
  props: Partial<NewDialogProps>
): UseModalReturnType {
  // 可以访问到弹窗组件内部的引用
  const modalRef = ref<Nullable<ModalMethods>>(null);
  const currentInstance = getCurrentInstance();

  const getInstance = () => {
    const instance = unref(modalRef.value);
    if (!instance) {
      console.error("useModal instance is undefined!");
    }
    return instance;
  };

  // dynamic use hook props
  const getNewProps = () => {
    const newProps: {
      [key: string]: any;
    } = {};

    Object.keys(props).map((key) => {
      newProps[key] = unref(props[key as keyof NewDialogProps]);
    });

    return newProps;
  };

  /**
   *
   * @param modalInstance BasiDialog组件mouted后传过来的可以引用到BasiDialog组件的对象
   */
  const register = (modalInstance: ModalMethods) => {
    modalRef.value = modalInstance;
    // 当前组件注册register事件后，可以访问到内部的BasiDialog组件
    currentInstance?.emit("register", modalInstance);
    currentInstance &&
      onUnmounted(() => {
        modalRef.value = null;
      });

    watch(
      () => props,
      () => {
        props && modalInstance.setProps(getNewProps() as NewDialogProps);
      },
      {
        immediate: true,
        deep: true,
      }
    );
  };

  const methods: ModalMethods = {
    setProps: (props): void => {
      getInstance()?.setProps(props);
    },
    openModal: () => {
      getInstance()?.openModal();
    },
    closeModal: () => {
      getInstance()?.closeModal();
    },
    setSubDisabled: (status) => {
      getInstance()?.setSubDisabled(status);
    },
    setSubLoading: (status) => {
      getInstance()?.setSubLoading(status);
    },
  };

  return [register, methods];
}
