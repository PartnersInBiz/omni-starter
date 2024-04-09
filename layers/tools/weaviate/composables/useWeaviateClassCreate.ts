export const useWeaviateClassCreate = () => {
  const { weaviateApp } = useWeaviate()

  const ClassCreate = async (className: string) => {
    const emptyClassDefinition = {
      class: className,
    }

    // Add the class to the schema
    const result = await weaviateApp.schema
      .classCreator()
      .withClass(emptyClassDefinition)
      .do()

    // The returned value is the full class definition, showing all defaults
    console.log(JSON.stringify(result, null, 2))
    return result
  }

  const ClassCreateProperty = async (className: string, properties: any[]) => {
    const classWithProps = {
      class: className,
      properties: properties,
    }

    // Add the class to the schema
    const result = await weaviateApp.schema
      .classCreator()
      .withClass(classWithProps)
      .do()

    // The returned value is the full class definition, showing all defaults
    console.log(JSON.stringify(result, null, 2))
    return result
  }

  const ClassCreateWithVectorizer = async (
    className: string,
    properties: any[],
    vectorizer: string = 'text2vec-openai',
  ) => {
    const classWithVectorizer = {
      class: className,
      properties: properties,
      vectorizer: vectorizer, // this could be any vectorizer
    }

    // Add the class to the schema
    const result = await weaviateApp.schema
      .classCreator()
      .withClass(classWithVectorizer)
      .do()

    // The returned value is the full class definition, showing all defaults
    console.log(JSON.stringify(result, null, 2))
    return result
  }

  const ClassCreateWithModuleSettings = async (
    className: string,
    properties: any[],
    vectorizer: string = 'text2vec-openai',
  ) => {
    const classWithVectorizer = {
      class: className,
      properties: properties,
      vectorizer: vectorizer,
      moduleConfig: {
        'text2vec-cohere': {
          // this must match the vectorizer used
          vectorizeClassName: true,
          model: 'embed-multilingual-v2.0',
        },
      },
    }

    // Add the class to the schema
    const result = await weaviateApp.schema
      .classCreator()
      .withClass(classWithVectorizer)
      .do()

    // The returned value is the full class definition, showing all defaults
    console.log(JSON.stringify(result, null, 2))
    return result
  }

  const ClassCreateWithIndexType = async (
    className: string,
    properties: any[],
    vectorizer: string = 'text2vec-openai',
  ) => {
    const classWithIndexType = {
      class: className,
      properties: properties,
      vectorizer: vectorizer,
      vectorIndexType: 'flat', // or `hnsw`
      vectorIndexConfig: {
        bq: {
          enabled: true, // Enable BQ compression. Default: False
          rescoreLimit: 200, // The minimum number of candidates to fetch before rescoring. Default: -1 (No limit)
          cache: true, // Enable use of vector cache. Default: False
        },
        vectorCacheMaxObjects: 100000, // Cache size if `cache` enabled. Default: 1000000000000
      },
    }

    // Add the class to the schema
    const result = await weaviateApp.schema
      .classCreator()
      .withClass(classWithIndexType)
      .do()

    // The returned value is the full class definition, showing all defaults
    console.log(JSON.stringify(result, null, 2))
    return result
  }

  const ClassCreateWithPropModuleSettings = async (
    className: string,
    properties: any[],
    vectorizer: string = 'text2vec-openai',
  ) => {
    const classWithPropModuleSettings = {
      class: className,
      vectorizer: vectorizer, // this could be any vectorizer
      properties: [
        {
          name: 'title',
          dataType: ['text'],
          moduleConfig: {
            'text2vec-huggingface': {
              // this must match the vectorizer used
              vectorizePropertyName: true,
              tokenization: 'lowercase', // Use "lowercase" tokenization
            },
          },
        },
        {
          name: 'body',
          dataType: ['text'],
          moduleConfig: {
            'text2vec-huggingface': {
              // this must match the vectorizer used
              skip: true, // Don't vectorize this property
              tokenization: 'whitespace', // Use "whitespace" tokenization
            },
          },
        },
      ],
    }

    // Add the class to the schema
    const result = await weaviateApp.schema
      .classCreator()
      .withClass(classWithPropModuleSettings)
      .do()

    // The returned value is the full class definition, showing all defaults
    console.log(JSON.stringify(result, null, 2))
    return result
  }

  const ClassCreateWithDistance = async () => {
    const classWithDistance = {
      class: 'Article',
      vectorIndexConfig: {
        distance: 'cosine',
      },
    }

    // Add the class to the schema
    const result = await weaviateApp.schema
      .classCreator()
      .withClass(classWithDistance)
      .do()

    // The returned value is the full class definition, showing all defaults
    console.log(JSON.stringify(result, null, 2))
  }

  const ClassCreatewithGenerative = async () => {
    const classWithGenerative = {
      class: 'Article',
      properties: [
        {
          name: 'title',
          dataType: ['text'],
        },
      ],
      vectorizer: 'text2vec-openai', // this could be any vectorizer
      moduleConfig: {
        'generative-openai': {}, // set your generative module
      },
    }

    // Add the class to the schema
    const result = await weaviateApp.schema
      .classCreator()
      .withClass(classWithGenerative)
      .do()

    // The returned value is the full class definition, showing all defaults
    console.log(JSON.stringify(result, null, 2))
    return result
  }

  const ClassCreateWithReplication = async () => {
    const classWithReplication = {
      class: 'Article',
      replicationConfig: {
        factor: 3,
      },
    }

    // Add the class to the schema
    const result = await weaviateApp.schema
      .classCreator()
      .withClass(classWithReplication)
      .do()

    // The returned value is the full class definition, showing all defaults
    console.log(JSON.stringify(result, null, 2))
    return result
  }

  const ClassCreateWithSharding = async (
    className: string,
    properties: any = [],
    vectorizer: string = 'text2vec-openai',
    distance: string = 'cosine',
  ) => {
    const classWithSharding: any = {
      class: className,
      vectorizer: vectorizer,
      vectorIndexConfig: {
        distance: distance,
      },
      properties: [],
      shardingConfig: {
        virtualPerPhysical: 128,
        desiredCount: 1,
        actualCount: 1,
        desiredVirtualCount: 128,
        actualVirtualCount: 128,
      },
    }

    if (vectorizer == 'multi2vec-palm') {
      classWithSharding.moduleConfig = {
        'multi2vec-palm': {
          textFields: ['name'],
          imageFields: ['image'],
        },
      }
    }

    if (vectorizer == 'multi2vec-bind') {
      classWithSharding.moduleConfig = {
        'multi2vec-bind': {
          imageFields: ['image'],
          audioFields: ['audio'],
          videoFields: ['video'],
        },
      }
    }

    console.log('classWithSharding', classWithSharding)

    if (properties) classWithSharding.properties = properties

    // Add the class to the schema
    const result = await weaviateApp.schema
      .classCreator()
      .withClass(classWithSharding)
      .do()

    // The returned value is the full class definition, showing all defaults
    console.log(JSON.stringify(result, null, 2))
    return result
  }

  const ClassCreateWithMultiTenancy = async () => {
    const result = await weaviateApp.schema
      .classCreator()
      .withClass({
        class: 'Article',
        multiTenancyConfig: { enabled: true },
      })
      .do()

    console.log(JSON.stringify(result, null, 2))
    return result
  }

  return {
    ClassCreate,
    ClassCreateProperty,
    ClassCreateWithVectorizer,
    ClassCreateWithModuleSettings,
    ClassCreateWithIndexType,
    ClassCreateWithPropModuleSettings,
    ClassCreateWithDistance,
    ClassCreatewithGenerative,
    ClassCreateWithReplication,
    ClassCreateWithSharding,
    ClassCreateWithMultiTenancy,
  }
}
