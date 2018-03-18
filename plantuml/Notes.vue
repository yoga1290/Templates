<template lang="jade">
div
  div.
    For AsciiMath/Latex, you will need to download & unzip
  a(href="http://beta.plantuml.net/plantuml-jlatexmath.zip") this
  a(href="http://plantuml.com/ascii-math")[doc]

  pre.
    java -cp jlatexmath-minimal-1.0.3.jar -jar plantuml.1.2018.1.jar FILE.puml -o OUT_DIR
</template>

<script>
import Template from 'Template'
import {fieldDef, objectDef} from './config.json'
export default Template(fieldDef, objectDef)
</script>
