export interface Form {
  type: string
  title: string
  subtitle: string
  icon: string
  fields: FormField[]
  actions: FormAction[]
  is_edit: boolean
}

export interface FormField {
  id: string
  type: string
  label: string
  placeholder: string
  value: string
  required: boolean
  disabled: boolean
  options: FormFieldOption[]
  error: string
}

export interface FormFieldOption {
  id: string
  label: string
  value: string
}

export interface FormAction {
  id: string
  label: string
  type: string
  disabled: boolean
  action: string
}
