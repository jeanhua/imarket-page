import {createRouter, createWebHashHistory} from 'vue-router'
import App from "./App.vue";
import {createApp} from "vue";

import "./style.css";
import "./assets/font/font.css";

const routes = [
    {
        path: '/',
        redirect: '/post',
        component: () => import("./page/homepage/home.vue"),
        meta: {
            keepAlive: true,
        },
        children: [
            {
                path: 'post',
                component: () => import("./page/homepage/postPage/postPage.vue"),
                meta: {
                    keepAlive: true,
                }
            },
            {
                path: "search",
                component: () => import("./page/homepage/searchPage/searchPage.vue"),
                meta: {
                    keepAlive: true,
                }
            },
            {
                path: "about",
                component: () => import("./page/homepage/aboutPage/aboutPage.vue"),
                meta: {
                    keepAlive: true,
                }
            }
        ]
    },
    {
        path: '/post/:id',
        component: () => import("./page/postDetail/postDetail.vue"),
        meta: {
            keepAlive: false,
        }
    },
    {
        path: '/categories/:id',
        component: () => import("./page/categoriesPage/categoriesPost.vue"),
        meta: {
            keepAlive: true,
        }
    },
    {
        path:'/search/:keyword',
        component:()=>import("./page/searchDetail/searchDetail.vue"),
        meta: {
            keepAlive: true,
        }
    },
    {
        path: '/login',
        component: () => import("./page/loginPage/loginPage.vue"),
        meta: {
            keepAlive: false,
        }
    },
    {
        path: '/editInfo',
        component: ()=>import("./page/userInfoEdit/userInfoEdit.vue"),
        meta: {
            keepAlive: false
        }
    },
    {
        path: '/userPost/:username',
        component: ()=>import("./page/userPost/userPost.vue"),
        meta: {
            keepAlive: true
        }
    },
    {
        path: '/favorite',
        component: ()=>import("./page/favoritePost/favoritePost.vue"),
        meta: {
            keepAlive: true
        }
    }
];

const router = createRouter({
    history:createWebHashHistory(),
    routes,
})
createApp(App).use(router).mount('#app')
