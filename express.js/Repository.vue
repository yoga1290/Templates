<template lang="jade">
pre
  div.
    const DatabaseHelper = require('./DatabaseHelper.js')
    const logger = require('../logger')
    let log = logger('{{Capitalise(object.name)}}Repository')

    module.exports = {

  div(v-for="field in object.fields")
    |	findBy{{Capitalise(field.name)}}({{field.name}}) {
    |		log('findBy{{Capitalise(field.name)}}', {{field.name}})
    |		return DatabaseHelper("SELECT * FROM {{object.name}} WHERE {{field.name}} = $1 LIMIT 1", [{{field.name}}]);
    |	},
  div.
    	save({{object.fields.map((f)=>{ return f.name}).join(', ')}}) {
    		log('save', {{object.fields.map((f)=>{ return f.name}).join(', ')}})
    		return DatabaseHelper("INSERT INTO {{object.name}}(name, coins, logintoken) VALUES({{object.fields.map((f, i)=>{ return '$' + i}).join(', ')}})", [{{object.fields.map((f)=>{ return f.name}).join(', ')}}]);
    	}

    }
</template>
<script>
import Template from 'Template'
import {fieldDef, objectDef} from './config.json'
export default Template(fieldDef, objectDef)
</script>
