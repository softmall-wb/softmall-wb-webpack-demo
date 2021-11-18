## 软猫组件外包开发 示例项目

### 第一步、初始化环境
Node环境尽量使用node-v16.11.1-x64，或者使用更高的版本。编译插件在低版本Node可能会发生不可预估的异常。
```shell
npm i
npm run init
```

### 第二步、刷新环境
如果已经执行了初始化环境则不需要执行刷新环境这一步，直接到第三步执行。
```shell
npm run build-refresh
```

### 第三步、编译
#### 编译一个组件
```shell
wb-compiler-cli hydrogenium/register -p false -d -w
```

#### 编译一个主题
```shell
wb-compiler-cli hydrogenium -p false -d -w
```

### 第四步、运行项目
为了避免退出编译器，需要在另一个终端启动项目：
```shell
npm run serve
```

更多内容请查看`编译使用说明.md`来安装编译器环境。
