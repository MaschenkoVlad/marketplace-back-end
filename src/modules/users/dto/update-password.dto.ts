import {
  IsNotEmpty,
  IsString,
  MinLength,
  IsStrongPassword,
  Validate,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'isMatch' })
export class IsMatchConstraint implements ValidatorConstraintInterface {
  validate(password: any, args: ValidationArguments) {
    const [relatedPropertyName] = args.constraints as [string];
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const relatedValue = (args.object as any)[relatedPropertyName];
    return password === relatedValue;
  }

  defaultMessage(args: ValidationArguments) {
    const [relatedPropertyName] = args.constraints as [string];
    return `${args.property} must match ${relatedPropertyName}`;
  }
}

export class UpdatePasswordDto {
  @IsString()
  @IsNotEmpty()
  currentPassword?: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minNumbers: 1,
    minSymbols: 1,
    minUppercase: 1,
  })
  newPassword?: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minNumbers: 1,
    minSymbols: 1,
    minUppercase: 1,
  })
  @Validate(IsMatchConstraint, ['newPassword'])
  confirmNewPassword?: string;
}
