export interface UserDTO {
  userId: number;
  name: string;
  email: string;
  passwordHash: string;
  roleId: number;
  createdBy: string;
  lastModifiedBy: string;
}
