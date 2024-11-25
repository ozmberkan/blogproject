import { redirect } from "react-router-dom";

export const roleLoader = (user, requiredRoles) => {
  return new Promise((resolve) => {
    if (!user) {
      resolve(redirect("/auth/login"));
    } else {
      const userRole = user.role;
      if (requiredRoles.includes(userRole)) {
        resolve(null);
      } else {
        resolve(redirect("/auth/login"));
      }
    }
  });
};
