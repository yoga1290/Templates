<template lang="jade">
div
	pre
		div.
			import java.util.Date;
			import java.util.List;

			import org.springframework.data.domain.Page;
			import org.springframework.data.domain.Pageable;
			import org.springframework.data.domain.Slice;
			import org.springframework.data.mongodb.repository.Query;

			public interface {{Capitalise(object.name)}}Repository extends BasicRecordRepository<{{Capitalise(object.name)}}> {



		div(v-for="field, $index in object.fields", v-if="!field.isPK").
			@Query(value = "{ '{{field.name}}': {'$in': ?0} }")
				Page<{{Capitalise(object.name)}}> findBy{{Capitalise(field.name)}}({{field.type}} {{field.name}}, Pageable pageable);



		div(v-for="field, $index in object.fields", v-if="field.type=='long'").
			@Query(value = "{ '{{field.name}}': {'$gte' : ?0, '$lte': ?1} }")
				Page<{{Capitalise(object.name)}}> findBy{{Capitalise(field.name)}}Between(Long start, Long end, Pageable pageable);
		| }


	pre.
		import org.springframework.data.mongodb.repository.MongoRepository;
		import org.springframework.data.mongodb.repository.Query;
		public interface BasicRecordRepository< T extends BasicRecord > extends MongoRepository< T, String > {
			@Query("{ 'id': ?0, 'isDeleted': false }")
			T findById(String id);
			@Query("{ 'id': ?0, 'isDeleted': false }")
			@Override
			T findOne(String id);
		}
</template>

<script>
import Template from 'Template'

var fieldDef = {
	type: {
		default: 'String',
		select: [ 'long',
							'String',
							'datetime',
							'TINYINT(1)'
		],
		string: true
	},

	isPK: {
		default: 'String',
		checkbox: true
	}

}

export default Template(fieldDef, {})
</script>
