export enum RoleName {
  ADMIN = "ADMIN",
  MANAGER = "MANAGER",
  CASHIER = "CASHIER",
  ATTENDANT = "ATTENDANT",
}

export class Role {
  constructor(
    public id: number,
    public name: RoleName = RoleName.ATTENDANT
  ) { }

  translate() {
    switch (this.name) {
      case RoleName.ADMIN:
        return "Administrador"
      case RoleName.MANAGER:
        return "Gerente"
      case RoleName.CASHIER:
        return "Caixa"
      default:
        return "Atendente"
    }
  }
}

