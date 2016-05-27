angular
	.module('app',[])
		.controller('objCtrl',function($scope){
			var sp=$scope;
			sp.$ = function(selcator) {
			    return $(selcator).html();
			};
			sp.Capitalise = function(string) {
				return string.charAt(0).toUpperCase() + string.slice(1);
			};
			sp.selectedTab=-1;
			sp.databaseName='';
			sp.authority='';
			sp.account_type='';
			sp.tables=[
						{
							name:'',
							fields:[
								{
									name:'',
									type:'TEXT',
									isPrimaryKey:false,
									isAutoincrement:false,
									isNotNull:false
								}
							]
						}
					];
			sp.setSelectedTab=function(index){
				sp.selectedTab=index;
			};
			sp.onFieldKeyPress=function(e,table){
				if(e.keyCode==13)
				{
					table.fields.push({
									name:'',
									type:'TEXT',
									isPrimaryKey:false,
									isAutoincrement:false,
									isNotNull:false
								});
					
					setTimeout(function(){
						$('input[type=text]').last().focus();
				},50);
				}
			};
			sp.onTableKeyPress=function(e){
				if(e.keyCode==13)
				{
					$scope.tables.push({
									name:'',
									fields:[
										{
											name:'',
											type:'TEXT',
											isPrimaryKey:false,
											isAutoincrement:false,
											isNotNull:false
										}
									]
								});
					$('input[type=text]').last().focus();
				}
			};
			sp.removeField=function(table,index){
				var nFields=[];
				for(var i=0;i<table.fields.length;i++)
					if(i!=index)
						nFields.push(table.fields[i]);
				table.fields=nFields;
			};
			
			sp.getCreateSQL=function(table){
				//TODO
				var txt='CREATE TABLE '+table.name+' ( Id INTEGER PRIMARY KEY autoincrement,';
				var f='';
				for(var i=0;i<table.fields.length;i++)
					f+=','+table.fields[i].name+' '+table.fields[i].type
							+(table.fields[i].isPrimaryKey ? 'PRIMARY KEY ':'')
							+(table.fields[i].isAutoincrement ? 'autoincrement ':'')
							+(table.fields[i].isNotNull ? 'NOT NULL ':'');
				txt+=f.substring(1,f.length);
				return txt+');';
			};
			sp.getAllDropSQL=function(tables){
				var txt='';
				for(var i=0;i<tables.length;i++)
					txt+='\t\tsqLiteDatabase.execSQL('+tables[i].name+'.SQL_DROP);\n';
				return txt;
			};
			sp.getAllCreateSQL=function(tables){
				var txt='';
				for(var i=0;i<tables.length;i++)
					txt+='\t\tsqLiteDatabase.execSQL('+tables[i].name+'.SQL_CREATE);\n';
				return txt;
			};
		});