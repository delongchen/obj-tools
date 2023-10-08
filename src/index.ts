import {RuleHandler, RuleTemplate, RuleTree} from './types'
import {handlers} from "./handler";
import {compile, compileSignal} from "./compile";

const validateObj = (value: unknown, ruleTree: RuleTree): boolean => {
  if (typeof value !== 'object' || value === null) {
    return false
  }

  for (const [key, validator] of Object.entries(ruleTree)) {
    const toValidate = Reflect.get(value, key)

    if (typeof validator === 'function') {
      if (!validator(toValidate)) {
        return false
      }
    } else {
      if (!validateObj(toValidate, validator)) {
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

  const instanceContext = {
    handlerMap
  }

  const setHandler = <T>(handler: RuleHandler<T>) => {
    handlerMap.set(handler.name, handler)
  }

  const signal = (signalRule: string) => {
    const validator = compileSignal(signalRule, instanceContext)
    return (value: unknown) => validator(value)
  }

  const obj = (template: RuleTemplate) => {
    const ruleTree = compile(template, instanceContext, [])
    return (value: unknown) => validateObj(value, ruleTree)
  }

  const validate = (value: unknown, rule?: string | RuleTemplate) => {
    if (rule === undefined) {
      return true
    }

    if (typeof rule === 'string') {
      return signal(rule)(value)
    } else {
      return obj(rule)(value)
    }
  }

  return {
    setHandler,
    obj,
    signal,
    validate
  }
}

const defaultInstance = newInstance()

export {
  defaultInstance as validator,
  newInstance,
}
