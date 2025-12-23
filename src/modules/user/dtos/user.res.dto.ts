// src/modules/user/dtos/user.res.dto.ts
export interface UserSignUpResDto {
  /**
   * 유저의 고유 ID (DB Primary Key)
   * @example 1
   */
  id: number;

  /**
   * 유저 이메일
   * @example "user@example.com"
   */
  email: string;

  /**
   * 유저 이름 
   * @example "홍길동"
   */
  name: string;
}