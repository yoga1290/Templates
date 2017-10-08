<template lang="jade">
html
	head
		meta(charset="utf-8")
		meta(http-equiv="X-UA-Compatible", content="IE=edge")
		meta(name="viewport", content="width=device-width, initial-scale=1, maximum-scale=1")
		title Spring
	body
		h1 Templates
		p
			| Press enter/return for a new field

		.container-fluid
				.row(v-for="(obj, oIndex) in objects")
					.col-md-3
						.panel.panel-default
							.panel-heading
								.row
									input.form-control(type="text", v-model="obj.name", placeholder="Object Class name", @keydown.enter="newField(oIndex)")
							.panel-body
								.input-group.col-xs-12(v-for="(field, $index) in obj.fields")
									.input-group-btn(:class="{open: (open===$index)}")
										button.btn.btn-default.dropdown-toggle(data-toggle="dropdown", @click="open=(open===$index ? -1:$index)")
											i.icon.field-options
											span.caret
										ul.dropdown-menu
											li(v-for="(fValue, fKey) in fieldDef")
												a(:class="{selected: field[fKey]===option}", v-for="option in fValue.select", @click="field[fKey]=option;") {{fKey + ': ' + option}}
												a.string(v-if="fValue.string")
													input.form-control(type="text",v-model="field[fKey]", placeholder="fKey")
												a(v-if="fValue.checkbox")
													input(type="checkbox", v-model="field[fKey]")
													| {{fKey}}
												.divider
											li
												a(@click="deleteField(oIndex, $index)") DELETE
									input.field.form-control(type="text", placeholder="Field name", v-model="field.name", @keydown.enter="newField(oIndex)")
					.col-md-8.col-xs-12(v-for="object in objects")
						ul.nav.nav-tabs(role="tablist")
							li(:class="{active:selectedTab===-1}")
								a(@click="selectedTab = -1")
									h4
										i.icon.home
							li(v-for="(template, $i) in templatesByGroup[selectedGroup]", :class="{active:selectedTab===$i}")
								a(@click="selectedTab = $i")
									h4 {{template}}
						.panel.panel-default.templates
							.panel-body(v-if="selectedTab===-1")
								button.btn-lg.btn.btn-default(v-for="(templates, group) in templatesByGroup", @click="onTemplateGroupSelect(group)") {{group}}
							.panel-body(v-if="selectedTab!==-1")
								i.icon.save(@click="downloadTemplate()")
								div(v-if="selectedGroup==='spring'")
									Controller.template(v-show="selectedTab===0", :object="obj", :registerNewFieldDef="onFieldDefUpdate", :registerNewObjectDef="onObjectDefUpdate")
									Repository.template(v-show="selectedTab===1", :object="obj", :registerNewFieldDef="onFieldDefUpdate", :registerNewObjectDef="onObjectDefUpdate")
									Entity.template(v-show="selectedTab===2", :object="obj", :registerNewFieldDef="onFieldDefUpdate", :registerNewObjectDef="onObjectDefUpdate")
</template>

<script>
import Controller from './spring/Controller.vue'
import Repository from './spring/Repository.vue'
import Entity from './spring/Entity.vue'
import Base64 from './js/Base64.js'

const templateByName = {
	'Controller': Controller,
	'Repository': Repository
}

const templatesByGroup = {
	'reset': [],
	'spring': ['Controller', 'Repository', 'Entity']
}

let $set = () => {}

var fieldDef = {
}

var objectDef = {
	name: '',
	fields: []
}

let objects = [{
	name: '',
	fields: []
}];

export default {

	data () {
			return {
				fieldDef,
				objectDef,
				selectedTab: -1,
				selectedGroup: 'none',
				open: false,
				objects,
				templatesByGroup
			};
	},

	components: {
		Controller,
		Repository,
		Entity
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

	methods: {

		loadTemplateByName(name) {
			return templateByName[name]
		},

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
			this.objects.push(objectDef)
			console.log(this.objects[0].fields)

			$set('objects', this.objects)
		},

		newField (objIndex) {
			var nField = {}
			for (var fKey in fieldDef) {
				nField[fKey] = fieldDef[fKey].default
			}

			this.objects[objIndex].fields.push(nField)
			console.log(this.objects[objIndex].fields, objIndex)

			$set('objects', this.objects)

			setTimeout(function(){
				$('input.field').last().focus();
			},50);
		},

		onTemplateGroupSelect (groupName) {
			// $set('fieldDef', fieldDef)
			// $set('objectDef', objectDef)
			$set('selectedGroup', groupName)
			this.objects = []
			$set('objects', this.objects)

			console.log(this.objects)
			// reset definiations as well

			this.newObject()
			// this.newField(0)
		},

		deleteField (oIndex, index) {
			this.objects[oIndex].fields.splice(index, 1)
			$set('objects', this.objects)
		},

		downloadTemplate() {
			let i = 0;

			if ($('.template[style!="display: none;"] > pre').length > 0) {
				Base64.downloadText($($('.template[style!="display: none;"] > pre').get(0)).text())
				//TODO: Multiple downloads?
				window.onload = ()=>{
					i++;
					Base64.downloadText($($('.template[style!="display: none;"] > pre').get(i)).text())
				}
			} else {
				Base64.downloadText($($('.template[style!="display: none;"]').get(0)).text())
			}

		}

	}

}
</script>


<style lang="stylus" scoped>
a
	cursor: pointer;
.selected
	color: #262626;
	text-decoration: none;
	background-color: #2ff596;;
.panel.panel-default.templates
	border-top: 0px;

.dropdown-menu>li>a.string
	height: 50px;

button.btn-lg
	margin: 5px;

i.icon.save
	position: relative;
	top: 50px;
	right: 50px;
	font-size: 50px;
	margin-left: 100%;
	cursor: pointer;
i.icon.save:after
	content: 'download';

i.icon.field-options
	font-size: 20px;
i.icon.field-options:after
	content: 'cog';

i.icon.home
	font-size: 20px;
i.icon.home:after
	content: 'home';

i.icon.new-field
	font-size: 20px;
i.icon.new-field:after
	content: 'folder-add';
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
