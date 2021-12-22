import { shift, invertStringCase, reverseString } from './functions.js'

const template = /*html*/ `
	<div class="postProcessor">
		<h2>PostProcessor</h2>
		<div class="options">
			<label>
				Initial string: 
				<input class="initialText" type="text" v-model="stringInitial" />
			</label>
			<label>
				Shift on: 
				<input type="number" v-model="shiftNumber" />
			</label>
			<label>
				Invert case: 
				<input type="checkbox" v-model="invertCase" />
			</label>
			<label>
				Reverse: 
				<input type="checkbox" v-model="reverse" />
			</label>
		</div>
		<div class="result">
			<div class="label">Result text (changed): </div>
			<div class="resultText">{{stringChanged}}</div>
		</div>
	</div>
`

export default {
	template,
	data() {
		return {
			stringInitial: '1234567890',
			shiftNumber: 0,
			invertCase: false,
			reverse: false,
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
	},
}
