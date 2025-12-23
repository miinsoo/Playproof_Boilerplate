// src/modules/user/dtos/user.req.dto.ts
import { z } from "zod";

export const UserSignUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string(),
  phoneNumber: z.string(),
});

export interface UserSignUpReqDto {
  /**
   * 유저 이메일
   * @example "user@example.com"
   */
  email: string;
  /**
   * 유저 비밀번호
   * @example "securePassword123"
   */
  password: string;
  /**
   * 유저 이름
   * @example "홍길동"
   */
  name: string;
  /**
   * 유저 전화번호
   * @example "010-1234-5678"
   */
  phoneNumber: string;
}