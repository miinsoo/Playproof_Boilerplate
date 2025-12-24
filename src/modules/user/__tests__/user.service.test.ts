import { UserService } from '../user.service';
import { UserRepository } from '../user.repository';
import { UserSignUpReqDto } from '../dtos/user.req.dto';
import { UserErrorCode } from '../../../common/constants/error-code';

describe('UserService', () => {
  let userService: UserService;
  let userRepository: jest.Mocked<UserRepository>;

  beforeEach(() => {
    userRepository = {
      findByEmail: jest.fn(),
      createUser: jest.fn(),
    } as any;

    userService = new UserService(userRepository);
  });

  describe('signUp', () => {
    const validSignUpDto: UserSignUpReqDto = {
      email: 'test@example.com',
      password: 'password123',
      name: 'Test User',
      phoneNumber: '010-1234-5678',
    };

    it('should successfully create a new user', async () => {
      userRepository.findByEmail.mockResolvedValue(null);
      userRepository.createUser.mockResolvedValue({
        id: 1,
        email: validSignUpDto.email,
        name: validSignUpDto.name,
        password: validSignUpDto.password,
        phoneNumber: validSignUpDto.phoneNumber,
        createdAt: new Date(),
      });

      const result = await userService.signUp(validSignUpDto);

      expect(result.type).toBe('success');
      expect(result.statusCode).toBe(201);
      if (result.type === 'success') {
        expect(result.data.email).toBe(validSignUpDto.email);
        expect(result.data.name).toBe(validSignUpDto.name);
      }
    });

    it('should return conflict error when email already exists', async () => {
      const existingUser = {
        id: 1,
        email: validSignUpDto.email,
        name: 'Existing User',
        password: 'password',
        phoneNumber: '010-9999-9999',
        createdAt: new Date(),
      };
      userRepository.findByEmail.mockResolvedValue(existingUser);

      const result = await userService.signUp(validSignUpDto);

      expect(result.type).toBe('failed');
      expect(result.statusCode).toBe(409);
      if (result.type === 'failed') {
        expect(result.message).toBe('이미 존재하는 이메일입니다.');
        expect(result.errorCode).toBe(UserErrorCode.DUPLICATE_EMAIL);
      }
    });
  });
});