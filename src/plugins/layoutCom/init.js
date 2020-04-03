import layoutCom_zgt from './src/LayoutCom';

/* istanbul ignore next */
layoutCom_zgt.install = function(Vue) {
    Vue.component(layoutCom_zgt.name, layoutCom_zgt);
};

export default layoutCom_zgt;
