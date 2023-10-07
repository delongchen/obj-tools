import {RuleHandler, RuleTemplate, RuleTree, ValidateContext, ValidatorGenerator} from './types'
import {handlers} from "./handler";
import {fromObj, fromStr} from "./compile";

const validateObj = (value: unknown, ruleTree: RuleTree, ctx: ValidateContext): boolean => {
  if (typeof value !== 'object' || value === null) {
    return false
  }

  for (const [key, validator] of Object.entries(ruleTree)) {
    const toValidate = Reflect.get(value, key)
    if (typeof validator === 'function') {
      if (!validator(toValidate, ctx)) {
        return false
      }
    } else {
      if (!validateObj(toValidate, validator, ctx)) {
        return false
      }
    }
  }

  return true
}

const newInstance = () => {
  // init instance
  const handlerMap = new Map<string, RuleHandler<any>>()
  for (const handler of handlers) {
    handlerMap.set(handler.name, handler)
  }

  const setHandler = <T>(name: string, generator: ValidatorGenerator<T>) => {
    handlerMap.set(name, { name, generator })
  }

  const signal = (ruleStr: string) => {
    const validator = fromStr(ruleStr, handlerMap)
    return (value: unknown) => validator(value, {})
  }

  const obj = (template: RuleTemplate) => {
    const ruleTree = fromObj(template, handlerMap)
    return (value: unknown) => validateObj(value, ruleTree, {})
  }

  return {
    setHandler,
    obj,
    signal,
  }
}

const defaultInstance = newInstance()

export {
  defaultInstance as validator,
  newInstance,
}
