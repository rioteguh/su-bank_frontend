<template>
	<div class="container mt-2">
		<div class="row mt-5">
			<div class="col-md-1"></div>
			<div class="col-md-10" style="background-color: white; padding: 10px 10px 10px 10px; box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);">
				<h3 class="text-center">History Transaksi</h3>
				<hr class="my-2">
				<div class="row" style="height:300px; width:100%; overflow-y: auto;">
					<div class="col-1"></div>
					<div class="col-10">
						<table class="table table-hover">
							<thead>
								<tr>
									<th>Tgl Transaksi</th>
									<th>Nominal</th>
									<th>Ket</th>
									<th>Saldo</th>
									<th>View</th>
								</tr>
							</thead>
							<tbody>
								<tr v-for="list in histori">
									<td>{{getHumanDate(list.tgl_transaksi)}}</td>
									<td>{{list.nominal | currency}}</td>
									<td>{{list.status}}</td>
									<td>{{list.saldo | currency}}</td>
									<td>
										<router-link tag="button" :to="{name: 'View', params:{nominal: list.nominal, ket: list.ket, tgl:list.tgl_transaksi, no_rek: list.no_rek, status: list.status}}" class="btn btn-outline-info btn-sm button" title="View"><i class="fa fa-search"></i></router-link>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
					<div class="col-1"></div>
				</div>
				<hr class="my-2">
				<div class="mt-3">
					<router-link to="/dash" style="width:100%;" class="btn btn-outline-secondary" tag="button">Kembali</router-link>
				</div>
			</div>
			<div class="col-md-1"></div>
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
<script>
	import axios from 'axios'
	import moment from 'moment'
	import jwtDecode from 'jwt-decode'
	
	export default{
		data(){
			const token = localStorage.usertoken
			const decode =  jwtDecode(token)
			return{
				no_rek : decode.no_rek,
				// akses : decode.akses,
				histori : []
			}
		},
		mounted(){
			this.list()
		},
		methods:{
			list(){
				axios.get('http://localhost:2020/data/history/'+this.no_rek).then(res => {
					this.histori = res.data.data
				}).catch ((err) => {
					console.log(err);
				})
			},
			getHumanDate(date) {
                return moment(date, 'YYYY-MM-DD HH:mm:ss').format('DD MMM YYYY HH:mm:ss');

            }
		}
	}
</script>