<template lang="jade">
div
  Directive.template(v-show="selectedTab===0", :object="object", :registerNewFieldDef="registerNewFieldDef", :registerNewObjectDef="registerNewObjectDef")
</template>


<script>
import Directive from './directive.vue'
import TemplatesContainer from 'TemplatesContainer'

export default TemplatesContainer({
  Directive
})
</script>
