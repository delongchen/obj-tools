import {RuleHandler} from "../../types";

const handleIsStr: RuleHandler<unknown> = {
  name: 'string',
  genValidator: () => (value: unknown) => typeof value === 'string'
}

export const strHandlers: RuleHandler<any>[] = [
  handleIsStr
]
