// src/modules/user/user.controller.ts
import { Controller, Post, Body, Route, Tags, SuccessResponse, Response, Get, Query, Queries } from "tsoa";
import { injectable, inject } from "tsyringe";
import { UserService } from "./user.service";
import { UserSignUpReqDto, UserUpdateReqDto, UserGetReqDto } from "./dtos/user.req.dto";
import { UserSignUpResDto, UserUpdateResDto, UserGetResDto } from "./dtos/user.res.dto"; 
import { Result, BadRequestError, ConflictError, InternalServerError } from "../../common/types/result.type";
import { User } from "@prisma/client";
import { get } from "node:http";

@Route("users")
@Tags("User")
@injectable()
export class UserController extends Controller {
  constructor(@inject(UserService) private userService: UserService) {
    super();
  }

  @SuccessResponse("201", "Created") 
  @Response<BadRequestError>(400, "Bad Request") 
  @Response<ConflictError>(409, "Conflict")
  @Response<InternalServerError>(500, "Internal Server Error")
  @Post("/signup")
  public async signUp(
    @Body() body: UserSignUpReqDto
  ): Promise<Result<UserSignUpResDto>> {
    
    const result = await this.userService.signUp(body);

    this.setStatus(result.statusCode);

    return result;
  }

  @SuccessResponse("200", "OK") 
  @Response<BadRequestError>(400, "Bad Request") 
  @Response<ConflictError>(409, "Conflict")
  @Response<InternalServerError>(500, "Internal Server Error")
  @Get("/")
  public async getUserById(
    @Queries() query: UserGetReqDto
  ): Promise<Result<UserGetResDto>> {
    const result = await this.userService.getUserById(query);

    this.setStatus(result.statusCode);

    return result;
  }
}