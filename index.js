import VApp from './App.js'

const App = {
	el: 'main',
	components: {
		'v-app': VApp
	},

	mounted() {
		console.log('Application mounted.')
	}
}

window.addEventListener('load', () => {
	new Vue(App)
})
