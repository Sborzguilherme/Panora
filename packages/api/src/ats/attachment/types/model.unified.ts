import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsUUID, IsOptional, IsString, IsDateString } from 'class-validator';

export class UnifiedAttachmentInput {
  @ApiPropertyOptional({ type: String, description: 'The URL of the file' })
  @IsString()
  @IsOptional()
  file_url?: string;

  @ApiPropertyOptional({ type: String, description: 'The name of the file' })
  @IsString()
  @IsOptional()
  file_name?: string;

  @ApiPropertyOptional({ type: String, description: 'The type of the file' })
  @IsString()
  @IsOptional()
  file_type?: string;

  @ApiPropertyOptional({
    type: String,
    format: 'date-time',
    description: 'The remote creation date of the attachment',
  })
  @IsDateString()
  @IsOptional()
  remote_created_at?: string;

  @ApiPropertyOptional({
    type: String,
    format: 'date-time',
    description: 'The remote modification date of the attachment',
  })
  @IsDateString()
  @IsOptional()
  remote_modified_at?: string;

  @ApiPropertyOptional({
    type: String,
    description: 'The UUID of the candidate',
  })
  @IsUUID()
  @IsOptional()
  candidate_id?: string;
}

export class UnifiedAttachmentOutput extends UnifiedAttachmentInput {
  @ApiPropertyOptional({
    type: String,
    description: 'The UUID of the attachment',
  })
  @IsUUID()
  @IsOptional()
  id?: string;

  @ApiPropertyOptional({
    type: String,
    description: 'The remote ID of the attachment',
  })
  @IsString()
  @IsOptional()
  remote_id?: string;

  @ApiPropertyOptional({
    type: {},
    description:
      'The remote data of the attachment in the context of the 3rd Party',
  })
  @IsOptional()
  remote_data?: Record<string, any>;
}
