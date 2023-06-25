import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments, registerDecorator } from 'class-validator';

@ValidatorConstraint({ name: 'timeFormat', async: false })
class TimeFormatConstraint implements ValidatorConstraintInterface {
    validate(value: any, args: ValidationArguments) {
        if (typeof value !== 'string') {
            return false;
        }

        const pattern = /^(?:[01]\d|2[0-3]):[0-5]\d$/;
        if (!pattern.test(value)) {
            return false;
        }

        const [hours, minutes] = value.split(':');
        const numericHours = parseInt(hours, 10);
        const numericMinutes = parseInt(minutes, 10);

        if (numericHours < 0 || numericHours > 23) {
            args.constraints[0] = false; // Define a restrição como false para identificar o erro específico
            return false;
        }

        if (numericMinutes < 0 || numericMinutes > 59) {
            args.constraints[1] = false; // Define a restrição como false para identificar o erro específico
            return false;
        }

        return true;
    }

    defaultMessage(args: ValidationArguments) {
        if (!args.constraints[0]) {
            return 'A hora deve estar no intervalo de 0 a 23.';
        }

        if (!args.constraints[1]) {
            return 'Os minutos devem estar no intervalo de 0 a 59.';
        }

        return 'O valor deve estar no formato "HH:MM", representando uma hora válida no formato de 24 horas.';
    }
}

export function IsTimeFormat() {
    return function (object: Record<string, any>, propertyName: string) {
        registerDecorator({
            name: 'isTimeFormat',
            target: object.constructor,
            propertyName: propertyName,
            constraints: [true, true], // Duas restrições para identificar os erros específicos
            validator: TimeFormatConstraint,
        });
    };
}

