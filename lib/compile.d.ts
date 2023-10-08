import { InstanceContext, RuleListType, RuleTemplate, RuleTree } from "./types";
export declare const compileSignal: (signalRule: string | RuleListType, ctx: InstanceContext, key?: string) => (value: unknown) => boolean;
export declare const compile: (template: RuleTemplate, ctx: InstanceContext, keyPath: string[]) => RuleTree;
