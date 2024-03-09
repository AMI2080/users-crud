export interface User {
  id: number;
  name: string;
  password?: string;
  email: string;
  phone: string;
  status: 'active' | 'soft_deleted';
}
