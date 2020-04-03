import ScopeCom from './ScopeCom';

/* istanbul ignore next */
ScopeCom.install = function(Vue) {
    Vue.component(ScopeCom.name, ScopeCom);
};

export default ScopeCom;
