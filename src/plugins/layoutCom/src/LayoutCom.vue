<template>
    <div class="layout_all">
        <layoutPC v-if="isPC" />
        <layoutM v-else />
    </div>
</template>

<script>
import layoutPC from './layoutPC';
import layoutM from './layoutM';
function vaildatePc() {
    const userAgentInfo = navigator.userAgent;
    const Agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"];
    let flag = true;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false;
            break;
        }
    }
    return flag;
}
export default {
    name: 'LayoutCom_zgt',
    components: {
        // headerCom,
        // tagsCom,
        // asideCom,
        // footerCom
        layoutPC,
        layoutM
    },
    data() {
        return {
            isPC: vaildatePc()
        };
    },
    created() {
        this.$layoutCom_zgt.publish("isPc", this.isPC);
    },
}
</script>

<style scoped>
>>> ul {
    list-style: none;
    margin: 0;
    padding: 0;
}
.layout_all {
    height: 100%;
    width: 100%;
}
</style>
