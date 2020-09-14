<template>
	<div class="container mt-2">
		<div class="row mt-4">
			<div class="col-md-1"></div>
			<div class="col-md-10" style="background-color: white; padding: 10px 10px 10px 10px; box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);">
				<h3 class="text-center">Registrasi Nasabah</h3>
				<hr class="my-2">
				<form v-on:submit.prevent ="register">
					<div class="row">
						<div class="col-1"></div>
						<div class="col-10">
							<div class="row">
								<div class="col-6">
									<div class="form-group">
										<label class="text-info"><strong>No. Rekening</strong></label>
										<input type="text" class="form-control" v-model="no_rek" placeholder="076xxx"/>
									</div>
									<div class="form-group">
										<label class="text-info"><strong>Nama Lengkap</strong></label>
										<input type="text" class="form-control" v-model="nama" placeholder="Nama Lengkap" onkeyup="var start = this.selectionStart; var end = this.selectionEnd; this.value = this.value.toUpperCase(); this.setSelectionRange(start, end);"/>
									</div>
									<div class="form-group">
										<label class="text-info"><strong>Tempat, Tgl Lahir</strong></label>
										<div class="row">
											<div class="col-1"></div>
											<input type="text" class="form-control col-4" v-model="tempat_lahir" placeholder="Tempat" onkeyup="var start = this.selectionStart; var end = this.selectionEnd; this.value = this.value.toUpperCase(); this.setSelectionRange(start, end);"/>
											<input type="date" class="form-control col-6" v-model="tgl_lahir" placeholder="Tgl Lahir"/>
											<div class="col-1"></div>
										</div>
									</div>
								</div>
								<div class="col-6">
									<div class="form-group">
										<label class="text-info"><strong>ID User</strong></label>
										<input type="text" class="form-control" v-model="id_user" placeholder="Kode Verify"/>
									</div>
									<div class="form-group">
										<label class="text-info"><strong>PIN</strong></label>
										<input type="password" class="form-control" v-model="password" placeholder="Password"/>
									</div>
									<div class="form-group">
										<label class="text-info"><strong>Konfirmasi PIN</strong></label>
										<input type="password" class="form-control" v-model="konf_password" placeholder="Konfirmasi Password"/>
										<div v-if="konf_password != ''">
											<span class="text-success" v-if="konf_password == password">PIN sesuai</span>
											<span class="text-danger" v-else>PIN tidak sesuai</span>
										</div>
										<div v-else></div>
									</div>
								</div>
							</div>
							<div class="form-group">
								<label class="text-info"><strong>Alamat</strong></label>
								<textarea class="form-control" rows="2" v-model="alamat" onkeyup="var start = this.selectionStart; var end = this.selectionEnd; this.value = this.value.toUpperCase(); this.setSelectionRange(start, end);"></textarea>
							</div>
						</div>
						<div class="col-1"></div>
					</div>
					<hr class="my-2">
					<div class="row mt-3">
						<div class="col-6">
							<button style="width:100%;" class="btn btn-outline-info button" type="submit">Simpan</button>
						</div>
						<div class="col-6">
							<router-link to="/" style="width:100%;" class="btn btn-outline-secondary button" tag="button">Kembali</router-link>
						</div>
					</div>
				</form>
			</div>
			<div class="col-md-1"></div>
		</div>
	</div>
</template>
<script>
	import axios from 'axios'
	import router from '../router'
	export default{
		data(){
			return {
				no_rek:'',
				nama:'',
				password:'',
				id_user:'',
				konf_password:'',
				tempat_lahir:'',
				tgl_lahir:'',
				alamat:'',
				status:'',
				status2:''
			}
		},
		methods:{
			register(){
				if(this.no_rek !='' && this.nama !='' && this.password !='' && this.id_user !='' && this.tempat_lahir !='' && this.tgl_lahir !='' && this.alamat !=''){
					if(this.konf_password == this.password)
					{
						axios.post('http://localhost:2020/users/register',{
							no_rek : this.no_rek,
							nama : this.nama,
							password : this.password,
							id_user : this.id_user
						}).then(res => {
							this.status = res.data.status
							if(this.status == 'Terdaftar'){
								alert('Akun dengan No. Rekening '+this.no_rek+' sudah terdaftar !')
								this.nama =''
								this.no_rek =''
								this.password =''
								this.konf_password =''
								this.tgl_lahir =''
								this.tempat_lahir =''
								this.id_user =''
							}else{
								axios.post('http://localhost:2020/admin/nasabah',{
									no_rek : this.no_rek,
									nama : this.nama,
									tempat_lahir : this.tempat_lahir,
									tgl_lahir : this.tgl_lahir,
									alamat : this.alamat
								}).then(res => {
									this.status2 = res.data.status
									if(this.status2 == 'Terdaftar'){
										alert('Akun dengan No. Rekening '+this.no_rek+' sudah terdaftar !')
										this.nama =''
										this.no_rek =''
										this.password =''
										this.konf_password =''
										this.tgl_lahir =''
										this.tempat_lahir =''
										this.id_user =''
									}else{
										axios.post('http://localhost:2020/data/buka_rekening',{
											no_rek : this.no_rek,
										}).then(res => {
											alert('Register Berhasil !')
											this.nama =''
											this.no_rek =''
											this.password =''
											this.konf_password =''
											this.tgl_lahir =''
											this.tempat_lahir =''
											this.id_user =''
											router.push({name : 'Login'})											
										}).catch(err => {
											console.log(err)
											console.log('Terjadi kesalahan server saat transaksi buka akun !')
											alert('Terjadi kesalahan server saat transaksi buka akun !')
										})
									}
								}).catch(err => {
									console.log(err)
									console.log('Terjadi kesalahan server saat penambahan data nasabah !')
									alert('Terjadi kesalahan server saat penambahan data nasabah !')
								})
							}
						}).catch(err => {
							console.log(err)
							console.log('Terjadi kesalahan server saat daftar akun !')
							alert('Terjadi kesalahan server saat daftar akun !')
						})
					}else{
						alert('Register gagal, mohon masukan konfirmasi dengan benar !')
					}
				}else{
					alert('Mohon untuk melengkapi data !')
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