<template>
	<div class="container mt-2">
		<div class="row mt-3 mb-5">
			<div class="col-md-2"></div>
			<div class="col-md-8" style="background-color: white; padding: 10px 10px 10px 10px; box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);">
				<h3 class="text-center"><i class="fa fa-check-circle text-success"></i> Transaksi Berhasil <i class="fa fa-check-circle text-success"></i></h3>
				<hr class="my-2">
				<div class="row">
					<div class="col-1"></div>
					<div class="col-10">
						<div class="form-group row">
							<label class="text-info col-4"><strong>No. Rekening Pengirim</strong></label>
							<label class="col-8"><strong class="text-info">:</strong> <strong>{{no_rek}}</strong></label>
						</div>
						<div class="form-group row">
							<label class="text-info col-4"><strong>Nama Pengirim</strong></label>
							<label class="col-8"><strong class="text-info">:</strong> <strong>{{pengirim}}</strong></label>
						</div>
						<div class="form-group row">
							<label class="text-info col-4"><strong>No. Rekening Penerima</strong></label>
							<label class="col-8"><strong class="text-info">:</strong> <strong>{{rek_tujuan}}</strong></label>
						</div>
						<div class="form-group row">
							<label class="text-info col-4"><strong>Nama Penerima</strong></label>
							<label class="col-8"><strong class="text-info">:</strong> <strong>{{penerima}}</strong></label>
						</div>
						<div class="form-group row">
							<label class="text-info col-4"><strong>Nominal</strong></label>
							<label class="col-8"><strong class="text-info">:</strong> <strong>{{nominal | currency}}</strong></label>
						</div>
						<div class="form-group row">
							<label class="text-info col-4"><strong>Keterangan</strong></label>
							<label class="col-8"><strong class="text-info">:</strong> <strong>{{ket}}</strong></label>
						</div>
						<hr/>
						<div class="row mb-2">
							<div class="col-3"></div>
							<div class="col-6">
								<router-link to="/dash" style="width:100%;" class="btn btn-outline-secondary button" tag="button">Kembali ke Menu Utama</router-link>
							</div>
							<div class="col-3"></div>
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
	export default{
		data(){
			return {
				no_rek: this.$route.params.no_rek,
				rek_tujuan: this.$route.params.rek_tujuan,
				pengirim: this.$route.params.pengirim,
				penerima: this.$route.params.penerima,
				nominal: this.$route.params.nominal,
				ket: this.$route.params.ket,
				password:''
			}
		},methods:{
			transfer(){
				if(this.password !=''){
					alert('Transfer Berhasil !')
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