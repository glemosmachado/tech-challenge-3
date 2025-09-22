type Role = 'student' | 'teacher' | null;

const KEY = 'tc_role';

export const auth = {
  getRole(): Role {
    const v = localStorage.getItem(KEY);
    return (v === 'teacher' || v === 'student') ? v : null;
  },
  setRole(role: Exclude<Role, null>) {
    localStorage.setItem(KEY, role);
  },
  clear() {
    localStorage.removeItem(KEY);
  }
};