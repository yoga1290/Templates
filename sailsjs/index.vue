<template lang="jade">
div
  Model.template(v-show="selectedTab===0", :object="object", :registerNewFieldDef="registerNewFieldDef", :registerNewObjectDef="registerNewObjectDef")
</template>


<script>
import Model from './Model.vue'
import TemplatesContainer from 'TemplatesContainer'

export default TemplatesContainer({
  Model
})
</script>
