<template>
	<div class="container mt-5">
		<div class="row mt-5 mb-5">
			<div class="col-md-3"></div>
			<div class="col-md-6 text-center" style="background-color: white; padding: 10px 10px 10px 10px; box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);">
				<div class="row">
					<div class="col-md-3">
						<router-link tag="button" to="/rekening" class="btn btn-lg btn-info button" title="Rekening"><i class="fa fa-user-circle-o fa-3x"></i></router-link>
						<p class="mt-2"><strong>Rekening</strong></p>
					</div>
					<div class="col-md-3">
						<router-link to="/transaksi" tag="button" class="btn btn-lg btn-primary button" title="Transfer"><i class="fa fa-paper-plane-o fa-3x"></i></router-link>
						<p class="mt-2"><strong>Transfer</strong></p>
					</div>
					<div class="col-md-3">
						<router-link tag="button" to="/history" class="btn btn-lg btn-warning button text-white" title="History"><i class="fa fa-history fa-3x"></i></router-link>
						<p class="mt-2"><strong>History</strong></p>
					</div>
					<div class="col-md-3">
						<button class="btn btn-lg btn-danger button" title="Log Out" v-on:click="logout"><i class="fa fa-sign-out fa-3x"></i></button>
						<p class="mt-2"><strong>Keluar</strong></p>
					</div>
				</div>
				<hr class="my-3">
				<h4 style="text-transform: uppercase;">Saldo Utama : <span style="color:#D0D3D4;">{{saldoku | currency}},-</span></h4>
			</div>
			<div class="col-md-3"></div>
		</div>
	</div>
</template>
<style>
	.button {
		box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24),0 17px 50px 0 rgba(0,0,0,0.19);
	}
	.button2:hover {
		box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24),0 17px 50px 0 rgba(0,0,0,0.19);
	}
</style>
<script type="text/javascript">
	import EventBus from '../Eventbus'
	import router from '../../router'
	import axios from 'axios'
	import jwtDecode from 'jwt-decode'

	EventBus.$on('logged-in', test => {
		console.log(test)
	})

	export default{
		data(){
			const token = localStorage.usertoken
			const decode =  jwtDecode(token)
			return {
				no_rek : decode.no_rek,
				saldoku : '',
				auth : '',
			}
		},
		methods: {
			logout(){
				localStorage.removeItem('usertoken')
				alert('Silahkan log in kembali !')
				router.push('/')
			},
			saldo(){
				axios.get('http://localhost:2020/data/saldo/'+this.no_rek).then(res => {
					this.saldoku = res.data.data[0].saldo
				}).catch ((err) => {
					console.log(err);
				})
			}
		},
		mounted(){
			this.saldo()
			EventBus.$on('logged-in', status => {
				this.auth = status
			})
		}
	}
</script>