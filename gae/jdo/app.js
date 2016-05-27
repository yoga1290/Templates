angular.module('app',[]);

	// angular
	// 	.module('app')
	// 		.set('view engine', 'jade');
	// angular
	// 	.module('app')
	// 		.configure('development', function () {

	// 			angular
	// 				.module('app')
	// 					.locals
	// 						.pretty = true; 
	// 		});

	angular
		.module('app')
			.controller('objCtrl',function($scope){
				var sp=$scope;
				sp.selectedTab=1;
				sp.specialField='';
				sp.objects=[
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
				sp.newObjClass=function(){
					sp.objects.push({
								name:'ObjectName',
								fields:[
									{
										name:'fieldName',
										type:'String'
									}
								]
							});
				};
				sp.keypress=function(e,objClass){
					if(e.keyCode==13)
						sp.newField(objClass);
				};
				sp.newField=function(objClass){
					objClass.fields.push({
										name:'',
										type:'String'
									});
					setTimeout(function(){
						$('input.field').last().focus();
					},50);
				};

				var localStorageName=prompt('localStorage Name:');
				 if(localStorage.getItem(localStorageName)!=undefined)
				 	sp.objects=JSON.parse(localStorage.getItem(localStorageName));

				window.onunload=function(){
					console.log('saving');
					localStorage.setItem(sp.objects[0].name,
									JSON.stringify(sp.objects));
				};

				sp.Capitalise=function(string)
				{
					return string.charAt(0).toUpperCase() + string.slice(1);
				};
				sp.lower=function(string)
				{
					return string.toLowerCase();
				};

				sp.getPKType=function(objClass){
					for(var i=0;i<objClass.fields.length;i++)
					{
						if(objClass.fields[i].isPK)
							return objClass.fields[i].type;
					}
					return 'String';
				};
				sp.getPrimaryKeysFieldName=function(objClass){
					for(var i=0;i<objClass.fields.length;i++)
					{
						if(objClass.fields[i].isPK)
							return objClass.fields[i].name;
					}
					return '';
				};

				sp.getCtrlInsertParameters=function(objClass){
					var txt=' ';
					for (var i = 0; i < objClass.fields.length; i++)
						if(!objClass.fields[i].isPK)
							txt+='\n\t\t\t@RequestParam '+objClass.fields[i].type+' '+objClass.fields[i].name+',';
					return txt.substring(0,txt.length-1);
				};
				sp.getCtrlInsertFields=function(objClass){
					var txt='';
					for (var i = 0; i < objClass.fields.length; i++)
						if(!objClass.fields[i].isPK)
							txt+='\n\t\t\t\t'+sp.lower(objClass.name)+'.set'+sp.Capitalise(objClass.fields[i].name)+'('+objClass.fields[i].name+');';
					return txt;
				};

				sp.getCtrlUpdateParameters=function(objClass){
					var txt=' ';
					for (var i = 0; i < objClass.fields.length; i++) {
						if(objClass.fields[i].isPK)
							txt+='\n\t\t\t@PathVariable(value="id") '+objClass.fields[i].type+' '+objClass.fields[i].name+',';
						else
							txt+='\n\t\t\t@RequestParam '+objClass.fields[i].type+' '+objClass.fields[i].name+',';
					}
					return txt.substring(0,txt.length-1);
				};

				sp.getCtrlUpdateFields=function(objClass){
					var txt='';
					for (var i = 0; i < objClass.fields.length; i++)
						if(!objClass.fields[i].isPK)
							txt+='\n\t\t\t\t'+sp.lower(objClass.name)+'.set'+sp.Capitalise(objClass.fields[i].name)+'('+objClass.fields[i].name+');';
					return txt;
				};

				sp.getPersistentFields=function(objClass){
					var txt='';
					for(var i=0;i<objClass.fields.length;i++)
					{
						if(objClass.fields[i].isPK)
							txt+="@PrimaryKey\n"+
							"@Persistent(valueStrategy = IdGeneratorStrategy.IDENTITY)\n"
							+'private '+objClass.fields[i].type+' '+objClass.fields[i].name+';\n\n';
						else
							txt+='@Persistent\n'
								+'private '+objClass.fields[i].type+' '+objClass.fields[i].name+';\n\n';
					}
					return txt;
				};

				sp.getConstructor=function(objClass){
					var parameters='',body='';
					for(var i=0;i<objClass.fields.length;i++)
					{
						parameters+=','+objClass.fields[i].type+' '+objClass.fields[i].name;
						body+='\t\tthis.'+objClass.fields[i].name+' = '+objClass.fields[i].name+';\n';
					}
					return ('\tpublic '+sp.Capitalise(objClass.name)+'('+parameters.substring(1,parameters.length)+'){\n'
							+body+
						'\t}');
				};



				sp.getSetterOf=function(field){
					return 'public void set'+sp.Capitalise(field.name)+'('+field.type+' '+field.name+') {\n'
     					+'\t\tthis.'+field.name+' = '+field.name+';\n'
        				+'\t}\n';
				};
				sp.getGetterOf=function(field){
					return 'public '+field.type+' get'+sp.Capitalise(field.name)+'() {\n'
     					+'\t\treturn this.'+field.name+';\n'
        				+'\t}\n';
				};
				sp.getSettersAndGetters=function(objClass){
					var txt='';
					for(var i=0;i<objClass.fields.length;i++)
					{
						txt+=sp.getGetterOf(objClass.fields[i])
							+sp.getSetterOf(objClass.fields[i]);
					}
					return txt;
				};


				sp.getRepositoryFinders=function(objClass){
					var txt='';
					for(var i=0;i<objClass.fields.length;i++)
					txt+='\n@SuppressWarnings("unchecked")\n'
						+'public Collection<'+objClass.name+'> findBy'+sp.Capitalise(objClass.fields[i].name)+'('+objClass.fields[i].type+' '+objClass.fields[i].name+'){\n'
							+'\tQuery query = PMF.get().getPersistenceManager().newQuery('+objClass.name+'.class);\n'
							+'\tquery.setFilter("'+objClass.fields[i].name+' == n");\n'
							+'\tquery.declareParameters("'+objClass.fields[i].type+' n");\n'
							+'\treturn (List<'+objClass.name+'>)query.execute('+objClass.fields[i].name+');\n'
						+'}\n';
					return txt;
				};

				sp.getRepositoryFindersWLimit=function(objClass){
					var txt='';
					for(var i=0;i<objClass.fields.length;i++)
					txt+='\n@SuppressWarnings("unchecked")\n'
						+'public Collection<'+objClass.name+'> findBy'+sp.Capitalise(objClass.fields[i].name)+'('+objClass.fields[i].type+' '+objClass.fields[i].name+'){\n'
							+'\tQuery query = PMF.get().getPersistenceManager().newQuery('+objClass.name+'.class);\n'
							+'\tquery.setFilter("'+objClass.fields[i].name+' == n");\n'
							+'\tquery.declareParameters("'+objClass.fields[i].type+' n");\n'
							+'\treturn (List<'+objClass.name+'>)query.execute('+objClass.fields[i].name+');\n'
						+'}\n';
					return txt;
				};

				sp.getMappedFields=function(objClass){
					var txt='';
					for(var i=0;i<objClass.fields.length;i++)
						txt+=',o'+objClass.name+'.get'+sp.Capitalise(objClass.fields[i].name)+'()';
					return txt.substring(1,txt.length);
				};
				sp.deleteField=function(objClass,index){
					var nFields=[];
					for(var i=0;i<objClass.fields.length;i++)
						if(i!=index)
							nFields.push(objClass.fields[i]);
					objClass.fields=nFields;
				};




				sp.getJSSvc_insertAll_param=function(objClass){
					var txt=' ';
					for(var i=0;i<objClass.fields.length;i++)
						if(!objClass.fields[i].isPK)
							txt+=objClass.fields[i].name+",";
					return txt.substring(0,txt.length-1);
				};
				sp.getJSSvc_updateAll_param=function(objClass){
					var txt=' ';
					for(var i=0;i<objClass.fields.length;i++)
							txt+=objClass.fields[i].name+",";
					return txt.substring(0,txt.length-1);
				};
				sp.getJSSvc_update_param=function(objClass){
					var txt=' ';
					for(var i=0;i<objClass.fields.length;i++)
						if(!objClass.fields[i].isPK)
							txt+=objClass.fields[i].name+",";
					return txt.substring(0,txt.length-1);
				};
				sp.getJSSvc_updateAll_data=function(objClass){
					var txt="'";
					for(var i=0;i<objClass.fields.length;i++)
						if(objClass.fields[i].isFixed)
							txt+=objClass.fields[i].name+"='+"+objClass.fields[i].name+"\n\t\t\t\t\t\t\t\t+'&";
						else
							txt+=objClass.fields[i].name+"='+JSON.stringify("+objClass.fields[i].name+")\n\t\t\t\t\t\t\t\t+'&";
					if(txt.length>0)
						return txt.substring(0,txt.length-3);
					return "";
				};
				sp.getJSSvc_update_data=function(objClass){
					var txt="'";
					for(var i=0;i<objClass.fields.length;i++)
						if(!objClass.fields[i].isPK)
							txt+=objClass.fields[i].name+"='+"+objClass.fields[i].name+"\n\t\t\t\t\t\t\t\t+'&";
					if(txt.length>0)
						return txt.substring(0,txt.length-3);
					return "";
				};

				sp.bindTableDDL=function(objClass){
					/*
					if(colTitle=='MediaTypeID')
		                MediaTypeSvc.findById(id,function(MediaType){
	    	                $(cell).text(MediaType.Name);
		                });//*/
					var txt="";
					for(var i=0;i<objClass.fields.length;i++)
					{
						if(!objClass.fields[i].isDDL) continue;

						txt+="\n////TODO:Bind DDL:\nif(colTitle=='"+objClass.fields[i].name+"')\n"
							+sp.Capitalise(objClass.fields[i].name)+"Svc.findById(id,function(response){\n"+
							// "\t\t\t\t $(cell).text(response);});\n";
							"$(cell).html('');\n"+
							"	var a=$('<a>');\n"+
							"		a.attr('href','#datatable_"+objClass.name+"');\n"+
							"		a.text(response.name);\n"+
							"		a.click(function(){\n"+
							"			datatable_"+objClass.name+".api.search(response.id);\n"+
							"			datatable_"+objClass.name+".api.order([colInd,'asc']);\n"+
							"			datatable_"+objClass.name+".api.draw();\n"+
							"		});\n"+
							"		a.appendTo(cell);\n});\n";

					}
					return txt;
				};


				sp.listEditTemplateElements=function(objClass){
					var txt='';
					for(var i=0;i<objClass.fields.length;i++)
					{
						if(objClass.fields[i].isPK) continue;

						txt+='\n+\'<tr>';
						txt+='<td>'+objClass.fields[i].name+'</td>';
						if(objClass.fields[i].type=="TINYINT(1)")
							txt+='<td><input type="checkbox" name="'+objClass.fields[i].name+'" value="1" "\'+(row.'+objClass.fields[i].name+'=="1" ? "checked":"")+\'"></td>';
						else if(objClass.fields[i].type=="datetime")
							txt+='<td><input type="text" name="'+objClass.fields[i].name+'" value="\'+row.'+objClass.fields[i].name+'+\'" '
								+'class="datepicker"'
								+'></td>';
						else if(objClass.fields[i].isDDL)
							txt+='<td><select name="'+objClass.fields[i].name+'"></select></td>';
						else
							txt+='<td><input type="text" name="'+objClass.fields[i].name+'" value="\'+row.'+objClass.fields[i].name+'+\'" '
								+((objClass.fields[i].mask!=undefined && objClass.fields[i].mask.length>0)
									? ('mask="'+objClass.fields[i].mask)+'"':'')
								+'></td>';
						txt+='</tr>\'';
					}
					return txt;
				};


			});