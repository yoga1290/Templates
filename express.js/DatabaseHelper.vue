<template>
pre.
  var pg = require('pg');
  var config = require('../configuration')
  var onReadyQueue = [];
  var connectionString = process.env.DATABASE_URL || config.DATABASE_URL;

  pg.defaults.ssl = true;
  const pool = new pg.Pool({
    connectionString: connectionString,
  })

  pool.connect((err, client, done) => {
  	if (err) throw err;


  	dbClient = client;
  	isDBConnected = true;
  	// execute all functions from the queue:
  	onDBReady();

  });

  var isDBConnected = false;
  var dbClient = {};

  let onDBReady = function(cb) {
  	if(isDBConnected) {
  		// execute all functions from the queue:
  		if(cb!==undefined) {
  			onReadyQueue.push(cb);
  		}
  		for(var i=0;i<onReadyQueue.length;i++) {
  			onReadyQueue.shift()(dbClient);
  		}
  	} else {
  		// otherwise, queue the callback function (parameter):
  		onReadyQueue.push(cb);
  	}

  };

  let executeQueryOnDBReady = (query, parameters) => {
  	return {
  		// return a promise-like object where callbacks are executed after DB is connected:
  		then: (callback) => {
  			// see onDBReady.js
  			onDBReady((dbClient) => {
  				try {
  					dbClient.query(query, parameters, callback);
  				} catch(e) {
  					console.error(e);
  					callback(e);
  				}
  			});
  		}
  	};
  }

  module.exports = executeQueryOnDBReady

</template>

<script>
import Template from 'Template'
export default Template({}, {})
</script>
