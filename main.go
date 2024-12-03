package main

import (
	"log"
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/joho/godotenv"
)

type Todo struct {
	ID        int    `json:"id" gorm:"primaryKey;autoIncrement"`
	Completed bool   `json:"completed" gorm:"default:false"`
	Body      string `json:"body" binding:"required"`
}

func main() {
	err := godotenv.Load(".env")
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	port := os.Getenv("PORT")
	createDB()
	app := fiber.New()
	app.Use(func(c *fiber.Ctx) error {
		c.Set("Access-Control-Allow-Origin", "*")
		c.Set("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,PATCH")
		c.Set("Access-Control-Allow-Headers", "Content-Type,Authorization")

		if c.Method() == "OPTIONS" {
			return c.SendStatus(200)
		}

		return c.Next()
	})
	app.Get("/api/todos", func(c *fiber.Ctx) error {
		var todos []Todo
		result := DB.Find(&todos)

		if result.Error != nil {
			return c.Status(500).JSON(fiber.Map{
				"error": result.Error.Error(),
			})
		}

		return c.JSON(todos)
	})
	app.Post("api/todos", func(c *fiber.Ctx) error {
		todo := &Todo{}
		if err := c.BodyParser(todo); err != nil {
			return err
		}
		if todo.Body == "" {
			return c.Status(400).JSON(fiber.Map{"error": "Body is required"})
		}
		// Create table for `User`
		DB.AutoMigrate(&Todo{})
		result := DB.Create(&todo)
		if result.Error != nil {
			return c.Status(500).JSON(fiber.Map{"error": result.Error.Error()})
		}
		return c.Status(201).JSON(todo)
	})

	app.Patch("/api/todos/:id", func(c *fiber.Ctx) error {

		id := c.Params("id")
		todo := &Todo{}
		result := DB.First(&todo, id)
		if result.Error != nil {
			return c.Status(404).JSON(fiber.Map{"error": "Todo not found"})
		}
		DB.Model(&Todo{}).Where("id = ?", todo.ID).Update("completed", !todo.Completed)
		return c.Status(200).JSON(todo)

	})
	app.Delete("/api/todos/:id", func(c *fiber.Ctx) error {
		id := c.Params("id")
		todo := &Todo{}
		result := DB.First(&todo, id)
		if result.Error != nil {
			return c.Status(404).JSON(fiber.Map{"error": "Todo not found"})
		}
		DB.Delete(&todo)
		return c.Status(200).JSON(todo)
	})

	log.Fatal(app.Listen(port))

}
