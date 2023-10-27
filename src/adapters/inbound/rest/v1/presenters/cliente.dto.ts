import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEmail,
  MaxLength,
} from 'class-validator';

export class CriaClienteDTO {
  @IsString()
  @IsNotEmpty({ message: 'Nome do Cliente não pode ser vazio' })
  nome: string;

  @IsEmail()
  @IsNotEmpty({
    message: 'Email não pode ser vazio',
  })
  email: string;

  @IsString()
  @IsNotEmpty({
    message: 'CPF não pode ser vazio',
  })
  @MaxLength(11, {
    message: 'CPF precisa ter 11 digitos',
  })
  cpf: string;
}

export class AtualizaClienteDTO {
  @IsString()
  @IsOptional()
  nome?: string;

  @IsEmail()
  @IsOptional()
  email?: string;
}

export class ClienteDTO {
  id: string;
  nome: string;
  email: string;
  cpf: string;
}
