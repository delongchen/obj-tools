import {RuleHandler} from "../../types";
import {OK} from "../../comm";

// lenStr is a string like 'min-max'
// return an array like [min, max]
// min and max are both number
// if lenStr have no '-', it means lenStr is a number, return [len]
// min should be less than max
// if min is greater than max, warn and return [min, max]
// if min is undefined, it means no min limit, return null
// if max is undefined but min, it means no max limit, return [min, Infinity]
// if min is undefined but max, it means no min limit, return [0, max]
const getScope = (lenStr: string): null | [number, number] | [number] => {
  const scope = lenStr.split('-').map(item => item.trim())
  if (scope.length === 0) {
    return null
  }

  const min = parseInt(scope[0])
  const max = parseInt(scope[1])

  if (isNaN(min) && isNaN(max)) {
    return null
  }

  if (isNaN(min)) {
    return [0, max]
  }

  // max is NaN, there are two situations:
  // 1. scope[1] is undefined, it means there are no '-' here, so lenStr is a number
  // 2. scope[1] is a string, but it is not a number
  if (isNaN(max)) {
    return typeof scope[1] === 'string' ? [min, Infinity] : [min]
  }

  if (min > max) {
    console.warn(`min(${min}) is greater than max(${max})`)
  }

  return [min, max]
}

// get value's length
// now, value can be string, array, object
// will support more types in the future
// TODO: support more types
const getValueLen = (value: unknown): number | undefined => {
  if (typeof value === 'string') {
    return value.length
  }

  if (typeof value === 'object' && value !== null) {
    if (Array.isArray(value)) {
      return value.length
    }
    return Reflect.get(value, 'length')
  }

  return
}

export const handleLen: RuleHandler<unknown> = {
  name: 'len',
  genValidator: (arg) => {
    if (typeof arg !== 'string') {
      return OK
    }

    const scope = getScope(arg)

    // scope is invalid, skip this handler
    if (scope === null) {
      return OK
    }

    if (scope.length === 1) {
      const [len] = scope
      return (value: unknown) => {
        const valueLen = getValueLen(value)
        return valueLen !== undefined && valueLen === len
      }
    }

    const [min, max] = scope

    return (value: unknown) => {
      const len = getValueLen(value)
      return len !== undefined && len >= min && len <= max;
    }
  }
}
