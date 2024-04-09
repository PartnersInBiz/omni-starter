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
  
  export const weaviateSnakeClasses = {
    name: 'Snake',
    properties: [
      ...weaviateAllClass,
      {
        name: 'type',
        dataType: ['text'],
        description: 'Type of the snake competition',
      },
      {
        name: 'name',
        dataType: ['text'],
        description: 'Name of the snake competition',
      },
      {
        name: 'description',
        dataType: ['text'],
        description: 'Description of the snake competition',
      },
      {
        name: 'layout',
        dataType: ['text'],
        description: 'Layout of the snake competition',
      },
      {
        name: 'start_date',
        dataType: ['date'],
        description: 'Start date of the snake competition',
      },
      {
        name: 'end_date',
        dataType: ['date'],
        description: 'End date of the snake competition',
      },
      {
        name: 'customer',
        dataType: ['Account'],
        description: 'Customer of the snake competition',
      },
      {
        name: 'players',
        dataType: ['Account[]'],
        description: 'Customer of the snake competition',
      },
      {
        name: 'leaderboard',
        dataType: ['SnakeLeaderboard[]'],
        description: 'Customer of the snake competition',
      },
      // {
      //   name: "files",
      //   dataType: ["Media"],
      //   description: "Files of the snake competition",
      //   cardinality: "many",
      // },
      // {
      //   name: "avatar",
      //   dataType: ["Media"],
      //   description: "Avatar of the snake competition",
      // },
      // {
      //   name: "icon",
      //   dataType: ["Media"],
      //   description: "Icon of the snake competition",
      // },
      // {
      //   name: "icon_dark",
      //   dataType: ["Media"],
      //   description: "Dark icon of the snake competition",
      // },
      // {
      //   name: "background",
      //   dataType: ["Media"],
      //   description: "Background of the snake competition",
      // },
  
      {
        name: 'action',
        dataType: ['FormActions'],
        cardinality: 'many',
        description: 'Actions of the snake competition',
      },
      {
        name: 'budget',
        dataType: ['text'],
        description: 'Budget of the snake competition',
      },
      {
        name: 'notifications',
        dataType: ['boolean'],
        description: 'Notifications of the snake competition',
      },
      {
        name: 'stage',
        dataType: ['text'],
        description: 'Stage of the snake competition',
      },
      {
        name: 'prizes',
        dataType: ['object[]'],
        description: 'Prizes of the snake competition',
        nestedProperties: [
            { dataType: ['text'], name: 'name' },
            { dataType: ['number'], name: 'value' },
            { dataType: ['text'], name: 'description' },
            { dataType: ['number'], name: 'rank' },

        ],
      },
      {
        name: 'tile_count',
        dataType: ['number'],
        description: 'Tile count of the snake competition',
      },
      {
        name: 'rating',
        dataType: ['number'],
        description: 'Rating of the snake competition',
      },
      {
        name: 'colors',
        dataType: ['object'],
        description: 'Colors of the snake competition',
        nestedProperties: [
          { dataType: ['text'], name: 'head' },
          { dataType: ['text'], name: 'snake' },
          { dataType: ['text'], name: 'apple' },
          { dataType: ['text'], name: 'board' },
        ],
      },
      {
        name: 'configuration',
        dataType: ['uuid'],
        description: 'Configuration of the snake competition',
      },
     
    ],
  }


  export const weaviateSnakeLeaderboardClasses = {
    name: 'SnakeLeaderboard',
    properties: [
      ...weaviateAllClass,
        {
            name: 'snake',
            dataType: ['Snake'],
            description: 'Snake of the snake leaderboard',
        },
        {
            name: 'player',
            dataType: ['Account'],
            description: 'Player of the snake leaderboard',
        },
        {
            name: 'score',
            dataType: ['number'],
            description: 'Score of the snake leaderboard',
        },
        {
            name: 'rank',
            dataType: ['number'],
            description: 'Rank of the snake leaderboard',
        },
        {
            name: 'status',
            dataType: ['text'],
            description: 'Status of the snake leaderboard',
        },
        {
            name: 'prize',
            dataType: ['text'],
            description: 'Prize of the snake leaderboard',
        },
        {
            name: 'position',
            dataType: ['text'],
            description: 'Position of the snake leaderboard',
        },
    ],
    }
      