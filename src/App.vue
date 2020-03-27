<template>
    <div id="app">
        <layoutCom />
    </div>
</template>

<script>
export default {
    data() {
        return {
        }
    },
    created() {
        console.log(222)
        this.$layoutCom.listen("isPc", (a) => {
            console.log(a);
        });
    }
}
</script>

<style lang="less">
html,
body {
    width: 100%;
    height: 100%;
}
body {
    margin: 0;
}
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    height: 100%;
}
#nav {
    padding: 30px;
    a {
        font-weight: bold;
        color: #2c3e50;
        &.router-link-exact-active {
        color: #42b983;
        }
    }
}
</style>
