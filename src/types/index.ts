type DataType = 'string' | 'number' | 'boolean' | 'object' | 'array' | 'null' | 'undefined' | 'symbol' | 'bigint' | 'function'

export type ValidatorContext = any

export type RuleListType = [string, string | RuleListType][]

export type Validator<T> = (value: T, ctx: ValidatorContext) => boolean

export type HandlerMap = Map<string, RuleHandler<any>>

export interface InstanceContext {
  handlerMap: HandlerMap
}

export type ValidatorGenerator<T> = (arg: string | RuleListType, ctx: InstanceContext) => Validator<T>

export interface RuleHandler<T> {
  name: string
  genValidator: ValidatorGenerator<T>
}

export interface RuleTemplate {
  [key: string]: string | RuleTemplate
}

export interface RuleTree {
  [key: string]: RuleTree | ((value: unknown) => boolean)
}
