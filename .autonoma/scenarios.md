---
scenario_count: 1
scenarios:
  - name: standard
    description: "A standard creator profile with connected accounts, diverse post types (draft, scheduled, published), and media uploads."
entity_types:
  - name: users
    count: 1
  - name: accounts
    count: 3
  - name: posts
    count: 8
  - name: media
    count: 2
---

# Standard Scenario Data

## users
| id | email | name | password_hash | created_at |
| :--- | :--- | :--- | :--- | :--- |
| user-7722 | creator+{{testRunId}}@example.test | Alex Rivera | $2b$12$LQvPHiUvCIBf.fS48X.3o.Cj6I5G/fE7oR3a3P1h4U1p1J7u2C.6u | 2024-05-01T10:00:00Z |

## accounts
| id | user_id | platform | handle | status | access_token | connected_at |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| acc-101 | user-7722 | instagram | @alex_creativ_studio | connected | ig_tok_{{testRunShortId}} | 2024-05-01T10:05:00Z |
| acc-102 | user-7722 | facebook | Alex Rivera Studio | connected | fb_tok_{{testRunShortId}} | 2024-05-01T10:06:00Z |
| acc-103 | user-7722 | linkedin | alex-rivera-design | connected | li_tok_{{testRunShortId}} | 2024-05-01T10:07:00Z |

## media
| id | user_id | mime | data_url | created_at |
| :--- | :--- | :--- | :--- | :--- |
| med-001 | user-7722 | image/png | data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg== | 2024-05-10T09:00:00Z |
| med-002 | user-7722 | image/jpeg | data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAABAAEHAREBAhEBAxEB/8QAFAABAAAAAAAAAAAAAAAAAAAAAP/EABQQAQAAAAAAAAAAAAAAAAAAAAD/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8Af/9k= | 2024-05-11T14:20:00Z |

## posts
| id | user_id | content | platforms | status | media_urls | scheduled_at | published_at | engagement | created_at |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| pst-901 | user-7722 | Just finished the new brand identity for @GlobalTech. Loving the minimalism! | ["instagram", "facebook"] | published | ["data:image/png;base64,iVBOR..."] | 2024-05-12T08:00:00Z | 2024-05-12T08:00:05Z | {"instagram": {"likes": 142, "comments": 12, "shares": 5, "impressions": 1200, "clicks": 24}, "facebook": {"likes": 45, "comments": 3, "shares": 8, "impressions": 850, "clicks": 12}} | 2024-05-10T09:15:00Z |
| pst-902 | user-7722 | 5 Tips for Better Typography in Web Design. #design #typography #webdev | ["linkedin"] | published | [] | 2024-05-13T10:00:00Z | 2024-05-13T10:00:02Z | {"linkedin": {"likes": 88, "comments": 15, "shares": 22, "impressions": 2100, "clicks": 145}} | 2024-05-11T14:30:00Z |
| pst-903 | user-7722 | Why brutalism is making a comeback in 2024 digital interfaces. | ["linkedin", "facebook"] | published | [] | 2024-05-14T09:00:00Z | 2024-05-14T09:00:10Z | {"linkedin": {"likes": 34, "comments": 4, "shares": 2, "impressions": 600, "clicks": 18}, "facebook": {"likes": 12, "comments": 1, "shares": 0, "impressions": 300, "clicks": 5}} | 2024-05-13T16:00:00Z |
| pst-904 | user-7722 | New office setup! Ready for a productive week of coding and designing. | ["instagram"] | published | ["data:image/jpeg;base64,/9j/4AA..."] | 2024-05-15T08:30:00Z | 2024-05-15T08:30:03Z | {"instagram": {"likes": 210, "comments": 28, "shares": 10, "impressions": 1850, "clicks": 32}} | 2024-05-14T19:00:00Z |
| pst-905 | user-7722 | Early morning productivity hack: No emails before 10 AM. Focus on deep work first. | ["linkedin"] | scheduled | [] | 2025-12-01T09:00:00Z | null | {} | 2024-05-15T10:00:00Z |
| pst-906 | user-7722 | Sneak peek at the mobile app we've been building for Pulse. Coming soon! | ["instagram", "facebook", "linkedin"] | scheduled | ["data:image/png;base64,iVBOR..."] | 2025-12-05T12:00:00Z | null | {} | 2024-05-15T11:00:00Z |
| pst-907 | user-7722 | Thinking about switching to a 4-day work week. Anyone here made the jump? | ["linkedin"] | draft | [] | null | null | {} | 2024-05-16T14:00:00Z |
| pst-908 | user-7722 | Failed post experiment - this one went wrong during publishing. | ["instagram"] | failed | [] | 2024-05-15T15:00:00Z | null | {"instagram": {"error": "Invalid aspect ratio"}} | 2024-05-15T14:45:00Z |
