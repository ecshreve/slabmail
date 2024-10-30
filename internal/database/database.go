// internal/database/database.go

package database

import (
	"context"
	"smail/graph/model"

	"github.com/charmbracelet/log"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

type DB struct {
	Conn *gorm.DB
}

func NewDatabase(dsn string) (*DB, error) {
	log.Info("Creating database connection", "dsn", dsn)
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		return nil, err
	}

	// Auto-migrate models
	err = db.AutoMigrate(&model.Message{})
	if err != nil {
		return nil, err
	}

	return &DB{Conn: db}, nil
}

// GetMessages fetches emails based on filters and pagination
func (db *DB) GetMessages(ctx context.Context, pagination *model.PaginationInput) ([]*model.Message, error) {
	log.Info("Fetching messages", "pagination", pagination)
	var messages []*model.Message
	query := db.Conn.WithContext(ctx).Model(&model.Message{})

	// Apply pagination
	if pagination != nil {
		if pagination.Limit != nil {
			query = query.Limit(*pagination.Limit)
		}
		if pagination.Offset != nil {
			query = query.Offset(*pagination.Offset)
		}
	}

	// Execute query
	result := query.Find(&messages)
	return messages, result.Error
}

// GetMessageByGmailID fetches a single email by its Gmail ID
func (db *DB) GetMessageByGmailID(ctx context.Context, gmailID string) (*model.Message, error) {
	log.Info("Fetching message by Gmail ID", "gmailID", gmailID)
	var email model.Message
	result := db.Conn.WithContext(ctx).Where("gmail_id = ?", gmailID).First(&email)
	if result.Error != nil {
		return nil, result.Error
	}
	return &email, nil
}

// UpdateMessageLabels updates the labels and starred status of an email
func (db *DB) UpdateMessageLabels(ctx context.Context, email *model.Message) error {
	log.Info("Updating message labels", "email", email)
	return db.Conn.WithContext(ctx).Save(email).Error
}

// UpsertMessages upserts messages into the database
func (db *DB) UpsertMessages(ctx context.Context, messages []*model.Message) error {
	log.Info("Upserting messages", "messages", messages)
	tx := db.Conn.WithContext(ctx).Begin()
	if tx.Error != nil {
		return tx.Error
	}
	defer tx.Rollback()

	for _, message := range messages {
		if err := tx.Save(message).Error; err != nil {
			return err
		}
	}
	return tx.Commit().Error
}
