import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsUUID,
  IsOptional,
  IsString,
  IsBoolean,
  IsDateString,
  IsArray,
} from 'class-validator';

export class UnifiedJobInput {
  @ApiPropertyOptional({ type: String, description: 'The name of the job' })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({
    type: String,
    description: 'The description of the job',
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({ type: String, description: 'The code of the job' })
  @IsString()
  @IsOptional()
  code?: string;

  @ApiPropertyOptional({ type: String, description: 'The status of the job' })
  @IsString()
  @IsOptional()
  status?: string;

  @ApiPropertyOptional({ type: String, description: 'The type of the job' })
  @IsString()
  @IsOptional()
  type?: string;

  @ApiPropertyOptional({
    type: Boolean,
    description: 'Whether the job is confidential',
  })
  @IsBoolean()
  @IsOptional()
  confidential?: boolean;

  @ApiPropertyOptional({
    type: [String],
    description: 'The departments UUIDs associated with the job',
  })
  @IsArray()
  @IsOptional()
  departments?: string[];

  @ApiPropertyOptional({
    type: [String],
    description: 'The offices UUIDs associated with the job',
  })
  @IsArray()
  @IsOptional()
  offices?: string[];

  @ApiPropertyOptional({
    type: [String],
    description: 'The managers UUIDs associated with the job',
  })
  @IsArray()
  @IsOptional()
  managers?: string[];

  @ApiPropertyOptional({
    type: [String],
    description: 'The recruiters UUIDs associated with the job',
  })
  @IsArray()
  @IsOptional()
  recruiters?: string[];

  @ApiPropertyOptional({
    type: String,
    format: 'date-time',
    description: 'The remote creation date of the job',
  })
  @IsDateString()
  @IsOptional()
  remote_created_at?: string;

  @ApiPropertyOptional({
    type: String,
    format: 'date-time',
    description: 'The remote modification date of the job',
  })
  @IsDateString()
  @IsOptional()
  remote_updated_at?: string;
}

export class UnifiedJobOutput extends UnifiedJobInput {
  @ApiPropertyOptional({ type: String, description: 'The UUID of the job' })
  @IsUUID()
  @IsOptional()
  id?: string;

  @ApiPropertyOptional({
    type: String,
    description: 'The remote ID of the job in the context of the 3rd Party',
  })
  @IsString()
  @IsOptional()
  remote_id?: string;

  @ApiPropertyOptional({
    type: {},
    description: 'The remote data of the job in the context of the 3rd Party',
  })
  @IsOptional()
  remote_data?: Record<string, any>;
}
