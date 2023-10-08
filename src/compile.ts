import {InstanceContext, RuleListType, RuleTemplate, RuleTree, Validator} from "./types";
import {parseRuleList} from "./comm";


export const compileSignal = (signalRule: string | RuleListType, ctx: InstanceContext, key?: string) => {
  const { handlerMap } = ctx

  if (typeof signalRule === 'string') {
    signalRule = parseRuleList(signalRule, '&', '=')
  }

  if (signalRule.length === 0) {
    return () => true
  }

  const validatorList: Validator<unknown>[] = []
  const existValidatorSet = new Set<string>()

  for (const rule of signalRule) {
    const [handlerName, arg] = rule
    const handler = handlerMap.get(handlerName.trim())
    if (handler !== undefined && !existValidatorSet.has(handlerName)) {
      validatorList.push(handler.genValidator(arg, ctx))
      existValidatorSet.add(handlerName)
    }
  }

  const validateContext = {
    key: key ?? ''
  }

  return (value: unknown) => {
    for (const validator of validatorList) {
      if (!validator(value, validateContext)) {
        return false
      }
    }
    return true
  }
}

export const compile = (template: RuleTemplate, ctx: InstanceContext, keyPath: string[]): RuleTree => {
  const ruleTree: RuleTree = {}
  for (const [key, value] of Object.entries(template)) {
    keyPath.push(key)
    if (typeof value === 'string') {
      ruleTree[key] = compileSignal(value, ctx, keyPath.join('.'))
    } else {
      ruleTree[key] = compile(value, ctx, keyPath)
    }
    keyPath.pop()
  }
  return ruleTree
}

