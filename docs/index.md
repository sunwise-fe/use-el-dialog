---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "use-el-dialog"
  text: "a hook for el-dialog"
  tagline: easy and simple to use el-dialog by hook type
  actions:
    - theme: brand
      text: Get Started
      link: /guide/
    - theme: alt
      text: API References
      link: /reference/

features:
  - title: 基于Element Plus的el-dialog组件
    details: 支持el-dialog组件的所有props和event，并且扩展了额外的快捷属性
  - title: hook类型调用方式
    details: 告别弹窗显示、隐藏等重复逻辑，统一暴露api可完成弹窗的显示、隐藏，确认按钮loading和disabled
  - title: 动态更新弹窗props
    details: 支持动态修改dialog的title、width、height、fullscreen等属性
---
