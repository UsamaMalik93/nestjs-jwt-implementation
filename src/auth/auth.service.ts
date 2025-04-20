import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  getHelloFromAuth(): string {
    return 'hello from auth';
  }
}
