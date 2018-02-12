<template lang="jade">
pre
	div.
		import util = require('util');
		import express = require('express');

		declare var sails: any;
		declare var {{object.name.split('').map((c,i)=>{return i==0?c.toUpperCase():c}).join('') }}Service : any;


		/**
		* get{{object.name.split('').map((c,i)=>{return i==0?c.toUpperCase():c}).join('') }}
		* @param {express.Request} req - express.Request
		* @param {express.Response} res - express.Response
		* @return {None} nada
		*/
		export function get{{object.name.split('').map((c,i)=>{return i==0?c.toUpperCase():c}).join('') }}(req:any, res:any, next: Function):any {
			console.log('get() from TsController.ts');
			res.status(200).send('Hello from Typescript!');
		}

		/**
		* post{{object.name.split('').map((c,i)=>{return i==0?c.toUpperCase():c}).join('') }}
		* @param {express.Request} req - express.Request
		* @param {express.Response} res - express.Response
		* @return {JSON} {{object.name}} data
		*/
		export function post{{object.name.split('').map((c,i)=>{return i==0?c.toUpperCase():c}).join('') }}(req:any, res:any, next: Function):any {
			{{object.name.split('').map((c,i)=>{return i==0?c.toUpperCase():c}).join('') }}Service.insert({
	div(v-for="field in object.fields")
		| {{field.name}}: req.body.{{field.name}},
	div
		|			}, (e, r) => {
		|			})
		|}

		/**
		* put{{object.name.split('').map((c,i)=>{return i==0?c.toUpperCase():c}).join('') }}
		* @param {express.Request} req - express.Request
		* @param {express.Response} res - express.Response
		* @return {JSON} {{object.name}} data
		*/
		export function put{{object.name.split('').map((c,i)=>{return i==0?c.toUpperCase():c}).join('') }}(req:any, res:any, next: Function):any {
			{{object.name.split('').map((c,i)=>{return i==0?c.toUpperCase():c}).join('') }}Service.update({
	div(v-for="field in object.fields")
		| {{field.name}}: req.body.{{field.name}},
	div
		|			}, (e, r) => {
		|			})
		|}
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
