<template lang="jade">
pre
	div.
		import util = require('util');
		import express = require('express');

		declare var sails: any;

		export function index(req:any, res:any, next: Function):any {
		console.log('index() from TsController.ts');
			res.status(200).send('Hello from Typescript!');
		}

		/**
		* get{{object.name.split('').map((c,i)=>{return i==0?c.toUpperCase():c}).join('') }}
		* @param {express.Request} req - The string containing two comma-separated numbers.
		* @param {express.Response} res - The string containing two comma-separated numbers.
		* @return {Point} A Point object.
		*/
		export function get{{object.name.split('').map((c,i)=>{return i==0?c.toUpperCase():c}).join('') }}(req:any, res:any, next: Function):any {
			console.log('get() from TsController.ts');
			res.status(200).send('Hello from Typescript!');
		}

		export function config(req: express.Request, res: express.Response, next: Function) {
			console.log('config() from TsController.ts');
			res.status(200)
				 .send('<h1>sails.config :</h1><pre>' + util.inspect(sails.config) + '<pre>');
		}



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
