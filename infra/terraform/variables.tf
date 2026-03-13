variable "aws_region" {
  description = "Região AWS onde os recursos serão criados"
  type        = string
  default     = "sa-east-1"
}

variable "project_name" {
  description = "Nome base do projeto"
  type        = string
  default     = "resq"
}

variable "environment" {
  description = "Ambiente provisionado"
  type        = string
  default     = "dev"
}

variable "vpc_cidr" {
  description = "CIDR da VPC"
  type        = string
  default     = "10.0.0.0/16"
}

variable "public_subnet_cidr" {
  description = "CIDR da subnet pública"
  type        = string
  default     = "10.0.1.0/24"
}

variable "private_subnet_cidr_a" {
  description = "CIDR da subnet privada A"
  type        = string
  default     = "10.0.10.0/24"
}

variable "private_subnet_cidr_b" {
  description = "CIDR da subnet privada B"
  type        = string
  default     = "10.0.11.0/24"
}

variable "availability_zone_a" {
  description = "Availability Zone principal"
  type        = string
  default     = "sa-east-1a"
}

variable "availability_zone_b" {
  description = "Availability Zone secundária"
  type        = string
  default     = "sa-east-1b"
}

variable "ami_id" {
  description = "AMI Ubuntu da EC2"
  type        = string
}

variable "instance_type" {
  description = "Tipo da instância EC2"
  type        = string
  default     = "t3.micro"
}

variable "key_name" {
  description = "Nome do par de chaves SSH já existente na AWS"
  type        = string
}

variable "allowed_ssh_cidr" {
  description = "Faixa IP autorizada para SSH"
  type        = string
  default     = "0.0.0.0/0"
}

variable "app_port" {
  description = "Porta da API ResQ"
  type        = number
  default     = 8001
}

variable "db_name" {
  description = "Nome inicial do banco de dados"
  type        = string
  default     = "resq"
}

variable "db_username" {
  description = "Usuário administrador do banco"
  type        = string
  sensitive   = true
}

variable "db_password" {
  description = "Senha do banco"
  type        = string
  sensitive   = true
}

variable "db_instance_class" {
  description = "Classe da instância RDS"
  type        = string
  default     = "db.t3.micro"
}
