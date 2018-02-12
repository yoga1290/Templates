<template lang="jade">
div
  Model.template(v-show="selectedTab===0", :object="object", :registerNewFieldDef="registerNewFieldDef", :registerNewObjectDef="registerNewObjectDef")
  Controller.template(v-show="selectedTab===1", :object="object", :registerNewFieldDef="registerNewFieldDef", :registerNewObjectDef="registerNewObjectDef")
  Service.template(v-show="selectedTab===2", :object="object", :registerNewFieldDef="registerNewFieldDef", :registerNewObjectDef="registerNewObjectDef")
  SQL.template(v-show="selectedTab===3", :object="object", :registerNewFieldDef="registerNewFieldDef", :registerNewObjectDef="registerNewObjectDef")
</template>


<script>
import Model from './Model.vue'
import Controller from './Controller.vue'
import Service from './Service.vue'
import SQL from './sql.vue'
import TemplatesContainer from 'TemplatesContainer'

export default TemplatesContainer({
  Model,
  Controller,
  Service,
  SQL
})
</script>
