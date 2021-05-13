import { AuthLoginDto } from './../dto/create-login.dto';
import { LoginService } from 'src/Login/Services/Login.service';
import { Body, Controller, Post, HttpCode, Response, Query } from '@nestjs/common';

@Controller('users/auth')
export class LoginController  {
    constructor(private LoginService: LoginService) {}
    @Post('access')

    auth(@Body() authLoginDto: AuthLoginDto, @Response() res: any) {
        console.log(authLoginDto)
        return this.LoginService.authorize(authLoginDto, res);
    }

    @Post('pass-recovery')
    @HttpCode(200)
    sendMail(@Body() authLoginDto: AuthLoginDto) {
        return this.LoginService.sendMail(authLoginDto);
    }

    @Post('pass-reset')
    resetNewPass(@Body() authLoginDto: AuthLoginDto, @Response() res: any, @Query() param: string) {
        return this.LoginService.resetNewPass(authLoginDto, res, param);
    }
}