import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from '../../../src/users/users.controller';
import { UsersService } from '../../../src/users/users.service';
import { createUserDtoMock, createUserMock } from './mocks/mock-users';

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return an array of users', async () => {
    const getUsers = (UsersService.prototype.findAll = jest.fn());
    getUsers.mockReturnValue([createUserMock]);

    const result = controller.findAll('5');
    console.log(result);
    expect(getUsers).toHaveBeenCalled();
    expect(result.users).toStrictEqual([createUserMock]);
  });

  it('should save user', async () => {
    const postUser = (UsersService.prototype.create = jest.fn());
    controller.create(createUserDtoMock);
    expect(postUser).toHaveBeenCalled();
  });
});
