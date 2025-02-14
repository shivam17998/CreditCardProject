import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

export const userAuthguardGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const jwtHelper = new JwtHelperService();

  const token = localStorage.getItem('token');

  if (!token) {
    console.warn("No token found! Redirecting to login...");
    router.navigateByUrl('/login');
    return false;
  }

  // Check if token is expired
  if (jwtHelper.isTokenExpired(token)) {
    console.warn("Token is expired! Redirecting to login...");
    localStorage.removeItem('token');
    router.navigateByUrl('/login');
    return false;
  }

  try {
    const decodedToken: any = jwtHelper.decodeToken(token);
    console.log("Decoded Token:", decodedToken);

    const userRole = decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
    
    console.log("User Role:", userRole);

    if (userRole === 'User') {
      return true; // Allow user access
    } else if (userRole === 'Admin') {
      router.navigateByUrl('/home'); // Redirect admins to admin home
      return false;
    } else {
      alert("Invalid role or unauthorized access.");
      router.navigateByUrl('/login');
      return false;
    }
  } catch (error) {
    console.error("Invalid token format! Redirecting to login...");
    localStorage.removeItem('token');
    router.navigateByUrl('/login');
    return false;
  }
};

