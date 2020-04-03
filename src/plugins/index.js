const requireComponent = require.context('/', true, /init.js$/);

// let plugins_zgt = {};
let components = [];
requireComponent.keys().forEach(fileName => {
    const config = requireComponent(fileName);
    // const componentName = config.default.name;
    // plugins_zgt[componentName] = config.default || config;
    components.push(config.default || config);
});

const install = (Vue)=>{
    Vue.prototype.$layoutCom_zgt = new Proxy({
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
    Object.defineProperty(Vue, "$layoutCom_zgt", {
        writable: false
    });
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
// import layoutCom from './layoutCom/src/layoutCom'

export default {
    install
}

// export {
//     layoutCom
// }