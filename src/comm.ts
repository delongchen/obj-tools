import {RuleListType} from "./types";

export const OK = () => true
export const NOT_OK = () => false

export const parseRuleList = (ruleStr: string, itemSeparator: string, kvSeparator: string): RuleListType => {
  const result: RuleListType = []
  const ruleStrList = ruleStr.split(itemSeparator)
  for (const ruleRaw of ruleStrList) {
    const [handlerName, arg] = ruleRaw.split(kvSeparator)
    if (handlerName !== undefined && handlerName !== '') {
      result.push([handlerName.trim(), arg?.trim() ?? ''])
    }
  }
  return result
}
