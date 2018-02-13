<template lang="jade">
pre.
  const { ap } = require('../server.js')
  const { {{Capitalise(object.name)}}Service } = require('../services')

  app.get('/{{object.name}}', {{Capitalise(object.name)}}Svc.post{{Capitalise(field.name)}} );
  app.post('/{{object.name}}', {{Capitalise(object.name)}}Svc.get{{Capitalise(field.name)}} );
  app.put('/{{object.name}}', {{Capitalise(object.name)}}Svc.get{{Capitalise(field.name)}} );
  app.delete('/{{object.name}}', {{Capitalise(object.name)}}Svc.get{{Capitalise(field.name)}} );

</template>

<script>
import Template from 'Template'
//
// var fieldDef = {
// 	type: {
// 		default: 'String',
// 		select: [ 'Long',
// 							'String',
// 							'Date',
// 							'Boolean'
// 		],
// 		string: true
// 	},
//
// 	isPK: {
// 		default: false,
// 		checkbox: true
// 	}
//
// }

export default Template({}, {})
</script>
