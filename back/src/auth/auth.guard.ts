// auth.guard.ts
import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService, private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const token = req.cookies?.access_token || req.headers['authorization']?.split(' ')[1];

    if (!token) throw new UnauthorizedException('No token provided');

    try {
      const payload = await this.jwtService.verifyAsync(token);
      req.user = payload;

    //   // Optional: check for admin role
    //   const requiredRole = this.reflector.get<string>('role', context.getHandler());
    //   if (requiredRole && payload.role !== requiredRole) {
    //     throw new UnauthorizedException('Insufficient permissions');
    //   }

      return true;
    } catch (err) {
        // console.log(err.message)
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}