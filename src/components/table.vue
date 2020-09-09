<template>
    <div>
    <table id = "myTable" class = "table">
    <thead>
        <tr>
            <th v-if = "isActive == true" v-on:click="sortDown" v-bind:class="{ green: isActive }">{{$t('thKeys')}}</th>
            <th v-else v-on:click="sortUp" v-bind:class="{ blue: !isActive }">{{$t('thKeys')}}</th>
            <th v-on:click="sortUPByValue" v-bind:class="{ green: isActiveSecondTh }">{{$t('thFruits')}}</th>
        </tr>
    </thead>
    <tr v-for = "(fruit, key, index) in fruits">
    <td v-text = "key"></td>
    <td v-text = "fruit.fruit"></td>
    </tr>
    </table>
    <button  @click = "setLocale()" class = "button">Translate</button>
    </div>
</template>

<script>
    import App from '../views/app.vue'
    import Vue from "vue";
    import axios from 'axios';

    const table = new Vue({
        el: "#myTable",
        data: {
            fruits: Object.create(null)
        }
    });

    export default {
        data() {
            return {
                fruits: Object.create(null),
                isActive: true,
                isActiveSecondTh: false,
                isEng: true
            }
        },
        mounted() {
            axios.get('http://fantogramma.org/test.json')
            .then(response => {
                const sortAlphaNum = (a, b) => a.localeCompare(b, 'en', { numeric: true });
                this.fruits = Object.keys(response.data).sort(sortAlphaNum).reduce((r, k) => (r[k] = response.data[k], r), {});
            });
        },
        methods:{
            sortDown: function () {
                const sortAlphaNum = (a, b) => b.localeCompare(a, 'en', { numeric: true });
                this.fruits = Object.keys(this.fruits).sort(sortAlphaNum).reduce((r, k) => (r[k] = this.fruits[k], r), {});
                this.isActive = false;
                this.isActiveSecondTh = false;
            },
            sortUp: function () {
                const sortAlphaNum = (a, b) => a.localeCompare(b, 'en', { numeric: true });
                this.fruits = Object.keys(this.fruits).sort(sortAlphaNum).reduce((r, k) => (r[k] = this.fruits[k], r), {});
                this.isActive = true;
                this.isActiveSecondTh = false;
            },
            getKeyByValue: function(value) {
                return Object.keys(this.fruits).find(key => this.fruits[key] === value);
            },
            sortUPByValue: function() {
                this.fruits = Object.values(this.fruits).sort(this.compare).reduce((result, key) => {
                    result[this.getKeyByValue(key)] = key;
                    
                    return result;
                }, {});
                this.isActiveSecondTh = true;
                this.isActive = 2;
            },
            compare: function( a, b ) {
                if ( a.fruit < b.fruit ){
                    return -1;
                }

                if ( a.fruit > b.fruit ){
                    return 1;
                }

                return 0;
            },
            setLocale: function() {
                if (this.isEng == true) {
                    this.$i18n.locale = 'ru';
                    this.isEng = false;
                } else {
                    this.$i18n.locale = 'en';
                    this.isEng = true;
                }
            }
        }
    }
</script>


<style lang = 'scss'>
    .table {
        border-collapse: collapse;
        width: 90%;
        margin: 50px auto 0;

        .green {
           background-color: green; 
        }
        .blue {
           background-color: blue; 
        }
        
        td, th {
            border: 1px solid black;
            font-size: 24px;
            padding: 10px;
        }
    }

    .button {
        padding: 10px 15px;
        font-size: 20px;
        margin-top: 20px;
        margin-left: 20px;
        border-radius: 15px;
        background: #000;
        color: white;
        transition: all 0.5s ease;
    }

    .button:hover {
        border-radius: 0;
        transition: all 0.5s ease;
    }
</style>

