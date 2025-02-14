import { inject } from '@angular/core';
import { CanActivateChildFn, CanActivateFn, CanDeactivateFn, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

export const AdminAuthGuard: CanActivateFn = (route, state) => {
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
    localStorage.removeItem('token'); // Clear invalid token
    router.navigateByUrl('/login');
    return false;
  }

  try {
    // Decode token safely
    const decodedToken: any = jwtHelper.decodeToken(token);
    console.log("Decoded Token:", decodedToken);

    const userRole = decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
    
    console.log("User Role:", userRole);

    if (userRole === 'Admin') {
      return true; // Allow access
    } else if (userRole === 'User'  ) {
     
      router.navigateByUrl('/user');
      return false;

     
    } else {
      alert("Invalid role or unauthorized access.");

      router.navigateByUrl('/login'); // Redirect to login or another appropriate page
      return false;
    }
    
  } catch (error) {
    console.error("Invalid token format! Redirecting to login...");
    localStorage.removeItem('token'); // Clear invalid token
    router.navigateByUrl('/login');
    return false;
  }
};


export const AdminChildAuthGuard:CanActivateChildFn = (route,state)=>{
  //valid token
  return false;
}

export interface canComponentDeactivate{
  CanDeactivate: () => boolean | Promise<boolean>;
}

export const AdminAuthDeactiveGuard:CanDeactivateFn<canComponentDeactivate> = (component)=>{
  //valid token
  return component.CanDeactivate ? component.CanDeactivate():true;
}
