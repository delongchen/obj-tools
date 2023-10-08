import { RuleListType } from "./types";
export declare const OK: () => boolean;
export declare const NOT_OK: () => boolean;
export declare const parseRuleList: (ruleStr: string, itemSeparator: string, kvSeparator: string) => RuleListType;
