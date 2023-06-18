import {CanActivate, ExecutionContext, HttpException, Injectable, UnauthorizedException} from '@nestjs/common';
import {Observable} from 'rxjs';
import {JwtService} from '@nestjs/jwt';
import {Reflector} from '@nestjs/core';
import {ROLES_KEY} from './roles-auth.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private jwtService: JwtService,
                private reflector: Reflector) {
    }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        try {
            const requiredRole = this.reflector.getAllAndOverride<string>(ROLES_KEY, [
                context.getHandler(),
                context.getClass(),
            ])

            if(!requiredRole) {
                return true
            }

            const req = context.switchToHttp().getRequest();
            const authHeader = req.headers.authorization;


            const bearer = authHeader.split(' ')[0];
            const token = authHeader.split(' ')[1];


            if (bearer !== 'Bearer' || !token) {
                throw new UnauthorizedException({message: 'User Unauthorized'})
            }
            const user = this.jwtService.verify(token);
            req.user = user;

            return user.role === requiredRole;
        }
        catch (e) {
            throw new UnauthorizedException({message: 'User Unauthorized'})
        }
    }
}