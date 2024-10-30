// cmd/server/main.go

package main

import (
	"context"
	"net/http"

	"smail/config"
	"smail/graph"
	"smail/internal/apiclient"
	"smail/internal/cache"
	"smail/internal/database"

	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/charmbracelet/log"
	"github.com/muesli/termenv"
)

func cors(h http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "*")
		w.Header().Set("Access-Control-Allow-Headers", "*")
		h(w, r)
	}
}

func main() {
	log.SetLevel(log.DebugLevel)
	log.SetReportCaller(true)
	log.SetColorProfile(termenv.ANSI256)
	log.Info("Starting server")

	// Initialize configuration
	cfg, err := config.LoadConfig()
	if err != nil {
		log.Fatalf("Failed to load config: %v", err)
	}
	log.Printf("Config: %+v", cfg)

	// Initialize database
	db, err := database.NewDatabase(cfg.DatabaseDSN)
	if err != nil {
		log.Fatalf("Failed to connect to database: %v", err)
	}

	// Initialize cache
	redisCache := cache.NewCache(cfg.RedisAddr, cfg.RedisPassword, cfg.RedisDB)

	// Initialize Gmail client
	authClient := apiclient.GetClient(context.Background())

	// Initialize resolver with dependencies
	resolver := &graph.Resolver{
		DB:    db,
		Cache: redisCache,
		Gmail: &apiclient.GmailClient{
			HTTPClient:  authClient,
			AccessToken: cfg.GmailAccessToken,
		},
	}

	// Create executable GraphQL schema
	srv := handler.NewDefaultServer(graph.NewExecutableSchema(graph.Config{Resolvers: resolver}))

	// Set up HTTP handlers
	http.Handle("/graphql", cors(srv.ServeHTTP))
	http.Handle("/", playground.Handler("GraphQL Playground", "/graphql"))

	// Start the server
	log.Printf("Server is running on port %s", cfg.Port)
	if err := http.ListenAndServe(":"+cfg.Port, nil); err != nil {
		log.Fatalf("Failed to start server: %v", err)
	}
}
