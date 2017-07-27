<template lang="jade">
html
	head
		meta(charset="utf-8")
		meta(http-equiv="X-UA-Compatible", content="IE=edge")
		meta(name="viewport", content="width=device-width, initial-scale=1, maximum-scale=1")
		title Spring
		script(src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js")
		script(src="../js/Base64.js")
		link(rel="stylesheet", href="./css/bootstrap.min.css")
		link(rel="stylesheet",href="https://fonts.googleapis.com/icon?family=Material+Icons")
	body
		h1 Spring Templates
		p
			| Press enter/return for a new field

		.container-fluid
				.row(v-for="obj, $index in objects")
					.col-md-3
						.panel.panel-default
							.panel-heading
								.row
									input.form-control(type="text", v-model="obj.name", placeholder="Object Class name")
							.panel-body
								.input-group.col-xs-12(v-for="field, $index in obj.fields")
									input.field.form-control(type="text",placeholder="Field name", v-model="field.name", ng-keypress="keypress($event,obj)")
									.input-group-btn(:class="{open: open}")
										button.btn.btn-default.dropdown-toggle(data-toggle="dropdown", @click="open=!open") {{field.type}}
											span.caret
										ul.dropdown-menu
											li
												a(href="#",@click="field.type='long';") long
											li
												a(href="#",@click="field.type='String';") String
											li
												a(href="#",@click="field.type='datetime';") datetime
											li
												a(href="#",@click="field.type='TINYINT(1)';") TINYINT(1)
											li
												input(type="checkbox", v-model="field.isPK")
												| PK
											li.divider
											li
												a(href="#",@click="field.type=specialField;")
													input.form-control(type="text",v-model="specialField",placeholder="Tab for other")
											li
												a(href="#",ng-click="deleteField(obj,$index)") DELETE
					{{objects}}
					.col-md-8.col-xs-12(v-for="object in objects")
						ul.nav.nav-tabs(role="tablist")
							li(v-for="template, $index in templates",ng-class="{active:$parent.selectedTab==$index}")
								a(href="#",ng-click="$parent.selectedTab=$index")
									h4
										i.material-icons(ng-click="download($index)") save
										| {{template.name}}
						.panel.panel-default.templates
							.panel-body
								Controller(:obj="object")
								div(ng-repeat="template in templates track by $index",ng-include="template.url",ng-show="$parent.selectedTab==$index")
</template>

<script>

import Controller from './Controller.vue'

let $set = () => {}

var templates = [{
				name: 'Document',
				url: 'Document.html'
			},{
				name: 'BasicRecord',
				url: 'BasicRecord.html'
			},{
				name: 'Repository',
				url: 'Repository.html'
			},{
				name: 'RepoInterface',
				url: 'RepositoryInterface.html'
			},{
				name: 'BasicDaoImpl',
				url: 'BasicDaoImpl.html'
			},{
				name: 'Controller',
				url: 'Controller.html'
			},{
				name: 'ngSvc',
				url: 'ngSvc.html'
			},{
				name: 'ng-trNgGridCtrl',
				url: 'ng-trNgGridCtrl.html'
			},{
				name: 'trnggrid',
				url: 'trnggrid.html'
			},{
				name: 'trNgGridDTO',
				url: 'trNgGridDTO.html'
			}];



		// sp.download = function($index) {
		// 	Base64.downloadText($($('textarea')[$index]).text());
		// };
		var objects = [
					{
						name:'',
						fields:[
							{
								name:'',
								type:'String'
							}
						]
					}
				];


				/*
					sp.keypress=function(e,objClass){
							if(e.keyCode==13)
								sp.newField(objClass);
						};//*/

export default {

	data () {
			return {
				open: false,
				specialField: '',
				objects,
				templates
			};
	},

	components: {
		Controller
	},

	created () {
		console.log('created')
		$set = (k, v) => {
			this.$set(_this.$data, k, v)
		}

		/*
		var localStorageName = prompt('localStorage Name:');
		if(localStorage.getItem(localStorageName)) {
			this.objects = JSON.parse(localStorage.getItem(localStorageName));
		}
		//*/

		window.onunload = () => {
			console.log('saving');
			localStorage.setItem(this.objects[0].name,
							JSON.stringify(this.objects));
		}
	},

	methods: {

		newObjClass () {
			objects.push({
				name:'ObjectName',
				fields:[
					{
						name:'fieldName',
						type:'String'
					}
				]
			})
			$set('objects', objects)
		},

		keypress () {
		},

		newField (objClass) {
			objClass.fields.push({
				name:'',
				type:'String'
			});
			$set('objects', objects)
			setTimeout(function(){
				$('input.field').last().focus();
			},50);
		},

		deleteField (objClass, index) {
			var nFields = [];
			for(var i=0 ;i < objClass.fields.length; i++)
				if(i != index)
					nFields.push(objClass.fields[i]);
			objClass.fields = nFields;
			$set('objects', objects)
		}

	}

}
</script>


<style lang="stylus" scoped>
.panel.panel-default.templates
	border-top: 0px;
</style>
