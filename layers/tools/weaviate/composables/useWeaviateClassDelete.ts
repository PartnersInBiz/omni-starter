export const useWeaviateClassDelete = () => {
  const { weaviateApp } = useWeaviate()

  const ClassDelete = async (className: string) => {
    await weaviateApp.schema.classDeleter().withClassName(className).do()
  }

  return {
    ClassDelete,
  }
}
