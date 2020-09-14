<template>
	<div class="container mt-2">
		<div class="row mt-3 mb-5">
			<div class="col-md-2"></div>
			<div class="col-md-8" style="background-color: white; padding: 10px 10px 10px 10px; box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);">
				<h3 class="text-center">Verifikasi Transaksi</h3>
				<hr class="my-2">
				<div class="row">
					<div class="col-1"></div>
					<div class="col-10">
						<div class="form-group row">
							<label class="text-info col-4"><strong>No. Rekening Pengirim</strong></label>
							<label class="text-info col-8">: <strong>{{no_rek}}</strong></label>
						</div>
						<div class="form-group row">
							<label class="text-info col-4"><strong>Nama Pengirim</strong></label>
							<label class="text-info col-8">: <strong>{{pengirim}}</strong></label>
						</div>
						<div class="form-group row">
							<label class="text-info col-4"><strong>No. Rekening Penerima</strong></label>
							<label class="text-info col-8">: <strong>{{rek_tujuan}}</strong></label>
						</div>
						<div class="form-group row">
							<label class="text-info col-4"><strong>Nama Penerima</strong></label>
							<label class="text-info col-8">: <strong>{{penerima}}</strong></label>
						</div>
						<div class="form-group row">
							<label class="text-info col-4"><strong>Nominal</strong></label>
							<label class="text-info col-8">: <strong>{{nominal | currency}}</strong></label>
						</div>
						<div class="form-group row">
							<label class="text-info col-4"><strong>Keterangan</strong></label>
							<label class="text-info col-8">: <strong>{{ket}}</strong></label>
						</div>
						<hr/>
						<div class="form-group row">
							<label class="text-info col-4"><strong>PIN</strong></label>
							<input type="password" class="form-control col-8" v-model="password">
						</div>
						<div class="row mb-2">
							<div class="col-6">
								<button style="width:100%;" class="btn btn-outline-info button" title="Kirim" v-on:click="transfer">Kirim</button>
							</div>
							<div class="col-6">
								<router-link to="/transaksi" style="width:100%;" class="btn btn-outline-secondary button" tag="button">Kembali</router-link>
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
	import router from '../../router'
	export default{
		data(){
			return {
				no_rek: this.$route.params.no_rek,
				rek_tujuan: this.$route.params.rek_tujuan,
				pengirim: this.$route.params.pengirim,
				penerima: this.$route.params.penerima,
				nominal: this.$route.params.nominal,
				ket: this.$route.params.ket,
				saldoku:'',
				saldoku2:'',
				sisa_saldo:'',
				saldo_tambah:'',
				password:''
			}
		},methods:{
			transfer(){
				if(this.password !=''){
					axios.post('http://localhost:2020/users/verifikasi',{
						no_rek : this.no_rek,
						password : this.password
					}).then(res => {
						let akses = res.data.kondisi
						if (akses == 'Berhasil'){
							axios.get('http://localhost:2020/data/saldo/'+this.no_rek).then(res => {
								this.saldoku = res.data.data[0].saldo
								this.sisa_saldo = this.saldoku - this.nominal
								console.log(this.sisa_saldo)
								if(this.sisa_saldo <= 30000){
									alert('Saldo tidak mencukupi !')
								}else{
									axios.post('http://localhost:2020/data/transfer/',{
										no_rek : this.no_rek,
										rek_tujuan : this.rek_tujuan,
										nominal : this.nominal,
										ket : this.ket,
										sisa_saldo : this.sisa_saldo
									}).then(res => {
										alert('Transfer ke '+this.penerima+' Berhasil !')
										axios.get('http://localhost:2020/data/saldo/'+this.rek_tujuan).then(res => {
										this.saldoku2 = res.data.data[0].saldo
										this.saldo_tambah = this.saldoku2 + this.nominal
										axios.post('http://localhost:2020/data/trans_masuk/',{
											no_rek : this.no_rek,
											rek_tujuan : this.rek_tujuan,
											nominal : this.nominal,
											ket : this.ket,
											saldo_tambah : this.saldo_tambah
										}).then(res => {
											alert('Transfer telah sampai ke '+this.penerima+' !')
											router.push({name:'Sukses', params:{no_rek:this.no_rek, rek_tujuan:this.rek_tujuan, pengirim:this.pengirim, penerima:this.penerima, nominal:this.nominal, ket:this.ket}})
										}).catch ((err) => {
											console.log(err)
											console.log('Terjadi kesalahan server saat penerimaan transfer dari pengirim !')
											alert('Terjadi kesalahan server saat penerimaan transfer dari pengirim !')
										})
									}).catch ((err) => {
										console.log(err)
										console.log('Terjadi kesalahan server saat pengecekan saldo penerima !')
										alert('Terjadi kesalahan server saat pengecekan saldo penerima !')
									})
									}).catch ((err) => {
										console.log(err)
										console.log('Terjadi kesalahan server saat melakukan transfer pengirim !')
										alert('Terjadi kesalahan server saat melakukan transfer pengirim !')
									})
								}
							}).catch ((err) => {
								console.log(err)
								console.log('Terjadi kesalahan server saat pengecekan saldo pengirim !')
								alert('Terjadi kesalahan server saat pengecekan saldo pengirim !')
							})
							
							//alert('Transfer Berhasil !')
						}else{
							alert('PIN yang anda masukan salah !')
						}
					}).catch(err => {
						alert('Terjadi kesalahan server saat verifikasi !')
						console.log(err)
						console.log('Terjadi kesalahan server saat verifikasi !')
						router.push('/dash')
					})
				}else{
					alert('Masukan PIN terlebih dahulu !')
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