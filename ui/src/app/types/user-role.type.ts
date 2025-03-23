export enum UserRoleName {
  MANAGER = "MANAGER",
  CASHIER = "CASHIER",
  ATTENDANT = "ATTENDANT",
}

export class UserRole {
  constructor(
    public name: UserRoleName = UserRoleName.ATTENDANT
  ) { }

  translate() {
    switch (this.name) {
      case UserRoleName.MANAGER:
        return "Gerente"
      case UserRoleName.CASHIER:
        return "Caixa"
      default:
        return "Atendente"
    }
  }
}

