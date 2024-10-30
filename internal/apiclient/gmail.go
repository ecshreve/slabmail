// internal/apiclient/gmail.go
package apiclient

import (
	"context"
	"net/http"
	"slices"
	"strconv"

	"smail/graph/model"

	"github.com/charmbracelet/log"
	"google.golang.org/api/gmail/v1"
	"google.golang.org/api/option"
)

type Client interface {
	FetchMessages(query string) ([]*model.Message, error)
	GetMessage(id string) (*model.Message, error)
}

type httpClient interface {
	Do(req *http.Request) (*http.Response, error)
}

type GmailClient struct {
	HTTPClient  *http.Client
	AccessToken string
}

// FetchMessages fetches messages from the Gmail API.
//
// It returns a list of messages and an error if any.
func (c *GmailClient) FetchMessages(ctx context.Context, limit *int, offset *int) ([]*model.Message, error) {
	log.Info("Fetching messages", "limit", limit, "offset", offset)
	defaultLimit := 10
	defaultOffset := 0

	if limit == nil {
		limit = &defaultLimit
	}
	if offset == nil {
		offset = &defaultOffset
	}

	srv, err := gmail.NewService(ctx, option.WithHTTPClient(c.HTTPClient))
	if err != nil {
		return nil, err
	}

	messages, err := srv.Users.Messages.List("me").
		MaxResults(int64(*limit)).
		PageToken(strconv.Itoa(*offset)).
		Do()
	if err != nil {
		return nil, err
	}

	var result []*model.Message
	for _, msg := range messages.Messages {
		details, err := c.GetMessage(ctx, msg.Id)
		if err != nil {
			return nil, err
		}
		result = append(result, details)
	}

	return result, nil
}

// GetMessage fetches a single message from the Gmail API.
//
// It returns a message and an error if any.
func (c *GmailClient) GetMessage(ctx context.Context, id string) (*model.Message, error) {
	log.Info("Fetching message by Gmail ID", "gmailID", id)
	srv, err := gmail.NewService(ctx, option.WithHTTPClient(c.HTTPClient))
	if err != nil {
		return nil, err
	}

	message, err := srv.Users.Messages.Get("me", id).Do()
	if err != nil {
		return nil, err
	}

	from := ""
	subject := ""
	for _, header := range message.Payload.Headers {
		if header.Name == "From" {
			from = header.Value
			continue
		}
		if header.Name == "Subject" {
			subject = header.Value
			continue
		}
	}

	return &model.Message{
		ID:        message.Id,
		GmailID:   message.Id,
		ThreadID:  message.ThreadId,
		Subject:   subject,
		Sender:    from,
		Timestamp: strconv.FormatInt(message.InternalDate, 10),
		Body:      message.Payload.Body.Data,
		IsStarred: message.LabelIds != nil && slices.Contains(message.LabelIds, "STARRED"),
	}, nil
}
