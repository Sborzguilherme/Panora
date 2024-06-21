import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsUUID, IsOptional, IsString, IsDateString } from 'class-validator';

export class UnifiedScoreCardInput {
  @ApiPropertyOptional({
    type: String,
    description: 'The overall recommendation',
  })
  @IsString()
  @IsOptional()
  overall_recommendation?: string;

  @ApiPropertyOptional({
    type: String,
    description: 'The UUID of the application',
  })
  @IsUUID()
  @IsOptional()
  application_id?: string;

  @ApiPropertyOptional({
    type: String,
    description: 'The UUID of the interview',
  })
  @IsUUID()
  @IsOptional()
  interview_id?: string;

  @ApiPropertyOptional({
    type: String,
    format: 'date-time',
    description: 'The remote creation date of the scorecard',
  })
  @IsDateString()
  @IsOptional()
  remote_created_at?: string;

  @ApiPropertyOptional({
    type: String,
    format: 'date-time',
    description: 'The submission date of the scorecard',
  })
  @IsDateString()
  @IsOptional()
  submitted_at?: string;
}

export class UnifiedScoreCardOutput extends UnifiedScoreCardInput {
  @ApiPropertyOptional({
    type: String,
    description: 'The UUID of the scorecard',
  })
  @IsUUID()
  @IsOptional()
  id?: string;

  @ApiPropertyOptional({
    type: String,
    description:
      'The remote ID of the scorecard in the context of the 3rd Party',
  })
  @IsString()
  @IsOptional()
  remote_id?: string;

  @ApiPropertyOptional({
    type: {},
    description:
      'The remote data of the scorecard in the context of the 3rd Party',
  })
  @IsOptional()
  remote_data?: Record<string, any>;
}
