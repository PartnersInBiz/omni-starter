export const useSnakeForms = () => {
    const {  snakeCompetitions,
        selectedSnakeCompetition, } = useSnake()
    const { ObjectUpdate } = useWeaviateObjectUpdate()
  
    const snakeFormSchema = ref({
      rules: [{ field: 'name', rule: 'string|min:2|required' }],
      superRefine: [],
      fields: [
        {
          label: 'Type',
          name: 'type',
          as: 'input',
          type: 'text',
          placeholder: 'Type',
          component: 'BaseSelect',
          shape: 'curved',
          icon: 'lucide:type',
          value: '',
          required: true,
          disabled: false,
          class: 'col-span-12',
          options: [
            { label: 'Versus', value: 'vs' },
            { label: 'Solo', value: 'solo' },
          ],
        },
        {
          label: 'Name',
          name: 'name',
          as: 'input',
          type: 'text',
          placeholder: 'Name',
          component: 'BaseInput',
          shape: 'curved',
          icon: 'bxs:rename',
          value: '',
          required: true,
          disabled: false,
          class: 'col-span-12',
        },
        {
          label: 'Description',
          name: 'description',
          as: 'input',
          type: 'text',
          placeholder: 'Description',
          component: 'BaseTextarea',
          shape: 'curved',
          icon: 'ic:twotone-email',
          value: '',
          required: true,
          disabled: false,
          class: 'col-span-12 mt-3',
        },
        {
          label: 'Tile Count',
          name: 'tile_count',
          as: 'input',
          type: 'number',
          placeholder: 'Tile Count',
          component: 'BaseInput',
          shape: 'curved',
          icon: 'bxs:rename',
          value: 20,
          required: true,
          disabled: false,
          class: 'col-span-12',
        },
        {
          label: 'Layout',
          name: 'layout',
          as: 'input',
          type: 'text',
          placeholder: 'Layout',
          component: 'BaseSelect',
          shape: 'curved',
          icon: 'material-symbols:folder-data-rounded',
          value: '',
          required: true,
          disabled: false,
          class: 'col-span-12 mt-3',
          options: [
            { label: 'Default', value: 'default' },
            { label: 'Custom', value: 'custom' },
          ],
        },
        {
            label: 'Start Date',
            name: 'start_date',
            as: 'input',
            type: 'date',
            placeholder: 'Start Date',
            component: 'BaseDatepicker',
            shape: 'curved',
            icon: 'ic:twotone-email',
            value: new Date().toISOString(),
            required: true,
            disabled: false,
            class: 'col-span-6 mt-3',
          },
            {
                label: 'End Date',
                name: 'end_date',
                as: 'input',
                type: 'date',
                placeholder: 'End Date',
                component: 'BaseDatepicker',
                shape: 'curved',
                icon: 'ic:twotone-email',
                value: new Date().toISOString(),
                required: true,
                disabled: false,
                class: 'col-span-6 mt-3',
            },
      ],
    })
  
  
    const submit_snake = async () => {
      const obj: any = {}
      snakeFormSchema.value.fields.map((field) => {
        obj[field.name] = field.value
      })
      await ObjectUpdate('Snake', selectedSnakeCompetition.value._additional.id, obj)
    }
  
    const updated_snake = (data: any) => {
      // loop over data and update the edit.value.schema
      for (const key in data) {
        selectedSnakeCompetition.value[key] = data[key]
      }
    }
  
    const snakeFormSchemaWithData = computed(() => {
      for (const key in snakeFormSchema.value.fields) {
        snakeFormSchema.value.fields[key].value =
        selectedSnakeCompetition.value[snakeFormSchema.value.fields[key].name] || ''
      }
      return snakeFormSchema.value
    })
  
  
    return {
      snakeFormSchema,
      updated_snake,
      submit_snake,
      snakeFormSchemaWithData,
    }
  }
  