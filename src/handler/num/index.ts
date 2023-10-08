import {RuleHandler} from "../../types";

const handleIsNum: RuleHandler<unknown> = {
  name: 'number',
  genValidator: () => (value: unknown) => typeof value === 'number'
}

export const numHandlers: RuleHandler<any>[] = [
  handleIsNum
]
