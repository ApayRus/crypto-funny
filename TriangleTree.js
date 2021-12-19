const template = /*html*/ `
	<div class="triangleTree">
	 <template v-for="row in triangleArray">
	 	<div class="row">
			<template  v-for="item in row">
				<div class="item">
				{{item}}
				<div v-if="num(item)" class="num">
					{{num(item)}}
				</div>
				</div>
				
			</template>
		 </div>
	 </template>
	</div>
`

export default {
	template,
	props: {
		data_sets: Array,
		generated_string: String
	},
	computed: {
		triangleArray() {
			const flatArray = this.data_sets.map(elem => elem.string.split('')).flat()
			const triangleArray = [] // [ [1], [2,3], [4, 5, 6], [7, 8, 9, 10] ]
			let i = 1
			while (flatArray.length) {
				triangleArray.push(flatArray.splice(0, i))
				i++
			}
			return triangleArray
		}
	},
	methods: {
		num(item) {
			return this.generated_string.split('').filter(elem => elem === item)
				.length
		}
	}
}
