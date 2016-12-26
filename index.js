var React= require('react');
var jade = require('react-jade');
var ReactDOM = require('react-dom');

var Home = React.createClass({

  render: function () {
    return (jade`
body
  h1 Spring MongoDB Document
  p
    | Press enter/return for a new field
  .container-fluid
`).locals({});
  }
});

ReactDOM.render(Home(), document.getElementById('root'));
