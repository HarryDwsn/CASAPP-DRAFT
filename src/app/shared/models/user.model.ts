export interface Roles {
  admin: boolean;
  teacher: boolean;
  student: boolean;
}

export class User {
  constructor(
    public email: string,
    public id: string,
    public roles:Roles,
    public name:string,
    public classroom:string,
    private _token?: string,
    private _tokenExpirationDate?: Date,

  ) {}

  get token() {
    if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
      return null;
    }
    return this._token;
  }
}
