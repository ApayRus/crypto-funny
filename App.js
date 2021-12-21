import {
  shift,
  invertStringCase,
  reverseString,
  sample,
  shuffle,
} from './functions.js'
import dataSets from './dataSets.js'
import postProcessor from './postProcessor.js'
import TriangleTree from './TriangleTree.js'
import Proportion from './Proportion.js'

const template = /*html*/ `
	<div id="app">
		<div>
			<hr>
			<div class="generatorAndTree">
				<div class="generator">
					<h2>Generator Params</h2>
					<div class="length">
						<label>length
							<input id="length" min="0" type="number" v-model="length" />
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
			<div class="occurrences">
				<h2>Occurrences</h2>
				<!-- <rows-tree :data_sets="dataSets" :generated_string="generatedString" /> --> 
				<triangle-tree :data_sets="dataSets" :generated_string="generatedString" />
			</div>
			</div>
			
			<hr>
			<div class="postProcessor">
				<h2>PostProcessor</h2>
				<div class="options">
					<template v-for="option in postProcessor">
						<label>
							{{option.label}}
							<input 
								:class="option.vModel" 
								:type="option.type" 
								v-model="option.vModel" 
							/>
							{{option.vModel}}
						</label>
					</template>
				</div>
				<div class="result">
					<div class="label">Result text (changed): </div>
					<div class="resultText">{{stringChanged}}</div>
				</div>
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
      stringInitial: '1234567890',
      shiftNumber: 0,
      invertCase: false,
      reverse: false,
      dataSets,
      postProcessor,
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
    totalProportions() {
      return this.dataSets.reduce((prev, item) => +prev + +item.share, 0)
    },
    dataSetLength() {
      return this.dataSets.reduce((prev, item) => {
        const proportionsRelative =
          +item.share / (this.totalProportions || Infinity)
        const dataSetLength = this.length * proportionsRelative
        return {
          ...prev,
          [item.name]: {
            ceil: Math.ceil(dataSetLength),
            exact: dataSetLength,
          },
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
    },
  },
  methods: {},
  components: {
    'triangle-tree': TriangleTree,
    'generator-proportion': Proportion,
  },
  mounted() {},
}
