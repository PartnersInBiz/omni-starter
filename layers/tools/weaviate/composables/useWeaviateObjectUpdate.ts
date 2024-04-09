export const useWeaviateObjectUpdate = () => {
  const { weaviateApp, weaviateConfig, generateUuid5 } = useWeaviate()
  const { ownerInfo } = useAccountFunc()
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

  const ObjectUpdate = async (
    className: string,
    id: string,
    properties: any,
  ) => {
    try {
      console.log('updateObject', className, id, properties)
      if (properties._additional) delete properties._additional
      const res = await weaviateApp.data
        .merger() // merges properties into the object
        .withId(id)
        .withClassName(className)
        .withProperties(properties)
        .do()

      console.log('UDPATE OBJECT', res)
      console.log(JSON.stringify(res, null, 2))
      return res
    } catch (e) {
      console.log('ERROR', e)
      return e
    }
  }

  const ObjectReplace = async (
    className: string,
    id: string,
    properties: any,
  ) => {
    await weaviateApp.data
      .updater() // replaces the entire object
      .withId(id)
      .withClassName(className)
      .withProperties(properties)
      .do()
  }

  const ObjectUpdateWithMulitCrossReferences = async (
    className: string,
    object: any,
    linkClassNames: any,
    ownerInfoSup: any = {},
  ) => {
    console.log(
      'ObjectUpdateWithMulitCrossReferences',
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
    console.log('NEWOBJECT ID', newObject._additional)

    await ObjectUpdate(className, object._additional.id, newObject)

    console.log('newObject', newObject)
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
            console.log('linkObject is here', linkObject)
            console.log('linkObject is here', linkObject._additional)

            if (!linkObject) {
              continue
            }
            const ob: any = { ...linkObject, ...addOwner }
            if (linkObject._additional) {
              ob._additional = linkObject._additional
              console.log('OB HAS RECEIBED', ob)
            }

            if (ob[className.toLowerCase()]) {
              ob[className.toLowerCase()].push({
                // Specify one or more cross-references
                beacon: `${weaviateConfig.host}/${object._additional.id}`,
              })
            } else {
              ob[className.toLowerCase()] = [
                {
                  // Specify one or more cross-references
                  beacon: `${weaviateConfig.host}/${object._additional.id}`,
                },
              ]
            }
            console.log('ob IN ARRAY', ob)
            let resultOb: any = {}
            if (
              ob._additional === undefined ||
              ob._additional === null ||
              !ob._additional
            ) {
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
              resultOb = ob
              resultOb._additional = ob._additional
            }
            const updObj: any = {}

            if (newObject[linkClassName.name]) {
              const isIn = newObject[linkClassName.name].filter((el: any) => {
                return (
                  el.beacon ===
                  `${weaviateConfig.host}/${resultOb._additional.id}`
                )
              })

              if (isIn.length == 0) {
                updObj[linkClassName.name] = [
                  {
                    // Specify one or more cross-references
                    beacon: `${weaviateConfig.host}/${resultOb._additional.id}`,
                  },
                ]
              }
            } else {
              updObj[linkClassName.name] = [
                {
                  // Specify one or more cross-references
                  beacon: `${weaviateConfig.host}/${resultOb._additional.id}`,
                },
              ]
            }
            console.log('className', className)
            console.log('newObject', object._additional.id)
            console.log('updObj IN ARRAY', updObj)

            await ObjectUpdate(className, object._additional.id, updObj)
            newObject[linkClassName.name] = resultOb
          }
        } else {
          if (!object[linkClassName.name]) {
            continue
          }
          const ob = { ...object[linkClassName.name], ...addOwner }
          console.log('ob NOT', ob)

          if (object[linkClassName.name]._additional) {
            ob._additional = object[linkClassName.name]._additional
            console.log('OB HAS RECEIBED', ob)
          }

          if (ob[className.toLowerCase()]) {
            const isIn = ob[className.toLowerCase()].filter((el: any) => {
              return (
                el.beacon ===
                `${weaviateConfig.host}/${resultOb._additional.id}`
              )
            })
            if (isIn.length == 0) {
              ob[className.toLowerCase()].push({
                // Specify one or more cross-references
                beacon: `${weaviateConfig.host}/${object._additional.id}`,
              })
            }
          } else {
            ob[className.toLowerCase()] = [
              {
                // Specify one or more cross-references
                beacon: `${weaviateConfig.host}/${object._additional.id}`,
              },
            ]
          }
          let resultOb: any = {}
          console.log('obbbb', ob)
          console.log('obbbb additional', ob._additional)

          if (
            ob._additional === undefined ||
            ob._additional === null ||
            !ob._additional
          ) {
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
          if (newObject[linkClassName.name]) {
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
            object._additional.id,
            updObj,
          )
          await ObjectUpdate(className, object._additional.id, updObj)
        }
      }
    }
    console.log('ENDDDD newObject', newObject)
    return newObject
  }

  return {
    ObjectUpdate,
    ObjectReplace,
    ObjectUpdateWithMulitCrossReferences,
  }
}
