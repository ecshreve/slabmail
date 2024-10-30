// internal/cache/cache.go
package cache

import (
	"context"
	"encoding/json"
	"time"

	"smail/graph/model"

	"github.com/charmbracelet/log"
	"github.com/redis/go-redis/v9"
)

type Cache struct {
	Client *redis.Client
}

func NewCache(addr, password string, db int) *Cache {
	log.Info("Creating Redis client", "addr", addr, "password", password, "db", db)
	client := redis.NewClient(&redis.Options{
		Addr:     addr,
		Password: password,
		DB:       db,
	})
	return &Cache{Client: client}
}

// GetMessages retrieves cached messages based on the cache key
func (c *Cache) GetMessages(ctx context.Context, key string) ([]*model.Message, error) {
	// return nil, fmt.Errorf("cache miss")
	log.Info("Getting messages from cache", "key", key)
	data, err := c.Client.Get(ctx, key).Result()
	if err != nil {
		return nil, err
	}

	var messages []*model.Message
	if err := json.Unmarshal([]byte(data), &messages); err != nil {
		return nil, err
	}

	return messages, nil
}

// SetMessages caches messages with a specific key and expiration
func (c *Cache) SetMessages(ctx context.Context, key string, messages []*model.Message) error {
	log.Info("Setting messages in cache", "key", key, "messages", messages)
	data, err := json.Marshal(messages)
	if err != nil {
		return err
	}

	// Set expiration to 10 minutes
	return c.Client.Set(ctx, key, data, 10*time.Minute).Err()
}

// InvalidateMessagesCache invalidates all cached message queries
func (c *Cache) InvalidateMessagesCache(ctx context.Context) error {
	log.Info("Invalidating messages cache")
	// This implementation assumes that all message cache keys start with "messages:"
	iter := c.Client.Scan(ctx, 0, "messages:*", 0).Iterator()
	var matchedKeys []string
	for iter.Next(ctx) {
		matchedKeys = append(matchedKeys, iter.Val())
	}
	if err := iter.Err(); err != nil {
		return err
	}
	if len(matchedKeys) > 0 {
		return c.Client.Del(ctx, matchedKeys...).Err()
	}
	return nil
}
