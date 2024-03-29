import { Utils } from './utils/employee.utils';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Department } from '../departments/entities/department.entity';
import { EmployeeController } from './controllers/employee.controller';
import { Employee } from './entities/employee.entity';
import { EmployeeService } from './services/employee.service';
import { EmployeeRepository } from './repositories/employee.repository';
import { SecurityModule } from '../security/security.module';
import { DepartmentsModule } from '../departments/departments.module';
import { RolesRepository } from './repositories/roles.repository';
import { Role } from './entities/roles.entity';
import { LoggerModule } from '../logger/logger.module';
import { StorageModule } from '../storage/storage.module';
import { Task } from '../task/entities/task.entity';
import { RefreshTokens } from './entities/refresh-token.entity';
import { RefreshTokenRepository } from './repositories/refresh-token.repository';
import { CreateEmployeeUseCase } from './use-cases/create-employee-use-case';
import { CreateManagerUseCase } from './use-cases/create-manager-use-case';
import { GetEmployeeListUseCase } from './use-cases/get-employee-list-use-case';
import { AddPaymentInformation } from './use-cases/add-payment-information-use-case';
import { PaymentInfoRepository } from './repositories/payment-info.repository';
import { PaymentInfo } from './entities/paymentInfo.entity';
import { Bank } from './entities/banks.entity';
import { UploadDocumentUseCase } from './use-cases/upload-document-use-case';
import { DocumentsRepository } from './repositories/documents.repository';
import { Documents } from './entities/documents.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Employee,
      Department,
      Role,
      Task,
      RefreshTokens,
      PaymentInfo,
      Bank,
      Documents,
    ]),
    SecurityModule,
    DepartmentsModule,
    LoggerModule,
    StorageModule,
  ],
  controllers: [EmployeeController],
  providers: [
    EmployeeService,
    EmployeeRepository,
    RolesRepository,
    RefreshTokenRepository,
    Utils,
    CreateEmployeeUseCase,
    CreateManagerUseCase,
    GetEmployeeListUseCase,
    AddPaymentInformation,
    PaymentInfoRepository,
    UploadDocumentUseCase,
    DocumentsRepository,
  ],
  exports: [EmployeeService, EmployeeRepository],
})
export class EmployeeModule {}
