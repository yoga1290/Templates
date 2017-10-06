<template lang="jade">
html
	head
		meta(charset="utf-8")
		meta(http-equiv="X-UA-Compatible", content="IE=edge")
		meta(name="viewport", content="width=device-width, initial-scale=1, maximum-scale=1")
		title Spring
	body
		h1 Spring Templates
		p
			| Press enter/return for a new field

		.container-fluid
				.row(v-for="(obj, oIndex) in objects")
					.col-md-3
						.panel.panel-default
							.panel-heading
								.row
									input.form-control(type="text", v-model="obj.name", placeholder="Object Class name")
							.panel-body
								.input-group.col-xs-12(v-for="(field, $index) in obj.fields")
									input.field.form-control(type="text", placeholder="Field name", v-model="field.name", @keydown.enter="newField(oIndex)")
									.input-group-btn(:class="{open: (open===$index)}")
										button.btn.btn-default.dropdown-toggle(data-toggle="dropdown", @click="open=(open===$index ? -1:$index)") {{field.type}}
											span.caret
										ul.dropdown-menu
											li(v-for="(fValue, fKey) in fieldDef")
												a(href="#",:class="{selected: field[fKey]===option}", v-for="option in fValue.select", @click="field[fKey]=option;") {{fKey + ': ' + option}}
												a.string(v-if="fValue.string", href="#")
													input.form-control(type="text",v-model="field[fKey]", placeholder="fKey")
												a(v-if="fValue.checkbox", href="#")
													input(type="checkbox", v-model="field[fKey]")
													| {{fKey}}
												.divider
											li
												a(href="#",ng-click="deleteField(obj,$index)") DELETE
					{{objects}}
					.col-md-8.col-xs-12(v-for="object in objects")
						ul.nav.nav-tabs(role="tablist")
							li(v-for="template in ['Controller', 'Repository']",ng-class="{active:$parent.selectedTab==$index}")
								a(href="#",ng-click="$parent.selectedTab=$index")
									h4
										i.icon.save(ng-click="download($index)")
										| {{template}}
						.panel.panel-default.templates
							.panel-body
								Controller(:object="obj", :registerNewFieldDef="onFieldDefUpdate", :registerNewObjectDef="onObjectDefUpdate")
								Repository(:object="obj", :registerNewFieldDef="onFieldDefUpdate", :registerNewObjectDef="onObjectDefUpdate")
</template>

<script>
import Controller from './spring/Controller.vue'
import Repository from './spring/Repository.vue'

const templates = [
	{
		name: 'Controller'
	}
]

let $set = () => {}

var fieldDef = {
}

var objectDef = {
	name: '',
	fields: []
}

var objects = [{
	name: '',
	fields: []
}];

export default {

	data () {
			return {
				fieldDef,
				objectDef,
				open: false,
				specialField: '',
				objects,
				templates
			};
	},

	components: {
		Controller,
		Repository
	},

	created () {
		console.log('created')
		$set = (k, v) => {
			this.$set(this.$data, k, v)
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

	mounted () {
		// add an init field after all onFieldDefUpdate callbacks were triggered
		this.newField(0)

	},

	methods: {

		onFieldDefUpdate (field) {
			fieldDef = $.extend({}, fieldDef, field)
			this.fieldDef = fieldDef
			$set('fieldDef', fieldDef)
		},

		onObjectDefUpdate (object) {
			objectDef = $.extend({}, objectDef, object)
			this.objectDef = objectDef
			$set('objectDef', objectDef)
		},

		newObject () {
			objects.push(objectDef)
			$set('objects', objects)
		},

		newField (objIndex) {
			var nField = {}
			for (var fKey in fieldDef) {
				nField[fKey] = fieldDef[fKey].default
			}
			objects[objIndex].fields.push(nField)
			$set('objects', objects)

			setTimeout(function(){
				$('input.field').last().focus();
			},50);
		},

		keypress () {
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
.selected
	color: #262626;
	text-decoration: none;
	background-color: #2ff596;;
.panel.panel-default.templates
	border-top: 0px;

.dropdown-menu>li>a.string
	height: 50px;
i.icon.save:after
	content: 'save'
</style>

<style lang="stylus">
/* https://vaadin.com/icons/download#download */
@font-face
    font-family: 'Vaadin-Icons';
    src: url('./Vaadin-Icons.eot');
    src: url('./Vaadin-Icons.eot?#iefix') format('embedded-opentype'),
         url('./Vaadin-Icons.woff') format('woff'),
         url('./Vaadin-Icons.ttf') format('truetype'),
         url('./Vaadin-Icons.svg#icomoon') format('svg');
.icon
   font-family: Vaadin-Icons;
   font-size: 16px;
   speak: none;
   font-weight: normal;
   font-variant: normal;
   font-style: normal;
   text-transform: none;
   line-height: 1;
   -webkit-font-smoothing: antialiased;
</style>
