export default (components) => {
  return {

  	components,

  	props: {
      selectedTab: {
        type: Number,
        default () {
          return -1
        }
      },
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
