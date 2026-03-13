output "ec2_public_ip" {
  description = "IP público da instância EC2 da aplicação"
  value       = aws_instance.app.public_ip
}

output "ec2_public_dns" {
  description = "DNS público da instância EC2"
  value       = aws_instance.app.public_dns
}

output "rds_endpoint" {
  description = "Endpoint do banco RDS"
  value       = aws_db_instance.mysql.address
}

output "vpc_id" {
  description = "ID da VPC criada"
  value       = aws_vpc.this.id
}
