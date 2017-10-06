export default (fieldDef, objectDef) => {

  return {
  	data () {
  		return {}
  	},

  	methods: {
  		Capitalise (string) {
  			return (string!==undefined) ? string.charAt(0).toUpperCase() + string.slice(1):'';
  		},

  		lower (string) {
  			return (string!==undefined) ? string.toLowerCase():'';
  		}
  	},

  	created () {
  		this.registerNewFieldDef(fieldDef)
  		// registerNewObjectDef(objectDef)
  	},

  	components: {

  	},

  	props: {
  		object: {
        type: Object,
        default () {
          return {
  					name:'ObjectName',
  					fields:[
  						{
  							name:'fieldName',
  							type:'String'
  						}
  					]
  				}
        }
  		},

  		registerNewFieldDef: {
        type: Function,
        default (fieldDef) {
          return {}
        }
  		},

  		registerNewObjectDef: {
        type: Function,
        default (objectDef) {
          return {}
        }
  		}

  	}
  }
}
