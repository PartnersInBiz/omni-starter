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

export const weaviateSocialsClasses = {
  name: 'Socials',
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
      name: 'description',
      dataType: ['text'],
    },
    {
      name: 'tags',
      dataType: ['text[]'],
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
