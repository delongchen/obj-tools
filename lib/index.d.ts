import { RuleHandler, RuleTemplate } from './types';
declare const newInstance: () => {
    setHandler: <T>(handler: RuleHandler<T>) => void;
    obj: (template: RuleTemplate) => (value: unknown) => boolean;
    signal: (signalRule: string) => (value: unknown) => boolean;
    validate: (value: unknown, rule?: string | RuleTemplate) => boolean;
};
declare const defaultInstance: {
    setHandler: <T>(handler: RuleHandler<T>) => void;
    obj: (template: RuleTemplate) => (value: unknown) => boolean;
    signal: (signalRule: string) => (value: unknown) => boolean;
    validate: (value: unknown, rule?: string | RuleTemplate) => boolean;
};
export { defaultInstance as validator, newInstance, };
