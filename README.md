# plugins_zgt

## 包含插件

    LayoutCom_zgt

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
            <LayoutCom_zgt />
        </div>
    </template>

4.js中监听LayoutCom_zgt的属性

    使用 this.$LayoutCom_zgt.listen(key, function); 监听LayoutCom_zgt向外暴露的属性，key是要监听的属性的唯一标识，function是回调。

| Keys(string)        | Explain                     |
| :--------:          | :-----                      |
| "isPC"              | 是否PC端布局，返回值Boolean   |

    <script>
        export default {
            data() {
                return {
                    isPC: true
                };
            },
            created() {
                this.$LayoutCom_zgt.listen("isPc", (data) => {
                    console.log(data);
                    this.isPC = data;
                });
            }
        }
    </script>
