const requireComponent = require.context('./', true, /\.vue$/);

const install = (Vue)=>{
    if(install.installed) return
    install.installed
    requireComponent.keys().forEach(fileName => {
        const config = requireComponent(fileName);
        const componentName = config.default.name;
        Vue.component(componentName, config.default || config);
    });
}
// 确保是正常环境 浏览器环境 node是没有window的
if(typeof window !== 'undefined' && window.Vue){
    // 注册vue
    install(window.Vue);
}
export default{
    install
    // 导出的对象必须具备一个install方法
}