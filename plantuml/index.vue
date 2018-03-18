<template lang="jade">
div
  Notes.template(v-show="selectedTab===0", :object="object", :registerNewFieldDef="registerNewFieldDef", :registerNewObjectDef="registerNewObjectDef")
  ClassDiagram.template(v-show="selectedTab===1", :object="object", :registerNewFieldDef="registerNewFieldDef", :registerNewObjectDef="registerNewObjectDef")
</template>


<script>
import Notes from './Notes.vue'
import ClassDiagram from './ClassDiagram.vue'
import TemplatesContainer from 'TemplatesContainer'

export default TemplatesContainer({
  Notes,
  ClassDiagram
})
</script>
