import {
  Controller,
  Post,
  Body,
  Query,
  Get,
  Patch,
  Param,
  Headers,
  UseGuards,
} from '@nestjs/common';
import { LoggerService } from '@@core/logger/logger.service';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
  ApiHeader,
} from '@nestjs/swagger';
import { ApiCustomResponse } from '@@core/utils/types';
import { GroupService } from './services/group.service';
import { UnifiedGroupInput, UnifiedGroupOutput } from './types/model.unified';
import { ConnectionUtils } from '@@core/connections/@utils';
import { ApiKeyAuthGuard } from '@@core/auth/guards/api-key.guard';

@ApiTags('filestorage/permission')
@Controller('filestorage/permission')
export class GroupController {
  constructor(
    private readonly permissionService: GroupService,
    private logger: LoggerService,
    private connectionUtils: ConnectionUtils,
  ) {
    this.logger.setContext(GroupController.name);
  }

  @ApiOperation({
    operationId: 'list',
    summary: 'List a batch of Groups',
  })
  @ApiHeader({
    name: 'x-connection-token',
    required: true,
    description: 'The connection token',
    example: 'b008e199-eda9-4629-bd41-a01b6195864a',
  })
  @ApiQuery({
    name: 'remote_data',
    required: false,
    type: Boolean,
    description:
      'Set to true to include data from the original Filestorage software.',
  })
  @ApiCustomResponse(UnifiedGroupOutput)
  @UseGuards(ApiKeyAuthGuard)
  @Get()
  async list(
    @Headers('x-connection-token') connection_token: string,
    @Query('remote_data') remote_data?: boolean,
  ) {
    try {
      const { linkedUserId, remoteSource } =
        await this.connectionUtils.getConnectionMetadataFromConnectionToken(
          connection_token,
        );
      return this.permissionService.getGroups(
        remoteSource,
        linkedUserId,
        remote_data,
      );
    } catch (error) {
      throw new Error(error);
    }
  }

  @ApiOperation({
    operationId: 'retrieve',
    summary: 'Retrieve a Group',
    description:
      'Retrieve a permission from any connected Filestorage software',
  })
  @ApiParam({
    name: 'id',
    required: true,
    type: String,
    description: 'id of the permission you want to retrieve.',
  })
  @ApiQuery({
    name: 'remote_data',
    required: false,
    type: Boolean,
    description:
      'Set to true to include data from the original Filestorage software.',
  })
  @ApiCustomResponse(UnifiedGroupOutput)
  @UseGuards(ApiKeyAuthGuard)
  @Get(':id')
  retrieve(
    @Param('id') id: string,
    @Query('remote_data') remote_data?: boolean,
  ) {
    return this.permissionService.getGroup(id, remote_data);
  }
}
