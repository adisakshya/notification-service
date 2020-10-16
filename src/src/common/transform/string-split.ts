import {Transform} from "class-transformer";

export function StringSplit(split = ","): PropertyDecorator {
    return (target, propertyKey) => {
        Transform((value) => {
            if (Array.isArray(value)) {
                return value;
            }
            return value?.split(split) ?? [];
        })(target, propertyKey as string);
    };
}
