import { sample, shuffle } from './functions.js'

const template = /*html*/ `
	<div class="generator">
		<h2>Generator Params</h2>
		<div class="length">
			<label>length
				<input id="length" min="0" type="number" v-model="global.length" />
			</label>
		</div>
		<div class="proportions">
			<template v-for="dataSet in global.dataSets">
				<div class="proportion">
					<label :for="dataSet.name" >
						{{label(dataSet)}}
					</label>
					<input :id="dataSet.name" min="0" max="10" type="range" v-model="dataSet.share" orient="vertical" />
				</div>
			</template>
		</div>
		<div class="result">
			<div class="resultText">{{generatedString}}</div>
		</div>
	</div>
`

export default {
	template,
	props: {
		global: Object
	},
	computed: {
		totalProportions() {
			return this.global.dataSets.reduce((prev, item) => +prev + +item.share, 0)
		},
		dataSetLength() {
			return this.global.dataSets.reduce((prev, item) => {
				const proportionsRelative = +item.share / (this.totalProportions || Infinity)
				const dataSetLength = this.global.length * proportionsRelative
				return {
					...prev,
					[item.name]: {
						ceil: Math.ceil(dataSetLength),
						exact: dataSetLength
					}
				}
			}, {})
		},
		generatedString() {
			let result = this.global.dataSets.reduce((prev, item) => {
				const { string, name } = item
				const { ceil: count } = this.dataSetLength[name]
				const array = string.split('')
				const result = sample(array, count)
				return [...prev, ...result]
				// now we have array with extra elements
			}, [])
			result = shuffle(result).slice(0, this.global.length).join('')
			this.global.generatedString = result
			return result
		}
	},
	methods: {
		label(dataSet) {
			const { label, name } = dataSet
			return label || name
		}
	}
}
