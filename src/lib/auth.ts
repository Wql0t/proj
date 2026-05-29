export const roleFromToken = (token: string) => {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.role as string | undefined;
  } catch {
    return undefined;
  }
};

export const saveToken = (token: string, role?: string) => {
  localStorage.setItem('token', token);
  const r = role ?? roleFromToken(token);
  if (r) localStorage.setItem('role', r);
};

export const getToken = () =>
  typeof window !== 'undefined' ? localStorage.getItem('token') : null;

export const getRole = () =>
  typeof window !== 'undefined' ? localStorage.getItem('role') : null;

export const isAdmin = () => getRole() === 'admin';

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('role');
};
