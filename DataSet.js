const template = /*html*/ `
<div :class="['dataSet', label]">
	<div class="label">
		{{label}}
	</div>
	<div class="array">
		<div v-for="item in array" class="item">
			{{item}}
			<div class="num">
			 {{occurrences(item)}}
			</div>
		</div>
	</div>
</div>
`

export default {
	template,
	props: {
		data: Object,
		generated_string: String
	},
	computed: {
		array() {
			const { string } = this.data
			return string.split('')
		},
		label() {
			const { name, label } = this.data
			return label || name
		}
	},
	methods: {
		occurrences(item) {
			const str = escape(this.generated_string)
			const match = str.matchAll(escape(item))
			const occ = ([...match] || []).length
			return occ ? occ : ''
		}
	}
}
