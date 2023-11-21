declare global {
  namespace App {
    export interface User {}

    export interface SessionInitialState {
      user: User;
      token: string;
    }
  }
}

export {};
