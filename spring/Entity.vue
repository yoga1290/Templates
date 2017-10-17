<template lang="jade">
div
	pre
		| public class {{Capitalise(object.name)}} extends BasicRecord {

		div(v-for="field in object.fields")
			div(v-if="field['@NotNull']")
				| 		@NotNull(message = "Invalid {{field.name}}", groups = {
				div(v-if="field['@NotNull'] == 'POST'") 			POST.class,
				div(v-if="field['@NotNull'] == 'PUT'") 			PUT.class,
				div(v-if="field['@NotNull'] == 'DELETE'") 			DELETE.class,
				| 		})
			div(v-if="field['@NotEmpty']")
				| 		@NotEmpty(message = "Invalid {{field.name}}", groups = {
				div(v-if="field['@NotEmpty'] == 'POST'") 			POST.class,
				div(v-if="field['@NotEmpty'] == 'PUT'") 			PUT.class,
				div(v-if="field['@NotEmpty'] == 'DELETE'") 			DELETE.class,
				| 		})
			div(v-if="field['@Size']")
				| 		@Size(message = "Invalid {{field.name}}", groups = {
				div(v-if="field['@Size'] == 'POST'") 			POST.class,
				div(v-if="field['@Size'] == 'PUT'") 			PUT.class,
				div(v-if="field['@Size'] == 'DELETE'") 			DELETE.class,
				| 		})
			div(v-if="field['@Length']")
				| 		@Length(message = "Invalid {{field.name}}", groups = {
				div(v-if="field['@Length'] == 'POST'") 			POST.class,
				div(v-if="field['@Length'] == 'PUT'") 			PUT.class,
				div(v-if="field['@Length'] == 'DELETE'") 			DELETE.class,
				| 		})
			div(v-if="field['@Pattern']")
				| 		@Pattern(message = "Invalid {{field.name}}", groups = {
				div(v-if="field['@Pattern'] == 'POST'") 			POST.class,
				div(v-if="field['@Pattern'] == 'PUT'") 			PUT.class,
				div(v-if="field['@Pattern'] == 'DELETE'") 			DELETE.class,
				| 		})
			|		@Getter @Setter
			|		private {{field.type}} {{field.name}};

		div.
			public {{Capitalise(object.name)}}() {
					//lastSyncTime = new Date().getTime();
				}
			}

	pre.
		import java.util.Date;
		import org.springframework.data.annotation.Id;
		import lombok.Getter;
		import lombok.Setter;
		import org.springframework.security.core.context.SecurityContextHolder;

		public class BasicRecord {

			public interface PUT {} // group bean-validator
			public interface POST {} // group bean-validator
			public interface DELETE {} // group bean-validator

		    @Id
		    private @Getter @Setter String id;
		    private @Getter @Setter Date creationTime;
		    private @Getter @Setter String creatorId;
		    private @Getter @Setter boolean isDeleted;

		    public BasicRecord() {
					this.creationTime = new Date();

					try {
					 if (SecurityContextHolder.getContext().getAuthentication() != null) {
			 this.creatorId = SecurityContextHolder.getContext().getAuthentication().getName();
					 }
					} catch(Exception e){}
					}
		}


</template>

<script>
import Template from 'Template'

var fieldDef = {
	type: {
		default: 'String',
		select: [
			'Long',
			'String',
			'Date',
			'Boolean'
		],
		string: true
	},

	'@NotNull': {
		default: false,
		select: [
			'POST',
			'PUT',
			'DELETE'
		],
		checkbox: true
	},

	'@NotEmpty': {
		default: false,
		select: [
			'POST',
			'PUT',
			'DELETE'
		],
		checkbox: true
	},

	'@Size': {
		default: false,
		select: [
			'POST',
			'PUT',
			'DELETE'
		],
		checkbox: true
	},

	'@Length': {
		default: false,
		select: [
			'POST',
			'PUT',
			'DELETE'
		],
		checkbox: true
	},

	'@Pattern': {
		default: '',
		select: [
			'POST',
			'PUT',
			'DELETE'
		]
	},

	isPK: {
		default: false,
		checkbox: true
	}

}

export default Template(fieldDef, {})
</script>
