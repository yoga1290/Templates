<template lang="jade">
pre
  div
    |@startuml
    |package MyPackage {
    |  class {{Capitalise(object.name)}} {
    |  .. Getters ..
  div(v-for="field in object.fields")
    |    + get{{Capitalise(field.name)}}() : {{field.type}}
    |  .. Setters ..
  div(v-for="field in object.fields")
    |    + set{{Capitalise(field.name)}}({{field.type}} {{field.name}})
    | __ data __
  div(v-for="field in object.fields", v-if="field.visibility=='private'")
    |    -{{ field.isStatic ? '{static}':'' }} {{ field.isAbstract ? '{abstract}':'' }} {{field.type}} {{field.name}}
  div(v-for="field in object.fields", v-if="field.visibility=='private'")
    |    -{{ field.isStatic ? '{static}':'' }} {{ field.isAbstract ? '{abstract}':'' }} {{field.type}} {{field.name}}
  div(v-for="field in object.fields", v-if="field.visibility=='protected'")
    |    # {{ field.isStatic ? '{static}':'' }} {{ field.isAbstract ? '{abstract}':'' }} {{field.type}} {{field.name}}
  div(v-for="field in object.fields", v-if="field.visibility=='package private'")
    |    ~{{ field.isStatic ? '{static}':'' }} {{ field.isAbstract ? '{abstract}':'' }} {{field.type}} {{field.name}}
  div(v-for="field in object.fields", v-if="field.visibility=='public'")
    |    +{{ field.isStatic ? '{static}':'' }} {{ field.isAbstract ? '{abstract}':'' }} {{field.type}} {{field.name}}
  div
    | }
    |}
    |@enduml
</template>

<script>
import Template from 'Template'
import {fieldDef, objectDef} from './config.json'
export default Template(fieldDef, objectDef)
</script>
