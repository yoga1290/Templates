<template lang="jade">
div
  Notes.template(v-show="selectedTab===0", :object="object", :registerNewFieldDef="registerNewFieldDef", :registerNewObjectDef="registerNewObjectDef")
  Schema.template(v-show="selectedTab===1", :object="object", :registerNewFieldDef="registerNewFieldDef", :registerNewObjectDef="registerNewObjectDef")
</template>


<script>
import Schema from './schema.vue'
import Notes from './notes.vue'
import TemplatesContainer from 'TemplatesContainer'

export default TemplatesContainer({
  Notes,
  Schema
})
</script>
