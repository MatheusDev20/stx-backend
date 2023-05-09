import { EmployeeService } from 'src/modules/employee/services/employee.service';
import { LoginDTO } from '../DTOs/login-controller.dto';
import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Hashing } from 'src/modules/security/interfaces/hashing';
import { InvalidCredentials, NotFoundEmail } from 'src/errors/messages';

@Injectable()
export class AuthenticationService {
  constructor(
    private employeeService: EmployeeService,
    @Inject('HashingService') private hashService: Hashing,
  ) {}
  async signIn(data: LoginDTO) {
    const { email, password } = data;
    const findUser = await this.employeeService.getByEmail(email);
    if (!findUser) throw new NotFoundException(NotFoundEmail);

    const isPasswordMatch = await this.hashService.compare(
      password,
      findUser.password,
    );
    if (isPasswordMatch) {
      // TODO: Generate a fresh new JWT
      return;
    }

    throw new UnauthorizedException(InvalidCredentials);
  }
}
