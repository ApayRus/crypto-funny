const template = /*html*/ `
	<div class="proportion">
		<label :for="data.name" >
			{{label}}
		</label>
		<input :id="data.name" min="0" max="10" type="range" v-model="data.share" orient="vertical" />
	</div>
`

export default {
	template,
	props: {
		data: Object
	},
	computed: {
		label() {
			const { label, name } = this.data
			return label || name
		}
	}
}
