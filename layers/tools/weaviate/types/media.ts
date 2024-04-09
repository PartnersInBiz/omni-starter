export const weaviateAllClass = [
  {
    name: 'user',
    description: 'ID of the user that created',
    dataType: ['User'],
  },
  {
    name: 'main_account',
    description: 'ID of the account that created',
    dataType: ['Account'],
  },
  {
    name: 'access_contact',
    description: 'ID of the team that has access',
    dataType: ['Contact'],
    cardinality: 'many',
  },
  {
    name: 'access_account',
    description: 'ID of the account team that has access',
    dataType: ['Account'],
    cardinality: 'many',
  },
  {
    name: 'linked_contact',
    description: 'ID of the contacts record belongs too',
    dataType: ['Contact'],
    cardinality: 'many',
  },
  {
    name: 'linked_account',
    description: 'ID of the account record belongs too',
    dataType: ['Account'],
    cardinality: 'many',
  },
]

export const weaviateMediaClasses = {
  name: 'Media',
  properties: [
    ...weaviateAllClass,
    {
      name: 'name',
      dataType: ['text'],
    },
    {
      name: 'type',
      dataType: ['text'],
    },
    {
      name: 'url',
      dataType: ['text'],
    },
    {
      name: 'media',
      dataType: ['text'],
    },
    {
      name: 'image',
      dataType: ['blob'],
    },
    {
      name: 'audio',
      dataType: ['blob'],
    },
    {
      name: 'video',
      dataType: ['blob'],
    },
    {
      name: 'description',
      dataType: ['text'],
    },
    {
      name: 'tags',
      dataType: ['text[]'],
    },
    {
      name: 'size',
      dataType: ['number'],
    },
    {
      name: 'width',
      dataType: ['number'],
    },
    {
      name: 'height',
      dataType: ['number'],
    },
    {
      name: 'duration',
      dataType: ['number'],
    },
    {
      name: 'resolution',
      dataType: ['text'],
    },
    {
      name: 'metadata',
      dataType: ['object'],
      nestedProperties: [
        { dataType: ['text'], name: 'key' },
        { dataType: ['text'], name: 'value' },
      ],
    },
  ],
}
