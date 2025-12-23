// src/modules/user/user.service.ts
import { injectable, inject } from "tsyringe";
import { UserRepository } from "./user.repository";
import { UserSignUpReqDto } from "./dtos/user.req.dto";
import { UserSignUpResDto } from "./dtos/user.res.dto"; // [1] DTO Import 추가
import { Result, success, failed } from "../../common/types/result.type";

@injectable()
export class UserService {
  constructor(@inject(UserRepository) private userRepository: UserRepository) {}

  async signUp(dto: UserSignUpReqDto): Promise<Result<UserSignUpResDto>> {
    const exists = await this.userRepository.findByEmail(dto.email);
    
    if (exists) {
      return failed("이미 존재하는 이메일입니다.", "USR_001", 409);
    }

    const newUser = await this.userRepository.createUser(dto);

    return success({ 
      id: newUser.id, 
      email: newUser.email, 
      name: newUser.name 
    }, 201);
  }
}