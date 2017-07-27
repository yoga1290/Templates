<template lang="jade">
pre#Controller.template
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
		@RequestMapping(value="/{{lower(obj.name)}}", produces=MediaType.APPLICATION_JSON_UTF8_VALUE)
		public class {{Capitalise(obj.name)}}Ctrl
		{
			public class DTO {

	div(v-for="field, $index in obj.fields", v-if="!field.isPK").
				@Getter @Setter
				private {{field.type}} {{field.name}};
	div.
		}

		@Autowired
		private {{Capitalise(obj.name)}}Repository {{obj.name.toLowerCase()}}Repository;
		@RequestMapping(value="/findOne",method = RequestMethod.GET)
		  public @ResponseBody {{Capitalise(obj.name)}} findOne(@RequestParam String id) {
		     return {{obj.name.toLowerCase()}}Repository.findOne(new Query().addCriteria(Criteria.where("id").is(id)));
		  }

		@RequestMapping(value="/save", method=RequestMethod.POST)
				public @ResponseBody {{Capitalise(obj.name)}} save(
								@RequestBody {{Capitalise(obj.name)}}Ctrl.DTO o{{Capitalise(obj.name)}})
				{
					{{Capitalise(obj.name)}} nw{{Capitalise(obj.name)}} = new {{Capitalise(obj.name)}}();

	div(v-for="field, $index in obj.fields", v-if="!field.isPK").

				nw{{Capitalise(obj.name)}}.set{{Capitalise(field.name)}}(o{{Capitalise(obj.name)}}.get{{Capitalise(field.name)}}());

	div(v-for="field, $index in obj.fields").

		@RequestMapping(value="/findBy{{Capitalise(field.name)}}",produces="application/json;charset=UTF-8" , method=RequestMethod.GET)

				public @ResponseBody List<{{Capitalise(obj.name)}}> findBy{{Capitalise(field.name)}}(
					@RequestParam {{field.type}} {{lower(field.name)}},
					@RequestParam(required = false, defaultValue = "0") int offset,
					@RequestParam(required = false, defaultValue = "10") int limit) {
						return {{obj.name.toLowerCase()}}Repository.findBy{{Capitalise(field.name)}}({{lower(field.name)}}, offset, limit);
				}

	div(v-for="field, $index in obj.fields", v-if="field.type=='long'").

		@RequestMapping(value="/findByTop{{Capitalise(field.name)}}",produces="application/json;charset=UTF-8" , method=RequestMethod.GET)
				public @ResponseBody List<{{Capitalise(obj.name)}}> findByTop{{Capitalise(field.name)}}(
					@RequestParam(required = false, defaultValue = "0") int offset,
					@RequestParam(required = false, defaultValue = "10") int limit) {
						return {{obj.name.toLowerCase()}}Repository.findByTop{{Capitalise(field.name)}}({{lower(field.name)}}, offset, limit);
				}

	div.

			{{obj.name.toLowerCase()}}Repository.save(nw{{Capitalise(obj.name)}});
			return nw{{Capitalise(obj.name)}};
		}

		@RequestMapping(value = "/trNgGrid", method = RequestMethod.POST)
		  public @ResponseBody String query(
		          @RequestBody trNgGridDTO dto,
		          @RequestParam(required = false) boolean isASC,
		          @RequestParam(required = false) boolean isGlobal) throws Exception
		  {
		      Criteria criteria=null;
		      return {{obj.name.toLowerCase()}}Repository.trNgGrid(
		              dto,
		              criteria,
		              isASC,
		              isGlobal).toString();
		  }
		}
</template>

<script>
export default {
	data () {
		return {}
	},

	methods: {
		Capitalise (string) {
			return string.charAt(0).toUpperCase() + string.slice(1);
		},

		lower (string) {
			return string.toLowerCase();
		}
	},

	components: {

	},

	props: {
		obj: {
      type: Object,
      default () {
        return {
					name:'ObjectName',
					fields:[
						{
							name:'fieldName',
							type:'String'
						}
					]
				}
      }
		}
	}
}
</script>
