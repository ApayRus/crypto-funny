import {
	shift,
	invertStringCase,
	reverseString,
	sample,
	shuffle
} from './functions.js'
import dataSets from './dataSets.js'
import DataSet from './DataSet.js'
import Proportion from './Proportion.js'

const template = /*html*/ `
	<div id="app">
		<div>
			<hr>
			<div class="generator">
				<h2>Password Generator</h2>
				<div class="length">
					<label>length
						<input id="length" min="4" type="number" v-model="length" />
					</label>
				</div>
				<div class="proportions">
					<template v-for="dataSet in dataSets">
						<generator-proportion :data="dataSet" />
					</template>
				</div>
				<div class="result"> 
					<div class="resultText">{{generatedString}}</div>
				</div>
			</div>
			<hr>
			<div class="occurrences">
			<h2>Occurrences</h2>
			<div class="dataSets">
			<div class="triangle-up"></div>
				<div v-for="dataSet in dataSets">
					<data-set :data_set="dataSet" :generated_string="generatedString" />
				</div>
			</div>
			</div>
			<hr>
			<div class="postProcessing">
				<h2>Post processing</h2>
				<label>
					Initial string: <input class="initialText" type="text" v-model="stringInitial" />
				</label>
				<div class="help">You can change it manually</div>
				<label>
					Shift on: <input type="number" v-model="shiftNumber" />
				</label>
				<label>
					Invert case: <input type="checkbox" v-model="invertCase" />
				</label>
				<label>
					Reverse: <input type="checkbox" v-model="reverse" />
				</label>
				<label>
					Result text (changed): <div class="resultText">{{stringChanged}}</div>
				</label>
			</div>
		</div>
	</div>
`

export default {
	template,
	created() {},
	data() {
		return {
			length: 16,
			stringInitial: 'abcdefg',
			shiftNumber: 0,
			invertCase: false,
			reverse: false,
			dataSets
		}
	},
	computed: {
		stringChanged() {
			const { stringInitial, shiftNumber, invertCase, reverse } = this
			let result = shift(stringInitial, shiftNumber)
			if (invertCase) {
				result = invertStringCase(result)
			}
			if (reverse) {
				result = reverseString(result)
			}
			return result
		},
		proportionsString() {
			return JSON.stringify(this.dataSets, null, '\t')
		},
		totalProportions() {
			return this.dataSets.reduce((prev, item) => +prev + +item.share, 0)
		},
		dataSetLength() {
			return this.dataSets.reduce((prev, item) => {
				if (this.totalProportions === 0) {
					return {
						...prev,
						[item.name]: { ceil: 0, exact: 0 }
					}
				} else {
					const proportionsRelative = +item.share / this.totalProportions
					const dataSetLength = this.length * proportionsRelative
					return {
						...prev,
						[item.name]: {
							ceil: Math.ceil(dataSetLength),
							exact: dataSetLength
						}
					}
				}
			}, {})
		},
		countedSymbolsTotal() {},
		generatedString() {
			let result = this.dataSets.reduce((prev, item) => {
				const { string, name } = item
				const { ceil: count } = this.dataSetLength[name]
				const array = string.split('')
				const result = sample(array, count)
				return [...prev, ...result]
				// now we have array with extra elements
			}, [])

			return shuffle(result).slice(0, this.length).join('')
		}
	},
	methods: {},
	components: {
		'data-set': DataSet,
		'generator-proportion': Proportion
	},
	mounted() {}
}
