<template>
    <div class="header" :class="{'isPC': isPC}">
        <div class="log">
            <img class="log_img" src="@/assets/logo.png" alt="">
        </div>
        <div class="title">title</div>
        <div class="user">user</div>
    </div>
</template>

<script>
export default {
    name: "headerCom",
    data() {
        return {
            isPC: false
        };
    },
    created() {
        this.$layoutCom_zgt.listen("isPc", (a) => {
            this.isPC = a;
        });
    },
}
</script>

<style scoped>
.header {
    padding: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
}
.header.isPC .log {
    width: 80px;
    height: 60px;
}
.log_img {
    width: 60px;
    height: 60px;
}
.header.isPC .user,
.header.isPC .title {
    flex: 1;
}
</style>
