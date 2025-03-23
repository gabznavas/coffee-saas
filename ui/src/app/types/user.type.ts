import { UserRole, UserRoleName } from "./user-role.type"

export class User {
  id: number = 0
  fullName: string = ''
  email: string = ''
  profileImageUrl: string = ''
  roles: UserRole[] = []

  rankedRoles = (): UserRole => {
    const rank = Object.values(UserRoleName);

    let rankIndex = 2;
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