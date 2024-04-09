import { z } from 'zod'
export const useForms = () => {
  const parseRule = (rule: string) => {
    const parts = rule.split('|')
    let schema = z.string() // Default to string schema

    for (const part of parts) {
      if (part === 'required') {
        schema = schema.nonempty()
      } else if (part.startsWith('min:')) {
        const min = parseInt(part.split(':')[1])
        schema = schema.min(min)
      } else if (part.startsWith('max:')) {
        const max = parseInt(part.split(':')[1])
        schema = schema.max(max)
      } else if (part === 'email') {
        schema = schema.email()
      } else if (part === 'url') {
        schema = schema.url()
      } else if (part === 'optional') {
      }
    }

    return schema
  }

  const zodSchema = (rules: any, superRefine: any) => {
    z.object({
      event: z.object(
        rules.reduce(
          (
            acc: { [x: string]: z.ZodString },
            rule: { field: string | number; rule: string },
          ) => {
            acc[rule.field] = parseRule(rule.rule)
            return acc
          },
          {} as Record<string, any>,
        ),
      ),
    }).superRefine((data, ctx) => {
      for (const rule of superRefine) {
        if (
          rule.type === 'includes' &&
          data.event[rule.field].includes(data.event[rule.value])
        ) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: rule.message,
            path: rule.path,
          })
        } else if (
          rule.type === '!match' &&
          data.event[rule.field] !== data.event[rule.value]
        ) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: rule.message,
            path: rule.path,
          })
        } else if (
          rule.type === 'match' &&
          data.event[rule.field] === data.event[rule.value]
        ) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: rule.message,
            path: rule.path,
          })
        }
        // Add more conditions here for other rule types
      }
    })
  }

  return {
    parseRule,
    zodSchema,
  }
}
