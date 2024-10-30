// config/config.go

package config

import (
	"fmt"

	"github.com/spf13/viper"
)

type Config struct {
	Port             string
	DatabaseDSN      string
	RedisAddr        string
	RedisPassword    string
	RedisDB          int
	GmailAccessToken string
}

func LoadConfig() (*Config, error) {
	viper.SetConfigName("config")
	viper.SetConfigType("yaml")
	viper.AddConfigPath(".")
	viper.AutomaticEnv()

	err := viper.ReadInConfig() // Ignore error if no config file
	if err != nil {
		// Log that no config file was found, proceed with environment variables
		fmt.Println("No config file found, relying on environment variables")
	}

	cfg := &Config{
		Port:             viper.GetString("PORT"),
		DatabaseDSN:      viper.GetString("POSTGRES_DSN"),
		RedisAddr:        viper.GetString("REDIS_ADDR"),
		RedisPassword:    viper.GetString("REDIS_PASSWORD"),
		RedisDB:          viper.GetInt("REDIS_DB"),
		GmailAccessToken: viper.GetString("GMAIL_ACCESS_TOKEN"),
	}

	return cfg, nil
}
