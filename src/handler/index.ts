import {RuleHandler} from "../types";

import {handleLen} from "./comm/len";

import {strHandlers} from "./str";

export const handlers: RuleHandler<any>[] = [
  handleLen,
  ...strHandlers,
]
