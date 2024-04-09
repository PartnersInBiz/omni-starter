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
  {
    name: 'linked_project',
    dataType: ['Project'],
    cardinality: 'many',
  },
]

export const weaviateFormClasses = {
  name: 'Form',
  properties: [
    ...weaviateAllClass,
    {
      name: 'type',
      dataType: ['text'],
      description: 'Type of the form',
    },
    {
      name: 'name',
      dataType: ['text'],
      description: 'Name of the form',
    },
    {
      name: 'description',
      dataType: ['text'],
      description: 'Description of the form',
    },
    {
      name: 'layout',
      dataType: ['text'],
      description: 'Layout of the form',
    },
    {
      name: 'start_date',
      dataType: ['date'],
      description: 'Start date of the form',
    },
    {
      name: 'end_date',
      dataType: ['date'],
      description: 'End date of the form',
    },
    {
      name: 'customer',
      dataType: ['Account'],
      description: 'Customer of the form',
    },
    // {
    //   name: "files",
    //   dataType: ["Media"],
    //   description: "Files of the form",
    //   cardinality: "many",
    // },
    // {
    //   name: "avatar",
    //   dataType: ["Media"],
    //   description: "Avatar of the form",
    // },
    // {
    //   name: "icon",
    //   dataType: ["Media"],
    //   description: "Icon of the form",
    // },
    // {
    //   name: "icon_dark",
    //   dataType: ["Media"],
    //   description: "Dark icon of the form",
    // },
    // {
    //   name: "background",
    //   dataType: ["Media"],
    //   description: "Background of the form",
    // },

    {
      name: 'action',
      dataType: ['FormActions'],
      cardinality: 'many',
      description: 'Actions of the form',
    },
    {
      name: 'pages',
      dataType: ['Page'],
      cardinality: 'many',
      description: 'Pages of the form',
    },
    {
      name: 'budget',
      dataType: ['text'],
      description: 'Budget of the form',
    },
    {
      name: 'notifications',
      dataType: ['boolean'],
      description: 'Notifications of the form',
    },
    {
      name: 'stage',
      dataType: ['text'],
      description: 'Stage of the form',
    },
    {
      name: 'colors',
      dataType: ['object'],
      description: 'Colors of the form',
      nestedProperties: [
        { dataType: ['text'], name: 'primary' },
        { dataType: ['text'], name: 'secondary' },
        { dataType: ['text'], name: 'tertiary' },
        { dataType: ['text'], name: 'success' },
        { dataType: ['text'], name: 'warning' },
        { dataType: ['text'], name: 'danger' },
        { dataType: ['text'], name: 'info' },
      ],
    },
    {
      name: 'configuration',
      dataType: ['uuid'],
      description: 'Configuration of the form',
    },
    {
      name: 'form',
      dataType: ['object'],
      description: 'Form template',
      nestedProperties: [
        {
          dataType: ['object[]'],
          name: 'rules',
          nestedProperties: [
            { dataType: ['text'], name: 'field' },
            { dataType: ['text'], name: 'rule' },
          ],
        },
        {
          dataType: ['object[]'],
          name: 'superRefine',
          nestedProperties: [
            { dataType: ['text'], name: 'type' },
            { dataType: ['text'], name: 'field' },
            { dataType: ['text'], name: 'value' },
            { dataType: ['text'], name: 'code' },
            { dataType: ['text'], name: 'message' },
            { dataType: ['text'], name: 'path' },
          ],
        },
        {
          dataType: ['object[]'],
          name: 'fields',
          nestedProperties: [
            { dataType: ['text'], name: 'label' },
            { dataType: ['text'], name: 'name' },
            { dataType: ['text'], name: 'as' },
            { dataType: ['text'], name: 'type' },
            { dataType: ['text'], name: 'placeholder' },
            { dataType: ['text'], name: 'component' },
            { dataType: ['text'], name: 'shape' },
            { dataType: ['text'], name: 'icon' },
            { dataType: ['text'], name: 'value' },
            { dataType: ['boolean'], name: 'required' },
            { dataType: ['boolean'], name: 'disabled' },
            { dataType: ['text'], name: 'class' },
            {
              dataType: ['object[]'],
              name: 'options',
              nestedProperties: [
                { dataType: ['text'], name: 'value' },
                { dataType: ['text'], name: 'label' },
              ],
            },
            {
              dataType: ['object[]'],
              name: 'items',
              nestedProperties: [
                { dataType: ['text'], name: 'value' },
                { dataType: ['text'], name: 'label' },
              ],
            },
            { dataType: ['text'], name: 'collection' },
            {
              dataType: ['object[]'],
              name: 'withWhere',
              nestedProperties: [
                { dataType: ['text[]'], name: 'path' },
                { dataType: ['text'], name: 'operator' },
                { dataType: ['text'], name: 'valueText' },
                { dataType: ['text'], name: 'valueNumber' },
                { dataType: ['text'], name: 'valueBoolean' },
                { dataType: ['text'], name: 'valueDate' },
                { dataType: ['text'], name: 'valueGeoCoordinates' },
                { dataType: ['text'], name: 'valuePhoneNumber' },
                { dataType: ['text'], name: 'valueBlob' },
                { dataType: ['text[]'], name: 'valueTextArray' },
                { dataType: ['text[]'], name: 'valueNumberArray' },
                { dataType: ['text[]'], name: 'valueBooleanArray' },
                { dataType: ['text[]'], name: 'valueDateArray' },
                { dataType: ['text[]'], name: 'valueGeoCoordinatesArray' },
                { dataType: ['text[]'], name: 'valuePhoneNumberArray' },
                { dataType: ['text[]'], name: 'valueBlobArray' },
              ],
            },
          ],
        },
      ],
    },
  ],
}

export const weaviateFormActionsClasses = {
  name: 'FormActions',
  properties: [
    ...weaviateAllClass,
    {
      name: 'name',
      dataType: ['text'],
      description: 'Name of action',
    },
    {
      name: 'description',
      dataType: ['text'],
      description: 'Description of action',
    },
    {
      name: 'logo',
      dataType: ['text'],
      description: 'Icon of action',
    },
    {
      name: 'configuration',
      dataType: ['uuid'],
      description: 'Config of action',
    },
  ],
}
