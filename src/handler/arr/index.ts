import {RuleHandler} from "../../types";

const handleIsArr: RuleHandler<unknown> = {
  name: 'array',
  genValidator: () => (value: unknown) => Array.isArray(value)
}

export const arrHandlers: RuleHandler<any>[] = [
  handleIsArr
]
