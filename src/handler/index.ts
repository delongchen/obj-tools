import {RuleHandler} from "../types";

import {handleLen} from "./comm/len";

import {strHandlers} from "./str";
import {handleAll} from "./comm/all";
import {numHandlers} from "./num";
import {arrHandlers} from "./arr";

export const handlers: RuleHandler<any>[] = [
  handleLen,
  handleAll,
  ...strHandlers,
  ...numHandlers,
  ...arrHandlers
]
