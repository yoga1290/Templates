<template lang="jade">
pre.
	const express = require('express');
	const path = require('path');

	var app = express();
	var bodyParser = require('body-parser');
	app.use(bodyParser.json());
	app.set('port', (process.env.PORT || 8080));
	app.use(express.static( path.resolve( __dirname, '../', 'frontend', 'dist')) );

	// server-side rendering pug views:
	// see http://expressjs.com/en/guide/using-template-engines.html
	app.set('views', path.resolve( __dirname, '../', 'frontend', 'views'));
	app.set('view engine', 'pug');
	app.get('/directives/:directive', function(request, response) {
	  response.render( request.params.directive);
	});

	app.get('/', function(request, response) {
	  response.render('index');
	});

	http.listen(app.get('port'), function() {
	  console.log('Node app is running on port', app.get('port'));
	});

	module.exports = {
	  app
	}

</template>

<script>
import Template from 'Template'
import {fieldDef, objectDef} from './config.json'
export default Template(fieldDef, objectDef)
</script>
