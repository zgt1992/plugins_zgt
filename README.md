# plugins_zgt

## 包含插件

    layoutCom

### vue中使用

1.下载包

    执行命令：`npm i plugins_zgt`
    
2.在main.js中引入

    import plugins_zgt from 'plugins_zgt'
    import 'plugins_zgt/lib/layoutCom_zgt.css'

    Vue.use(plugins_zgt);

3.组件中使用

    <template>
        <div id="app">
            <layoutCom />
        </div>
    </template>
