import {RuleHandler} from "../../types";

const isStr: RuleHandler<unknown> = {
  name: 'string',
  generator: () => (value: unknown) => typeof value === 'string'
}

export const strHandlers: RuleHandler<any>[] = [
  isStr
]
