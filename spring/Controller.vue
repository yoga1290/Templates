<template lang="jade">
pre
	div.

		import javax.servlet.http.HttpServletResponse;
		import java.util.Collection;
		import java.util.List;
		import lombok.Getter;
		import lombok.Setter;

		import org.springframework.beans.factory.annotation.Autowired;
		import org.springframework.stereotype.Controller;
		import org.springframework.web.bind.annotation.PathVariable;
		import org.springframework.web.bind.annotation.RequestBody;
		import org.springframework.web.bind.annotation.RequestMapping;
		import org.springframework.web.bind.annotation.RequestMethod;
		import org.springframework.web.bind.annotation.RequestParam;
		import org.springframework.web.bind.annotation.ResponseBody;


		@Controller
		@Api(value = "{{Capitalise(object.name)}}", description = "{{Capitalise(object.name)}}", tags = "{{Capitalise(object.name)}}")
		@RequestMapping(value="/{{lower(object.name)}}", produces=MediaType.APPLICATION_JSON_UTF8_VALUE)
		public class {{Capitalise(object.name)}}Controller
		{
			public class DTO {
	div(v-for="field in object.fields", v-if="!field.isPK")
		|		@Getter @Setter private {{field.type}} {{field.name}};
	div.
		}

		@Autowired
		private {{Capitalise(object.name)}}Repository {{object.name.toLowerCase()}}Repository;
		@GetMapping("/findOne")
		  public @ResponseBody {{Capitalise(object.name)}} findOne(@RequestParam String id) {
		     return {{object.name.toLowerCase()}}Repository.findOne(id);
		  }

		@PostMapping("/save")
				public @ResponseBody {{Capitalise(object.name)}} save(
								@RequestBody {{Capitalise(object.name)}}Ctrl.DTO o{{Capitalise(object.name)}})
				{
					{{Capitalise(object.name)}} nw{{Capitalise(object.name)}} = new {{Capitalise(object.name)}}();

	div(v-for="field, $index in object.fields", v-if="!field.isPK")
		|	nw{{Capitalise(object.name)}}.set{{Capitalise(field.name)}}(o{{Capitalise(object.name)}}.get{{Capitalise(field.name)}}());

	div.
		\\
			{{object.name.toLowerCase()}}Repository.save(nw{{Capitalise(object.name)}});
			return nw{{Capitalise(object.name)}};
		}

	div(v-for="field, $index in object.fields").
		@GetMapping("/findBy{{Capitalise(field.name)}}")
				public @ResponseBody List<{{Capitalise(object.name)}}> findBy{{Capitalise(field.name)}}(
					@RequestParam {{field.type}} {{lower(field.name)}},
					@RequestParam(required = false, defaultValue = "0") int offset,
					@RequestParam(required = false, defaultValue = "10") int limit) {
						return {{object.name.toLowerCase()}}Repository.findBy{{Capitalise(field.name)}}({{lower(field.name)}}, offset, limit);
				}



	div(v-for="field, $index in object.fields", v-if="field.type=='long'").
		@GetMapping("/findByTop{{Capitalise(field.name)}}")
				public @ResponseBody List<{{Capitalise(object.name)}}> findByTop{{Capitalise(field.name)}}(
					@RequestParam(required = false, defaultValue = "0") int offset,
					@RequestParam(required = false, defaultValue = "10") int limit) {
						return {{object.name.toLowerCase()}}Repository.findByTop{{Capitalise(field.name)}}({{lower(field.name)}}, offset, limit);
				}
		@GetMapping("/query")
				@ApiOperation(value = "Query {{Capitalise(object.name)}} for the grid view")
				// https://stackoverflow.com/a/35427093
				@ApiImplicitParams({
					@ApiImplicitParam(name = "page", dataType = "integer", paramType = "query",
							value = "Results page you want to retrieve (0..N)"),
					@ApiImplicitParam(name = "size", dataType = "integer", paramType = "query",
							value = "Number of records per page."),
					@ApiImplicitParam(name = "sort", allowMultiple = true, dataType = "string", paramType = "query",
							value = "Sorting criteria in the format: property(,asc|desc). " +
									"Default sort order is ascending. " +
									"Multiple sort criteria are supported.")
				})
				  public @ResponseBody Page<{{Capitalise(object.name)}}>
				  		query(@ApiIgnore Pageable pageable) throws Exception
				  {
				      return {{object.name.toLowerCase()}}Repository.query(pageable);
				  }
		}

</template>

<script>
import Template from 'Template'

var fieldDef = {
	type: {
		default: 'String',
		choice: [ 'long',
							'String',
							'datetime',
							'TINYINT(1)']
	}
}

export default Template(fieldDef, {})
</script>
