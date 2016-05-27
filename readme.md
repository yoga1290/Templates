# Hosted as [GitHub Page](https://help.github.com/articles/creating-project-pages-manually/): [yoga1290.github.com/Templates](http://yoga1290.github.com/Templates)


# Idea

The idea is simply creating interactive code templates or code generators/wizards; using some **AngularJS** features like **ng-repeat** and **ng-if** to generate hidden code snippets and combining all their inner text
e.g:
```html
<div
class= "functionParameters">
	{{MyObject.Fields[0].name}}</div>
<div
class= "functionParameters"
ng-repeat= "field in MyObject.Fields track by $index"
ng-if= "$index>0">
	,{{field.name}}</div>
```
this will produce something like **field1,field2,...** when selecting all DOM elements w the **functionParameters** class.