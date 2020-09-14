<template>
	<div class="container mt-5">
		<div class="row mt-5">
			<div class="col-md-3"></div>
			<div class="col-md-6" style="background-color:white; padding: 20px 20px 20px 20px; box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);">
				<h5 class="text-info" style="text-transform:uppercase;" align="center">Please Login...!</h5>
				<hr class="my-3">
				<form v-on:submit.prevent = "login">
					<div class="form-group">
						<label class="text-info">User ID</label>
						<input type="text" class="form-control" name="no_req" v-model="id_verify" placeholder="User ID..." autocomplete="off" autofocus>
					</div>
					<div class="form-group">
						<label class="text-info">PIN</label>
						<input type="password" class="form-control" name="pin" v-model="password" placeholder="PIN...">
					</div>
					<button type="submit" class="btn btn-outline-primary"><i class="fa fa-sign-in"></i> Masuk</button>
					<!-- <router-link tag="button" class="btn btn-outline-warning" to="/admin"><i class="fa fa-user"></i><strong>Admin</strong></router-link> -->
					<!-- <router-link tag="button" class="btn btn-outline-primary" to="/dash"><i class="fa fa-sign-in"></i> Masuk</router-link> -->
					<router-link tag="button" class="btn btn-outline-secondary" to="/register"><i class="fa fa-registered"></i> Register</router-link>
				</form>
				<hr class="my-3">
				<p class="text-info" align="right"><strong><i class="fa fa-dollar"></i>U-Bank</strong> | solve the problem without a solution © 2020</p>
			</div>
			<div class="col-md-3"></div>
		</div>
	</div>
</template>

<script>
	import axios from 'axios'
	import EventBus from './Eventbus'
	import router from '../router'
	export default{
		data(){
			return{
				id_verify: '',
				password: ''
			}
		},
		methods:{
			login(){
				axios.post('http://localhost:2020/users/login',{
					id_verify : this.id_verify,
					password : this.password
				}).then(res => {
					let akses = res.data.user.akses
					localStorage.setItem('user',JSON.stringify(res.data.user))
					localStorage.setItem('usertoken',res.data.token)
					if (localStorage.getItem('usertoken') != null){
						if(this.$route.params.nextUrl != null){
							router.push(this.$route.params.nextUrl)
						} else{
							alert('Selamat Datang, silahkan lakukan transaksi.')
							this.$router.push('/dash')
						}
					}else{
						router.push('/')
					}
					this.id_verify =''
					this.password =''
				}).catch(err => {
					// console.log(err)
					if(this.id_verify =='' && this.password ==''){
						alert('Harap masukan kolom ID User & Password !')
					}else{
						alert('No. Rekening dan PIN Anda salah !')
					}
				})
				this.emitMethod()
			},
			emitMethod(){
				EventBus.$emit('logged-in', 'loggedin')
			}
		}
	}
</script>