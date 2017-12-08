<template lang="jade">
div
  Controller.template(v-show="selectedTab===0", :object="object", :registerNewFieldDef="registerNewFieldDef", :registerNewObjectDef="registerNewObjectDef")
  Repository.template(v-show="selectedTab===1", :object="object", :registerNewFieldDef="registerNewFieldDef", :registerNewObjectDef="registerNewObjectDef")
  Entity.template(v-show="selectedTab===2", :object="object", :registerNewFieldDef="registerNewFieldDef", :registerNewObjectDef="registerNewObjectDef")
  LoggerConfiguration.template(v-show="selectedTab===3", :object="object", :registerNewFieldDef="registerNewFieldDef", :registerNewObjectDef="registerNewObjectDef")
</template>


<script>
import Controller from './Controller.vue'
import Repository from './Repository.vue'
import Entity from './Entity.vue'
import LoggerConfiguration from './LoggerConfiguration.vue'
import TemplatesContainer from 'TemplatesContainer'

export default TemplatesContainer({
  Controller,
  Repository,
  Entity,
  LoggerConfiguration
})
</script>
