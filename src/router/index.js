import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/Login'
import Register from '@/components/Register'
import Home from '@/components/nasabah/Home'
import Dash from '@/components/nasabah/Dash'
import Transaksi from '@/components/nasabah/Transaksi'
import Rekening from '@/components/nasabah/Rekening'
import History from '@/components/nasabah/History'
import View from '@/components/nasabah/View'
import Verify from '@/components/nasabah/Verify'
import Sukses from '@/components/nasabah/Sukses'

Vue.use(Router)

let routers = new Router({
	routes: [
		{
			path: '/',
			name: 'Login',
			component: Login,
			meta: {
				fixed: true
			}
		},
		{
			path: '/register',
			name: 'Register',
			component: Register,
			meta: {
				fixed: true
			}
		},
		{
			path: '/dash',
			name: 'Dash',
			component: Dash,
			meta: {
				guest: true
			}
		},
		{
			path: '/transaksi',
			name: 'Transaksi',
			component: Transaksi,
			meta: {
				guest: true
			}
		},
		{
			path: '/rekening',
			name: 'Rekening',
			component: Rekening,
			meta: {
				guest: true
			}
		},
		{
			path: '/history',
			name: 'History',
			component: History,
			meta: {
				guest: true
			}
		},
		{
			path: '/view',
			name: 'View',
			component: View,
			meta: {
				guest: true
			}
		},
		{
			path: '/verify',
			name: 'Verify',
			component: Verify,
			meta: {
				guest: true
			}
		},
		{
			path: '/sukses',
			name: 'Sukses',
			component: Sukses,
			meta: {
				guest: true
			}
		},
		{
			path: '*',
			redirect : {
				path : '/'
			}
		}
	],
	mode : 'history'
})

routers.beforeEach((to, from, next) => {
	if(to.matched.some(record => record.meta.guest)) {
        if (localStorage.getItem('usertoken') == null) {
            next({ path: '/', params: { nextUrl: to.fullPath } })
        } else {
			next()
        }
    }
	else if(to.matched.some(record => record.meta.fixed)) {
        if(localStorage.getItem('usertoken') == null){
            next()
        }
        else{
            next({ path: '/dash'})
        }
    } 
	else {
        next()
    }
})

export default routers
