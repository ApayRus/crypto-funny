import DataSet from './DataSet.js'

const template = /*html*/ `
	<div class="rowsTree">
		<div class="triangle-up"></div>
			<div v-for="dataSet in data_sets">
				<data-set :data_set="dataSet" :generated_string="generated_string" />
			</div>
	</div>
	
`

export default {
	template,
	props: {
		data_sets: Array,
		generated_string: String
	},
	components: {
		'data-set': DataSet
	}
}
