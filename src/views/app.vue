<template>
    <div id = "app">
        <div class = "nav">
            <router-link to = "/">Home</router-link>
            <router-link to = "/table">Table</router-link>
            <router-link to = "/canvas">Canvas</router-link>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        data() {
            return {
            }
        }
    }
</script>

<style lang = 'scss'>
    body {
        margin: 0;
    }

    .nav {
        text-align: center;
        background-color: #000;
        padding: 20px 0 20px;
        
        a {
            text-decoration: none;
            padding: 20px;
            font-size: 25px;
            color: #fff;
        }

        a:hover {
            color: #f20c0c;
            transition: all 0.6s ease-out;
        }
    }
</style>