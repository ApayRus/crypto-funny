import { triangleArray } from './functions.js'

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
		global: Object
	},
	computed: {
		triangleArray() {
			const flatArray = this.global.dataSets.map(elem => elem.string.split('')).flat()
			return triangleArray(flatArray)
		}
	},
	methods: {
		num(item) {
			return this.global.generatedString.split('').filter(elem => elem === item).length
		}
	}
}
