import { generateUuid5 } from 'weaviate-ts-client'
export const useWeaviateObjectCreate = () => {
  const { weaviateApp, weaviateConfig, weaviateClassesName } = useWeaviate()
  const { ownerInfo } = useAccountFunc()
  const { ObjectUpdate } = useWeaviateObjectUpdate()
  const { ObjectRetrieveById } = useWeaviateObjectRetrieve()
  const ObjectCreate = async (className: string, object: any) => {
    const result = await weaviateApp.data
      .creator()
      .withClassName(className)
      .withProperties(object)
      .do()

    console.log(JSON.stringify(result, null, 2)) // the returned value is the object
  }

  const ObjectCreateWithVector = async (className: string, object: any) => {
    const result = await weaviateApp.data
      .creator()
      .withClassName('JeopardyQuestion')
      .withProperties({
        question:
          'This vector DB is OSS and supports automatic property type inference on import',
        answer: 'Weaviate',
      })
      .withVector(Array(1536).fill(0.12345))
      .do()

    console.log(JSON.stringify(result, null, 2))
  }

  const ObjectCreateWithNamedVector = async (
    className: string,
    object: any,
  ) => {
    const result = await weaviateApp.data
      .creator()
      .withClassName('WineReviewNV')
      .withProperties({
        title: 'A delicious Riesling',
        review_body:
          'This wine is a delicious Riesling which pairs well with seafood.',
        country: 'Germany',
      })
      // Specify the named vectors, following the collection definition
      .withVectors({
        title: Array(1536).fill(0.12345),
        review_body: Array(1536).fill(0.31313),
        title_country: Array(1536).fill(0.0505),
      })
      .do()

    console.log(JSON.stringify(result, null, 2)) // the returned value is the object
  }

  const ObjectCreateWithId = async (
    className: string,
    object: any,
    id: string,
  ) => {
    const result = await weaviateApp.data
      .creator()
      .withClassName(className)
      .withProperties(object)
      .withId(id)
      .do()

    console.log(JSON.stringify(result, null, 2)) // the returned value is the object
    return {
      ...result.properties,
      _additional: {
        creationTimeUnix: result.creationTimeUnix,
        id: result.id,
        lastUpdateTimeUnix: result.lastUpdateTimeUnix,
      },
      vector: result.vector ? result.vector : [],
    }
  }

  const ObjectCreateWithDetertministicId = async (
    className: string,
    object: any,
  ) => {
    const dataObj = {
      question:
        'This vector DB is OSS and supports automatic property type inference on import',
      answer: 'Weaviate',
    }

    const result = await weaviateApp.data
      .creator()
      .withClassName('JeopardyQuestion')
      .withProperties(dataObj)
      .withId(generateUuid5(JSON.stringify(dataObj)))
      .do()

    console.log(JSON.stringify(result, null, 2))
  }

  const ObjectCreateWithCrossReferences = async (
    className: string,
    object: any,
    linkClassNames: any,
  ) => {
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

  const crossRef = async () => {}

  const ObjectCreateWithMulitCrossReferences = async (
    className: string,
    object: any,
    linkClassNames: any,
    ownerInfoSup: any = {},
  ) => {
    console.log(
      'ObjectCreateWithMulitCrossReferences',
      className,
      object,
      linkClassNames,
    )

    let newObject = { ...object }

    const addOwner = ownerInfo(ownerInfoSup)

    //remove the linkClassNames from the object
    linkClassNames.forEach((nm: any) => {
      delete newObject[nm.name]
    })
    console.log('OLDOBJECT', object)
    console.log('OWNER', addOwner)

    newObject = { ...newObject, ...addOwner }
    console.log('NEWOBJECT', newObject)

    const resultObject: any = await ObjectCreateWithId(
      className,
      newObject,
      generateUuid5(JSON.stringify(newObject)),
    )

    console.log('resultObject', resultObject)
    console.log('linkClassNames', linkClassNames)
    //create the cross references
    for (const linkClassName of linkClassNames) {
      console.log('linkClassName', linkClassName)
      console.log('object[linkClassName]', object[linkClassName.name])
      //check if the object has the linkClassName and if Array then loop over array and create cross reference
      if (object[linkClassName.name]) {
        if (Array.isArray(object[linkClassName.name])) {
          console.log('IS ARRAY')
          for (const linkObject of object[linkClassName.name]) {
            //check if not defined or null if so continue
            console.log('linkObject', linkObject)
            if (!linkObject) {
              continue
            }
            const ob: any = { ...linkObject, ...addOwner }

            if (ob[className.toLowerCase()]) {
              ob[className.toLowerCase()].push({
                // Specify one or more cross-references
                beacon: `${weaviateConfig.host}/${resultObject._additional.id}`,
              })
            } else {
              ob[className.toLowerCase()] = [
                {
                  // Specify one or more cross-references
                  beacon: `${weaviateConfig.host}/${resultObject._additional.id}`,
                },
              ]
            }
            console.log('ob IN ARRAY', ob)
            let resultOb: any = {}
            if (!ob._additional) {
              console.log('OB NOT ADDITIONAL IN ARRAY')
              resultOb = await ObjectCreateWithId(
                linkClassName.type,
                ob,
                generateUuid5(JSON.stringify(ob)),
              )
              console.log('resultOb', resultOb)
            } else {
              console.log(
                'OB ADDITIONAL IN ARRAY',
                linkClassName.type,
                ob._additional.id,
                ob,
              )
              await ObjectUpdate(linkClassName.type, ob._additional.id, ob)
            }
            const updObj: any = {}
            if (resultObject[linkClassName.name]) {
              updObj[linkClassName.name] = [
                {
                  // Specify one or more cross-references
                  beacon: `${weaviateConfig.host}/${resultOb._additional.id}`,
                },
              ]
            } else {
              updObj[linkClassName.name] = [
                {
                  // Specify one or more cross-references
                  beacon: `${weaviateConfig.host}/${resultOb._additional.id}`,
                },
              ]
            }
            console.log('className', className)
            console.log('resultObject', resultObject._additional.id)
            console.log('updObj IN ARRAY', updObj)

            await ObjectUpdate(className, resultObject._additional.id, updObj)
            resultObject[linkClassName.name] = resultOb
          }
        } else {
          if (!object[linkClassName.name]) {
            continue
          }
          const ob = { ...object[linkClassName.name], ...addOwner }
          console.log('ob NOT', ob)
          if (ob[className.toLowerCase()]) {
            ob[className.toLowerCase()].push({
              // Specify one or more cross-references
              beacon: `${weaviateConfig.host}/${resultObject._additional.id}`,
            })
          } else {
            ob[className.toLowerCase()] = [
              {
                // Specify one or more cross-references
                beacon: `${weaviateConfig.host}/${resultObject._additional.id}`,
              },
            ]
          }
          let resultOb: any = {}
          console.log('obbbb', ob)
          console.log('obbbb additional', ob._additional)

          if (ob._additional === undefined) {
            resultOb = await ObjectCreateWithId(
              linkClassName.type,
              ob,
              generateUuid5(JSON.stringify(ob)),
            )
            console.log('resultOb', resultOb)
          } else {
            console.log(
              'OB ADDITIONAL NOT IN ARRAY',
              linkClassName.type,
              ob._additional.id,
              ob,
            )
            await ObjectUpdate(linkClassName.type, ob._additional.id, ob)
            resultOb = ob
            resultOb._additional = ob._additional
          }
          console.log('resultOb resultOb resultOb', resultOb)
          const updObj: any = {}
          if (resultObject[linkClassName.name]) {
            updObj[linkClassName.name] = [
              {
                // Specify one or more cross-references
                beacon: `${weaviateConfig.host}/${resultOb._additional.id}`,
              },
            ]
          } else {
            updObj[linkClassName.name] = [
              {
                // Specify one or more cross-references
                beacon: `${weaviateConfig.host}/${resultOb._additional.id}`,
              },
            ]
          }
          console.log(
            'className updObj',
            className,
            resultObject._additional.id,
            updObj,
          )
          await ObjectUpdate(className, resultObject._additional.id, updObj)
        }
      }
    }
    console.log('ENDDDD resultObject', resultObject)
    return await ObjectRetrieveById(className, resultObject._additional.id)
  }

  return {
    ObjectCreate,
    ObjectCreateWithVector,
    ObjectCreateWithNamedVector,
    ObjectCreateWithId,
    ObjectCreateWithDetertministicId,
    ObjectCreateWithCrossReferences,
    ObjectCreateWithMulitCrossReferences,
  }
}
