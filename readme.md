# Introduction

It first started w the idea of creating simple interactive code-templates or code generators/wizards.

It was implemented in **AngularJS** where **ng-repeat** and **ng-if** to generate hidden code snippets and concatinating all their inner text.

Now, I moving to VueJS implementation and as I've many template in hand, each template is now a Component file that exports `Template(fieldOptionsDef, objectOptionsDef)`, where it can pass, it's own definition for the field/object options which will later gets merged w the rest of all other `fieldOptionsDef`

# Template example:

```xml
<template lang="jade">
div
	pre.
		This is a simple {{object.name}} template w the following fields:
	pre(v-for="field in object.fields").
		name: {{field.name}}
		type: {{field.type}}
		myTextProperty: {{field.myTextProperty}}
		myBooleanProperty: {{field.myBooleanProperty}}
</template>

<script>
import Template from 'Template' //webpack alias

var fieldDef = {
	type: {
		default: 'String',
		select: [
           'long',
           'String',
           'datetime',
           'TINYINT(1)'
		]
	},

	myTextProperty: {
		default: 'String',
		string: true
	},

	myBooleanProperty: {
		checkbox: true
	}

}

export default Template(fieldDef, {})
</script>
```

# Install & build

### via Node/NPM:
(must be in the repo directory to run, obviously)
+ install: `npm i`
+ watch: `npm run watch`
+ build: `npm run build`
