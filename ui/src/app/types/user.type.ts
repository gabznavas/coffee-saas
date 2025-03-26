import { UserRole, UserRoleName } from "./user-role.type"

export class User {
  constructor(
    public id: number = 0,
    public fullName: string = '',
    public email: string = '',
    public profileImageUrl: string = '',
    public createdAt: Date = new Date(),
    public updatedAt: Date | null = null,
    public disabledAt: Date | null = null,
    public roles: UserRole[] = [],
  ) { }

  rankedRoles = (): UserRole => {
    const rank = Object.values(UserRoleName);

    let rankIndex = this.roles.length - 1;
    let rankObj = this.roles[0]

    for (let role of this.roles) {
      for (let i = 0; i < rank.length; i++) {
        if (role.name === rank[i] && i < rankIndex) {
          rankIndex = i;
          rankObj = this.roles[i]
        }
      }
    }

    return rankObj
  }
}