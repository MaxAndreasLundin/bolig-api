import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  signup() {
    return { msg: 'I have singed up' };
  }

  signin() {
    return { msg: "I'm signin in" };
  }
}
