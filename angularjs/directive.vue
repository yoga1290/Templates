<template lang="jade">
pre
  div
    |angular.module('app').directive('{{Capitalise(object.name}}', function () {
    |   return {
    |       restrict: 'E',
    |       templateUrl: '{{camelCaseTo_(object.name)}}.html',
    |       scope: {
  div(v-for="field in object.fields")
    |           "{{field.name}}": '={{field.name}}',
  div
    |       },
    |       controller: '{{Capitalise(object.name)}}Ctrl'
    |       link: {
    |         post: function(scope, element, attrs) {}
    |       }
    |     };
    |   });
</template>

<script>
import Template from 'Template'
import {fieldDef, objectDef} from './config.json'
export default Template(fieldDef, objectDef)
</script>
