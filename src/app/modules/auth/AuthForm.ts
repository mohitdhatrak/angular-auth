// export interface AuthForm {
//   email: string;
//   password: string;
//   firstName?: string;
//   lastName?: string;
//   confirmPassword?: string;
//   phoneNumber?: number;
//   dob?: string;
// }

export interface LoginForm {
  userLogin: string;
  password: string;
  tenantLogin?: string;
}

interface ContactDetails {
  contact: {
    contactType: { dataCode: string };
    contactValue: string;
    id: number;
    verified: boolean;
    notes: string | null;
  };
  id: number;
  primaryContact: boolean;
}

export interface SignupForm {
  id: number;
  dob: string;
  appContext: string;
  firstName: string;
  lastName: string;
  login: string;
  userContacts: ContactDetails[];
}
