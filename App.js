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

export default {
	template: document.querySelector('#app'),
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
