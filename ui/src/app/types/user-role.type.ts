export enum UserRoleName {
  ADMIN = "ADMIN",
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
      case UserRoleName.ADMIN:
        return "Administrador"
      case UserRoleName.MANAGER:
        return "Gerente"
      case UserRoleName.CASHIER:
        return "Caixa"
      default:
        return "Atendente"
    }
  }
}

