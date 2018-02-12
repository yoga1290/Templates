<template lang="jade">
pre
	div.
		CREATE TABLE `{{camelCaseTo_(object.name)}}` (
	div(v-for="field in object.fields", v-if="field.type==='integer'").
		  `{{camelCaseTo_(field.name)}}` int(11) {{field.autoIncrement ? 'AUTO_INCREMENT':''}},
	div(v-for="field in object.fields", v-if="field.type==='string' || field.type==='text' || field.type==='mediumtext' || field.type==='longtext'").
		  `{{camelCaseTo_(field.name)}}` varchar(45),
	div(v-for="field in object.fields", v-if="field.type==='date' || field.type==='datetime'").
		  `{{camelCaseTo_(field.name)}}` timestamp,
	div(v-for="field in object.fields", v-if="field.type==='boolean'").
		  `{{camelCaseTo_(field.name)}}` BIT(1),
	div.
		  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
		  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	div(v-for="field in object.fields", v-if="field.primaryKey").
		  PRIMARY KEY (`{{camelCaseTo_(field.name)}}`),
	div.
		  # KEY `fk_other_table` (`other_field`),
		  # CONSTRAINT `fk_tmp` FOREIGN KEY (`other_id`) REFERENCES `other_table` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
		) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;


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
