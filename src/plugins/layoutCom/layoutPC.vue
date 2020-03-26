<template>
    <div class="layout">
        <headerCom class="layout_header"></headerCom>
        <div class="layout_section">
            <asideCom class="layout_aside"></asideCom>
            <section class="layout_main">
                <tagsCom class="layout_nav"></tagsCom>
                <div class="layout_article">
                    <router-view/>
                </div>
            </section>
        </div>
        <footerCom class="layout_footer"></footerCom>
    </div>
</template>

<script>
import layoutItem from './layoutItem/index.js';
const [asideCom, footerCom, headerCom, tagsCom] = layoutItem;
export default {
    name: 'layoutPC',
    components: {
        headerCom,
        tagsCom,
        asideCom,
        footerCom
    }
}
</script>

<style scoped>
.layout {
    height: 100%;
    display: flex;
    flex-direction: column;
}
.layout_header,
.layout_footer {
    height: 100px;
    background: #f8f8f8;
}
.layout_section {
    flex: 1;
    display: flex;
    overflow: hidden;
}
.layout_aside {
    width: 200px;
    margin-right: 20px;
}
.layout_main {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
}
.layout_nav {
    height: 50px;
}
.layout_article {
    flex: 1;
    overflow: auto;
    /* margin: 0 -17px 0 0; */
}
</style>
