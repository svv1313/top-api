import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ async: true })
export class IsAliasExistConstraint implements ValidatorConstraintInterface {
  validate(userName: any, args: ValidationArguments) {
    console.log(userName, args);
    return false;
  }
}

export function IsAliasExist(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsAliasExistConstraint,
    });
  };
}
