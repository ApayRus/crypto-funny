import PostProcessor from './PostProcessor.js'
import TriangleTree from './TriangleTree.js'
import PasswordGenerator from './PasswordGenerator.js'

const template = /*html*/ `
<div id="app">
  <div>
    <hr>
    <div class="generatorAndOccurrences">
      <password-generator  :global="global"  /> 
      <div class="occurrences">
        <h2>Occurrences</h2>
          <triangle-tree  :global="global" />
      </div>
    </div>
    <hr>
    <post-processor />
  </div>
</div>
`

export default {
	template,
	created() {},
	data() {
		return {
			global: {
				generatedString: '',
				dataSets: [
					{ name: 'numbers', string: '1234567890', share: 5 },
					{ name: 'lowerCase', string: 'abcdefghijklmnopqrstuvwxyz', share: 5 },
					{ name: 'upperCase', string: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', share: 5 },
					{ name: 'symbols', string: `~!@#$%^&()_-={[}]|:;"'<,>?/\\\`*+`, share: 5,},
				],
				length: 16,
			},
		}
	},
	components: {
		'triangle-tree': TriangleTree,
		'password-generator': PasswordGenerator,
		'post-processor': PostProcessor,
	},
	mounted() {},
}
