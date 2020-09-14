<template>
	<div>
		<center class="mt-3">
			<h2 class="text-info display-4" style="text-transform:uppercase;"><i class="fa fa-dollar"></i>u-bank</h2>
			<span class="text-info" style="font-style: italic;">solve the problem without a solution</span>
		</center>
		<div style="height:530px; width:100%; overflow-y: auto;">
			<router-view/>
		</div>
	</div>
</template>

<script>
export default {
	name: 'App'
}
</script>