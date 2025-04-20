import { Controller, Get } from '@nestjs/common';

@Controller()
export class PorfileController {
  constructor() {}

  @Get()
  getProfile(): any {}
}
