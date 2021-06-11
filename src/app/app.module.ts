import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injectable, } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import {
  Client,
  InventoryService,
  BasicAuth,
  IdentityService,
  ApplicationService,
  Realtime,
  AlarmService,
  AuditService,
  DeviceRegistrationService,
  FetchClient,
  DeviceRegistrationBulkService,
  EventService,
  InventoryRoleService,
  InventoryBinaryService,
  MeasurementService,
  OperationService,
  OperationBulkService,
  TenantSecurityOptionsService,
  SystemOptionsService,
  TenantOptionsService,
  TenantService,
  UserService,
  UserGroupService,
  UserRoleService,
  IUser,
  ICurrentTenant
} from '@c8y/client';
import { RouterModule } from '@angular/router';
import { AppStateService, CoreModule, OptionsService } from '@c8y/ngx-components';
import { BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';
import { TranslateModule } from '@ngx-translate/core';
import { GpAssetViewerModule } from 'projects/gp-asset-viewer/src/public-api';

const auth = new BasicAuth({
  user: 'darpan.lalani',
  password: 'Manage@123',
  tenant: 't94909947'
});
const client = new Client(auth, 'http://localhost:4200');
client.setAuth(auth);
const fetchClient = client.core;


@Injectable()
export class MockAppStateService {
  currentTenant = new BehaviorSubject<ICurrentTenant | null>(null);
  currentUser = new BehaviorSubject<IUser | null>(null);
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    GpAssetViewerModule,
    TranslateModule.forRoot(),
    CoreModule.forRoot(),
    RouterModule.forRoot(
      [],
    )
  ],
  providers: [
    { provide: AlarmService, useValue: client.alarm },
    { provide: ApplicationService, useValue: client.application },
    { provide: AuditService, useValue: client.audit },
    { provide: FetchClient, useValue: client.core },
    { provide: DeviceRegistrationService, useValue: client.deviceRegistration },
    { provide: DeviceRegistrationBulkService, useValue: client.deviceRegistrationBulk },
    { provide: EventService, useValue: client.event },
    { provide: InventoryService, useValue: client.inventory },
    { provide: InventoryRoleService, useValue: client.inventoryRole },
    { provide: InventoryBinaryService, useValue: client.inventoryBinary },
    { provide: MeasurementService, useValue: client.measurement },
    { provide: OperationService, useValue: client.operation },
    { provide: OperationBulkService, useValue: client.operationBulk },
    { provide: TenantSecurityOptionsService, useValue: client.options.security },
    { provide: SystemOptionsService, useValue: client.options.system },
    { provide: TenantOptionsService, useValue: client.options.tenant },
    { provide: Realtime, useValue: client.realtime },
    { provide: TenantService, useValue: client.tenant },
    { provide: UserService, useValue: client.user },
    { provide: UserGroupService, useValue: client.userGroup },
    { provide: UserRoleService, useValue: client.userRole },
    { provide: IdentityService, useValue: client.identity },
    { provide: AppStateService, useClass: MockAppStateService },
  ],
  entryComponents: [AppComponent]
})
export class AppModule {
  constructor(private appStateService: AppStateService, userService: UserService) {
    userService.current().then(res => this.appStateService.currentUser.next(res.data));
  }
  ngDoBootstrap(app) {
    this.appStateService.currentUser.pipe(take(1))
    .subscribe((data) => {
      app.bootstrap(AppComponent);
    });
  }
}
