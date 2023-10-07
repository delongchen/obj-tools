import {RuleHandler, RuleTemplate, RuleTree, Validator} from "./types";

type HandlerMap = Map<string, RuleHandler<any>>

export const fromStr = (ruleStr: string, handlerMap: HandlerMap): Validator<unknown> => {
  const ruleStrList = ruleStr.split('&')
  if (ruleStrList.length === 0) {
    return () => true
  }

  const validatorList: Validator<unknown>[] = []
  const existValidatorSet = new Set<string>()

  for (const ruleRaw of ruleStrList) {
    const [handlerName, arg] = ruleRaw.split('=')
    if (handlerName !== undefined && handlerName !== '') {
      const handler = handlerMap.get(handlerName.trim())
      if (handler !== undefined && !existValidatorSet.has(handlerName)) {
        validatorList.push(handler.generator(arg?.trim() ?? ''))
        existValidatorSet.add(handlerName)
      }
    }
  }

  return (value, ctx) => {
    for (const validator of validatorList) {
      if (!validator(value, ctx)) {
        return false
      }
    }
    return true
  }
}

export const fromObj = (template: RuleTemplate, handlerMap: HandlerMap): RuleTree => {
  const ruleTree: RuleTree = {}
  for (const [key, value] of Object.entries(template)) {
    if (typeof value === 'string') {
      ruleTree[key] = fromStr(value, handlerMap)
    } else {
      ruleTree[key] = fromObj(value, handlerMap)
    }
  }
  return ruleTree
}

