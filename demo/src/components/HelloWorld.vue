<template>
  <div class="box-container">
    <el-space wrap>
      <el-button size="large" @click="onBaseClick">基本使用</el-button>
      <el-button size="large" @click="onDraggableClick">可拖拽</el-button>
      <el-button size="large" @click="onFullscreenClick">全屏</el-button>
      <el-button size="large" @click="onFullscreenBtnClick">全屏按钮</el-button>
      <el-button size="large" @click="onModalClick">无背景遮罩层</el-button>
      <el-button size="large" @click="onHeaderSlotClick">自定义头部</el-button>
      <el-button size="large" @click="onFooterSlotClick">自定义底部</el-button>
      <el-button size="large" @click="onOpenClick"> 打开后的回调 </el-button>
      <el-button size="large" @click="onSubDisabledClick">
        确认按钮disabled状态
      </el-button>
      <el-button size="large" @click="onSubLoadingClick">
        确认按钮事件
      </el-button>
      <el-button size="large" @click="onSubLoadingClick">
        确认按钮事件
      </el-button>
      <el-button size="large" @click="onNestingClick"> 嵌套的弹窗 </el-button>
      <el-button size="large" @click="onUpdateClick"
        >更改弹窗自身属性</el-button
      >
      <el-button size="large" @click="onNestGridClick"> 嵌套表格 </el-button>
    </el-space>
    <el-divider />
    <el-space wrap>
      <el-button size="large" @click="onFormClick">结合form表单</el-button>
    </el-space>
    <basic-el-dialog @register="registerBaseDialog">
      <span>弹框内容-基本使用</span>
    </basic-el-dialog>
    <basic-el-dialog @register="registerDraggableDialog">
      <span>弹框内容-可拖拽</span>
    </basic-el-dialog>
    <basic-el-dialog @register="registerFullscreenDialog">
      <span>弹框内容-全屏</span>
    </basic-el-dialog>
    <basic-el-dialog @register="registerFullscreenBtnDialog">
      <span>弹框内容-全屏按钮</span>
    </basic-el-dialog>
    <basic-el-dialog @register="registerModalDialog">
      <span>弹框内容-无遮罩层</span>
    </basic-el-dialog>
    <basic-el-dialog @register="registerHeaderSlotDialog">
      <template #header>
        <div style="color: red">自定义头部</div>
      </template>
      <span>弹框内容-自定义头部</span>
    </basic-el-dialog>
    <basic-el-dialog @register="registerFooterSlotDialog">
      <span>弹框内容-自定义底部</span>
      <template #footer>
        <el-button @click="footerSlotDialogMethods.closeModal()">
          按钮1
        </el-button>
        <el-button type="primary" plain>按钮2</el-button>
        <el-button type="primary" round>按钮3</el-button>
      </template>
    </basic-el-dialog>
    <basic-el-dialog @register="registerOpenDialog" @on-open="handleOpen">
      <span>弹框内容-打开后的回调</span>
    </basic-el-dialog>
    <basic-el-dialog
      @register="registerSubDisabledDialog"
      @on-open="handleSubDisabledDialogOpen"
    >
      <div>弹框内容-确认按钮disabled</div>
      <el-button type="primary" plain @click="handleChangeSubDisabled">
        确认按钮可以点击
      </el-button>
    </basic-el-dialog>
    <basic-el-dialog
      @register="registerSubLoadingDialog"
      @on-ok="hanleSubLoadingDialogOK"
    >
      <span>弹框内容-确认按钮loading关闭</span>
    </basic-el-dialog>
    <basic-el-dialog @register="registerNestingDialog">
      <el-button size="large" @click="onSubDialogClick"
        >点击打开子弹窗</el-button
      >
    </basic-el-dialog>
    <basic-el-dialog @register="registerNestSubDialog">
      <span>子弹窗</span>
    </basic-el-dialog>
    <basic-el-dialog @register="registerUpdateDialog">
      <el-button type="primary" :disabled="pageNo < 2" @click="handlePre"
        >上一页</el-button
      >
      <el-button type="primary" @click="handleNext">下一页</el-button>
    </basic-el-dialog>
    <basic-el-dialog @register="registerFormDialog" @on-ok="handleFormOk">
      <MyForm ref="myFormRef"></MyForm>
    </basic-el-dialog>

    <basic-el-dialog @register="registerNestGridDialog">
      <template #header>
        <div style="color: rgb(17, 146, 244); font-weight: bold">
          我是自定义头部标题呀
        </div>
      </template>
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="date" label="Date" width="180" />
        <el-table-column prop="name" label="Name" width="180" />
        <el-table-column prop="address" label="Address" />
      </el-table>
      <template #footer>
        <el-button type="primary" @click="onSubDialogHandler">
          打开子弹窗
        </el-button>
      </template>
    </basic-el-dialog>
    <basic-el-dialog @register="registerSubDialog" @on-ok="handlerSubDialogOK">
      <span>我是子弹窗内容</span>
    </basic-el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { ElMessage } from "element-plus";
