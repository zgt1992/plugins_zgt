const requireComponent = require.context('./', true, /\.vue$/);

const install = (Vue)=>{
    if(install.installed) return
    install.installed
    Vue.prototype.$layoutCom = new Proxy({
        list: {},
        offlineInfo: {},
        listen: function (key, userFun) {
            if (typeof(key) === 'string' && typeof(userFun) === 'function') {
                this.list[key] = userFun;
                if (this.offlineInfo.hasOwnProperty(key)) {
                    this.publish(key, this.offlineInfo[key]);
                    delete this.offlineInfo[key];
                }
            } else {
                throw new Error(" The first parameter is the string and the second parameter is the function of the 'listen' function! ");
            }
        },
        publish: function (key, act) {
            if (this.list[key]) {
                this.list[key](act);
            } else {
                this.offlineInfo[key] = act;
                console.warn(` You can ignore this prompt if you do not use this property. You should monitor '${key}' before publishing! `);
            }
        }
    }, {
        get:(target, key, receiver) => {
            return Reflect.get(target, key, receiver);
        },
        set:() => {
            throw new Error(" You cannot modify the properties of this object! ");
        }
    });
    Object.defineProperty(Vue, "$layoutCom", {
        writable: false
    });
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