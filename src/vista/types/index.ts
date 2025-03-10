export type password = 'password'
export type text = 'text'

export type Departamentos = {
  id: number,
  name: string,
}

export type Sede = {
  numeroIdentificacion: number,
  nombre: string,
  nombreDepartamento: string,
  nombreMunicipio: string,
}

export type Formacion = {
  numeroIdentificacion: number,
  nombre: string,
  tipo: string,
  instructores: string,
  horario: string,
  fechaInicio: `${string}-${string}-${string}`,
  fechaFin: `${string}-${string}-${string}`,
  idSede: number
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
  idSede_as?: string
}

export type Aprendiz = {
  numeroIdentificacion: string,
  nombre: string,
  apellidos: string,
  celular: string | null,
  email: string | null,
  idFormacion: string | null
}

export type AprendizCompleto = {
  numeroIdentificacion: string,
  nombre: string,
  apellidos: string,
  celular: string | null,
  email: string | null,
  nombreFormacion: string 
  nombreSede: string 
  nombreDepartamento: string 
}

export type Tipo = 'Departamento' | 'Sede' | ''
