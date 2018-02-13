<template lang="jade">
div
  Server.template(v-show="selectedTab===0", :object="object", :registerNewFieldDef="registerNewFieldDef", :registerNewObjectDef="registerNewObjectDef")
  Route.template(v-show="selectedTab===1", :object="object", :registerNewFieldDef="registerNewFieldDef", :registerNewObjectDef="registerNewObjectDef")
  Service.template(v-show="selectedTab===2", :object="object", :registerNewFieldDef="registerNewFieldDef", :registerNewObjectDef="registerNewObjectDef")
  Repository.template(v-show="selectedTab===3", :object="object", :registerNewFieldDef="registerNewFieldDef", :registerNewObjectDef="registerNewObjectDef")
  Test.template(v-show="selectedTab===4", :object="object", :registerNewFieldDef="registerNewFieldDef", :registerNewObjectDef="registerNewObjectDef")
</template>


<script>
import Route from './Route.vue'
import Server from './Server.vue'
import Service from './Service.vue'
import Repository from './Repository.vue'
import Test from './Test.vue'
import TemplatesContainer from 'TemplatesContainer'

export default TemplatesContainer({
  Route,
  Server,
  Test,
  Service,
  Repository
})
</script>
