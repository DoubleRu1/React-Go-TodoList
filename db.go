package main

import (
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

func createDB() {
	// refer https://github.com/go-sql-driver/mysql#dsn-data-source-name for details
	dsn := "root:lzr123456@tcp(127.0.0.1:3306)/react-go-tutorial?charset=utf8mb4&parseTime=True&loc=Local"
	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}
	DB = db
}
