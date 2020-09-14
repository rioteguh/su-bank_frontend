<template>
	<div class="container mt-2">
		<div class="row mt-5 mb-5">
			<div class="col-md-2"></div>
			<div class="col-md-8" style="background-color: white; padding: 10px 10px 10px 10px; box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);">
				<h3 class="text-center">History Transaksi</h3>
				<hr class="my-2">
				<div class="row">
					<div class="col-1"></div>
					<div class="col-10">
						<div class="form-group row mt-3">
							<label class="text-info col-3">Rek. Pengirim</label>
							<label class="col-9">: <strong>076xxx</strong></label>
						</div>
						<div class="form-group row mt-3">
							<label class="text-info col-3">Nama Pengirim</label>
							<label class="col-9">: <strong>Otong Jaya</strong></label>
						</div>
						<div class="form-group row mt-3">
							<label class="text-info col-3">Rek. Penerima</label>
							<label class="col-9">: <strong>{{no_rek}}</strong></label>
						</div>
						<div class="form-group row mt-3">
							<label class="text-info col-3">Nominal</label>
							<label class="col-9">: <strong>{{nominal | currency}}</strong></label>
						</div>
						<div class="form-group row mt-3">
							<label class="text-info col-3">Tgl Transaksi</label>
							<label class="col-9">: <strong>{{getHumanDate(tgl)}}</strong></label>
						</div>
						<div class="form-group row mt-3">
							<label class="text-info col-3">Keterangan</label>
							<label class="col-9">: <strong>{{status}}</strong></label>
						</div>
						<hr class="my-2">
						<div class="mt-3">
							<router-link to="/history" style="width:100%;" class="btn btn-outline-secondary" tag="button">Kembali</router-link>
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
	import moment from 'moment'
	export default{
		data(){
			return {
				no_rek: this.$route.params.no_rek,
				rek_tujuan:'',
				nominal: this.$route.params.nominal,
				status: this.$route.params.status,
				tgl: this.$route.params.tgl,
			}
		},
		methods:{
			getHumanDate(date) {
                return moment(date, 'YYYY-MM-DD HH:mm:ss').format('DD MMM YYYY HH:mm:ss');

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