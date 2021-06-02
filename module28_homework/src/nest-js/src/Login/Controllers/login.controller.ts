import { AuthLoginDto } from './../dto/create-login.dto';
import { LoginService } from 'src/Login/Services/Login.service';
import { Body, Controller, Post, HttpCode, Response, Query, Request } from '@nestjs/common';
import { getNewToken } from '../../config/getNewToken';

@Controller('users/auth')
export class LoginController  {
    constructor(private LoginService: LoginService) {}

    @Post('access')
    auth(@Body() req: AuthLoginDto, @Response() res: any) {
        return getNewToken(req, res);
        return this.LoginService.authorize(req, res);
    }

    @Post('pass-recovery')
    @HttpCode(200)
    sendMail(@Body() authLoginDto: AuthLoginDto) {
        return this.LoginService.sendMail(authLoginDto);
    }

    @Post('pass-reset')
    resetNewPass(@Body() authLoginDto: AuthLoginDto, @Request() req: any, @Query() param: string) {
        return this.LoginService.resetNewPass(authLoginDto, req, param);
    }
}