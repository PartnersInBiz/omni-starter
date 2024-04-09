export const useWeaviateClassRetrieve = () => {
  const { weaviateApp } = useWeaviate()

  const ClassRetrieve = async (className: string) => {
    const classDefinition = await weaviateApp.schema
      .classGetter()
      .withClassName(className)
      .do()
    return classDefinition
  }

  const ClassRetrieveAll = async () => {
    const allClassDefinitions = await weaviateApp.schema.getter().do()

    console.log(JSON.stringify(allClassDefinitions, null, 2))
    return allClassDefinitions
  }

  return {
    ClassRetrieve,
    ClassRetrieveAll,
  }
}
