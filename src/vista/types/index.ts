export type password = 'password'
export type text = 'text'
export type Date = `${string}-${string}-${string}` | ''

export type Departamentos = {
  id: number,
  name: string,
}

// export type Sede = {
//   numeroIdentificacion: number,
//   nombre: string,
//   nombreDepartamento: string,
//   nombreMunicipio: string,
// }

export type Formacion = {
  numeroIdentificacion: string,
  nombre: string,
  tipo: string,
  instructores: string,
  horario: string,
  fechaInicio: string,
  fechaFin: string,
  nombreDepartamento: string,
  nombreMunicipio: string,
}

export type Admin = {
  numeroIdentificacion: string,
  password: string,
}

export type AdminDepartamento = Admin & {
  nombre: string,
  apellidos: string,
  nombreDepartamento: string,
}

export type AdminSede = Admin & {
  nombre: string,
  apellidos: string,
  nombreDepartamento: string,
  nombreMunicipio: string,
}

export type Aprendiz = {
  numeroIdentificacion: string,
  nombre: string,
  apellidos: string,
  celular: string | null,
  email: string | null,
  idFormacion: string | null
}

export type AprendizCompleto = Aprendiz & {
  nombreFormacion: string, 
  nombreDepartamento: string, 
  nombreMunicipio: string,
}

// export type FormacionCompleto = Formacion & {
//   nombreDepartamento: string,
//   nombreSede: string
// }

// export type AdminSedeCompleto = Omit<AdminSede, 'idSede_as'> & {
//   nombreDepartamento: string,
//   nombreSede: string
// }

export type Tipo = 'Departamento' | 'Sede' | 'Municipio' | ''
