<template lang="jade">
pre
  div.
    const { {{Capitalise(object.name)}}Repository } = require('../repositories')

    /*
    * Gets a list of {{Capitalise(object.name)}}
    * @param {Number} id - {{Capitalise(object.name)}} id
    */
    function get{{Capitalise(object.name)}}(req, res) {

    	var id = req.query.id;

    	{{Capitalise(object.name)}}Repository
    		.findById(id)
    		.then((err, result) => {
    			if (err) {
    				res.status(404).send('No available items for current player');
    			} else if (result.rowCount > 0) {
    				res.json(result.rows);
    			} else {
    				res.json([]);
    			}
    		});
    }

  div.
    /*
    * Gets a list of {{Capitalise(object.name)}}
  div(v-for="field in object.fields")
    | * @param {Number} {{field.name}} - {{field.name}} of the {{Capitalise(object.name)}}
  div.
    */
    function post{{Capitalise(object.name)}}(req, res) {

    	var {{object.fields.map((f)=>{return f.name + ' = req.body.' + f.name;}).join(',\n\t')}}

    	{{Capitalise(object.name)}}Repository
    		.save({{object.fields.map((f)=>{ return f.name}).join(', ')}})
    		.then((err, result) => {
    			if (err) {
    				res.status(404).send('No available items for current player');
    			} else if (result.rowCount > 0) {
    				res.json(result.rows);
    			} else {
    				res.json([]);
    			}
    		});
    }

    module.exports = {
      get{{Capitalise(object.name)}},
      post{{Capitalise(object.name)}},
      //put{{Capitalise(object.name)}},
      //delete{{Capitalise(object.name)}}
    }
</template>
<script>
import Template from 'Template'
export default Template({}, {})
</script>
