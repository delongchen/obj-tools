import {RuleHandler} from "../../types";
import {parseRuleList} from "../../comm";
import {compileSignal} from "../../compile";


export const handleAll: RuleHandler<unknown> = {
  name: 'all',
  genValidator: (arg, ctx) => {
    if (typeof arg === 'string') {
      arg = parseRuleList(arg, ',', ':')
    }

    const itemValidator = compileSignal(arg, ctx)

    return (value) => {
      if (typeof value === 'string') {
        value = [...value]
      }

      if (typeof value !== 'object' || value === null) {
        return false
      }

      const iterator = Reflect.get(value, Symbol.iterator)
      if (typeof iterator !== 'function') {
        return false
      }

      for (const item of iterator.call(value)) {
        if (!itemValidator(item)) {
          return false
        }
      }

      return true
    }
  }
}
