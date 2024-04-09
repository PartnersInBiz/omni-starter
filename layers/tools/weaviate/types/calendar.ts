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

/*
   shape?: 'straight' | 'rounded' | 'curved'
    class?: text
    attributes: any
    titleposition: text
    expanded: boolean
    borderless: boolean
    transparent: boolean
    trimweeks: boolean
    classcalendar: text
    item_id: text*/

export const weaviateCalendarClasses = {
  name: 'Calendar',
  properties: [
    ...weaviateAllClass,
    {
      name: 'type',
      dataType: ['text'],
      description: 'Type of calendar',
    },
    {
      name: 'name',
      dataType: ['text'],
      description: 'Name of the calendar',
    },
    {
      name: 'description',
      dataType: ['text'],
      description: 'Description of the calendar',
    },
    {
      name: 'shape',
      dataType: ['text'],
      description: 'Shape of the calendar',
    },
    {
      name: 'class',
      dataType: ['text'],
      description: 'Class of the calendar',
    },
    {
      name: 'attributes',
      dataType: ['CalendarAttributes'],
      description: 'Attributes of the calendar',
    },
    {
      name: 'titleposition',
      dataType: ['text'],
      description: 'Title position of the calendar',
    },
    {
      name: 'expanded',
      dataType: ['boolean'],
      description: 'Expanded of the calendar',
    },
    {
      name: 'borderless',
      dataType: ['boolean'],
      description: 'Borderless of the calendar',
    },
    {
      name: 'transparent',
      dataType: ['boolean'],
      description: 'Transparent of the calendar',
    },
    {
      name: 'trimweeks',
      dataType: ['boolean'],
      description: 'Trim weeks of the calendar',
    },
    {
      name: 'classcalendar',
      dataType: ['text'],
      description: 'Class calendar of the calendar',
    },
  ],
}

export const weaviateCalendarAttributesClasses = {
  name: 'CalendarAttributes',
  properties: [
    ...weaviateAllClass,
    {
      name: 'type',
      dataType: ['text'],
      description: 'Type of calendar',
    },
    {
      name: 'name',
      dataType: ['text'],
      description: 'Name of the calendar',
    },
    {
      name: 'description',
      dataType: ['text'],
      description: 'Description of the calendar',
    },
    { dataType: ['text'], name: 'key' },
    {
      dataType: ['object'],
      name: 'highlight',
      nestedProperties: [
        { dataType: ['text'], name: 'color' },
        { dataType: ['text'], name: 'fillMode' },
        { dataType: ['text'], name: 'contentClass' },
        {
          dataType: ['object'],
          name: 'start',
          nestedProperties: [{ dataType: ['text'], name: 'fillMode' }],
        },
        {
          dataType: ['object'],
          name: 'base',
          nestedProperties: [{ dataType: ['text'], name: 'fillMode' }],
        },
        {
          dataType: ['object'],
          name: 'end',
          nestedProperties: [{ dataType: ['text'], name: 'fillMode' }],
        },
      ],
    },
    {
      dataType: ['object'],
      name: 'content',
      nestedProperties: [
        { dataType: ['boolean'], name: 'isComplete' },
        { dataType: ['text'], name: 'color' },
        {
          dataType: ['object'],
          name: 'Configuration',
          nestedProperties: [
            {
              dataType: ['object'],
              name: 'style',
              nestedProperties: [{ dataType: ['text'], name: 'color' }],
            },
          ],
        },
      ],
    },
    {
      dataType: ['object'],
      name: 'dot',
      nestedProperties: [
        { dataType: ['boolean'], name: 'isCompleted' },
        { dataType: ['text'], name: 'color' },
        {
          dataType: ['object'],
          name: 'Configuration',
          nestedProperties: [
            {
              dataType: ['object'],
              name: 'style',
              nestedProperties: [
                { dataType: ['text'], name: 'backgroundColor' },
              ],
            },
          ],
        },
      ],
    },
    {
      dataType: ['object'],
      name: 'bar',
      nestedProperties: [
        { dataType: ['boolean'], name: 'isCompleted' },
        { dataType: ['text'], name: 'color' },
        {
          dataType: ['object'],
          name: 'Configuration',
          nestedProperties: [
            {
              dataType: ['object'],
              name: 'style',
              nestedProperties: [
                { dataType: ['text'], name: 'backgroundColor' },
              ],
            },
          ],
        },
      ],
    },
   
    {
      dataType: ['object'],
      name: 'dates',
      nestedProperties: [
        { dataType: ['date'], name: 'start' },
        { dataType: ['date'], name: 'end' },
      ],
    },
    {
      dataType: ['object'],
      name: 'todos',
      nestedProperties: [
        { dataType: ['text'], name: 'description' },
        { dataType: ['boolean'], name: 'isComplete' },
        {
          dataType: ['object'],
          name: 'dates',
          nestedProperties: [
            {
              dataType: ['object'],
              name: 'repeat',
              nestedProperties: [{ dataType: ['number'], name: 'weekdays' }],
            },
          ],
        },
        { dataType: ['text'], name: 'color' },
      ],
    },
    {
      dataType: ['object'],
      name: 'attributes',
      nestedProperties: [
        { dataType: ['object'], name: 'dates', nestedProperties: [
          { dataType: ['number'], name: 'weekdays' },
      ]},
        {
          dataType: ['object'],
          name: 'dot',
          nestedProperties: [
            { dataType: ['text'], name: 'color' },
            { dataType: ['text'], name: 'class' },
          ],
        },
        { dataType: ['boolean'], name: 'popover' },
        // { dataType: ['object'], name: 'customData' },
      ],
    },
  ],
}
