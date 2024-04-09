export const useWeaviateCrossReferenceCreate = () => {
  const { weaviateApp } = useWeaviate()

  const ObjectWithCrossReference = async () => {
    const response = await weaviateApp.data
      .creator()
      .withClassName('JeopardyQuestion')
      .withId('f7344d30-7fe4-54dd-a233-fcccd4379d5c')
      .withProperties({
        question: 'What tooling helps make Weaviate scalable?',
        answer: 'Sharding, multi-tenancy, and replication',
        hasCategory: [
          {
            // Specify one or more cross-references
            beacon: 'weaviate://localhost/583876f3-e293-5b5b-9839-03f455f14575',
          },
        ],
      })
      .do()
    console.log(JSON.stringify(response, null, 2))
  }

  const OnewayCrossReference = async () => {
    await weaviateApp.data
      .referenceCreator()
      .withClassName('JeopardyQuestion')
      .withId('00ff6900-e64f-5d94-90db-c8cfa3fc851b')
      .withReferenceProperty('hasCategory')
      .withReference(
        weaviateApp.data
          .referencePayloadBuilder()
          .withClassName('JeopardyCategory')
          .withId('20ffc68d-986b-5e71-a680-228dba18d7ef')
          .payload(),
      )
      .do()
  }

  const TwowayCrossReference = async () => {
    const jeopardyCategoryClass = {
      class: 'JeopardyCategory',
    }

    await weaviateApp.schema
      .classCreator()
      .withClass(jeopardyCategoryClass)
      .do()

    const jeopardyQuestionClass = {
      class: 'JeopardyQuestion',
      description: 'A Jeopardy! question',
      properties: [
        { name: 'question', dataType: ['text'] },
        { name: 'answer', dataType: ['text'] },
        {
          name: 'hasCategory',
          dataType: ['JeopardyCategory'],
          description: 'The category of the question',
        },
      ],
      vectorizer: 'text2vec-openai',
    }

    await weaviateApp.schema
      .classCreator()
      .withClass(jeopardyQuestionClass)
      .do()

    // Add the "hasQuestion" cross-reference property to the JeopardyCategory class
    await weaviateApp.schema
      .propertyCreator()
      .withClassName('JeopardyCategory')
      .withProperty({
        name: 'hasQuestion',
        dataType: ['JeopardyQuestion'],
      })
      .do()

    // For the "San Francisco" JeopardyQuestion object, add a cross-reference to the "U.S. CITIES" JeopardyCategory object
    await weaviateApp.data
      .referenceCreator()
      .withClassName('JeopardyQuestion')
      .withId('00ff6900-e64f-5d94-90db-c8cfa3fc851b')
      .withReferenceProperty('hasCategory')
      .withReference(
        weaviateApp.data
          .referencePayloadBuilder()
          .withClassName('JeopardyCategory')
          .withId('20ffc68d-986b-5e71-a680-228dba18d7ef')
          .payload(),
      )
      .do()

    // For the "U.S. CITIES" JeopardyCategory object, add a cross-reference to "San Francisco"
    await weaviateApp.data
      .referenceCreator()
      .withClassName('JeopardyCategory')
      .withId('20ffc68d-986b-5e71-a680-228dba18d7ef')
      .withReferenceProperty('hasQuestion')
      .withReference(
        weaviateApp.data
          .referencePayloadBuilder()
          .withClassName('JeopardyQuestion')
          .withId('00ff6900-e64f-5d94-90db-c8cfa3fc851b')
          .payload(),
      )
      .do()
  }

  const MultiOneWayCrossReference = async () => {
    // Add to "San Francisco" the "U.S. CITIES" category
    await weaviateApp.data
      .referenceCreator()
      .withClassName('JeopardyQuestion')
      .withId('00ff6900-e64f-5d94-90db-c8cfa3fc851b')
      .withReferenceProperty('hasCategory')
      .withReference(
        weaviateApp.data
          .referencePayloadBuilder()
          .withClassName('JeopardyCategory')
          .withId('20ffc68d-986b-5e71-a680-228dba18d7ef')
          .payload(),
      )
      .do()

    // Add the "MUSEUMS" category as well
    await weaviateApp.data
      .referenceCreator()
      .withClassName('JeopardyQuestion')
      .withId('00ff6900-e64f-5d94-90db-c8cfa3fc851b')
      .withReferenceProperty('hasCategory')
      .withReference(
        weaviateApp.data
          .referencePayloadBuilder()
          .withClassName('JeopardyCategory')
          .withId('fec50326-dfa1-53c9-90e8-63d0240bd933')
          .payload(),
      )
      .withConsistencyLevel('ALL')
      .do()
  }

  return {
    ObjectWithCrossReference,
    OnewayCrossReference,
    TwowayCrossReference,
    MultiOneWayCrossReference,
  }
}
