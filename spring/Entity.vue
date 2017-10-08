<template lang="jade">
div
	pre
		| public class {{Capitalise(object.name)}} extends BasicRecord {

		div(v-for="field in object.fields")
			|		private @Getter @Setter {{field.type}} {{field.name}};

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
		select: [ 'Long',
							'String',
							'Date',
							'Boolean'
		],
		string: true
	},

	isPK: {
		default: false,
		checkbox: true
	}

}

export default Template(fieldDef, {})
</script>
