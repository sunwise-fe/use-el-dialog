<template>
  <el-dialog
    class="use-el-basic-dialog"
    v-bind="getBindValue"
    v-model="isModal"
    :fullscreen="fullscreen ? true : getBindValue?.fullscreen ? true : false"
    @open="onOpenModal"
    @close="onCloseModal"
    @open-auto-focus="onOpenAutoFocusModal"
    @close-auto-focus="onCloseAutoFocusModal"
  >
    <template #header="$scope">
      <slot name="header" v-bind="$scope">
        <div class="use-el-dialog-title">
          <span class="el-dialog__title">{{ getBindValue.title }}</span>
          <el-icon
            class="use-el-dialog-icon el-dialog__close"
            v-if="getBindValue.fullscreenIcon"
            @click="toggleFullscreen"
          >
            <component :is="fullscreenIcon"></component>
          </el-icon>
        </div>
      </slot>
    </template>
    <template #default>
      <template v-if="reload">
        <slot name="default" v-if="isModal"></slot>
      </template>
      <template v-else>
        <slot name="default"></slot>
      </template>
    </template>
    <template #footer v-if="!$slots.footer">
      <span class="dialog-footer">
        <el-button @click="closeModal">{{ cancelBtuText }}</el-button>
        <el-button
          type="primary"
          :loading="subLoading"
          :disabled="subDisabled"
          @click="handleSubmit"
        >
          {{ subBtuText }}
        </el-button>
      </span>
    </template>
    <template v-else #footer>
      <slot name="footer"></slot>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { getCurrentInstance, ref, unref, computed, useAttrs, toRaw } from "vue";
import { deepMerge } from "../utils";
import { NewDialogProps, ModalMethods } from "../type";
import { basicProps } from "../contants";
import ComponentPlugin from "../../index";
import FullscreenIcon from "./FullscreenIcon.vue";
import ExitFullscreenIcon from "./ExitFullscreenIcon.vue";

const attrs = useAttrs();

// 默认配置项和插件初始化的时候用户传入的配置项合并
const defaultProps = {
  ...basicProps,
  ...ComponentPlugin.options,
};

const emit = defineEmits<{
  (e: "on-open"): void;
  (e: "on-open-auto-focus"): void;
  (e: "on-close"): void;
  (e: "on-close-auto-focus"): void;
  (e: "on-ok"): void;
  (e: "register", modalMethods: ModalMethods): void;
}>();

const propsRef = ref<Partial<NewDialogProps> | null>(null);

const isModal = ref(false);
const fullscreen = ref(false);
const subLoading = ref(false);
const subDisabled = ref(false);

const getProps = computed(() => {
  return { ...defaultProps, ...(unref(propsRef) as any) };
});

const fullscreenIcon = computed(() => {
  return fullscreen.value ? toRaw(ExitFullscreenIcon) : toRaw(FullscreenIcon);
});

const subBtuText = computed(() => {
  const { subBtuText } = propsRef.value as any;
  return subBtuText || defaultProps.subBtuText;
});

const cancelBtuText = computed(() => {
  const { cancelBtuText } = propsRef.value as any;
  return cancelBtuText || defaultProps.cancelBtuText;
});

const reload = computed(() => {
  const { reload } = propsRef.value as any;
  return reload || defaultProps.reload;
});

async function setProps(modalProps: Partial<NewDialogProps>): Promise<void> {
  propsRef.value = deepMerge(unref(propsRef) || ({} as any), modalProps);
}

const getBindValue = computed(() => {
  return {
    ...attrs,
    ...unref(getProps),
    ...unref(propsRef),
  };
});

function toggleFullscreen() {
  fullscreen.value = !fullscreen.value;
}

function setSubLoading(status: boolean) {
  subLoading.value = status;
}

function setSubDisabled(status: boolean) {
  subDisabled.value = status;
}

function openModal() {
  isModal.value = true;
}

function closeModal() {
  isModal.value = false;
  subLoading.value = false;
}

function onOpenModal() {
  emit("on-open");
}

function onOpenAutoFocusModal() {
  emit("on-open-auto-focus");
}

function onCloseModal() {
  isModal.value = false;
  emit("on-close");
}

function onCloseAutoFocusModal() {
  emit("on-close-auto-focus");
}

function handleSubmit() {
  subLoading.value = true;
  emit("on-ok");
}

const modalMethods: ModalMethods = {
  setProps,
  openModal,
  closeModal,
  setSubDisabled,
  setSubLoading,
};

const instance = getCurrentInstance();
if (instance) {
  emit("register", modalMethods);
}
</script>

<style>
.use-el-basic-dialog .use-el-dialog-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.use-el-basic-dialog .use-el-dialog-title .use-el-dialog-icon {
  transform: translateX(-0.5rem);
}

.use-el-basic-dialog .use-el-dialog-svg {
  color: var(--el-color-info);
  cursor: pointer;
}

.use-el-basic-dialog .el-dialog__headerbtn {
  height: 24px;
  right: 14px;
  top: 20px;
  width: 24px;
}

.use-el-basic-dialog .el-dialog__headerbtn:hover .el-dialog__close {
  color: var(--el-color-info) !important;
}

.use-el-basic-dialog .el-icon.el-dialog__close {
  border-radius: 4px;
  height: 24px;
  outline: none;
  transition: background-color 0.2s, color 0.2s;
  width: 24px;
}

.use-el-basic-dialog .el-icon.el-dialog__close:hover,
.el-icon.use-el-dialog-svg:hover {
  background-color: #0000000f;
  color: #000000e0 !important;
  text-decoration: none;
}
</style>
