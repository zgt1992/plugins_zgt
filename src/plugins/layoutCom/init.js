import layoutCom_zgt from './src/LayoutCom';

/* istanbul ignore next */
layoutCom_zgt.install = function(Vue) {
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
    Vue.component(layoutCom_zgt.name, layoutCom_zgt);
};

export default layoutCom_zgt;
