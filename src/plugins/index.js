const requireComponent = require.context('/', true, /init.js$/);

let plugins_zgt = {};
let components = [];
requireComponent.keys().forEach(fileName => {
    const config = requireComponent(fileName);
    const componentName = config.default.name;
    plugins_zgt[componentName] = config.default || config;
    components.push(config.default || config);
});

const install = (Vue)=>{
    components.forEach(ele => {
        // const config = requireComponent(fileName);
        // const componentName = config.default.name;
        Vue.component(ele.name, ele);
    });
}

// 确保是正常环境 浏览器环境 node是没有window的
if(typeof window !== 'undefined' && window.Vue){
    // 注册vue
    install(window.Vue);
}
// import layoutCom from './layoutCom/init.js'
// console.log(layoutCom)
export default {
    install
}
 console.log(plugins_zgt)
export let {
    LayoutCom_zgt,
    button_zgt,
    DownloadFile
} = plugins_zgt;