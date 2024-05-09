import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class OptionalIntPipe implements PipeTransform {
  transform(value: any) {
    if (value === null) {
      return undefined;
    }
    const num = Number(value);
    if (Number.isNaN(num)) {
      throw new BadRequestException('Invalid number');
    }
    return num;
  }
}
