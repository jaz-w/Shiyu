# @jaz-w/shiyu-vsh

一个 Shell 脚本工具集合，用于 Shiyu 项目的开发和管理。

## 功能特性

- 🚀 基于 Node.js 的现代化 Shell 工具
- 📦 支持模块化开发和按需加载
- 🔍 提供依赖检查和分析功能
- 🔄 支持循环依赖扫描
- 📝 提供包发布检查功能

## 安装

```bash
# 使用 pnpm 安装
pnpm add -D @jaz-w/shiyu-vsh

# 或者使用 npm
npm install -D @jaz-w/shiyu-vsh

# 或者使用 yarn
yarn add -D @jaz-w/shiyu-vsh
```

## 使用方法

### 全局安装

```bash
# 全局安装
pnpm add -g @jaz-w/shiyu-vsh

# 使用 vsh 命令
vsh [command]
```

### 本地使用

```bash
# 在 package.json 中添加脚本
{
  "scripts": {
    "vsh": "vsh"
  }
}

# 运行命令
pnpm vsh [command]
```

## 命令列表

- `vsh check-circular`: 检查循环依赖
- `vsh check-dep`: 检查依赖
- `vsh lint`: 代码风格检查
  - `--format`: 自动修复格式错误
- `vsh publint`: 发布包检查
