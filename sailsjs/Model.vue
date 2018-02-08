<template lang="jade">
pre
	div.
		/**
		* Model.js
		*
		* @description :: TODO: You might write a short summary of how this model works and what it represents here.
		* @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
		*/


		module.exports = {
		  tableName: "{{object.name ? object.name.toLowerCase():'myTable'}}",
		  attributes: {
	div(v-for="field in object.fields")
		|  {{field.name}} : {
		|      type: '{{field.type}}'
		div(v-if="field.primaryKey")
			|      primaryKey: true,
		div(v-if="field.unique")
			|      unique: true,
		div(v-if="field.autoIncrement")
			|      autoIncrement: true,
		div(v-if="field.size")
			|      size: {{field.size}},
		| },
	div.
		  },

		// https://sailsjs.com/documentation/concepts/models-and-orm/models#custom-model-methods
		/*
			// Making APIs that support both callbacks and promises
			// RE: https://developer.ibm.com/node/2016/08/24/promises-in-node-js-an-alternative-to-callbacks/

			findBySomething (q, cb) {


				function handle(q, cb) {

					function afterLookup(e, config, cb) {
			      if (e) return cb(e)
			      cb(null, config)
			    }

					if (typeof q === 'object') return afterLookup(null, q)
			    Department.find({q: { like: `%${q}%` }}).exec(afterLookup)
				}

				if (cb) {
					handle(q, cb)
				}

				return new Promise( (resolve, reject) => {
					handle(q, function (err, data) {
					  if (err) return reject(err)
					  resolve(data)
					})
				})
		  }//*/
		};



</template>

<script>
import Template from 'Template'

var fieldDef = {
	type: {
		default: 'string',
		select: [
				// https://sailsjs.com/documentation/concepts/models-and-orm/attributes
			'string',
			'text',
			'integer',
			'float',
			'date',
			'datetime',
			'boolean',
			'binary',
			'array',
			'json',
			'mediumtext',
			'longtext',
			'objectid'
		],
		string: true
	},

	size: {
		default: false,
		string: true
	},

	columnName: {
		default: false,
		default: 'columnName',
		string: true
	},
	'primaryKey': {
		default: false,
		checkbox: true
	},

	'unique': {
		default: false,
		checkbox: true
	},

	'autoIncrement': {
		default: false,
		checkbox: true
	}

}

export default Template(fieldDef, {})
</script>
