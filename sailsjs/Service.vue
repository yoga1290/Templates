<template lang="jade">
pre
	div.

		declare var sails: any;
		declare var {{object.name.split('').map((c,i)=>{return i==0?c.toUpperCase():c}).join('') }} : any;

		/**
		* findById
		* @param {int} id -
		* @param {Function} cb - Callback function
		* @return {JSON} {{object.name.split('').map((c,i)=>{return i==0?c.toUpperCase():c}).join('') }} data
		*/
		export function findById(id:any, cb: Function):any {
			{{object.name.split('').map((c,i)=>{return i==0?c.toUpperCase():c}).join('') }}.findOne(id).exec(cb)
		}

		/**
		* insert
	div(v-for="field in object.fields")
		|* @param { {{field.type}} } {{field.name}}
	div.
		* @param {Function} cb - Callback function
		* @return {JSON} {{object.name.split('').map((c,i)=>{return i==0?c.toUpperCase():c}).join('') }} data
		*/
		export function insert(
	div(v-for="field in object.fields")
		|		{{field.name}}: {{field.type}},
	div.
			 cb: Function):any {
			{{object.name.split('').map((c,i)=>{return i==0?c.toUpperCase():c}).join('') }}
				.create({
	div(v-for="field in object.fields")
		|	{{field.name}},
	div
		|				}).exec(cb)
		|	}

	div.
		/**
		* update
	div(v-for="field in object.fields")
		|* @param { {{field.type}} } {{field.name}}
	div.
		* @param {Function} cb - Callback function
		* @return {JSON} {{object.name.split('').map((c,i)=>{return i==0?c.toUpperCase():c}).join('') }} data
		*/
		export function update(id:any,
	div(v-for="field in object.fields")
		|		{{field.name}}: {{field.type}},
	div.
			 cb: Function):any {
			{{object.name.split('').map((c,i)=>{return i==0?c.toUpperCase():c}).join('') }}
				.update({ id }, {
	div(v-for="field in object.fields")
		|	{{field.name}},
	div
		|	 		}).exec(cb)
		| }
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
