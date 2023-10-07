type DataType = 'string' | 'number' | 'boolean' | 'object' | 'array' | 'null' | 'undefined' | 'symbol' | 'bigint' | 'function'

export type ValidateContext = any

export type Validator<T> = (value: T, ctx: ValidateContext) => boolean

export type ValidatorGenerator<T> = (arg: string) => Validator<T>

export interface RuleHandler<T> {
  name: string
  generator: ValidatorGenerator<T>
}

export interface RuleTemplate {
  [key: string]: string | RuleTemplate
}

export interface RuleTree {
  [key: string]: RuleTree | Validator<any>
}