import { useElDialog } from "../../../package/index.ts";
import MyForm from "./MyForm.vue";

let pageNo = ref(1);
const myFormRef = ref();

const [registerBaseDialog, baseDialogMethods] = useElDialog({
  title: "基本使用",
  fullscreenIcon: true,
  closeOnClickModal: true,
});

const onBaseClick = () => {
  baseDialogMethods.openModal();
};

const [registerDraggableDialog, draggableDialogMethods] = useElDialog({
  title: "可拖拽",
  draggable: true,
});

const onDraggableClick = () => {
  draggableDialogMethods.openModal();
};

const [registerFullscreenDialog, fullscreenDialogMethods] = useElDialog({
  title: "全屏",
  fullscreen: true,
});

const onFullscreenClick = () => {
  fullscreenDialogMethods.openModal();
};

const [registerFullscreenBtnDialog, fullscreenBtnDialogMethods] = useElDialog({
  title: "全屏按钮",
  fullscreenIcon: true,
});

const onFullscreenBtnClick = () => {
  fullscreenBtnDialogMethods.openModal();
};

const [registerModalDialog, modalDialogMethods] = useElDialog({
  title: "无背景遮罩层",
  modal: false,
});

const onModalClick = () => {
  modalDialogMethods.openModal();
};

const [registerHeaderSlotDialog, headerSlotDialogMethods] = useElDialog({
  title: "自定义头部",
  modal: false,
});

const onHeaderSlotClick = () => {
  headerSlotDialogMethods.openModal();
};

const [registerFooterSlotDialog, footerSlotDialogMethods] = useElDialog({
  title: "自定义底部",
  modal: false,
});

const onFooterSlotClick = () => {
  footerSlotDialogMethods.openModal();
};

const [registerOpenDialog, openMethods] = useElDialog({
  title: "打开后的回调",
});

const onOpenClick = () => {
  openMethods.openModal();
};

const handleOpen = () => {
  ElMessage("open");
};

const [registerSubDisabledDialog, subDisabledDialogMethods] = useElDialog({
  title: "确认按钮disabled",
});

const onSubDisabledClick = () => {
  subDisabledDialogMethods.openModal();
};

const handleSubDisabledDialogOpen = () => {
  subDisabledDialogMethods.setSubDisabled(true);
};

const handleChangeSubDisabled = () => {
  subDisabledDialogMethods.setSubDisabled(false);
};

const [registerSubLoadingDialog, subLoadingDialogMethods] = useElDialog({
  title: "确认按钮loading",
});

const onSubLoadingClick = () => {
  subLoadingDialogMethods.openModal();
};

const hanleSubLoadingDialogOK = () => {
  setTimeout(() => {
    subLoadingDialogMethods.closeModal();
  }, 1000);
};

const [registerNestingDialog, nestingDialogMethods] = useElDialog({
  title: "嵌套弹窗",
});

const onNestingClick = () => {
  nestingDialogMethods.openModal();
};

const [registerNestSubDialog, nestSubDialogMethods] = useElDialog({
  title: "嵌套子弹窗",
  width: "500px",
});

const onSubDialogClick = () => {
  nestSubDialogMethods.openModal();
};

const [registerUpdateDialog, updateDialogMethods] = useElDialog({
  title: `第1页`,
});

const onUpdateClick = () => {
  updateDialogMethods.openModal();
};

const handlePre = () => {
  pageNo.value--;
  updateDialogMethods.setProps({ title: `第${pageNo.value}页` });
};

const handleNext = () => {
  pageNo.value++;
  updateDialogMethods.setProps({ title: `第${pageNo.value}页` });
};

const [registerFormDialog, formDialogMethods] = useElDialog({
  title: "表单",
  reload: true,
});

const onFormClick = () => {
  formDialogMethods.openModal();
};

const handleFormOk = async () => {
  if (!myFormRef.value) return;
  let formRes = await myFormRef?.value.submitForm();
  console.log("formRes", formRes);
  if (formRes) {
    formDialogMethods.closeModal();
    formDialogMethods.setSubLoading(false);
  } else {
    formDialogMethods.setSubLoading(false);
  }
};

const [registerNestGridDialog, onNestGridDialogMethods] = useElDialog({
  title: "这是自定义头和底部",
  fullscreenIcon: true,
});
const onNestGridClick = () => {
  onNestGridDialogMethods.openModal();
};
const [registerSubDialog, subDialogMethods] = useElDialog({
  title: "这是嵌套子弹窗",
  width: "300px",
  modal: false,
  draggable: true,
});
const onSubDialogHandler = () => {
  subDialogMethods.openModal();
};
const handlerSubDialogOK = () => {
  alert("我要被关闭了~~~~~");
  setTimeout(() => {
    subDialogMethods.closeModal();
  }, 1000);
};

const tableData = [
  {
    date: "2016-05-03",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-02",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-04",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-01",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
];
</script>
