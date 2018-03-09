<template lang="jade">
pre
  div
    |{
    |   "$schema": "http://json-schema.org/draft-04/schema#",
    |   "id": "http://yourdomain.com/schemas/myschema.json",
    |   "type": "object",
    |   "minProperties": {{object.fields.length}},
    |   "maxProperties": {{object.fields.length}},
    |   "additionalProperties": true,
    |   "dependencies": {
    div(v-for="field in object.fields")
      |     "{{field.name}}": [],
    |   },
  div
    |   "required": [
    div(v-for="field in object.fields", v-if="field.required")
      |      "{{field.name}}",
    |   ],
    |   "definitions": {
  div.

  div(v-for="field in object.fields")
    |        "{{field.name}}": {
    |                "type": [
    div(v-if="field['type.string']")
      |                        "string",
    div(v-if="field['type.number']")
      |                        "number",
    div(v-if="field['type.integer']")
      |                        "integer",
    div(v-if="field['type.object']")
      |                        "object",
    div(v-if="field['type.array']")
      |                        "array",
    div(v-if="field['type.boolean']")
      |                        "boolean",
    div(v-if="field['type.null']")
      |                        "null",
    |                        ],
    div(v-if="field['type.array']")
      |                "items": [ /* //TODO: properties definiation here */ ],
    div(v-if="field['type.array'] && field['array.minItems'].length > 0")
      |                "minItems": {{field['array.minItems']}},
    div(v-if="field['type.array'] && field['array.maxItems'].length > 0")
      |                "maxItems": {{field['array.maxItems']}},
      |                "uniqueItems": {{field['array.uniqueItems']}},
    div(v-if="field.format")
      |                "format": "{{field.format}}",
    div(v-if="(field['type.number'] || field['type.integer']) && field['number.multipleOf']")
      |                "multipleOf": {{field['number.multipleOf']}},
    div(v-if="(field['type.number'] || field['type.integer']) && field['number.minimum']")
      |                "minimum": {{field['number.minimum']}},
    div(v-if="(field['type.number'] || field['type.integer']) && field['number.maximum']")
      |                "maximum": {{field['number.maximum']}},
    div(v-if="(field['type.number'] || field['type.integer']) && field['number.exclusiveMaximum']")
      |                "exclusiveMaximum": {{field['number.exclusiveMaximum']}},
    div(v-if="field['type.string'] && field['string.minLength']")
      |                "minLength": {{field['string.minLength']}},
    div(v-if="field['type.string'] && field['string.maxLength']")
      |                "maxLength": {{field['string.maxLength']}},
    div(v-if="field['type.string'] && field['string.pattern']")
      |                "pattern": "{{field['string.pattern']}}",
    div.

    |       },
  |   }
  |   "properties": {
  div(v-for="field in object.fields")
    |     "{{field.name}}": { "$ref": "#/definitions/{{field.name}}" },
  |   }
  |}
</template>

<script>
import Template from 'Template'
import {fieldDef, objectDef} from './config.json'
export default Template(fieldDef, objectDef)
</script>
