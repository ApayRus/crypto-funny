const template = /*html*/ `
<div :class="['dataSet', data_set.name]">
	<div class="label">
		{{label}}
	</div>
	<div class="array">
		<template v-for="item in dataSetArray">
			<div class="item">
				{{item}}
			<div v-if="num(item)" class="num">
				{{num(item)}}
			</div>
			
			</div>
		</template>
	</div>
</div>
`

export default {
	template,
	props: {
		data_set: Object,
		generated_string: String
	},
	computed: {
		dataSetArray() {
			const { string } = this.data_set
			return string.split('')
		},
		generatedArray() {
			return this.generated_string.split('')
		},
		label() {
			const { name, label } = this.data_set
			return label || name
		}
	},
	methods: {
		num(item) {
			return this.generatedArray.filter(elem => elem === item).length
		}
	}
}
