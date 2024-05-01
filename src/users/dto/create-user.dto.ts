import { Transform, Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, MinLength } from 'class-validator';
import { FileDto } from '../../files/dto/file.dto';
import { RoleDto } from '../../roles/dto/role.dto';
import { StatusDto } from '../../statuses/dto/status.dto';
import { lowerCaseTransformer } from '../../utils/transformers/lower-case.transformer';
import { PlanDto } from 'src/plans/dto/plan.dto';
import { OfferDto } from 'src/offres/dto/offer.dto';

export class CreateUserDto {
  @ApiProperty({ example: 'test1@example.com' })
  @Transform(lowerCaseTransformer)
  @IsNotEmpty()
  @IsEmail()
  email: string | null;

  @ApiProperty()
  @MinLength(6)
  password?: string;

  provider?: string;

  socialId?: string | null;

  @ApiProperty({ example: 'John' })
  @IsNotEmpty()
  userName?: string | null;

  // @ApiPropertyOptional({ type: () => FileDto })
  // @IsOptional()
  // photo?: FileDto | null;

  @ApiPropertyOptional({
    example:
      'http://res.cloudinary.com/dm5d9jmf4/image/upload/v1714067220/oa9q1mwiijdzpnqrfb11.svg',
  })
  @IsOptional()
  photo?: string | null;

  @ApiPropertyOptional({ type: RoleDto })
  @IsOptional()
  @Type(() => RoleDto)
  role?: RoleDto | null;

  @ApiPropertyOptional({ type: StatusDto })
  @IsOptional()
  @Type(() => StatusDto)
  status?: StatusDto;

  @ApiPropertyOptional({ type: PlanDto })
  @IsOptional()
  @Type(() => PlanDto)
  plan?: PlanDto;

  @ApiPropertyOptional({ type: OfferDto })
  @IsOptional()
  @Type(() => OfferDto)
  offer?: OfferDto;

  hash?: string | null;
}
