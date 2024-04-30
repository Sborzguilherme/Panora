import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { LoggerService } from '../logger/logger.service';
import { handleServiceError } from '@@core/utils/errors';
import { SyncService as CrmCompanySyncService } from '@crm/company/sync/sync.service';
import { SyncService as CrmContactSyncService } from '@crm/contact/sync/sync.service';
import { SyncService as CrmDealSyncService } from '@crm/deal/sync/sync.service';
import { SyncService as CrmEngagementSyncService } from '@crm/engagement/sync/sync.service';
import { SyncService as CrmNoteSyncService } from '@crm/note/sync/sync.service';
import { SyncService as CrmStageSyncService } from '@crm/stage/sync/sync.service';
import { SyncService as CrmTaskSyncService } from '@crm/task/sync/sync.service';
import { SyncService as CrmUserSyncService } from '@crm/user/sync/sync.service';
import { SyncService as TicketingAccountSyncService } from '@ticketing/account/sync/sync.service';
import { SyncService as TicketingCollectionSyncService } from '@ticketing/collection/sync/sync.service';
import { SyncService as TicketingCommentSyncService } from '@ticketing/comment/sync/sync.service';
import { SyncService as TicketingContactSyncService } from '@ticketing/contact/sync/sync.service';
import { SyncService as TicketingTagSyncService } from '@ticketing/tag/sync/sync.service';
import { SyncService as TicketingTeamSyncService } from '@ticketing/team/sync/sync.service';
import { SyncService as TicketingTicketSyncService } from '@ticketing/ticket/sync/sync.service';
import { SyncService as TicketingUserSyncService } from '@ticketing/user/sync/sync.service';

@Injectable()
export class CoreSyncService {
  constructor(
    private prisma: PrismaService,
    private logger: LoggerService,
    private CrmCompanySyncService: CrmCompanySyncService,
    private CrmContactSyncService: CrmContactSyncService,
    private CrmDealSyncService: CrmDealSyncService,
    private CrmEngagementSyncService: CrmEngagementSyncService,
    private CrmNoteSyncService: CrmNoteSyncService,
    private CrmStageSyncService: CrmStageSyncService,
    private CrmTaskSyncService: CrmTaskSyncService,
    private CrmUserSyncService: CrmUserSyncService,
    private TicketingAccountSyncService: TicketingAccountSyncService,
    private TicketingCollectionSyncService: TicketingCollectionSyncService,
    private TicketingCommentSyncService: TicketingCommentSyncService,
    private TicketingContactSyncService: TicketingContactSyncService,
    private TicketingTagSyncService: TicketingTagSyncService,
    private TicketingTeamSyncService: TicketingTeamSyncService,
    private TicketingTicketSyncService: TicketingTicketSyncService,
    private TicketingUserSyncService: TicketingUserSyncService,
  ) {
    this.logger.setContext(CoreSyncService.name);
  }

  // we must have a sync_jobs table with 7 (verticals) rows, one of each is syncing details
  async getSyncStatus(vertical: string) {
    try {
    } catch (error) {
      handleServiceError(error, this.logger);
    }
  }

  // todo: test behaviour
  async resync(vertical: string, user_id: string) {
    // premium feature
    // trigger a resync for the vertical but only for linked_users who belong to user_id account
    const tasks = [];
    try {
      switch (vertical.toLowerCase()) {
        case 'crm':
          tasks.push(this.CrmCompanySyncService.syncCompanies(user_id));
          tasks.push(this.CrmContactSyncService.syncContacts(user_id));
          tasks.push(this.CrmDealSyncService.syncDeals(user_id));
          tasks.push(this.CrmEngagementSyncService.syncEngagements(user_id));
          tasks.push(this.CrmNoteSyncService.syncNotes(user_id));
          tasks.push(this.CrmStageSyncService.syncStages(user_id));
          tasks.push(this.CrmTaskSyncService.syncTasks(user_id));
          tasks.push(this.CrmUserSyncService.syncUsers(user_id));
          break;
        case 'ticketing':
          tasks.push(this.TicketingAccountSyncService.syncAccounts(user_id));
          tasks.push(
            this.TicketingCollectionSyncService.syncCollections(user_id),
          );
          tasks.push(this.TicketingCommentSyncService.syncComments(user_id));
          tasks.push(this.TicketingContactSyncService.syncContacts(user_id));
          tasks.push(this.TicketingTagSyncService.syncTags(user_id));
          tasks.push(this.TicketingTeamSyncService.syncTeams(user_id));
          tasks.push(this.TicketingTicketSyncService.syncTickets(user_id));
          tasks.push(this.TicketingUserSyncService.syncUsers(user_id));
          break;
      }
      return {
        timestamp: new Date(),
        vertical: vertical,
        status: `SYNCING`,
      };
    } catch (error) {
      handleServiceError(error, this.logger);
    } finally {
      // Handle background tasks completion
      Promise.allSettled(tasks).then((results) => {
        results.forEach((result, index) => {
          if (result.status === 'fulfilled') {
            console.log(`Task ${index} completed successfully.`);
          } else if (result.status === 'rejected') {
            console.log(`Task ${index} failed:`, result.reason);
          }
        });
      });
    }
  }
}
