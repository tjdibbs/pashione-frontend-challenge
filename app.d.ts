declare global {
  namespace App {
    export interface User {
      id: number;
      name: string;
      username: string;
      email: string;
      address: Address;
      phone: string;
      website: string;
      company: Company;
    }

    export interface Address {
      street: string;
      suite: string;
      city: string;
      zipcode: string;
      geo: Geo;
    }

    export interface Geo {
      lat: string;
      lng: string;
    }

    export interface Company {
      name: string;
      catchPhrase: string;
      bs: string;
    }

    export interface Notification {
      title: string;
      description: string;
      createdAt: string;
      _id: string;
      viewed: boolean;
    }
    export interface SessionInitialState {
      user: User;
      token: string;
      mode: ThemeMode;
      device: "mobile" | "tablet" | "desktop";
    }

    export type ThemeMode = "light" | "dark" | "default";

    export type FormGroupProps<P = keyof User> = {
      name: P;
      value?: string;
      label?: string;
      options?: object[];
      required?: boolean;
      withLabel?: boolean;
      error?: boolean;
      placeholder?: string;
      htmlRef?: any;
      inputType?: string;
      rows?: number;
      maxLength?: number;
      max?: number;
      autoComplete?: boolean;
      addonBefore?: React.ReactNode;
      addonAfter?: React.ReactNode;
      onChange?(value: React.ChangeEvent | string): void;
      onBlur?(e: React.FormEvent): void;
      setFormState?: BusinessRouteProps["setFormState"];
    };
  }
}

export {};
