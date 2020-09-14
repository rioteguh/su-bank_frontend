<template>
	<div class="container mt-2">
		<div class="row mt-5 mb-5">
			<div class="col-md-2"></div>
			<div class="col-md-8" style="background-color: white; padding: 10px 10px 10px 10px; box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);">
				<h3 class="text-center">Transfer Uang</h3>
				<hr class="my-2">
				<div class="row">
					<div class="col-1"></div>
					<div class="col-10">
						<div class="form-group row mt-3">
							<label class="text-info col-4"><strong>No. Rekening</strong></label>
							<input type="text" class="form-control col-8" v-model="no_rek" placeholder="076xxx" readonly/>
						</div>
						<div class="form-group row mt-3">
							<label class="text-info col-4"><strong>No. Rekening Tujuan</strong></label>
							<input type="text" class="form-control col-8" v-model="rek_tujuan" placeholder="076xxx"/>
						</div>
						<div class="form-group row mt-3">
							<label class="text-info col-4"><strong>Nominal</strong></label>
							<input type="text" class="form-control col-8" v-model="nominal" placeholder="Rp."/>
						</div>
						<div class="form-group row mt-3">
							<label class="text-info col-4"><strong>Keterangan</strong></label>
							<textarea class="form-control col-8" rows="3" v-model="ket"></textarea>
						</div>
						<hr/>
						<div class="row mt-3 mb-2">
							<div class="col-6">
								<button style="width:100%;" class="btn btn-outline-info button" v-on:click="pengirim">Lanjut</button>
							</div>
							<div class="col-6">
								<router-link to="/dash" style="width:100%;" class="btn btn-outline-secondary button" tag="button">Kembali</router-link>
							</div>
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
	import router from '../../router'
	export default{
		data(){
			const token = localStorage.usertoken
			const decode =  jwtDecode(token)
			return {
				no_rek: decode.no_rek,
				nama_pengirim: decode.nama,
				nama_penerima: '',
				rek_tujuan:'',
				nominal:'',
				ket:''
			}
		},
		methods:{
			pengirim(){
				if(this.rek_tujuan != ''){
					if(this.rek_tujuan != this.no_rek){
						if(this.nominal != '' && this.nominal >= 30000){
							axios.get('http://localhost:2020/data/profil/'+this.rek_tujuan).then(res => {
								router.push({name: 'Verify', params:{no_rek: this.no_rek, rek_tujuan: this.rek_tujuan, nominal: this.nominal, ket: this.ket, pengirim: this.nama_pengirim, penerima: res.data.data[0].nama}})
							}).catch ((err) => {
								alert('No. Rekening yang dituju tidak terdaftar !')
							})
						}else{
							alert('Mohon diisi nominal uang minimal Rp. 30.000,- !')
						}
					}else{
						alert('Tidak bisa transfer ke Rekening sendiri !')
					}
				}else{
					alert('Kolom No. Rekening yang dituju kosong !')
				}
			}
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