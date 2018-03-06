<template lang="jade">
div
  ClassDiagram.template(v-show="selectedTab===0", :object="object", :registerNewFieldDef="registerNewFieldDef", :registerNewObjectDef="registerNewObjectDef")
</template>


<script>
import ClassDiagram from './ClassDiagram.vue'
import TemplatesContainer from 'TemplatesContainer'

export default TemplatesContainer({
  ClassDiagram
})
</script>
