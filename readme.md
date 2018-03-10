# Introduction

It first started w the idea of creating simple interactive code-templates or code generators/wizards.

It was implemented in **AngularJS** where **ng-repeat** and **ng-if** to generate hidden code snippets and concatinating all their inner text.

Now, I moving to VueJS implementation and as I've many template in hand, each template is now a Component file that exports `Template(fieldOptionsDef, objectOptionsDef)`, where it can pass, it's own definition for the field/object options which will later gets merged w the rest of all other `fieldOptionsDef`

![readme.puml](http://www.plantuml.com/plantuml/png/06zS00CIAQxv2DqSVpTM0QTbFpptLMb1jRK6GHXqF1phIHQutlEJohI4UfHJr2Vk_Rn0aSQuOf-ku7-YYv6IW6CZU7U0hyPm-NEgDmFrVb_tR4k_zC_P2g5J8tCH3PATREcnHwG-CVdjxT2L7DmyoWYJ2r_ht3G00)

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
