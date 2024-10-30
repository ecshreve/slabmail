// graph/resolver.go

package graph

import (
	"smail/internal/apiclient"
	"smail/internal/cache"
	"smail/internal/database"
)

// Resolver serves as dependency injection for your app, add any dependencies you require here.
type Resolver struct {
	DB    *database.DB
	Cache *cache.Cache
	Gmail *apiclient.GmailClient
}
