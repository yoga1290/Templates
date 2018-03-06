<template lang="jade">
pre
  div
    |    const { Server } = require('../server.js') // express app
    |    const { {{object.name}}Repository  } = require('../repositories')
    |    const logger = require('../logger.js')
    |    let chai = require('chai')
    |    let chaiHttp = require('chai-http')
    |    let should = chai.should();
    |    let log = logger('{{object.name}}Test')
    |    chai.use(chaiHttp)
    |    process.env.NODE_ENV = 'test'
  div
    |  describe('{{object.name}}Test', () => {
    |    before((done) => {
    |      done()
    |    });
  div
    |    describe('POST /{{object.name.toLowerCase()}}', () => {
    |        it('it should create new {{object.name}}', (done) => {
    |          chai.request(Server)
    |              .post('/{{object.name.toLowerCase()}}')
    |              .send({
    |                //TODO
    |              })
    |              .end((err, res) => {
    |                  res.should.have.status(200);
    |                  done()
    |              });
    |        });
    |      });
    |      after((done) => {
    |        {{object.name}}Repository.truncate().then(done)
    |      })
    |    })
</template>

<script>
import Template from 'Template'
import {fieldDef, objectDef} from './config.json'
export default Template(fieldDef, objectDef)
</script>
