export const useWeaviateCrossReferenceRetrieve = () => {
  const { weaviateApp, weaviateCollections, selectedClass } = useWeaviate()

  const RetrieveCrossReferenceProperty = async (
    className: string,
    property: any,
  ) => {
    console.log('crossReferenceProperty', className, property)

    console.log('weaviateCollections', weaviateCollections.value)
    const classProp = weaviateCollections.value.filter(
      (c: any) => c.class === className,
    )

    selectedClass.value = classProp[0]

    const hasProperty = classProp[0].properties.find(
      (p: any) => p.name === property.name,
    )

    console.log('hasProperty', hasProperty)
    if (hasProperty) {
      console.log('Property already exists')
      return
    }

    // Add the "hasQuestion" cross-reference property to the JeopardyCategory class
    const res = await weaviateApp.schema
      .propertyCreator()
      .withClassName(className)
      .withProperty(property)
      .do()
    console.log(JSON.stringify(res, null, 2))
    return res
  }

  const RetrieveCrossReferenceProperties = async (
    className: string,
    properties: any,
  ) => {
    console.log('crossReferenceProperties', className, properties)

    for (const property of properties) {
      await RetrieveCrossReferenceProperty(className, property)
    }
  }

  return {
    RetrieveCrossReferenceProperty,
    RetrieveCrossReferenceProperties,
  }
}
