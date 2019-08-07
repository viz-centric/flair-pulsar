import {Test, TestingModule} from '@nestjs/testing';
import {DatabaseService} from './database.service';
import {AppModule} from '../../app.module';

describe('DatabaseService', () => {
  let service: DatabaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    service = module.get<DatabaseService>(DatabaseService);
  });

  it('should close connection', async () => {
    expect(service.isConnected()).toBeTruthy();
    await service.close();
    expect(service.isConnected()).toBeFalsy();
  });
});
