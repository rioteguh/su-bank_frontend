// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueCurrencyFilter from 'vue-currency-filter'
// require("../style/css/bootstrap.min.css")
// require("../style/font-awesome/css/font-awesome.css")
// require("../style/css/plugins/iCheck/custom.css")
// require("../style/css/animate.css")
// require("../style/css/style.css")
// require("../style/css/plugins/awesome-bootstrap-checkbox/awesome-bootstrap-checkbox.css")

// require("../style/js/jquery-3.1.1.min.js")
// require("../style/js/popper.min.js")
// require("../style/js/bootstrap.js")
// require("../style/js/plugins/metisMenu/jquery.metisMenu.js")
// require("../style/js/plugins/slimscroll/jquery.slimscroll.min.js")
// require("../style/js/inspinia.js")
// require("../style/js/plugins/pace/pace.min.js")
// require("../style/js/plugins/iCheck/icheck.min.js")

require('../node_modules/bootstrap/dist/css/bootstrap.css')
require('../node_modules/font-awesome/css/font-awesome.css')
require('../node_modules/bootstrap/dist/js/bootstrap.min.js')

Vue.config.productionTip = false

Vue.use(VueCurrencyFilter,
{
	symbol : 'Rp.',
	thousandsSeparator: '.',
	fractionCount: 0,
	fractionSeparator: ',',
	symbolPosition: 'front',
	symbolSpacing: true
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
