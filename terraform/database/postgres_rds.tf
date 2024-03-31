provider "aws" {
  region = "ap-southeast-1"
}

variable "DB_PASSWORD" {
  description = "Password for the database"
}

resource "aws_db_instance" "postgres" {
  identifier                = "wireapps"
  allocated_storage         = 20
  storage_type              = "gp2"
  engine                    = "postgres"
  engine_version            = "16.1"
  instance_class            = "db.t3.micro"
  username                  = "adminwireapps"
  password                  = var.DB_PASSWORD
  publicly_accessible       = false
  skip_final_snapshot       = true
  apply_immediately         = true

  tags = {
    Name = "wireapps"
  }
}

