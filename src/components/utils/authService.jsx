// authService.js

export function getCurrentUser() {
  const token = localStorage.getItem("jwtToken");

  if (!token) return null;

  try {
    const payload = JSON.parse(
      atob(token.split(".")[1])
    );

    return {
      email: payload.sub,
      id: payload.id,
      roles: payload.roles,
    };
  } catch {
    return null;
  }
}