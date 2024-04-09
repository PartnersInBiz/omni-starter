export const useWeaviateTenants = () => {
  const { weaviateApp } = useWeaviate()

  const EnableMultiTenancy = async () => {
    await weaviateApp.schema
      .classCreator()
      .withClass({
        class: 'MultiTenancyCollection',
        multiTenancyConfig: { enabled: true },
      })
      .do()
  }

  const TenantsCreate = async () => {
    const tenants = await weaviateApp.schema
      .tenantsCreator('MultiTenancyCollection', [
        { name: 'tenantA' },
        { name: 'tenantB' },
      ])
      .do()
  }

  const TenantsList = async () => {
    const tenants = await weaviateApp.schema
      .tenantsGetter('MultiTenancyCollection')
      .do()
    console.log(JSON.stringify(tenants, null, 2))
  }

  const TenantsDelete = async () => {
    await weaviateApp.schema
      .tenantsDeleter('MultiTenancyCollection', ['tenantB', 'tenantX']) // tenantX will be ignored
      .do()
  }

  const CrudMultiTenancy = async () => {
    const object = await weaviateApp.data
      .creator()
      .withClassName('MultiTenancyCollection') // The class to which the object will be added
      .withProperties({
        question:
          'This vector DB is OSS & supports automatic property type inference on import',
      })
      .withTenant('tenantA') // The tenant to which the object will be added
      .do()
  }

  const SearchMultiTenancy = async () => {
    const result = await weaviateApp.graphql
      .get()
      .withClassName('MultiTenancyCollection')
      .withFields('question')
      .withTenant('tenantA')
      .do()
    console.log(JSON.stringify(result, null, 2))
  }

  const MultiTenancy = async (object: any, category: any) => {
    // Add the cross-reference property to the multi-tenancy class
    await weaviateApp.schema
      .propertyCreator()
      .withClassName('MultiTenancyCollection')
      .withProperty({
        name: 'hasCategory',
        dataType: ['JeopardyCategory'],
      })
      .do()

    // Create the cross-reference from MultiTenancyCollection object to the JeopardyCategory object
    await weaviateApp.data
      .referenceCreator()
      .withClassName('MultiTenancyCollection')
      .withTenant('tenantA')
      .withId(object.id) // MultiTenancyCollection object id (a Jeopardy question)
      .withReferenceProperty('hasCategory')
      .withReference(
        weaviateApp.data
          .referencePayloadBuilder()
          .withClassName('JeopardyCategory')
          .withId(category.id)
          .payload(),
      )
      .do()
  }

  return {
    EnableMultiTenancy,
    TenantsCreate,
    TenantsList,
    TenantsDelete,
    CrudMultiTenancy,
    SearchMultiTenancy,
    MultiTenancy,
  }
}
