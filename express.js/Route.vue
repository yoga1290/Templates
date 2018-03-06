<template lang="jade">
pre
  div.
    const { ap } = require('../server.js')
    const { {{Capitalise(object.name)}}Service } = require('../services')

  div(v-for="field in object.fields")
    |    app.get('/{{object.name}}', {{Capitalise(object.name)}}Svc.post{{Capitalise(field.name)}} );
    |    app.post('/{{object.name}}', {{Capitalise(object.name)}}Svc.get{{Capitalise(field.name)}} );
    |    app.put('/{{object.name}}', {{Capitalise(object.name)}}Svc.get{{Capitalise(field.name)}} );
    |    app.delete('/{{object.name}}', {{Capitalise(object.name)}}Svc.get{{Capitalise(field.name)}} );

</template>

<script>
import Template from 'Template'
import {fieldDef, objectDef} from './config.json'
export default Template(fieldDef, objectDef)
</script>
