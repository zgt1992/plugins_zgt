<template>
    <div class="layout">
        <headerCom class="layout_header"></headerCom>
        <div class="layout_section">
            <!-- <asideCom class="layout_aside"></asideCom> -->
            <section class="layout_main">
                <!-- <tagsCom class="layout_nav"></tagsCom> -->
                <div class="layout_article">
                    <router-view/>
                    <footerCom class="layout_footer"></footerCom>
                </div>
            </section>
        </div>
        <!-- <footerCom class="layout_footer"></footerCom> -->
        <asideCom :isM="true" class="layout_aside"></asideCom>
    </div>
</template>

<script>
import headerCom from './layoutItem/headerCom';
import asideCom from './layoutItem/asideCom';
import footerCom from './layoutItem/footerCom';
export default {
    name: 'layoutPC',
    components: {
        headerCom,
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
.layout_aside {
    height: 44px;
    line-height: 44px;
    background: #f8f8f8;
    display: flex;
}
.layout_section {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
}
.layout_main {
    flex: 1;
    display: flex;
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
