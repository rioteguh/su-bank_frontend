<template>
	<div class="container mt-2">
		<div class="row mt-5 mb-5">
			<div class="col-md-2"></div>
			<div class="col-md-8" style="background-color: white; padding: 10px 10px 10px 10px; box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);">
				<h3 class="text-center">Profile Nasabah</h3>
				<hr class="my-2">
				<div class="row">
					<div class="col-1"></div>
					<div class="col-10">
						<div class="form-group row mt-3">
							<label class="text-info col-3">No. Rekening</label>
							<label class="col-9">: <strong>{{no_rek}}</strong></label>
						</div>
						<div class="form-group row mt-3">
							<label class="text-info col-3">Saldo Utama</label>
							<label class="col-9">: <strong>{{saldoku | currency}}</strong></label>
						</div>
						<div class="form-group row mt-3">
							<label class="text-info col-3">Nama User</label>
							<label class="col-9">: <strong>{{riwayat.nama}}</strong></label>
						</div>
						<div class="form-group row mt-3">
							<label class="text-info col-3">Tempat, Tgl Lahir</label>
							<label class="col-9">: <strong>{{riwayat.lahir}}, {{getHumanDate(riwayat.tgl_lahir)}}</strong></label>
						</div>
						<div class="form-group row mt-3">
							<label class="text-info col-3">Alamat</label>
							<label class="col-9">: <strong>{{riwayat.alamat}}</strong></label>
						</div>
						<hr class="my-2">
						<div class="mt-3">
							<router-link to="/dash" style="width:100%;" class="btn btn-outline-secondary button" tag="button">Kembali</router-link>
						</div>
					</div>
					<div class="col-1"></div>
				</div>
			</div>
			<div class="col-md-3"></div>
		</div>
	</div>
</template>
<script>
	import axios from 'axios'
	import jwtDecode from 'jwt-decode'
	import moment from 'moment'
	export default{
		data(){
			const token = localStorage.usertoken
			const decode =  jwtDecode(token)
			return {
				no_rek: decode.no_rek,
				saldoku : '',
				riwayat:[]
			}
		},
		methods:{
			profile(){
				axios.get('http://localhost:2020/data/profil/'+this.no_rek).then(res => {
					this.riwayat = res.data.data[0]
				}).catch ((err) => {
					console.log(err);
				})
			},
			saldo(){
				axios.get('http://localhost:2020/data/saldo/'+this.no_rek).then(res => {
					this.saldoku = res.data.data[0].saldo
				}).catch ((err) => {
					console.log(err);
				})
			},
			getHumanDate(date) {
                return moment(date, 'YYYY-MM-DD HH:mm:ss').format('DD MMM YYYY');

            }
		},
		mounted(){
			this.saldo()
			this.profile()
		}
	}
</script>
<style>
	.button {
		box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24),0 17px 50px 0 rgba(0,0,0,0.19);
	}
	.button2:hover {
		box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24),0 17px 50px 0 rgba(0,0,0,0.19);
	}
</style>