export class UserSignUpResDto {
  /** 
   * @example 1
   */
  id!: number;

  /**
   * @example "test@example.com"
   */
  email!: string;

  /**
   * @example "홍길동"
   */
  name!: string;
}

export class UserUpdateResDto {
  /** 
   * @example 1
   */
  id!: number;

  /**
   * @example "test@example.com"
   */
  email!: string;

  /**
   * @example "이순신"
   */
  name!: string;
}

export class UserGetResDto {
  /** 
   * @example 1
   */
  id!: number;

  /**
   * @example "test@example.com"
   */
  email!: string;

  /**
   * @example "홍길동"
   */
  name!: string;
}