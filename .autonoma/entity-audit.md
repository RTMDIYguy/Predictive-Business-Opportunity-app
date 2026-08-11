---
model_count: 4
factory_count: 4
models:
  - name: users
    independently_created: true
    creation_file: backend/server.py
    creation_function: register
    side_effects:
      - hashes password
      - generates UUID id
      - sets created_at timestamp
    created_by: []
  - name: accounts
    independently_created: true
    creation_file: backend/server.py
    creation_function: connect_account
    side_effects:
      - handles upsert logic via update_one or insert_one
      - stores platform-specific access tokens from OAuth callbacks (linkedin_callback, facebook_callback)
    created_by: []
  - name: posts
    independently_created: true
    creation_file: backend/server.py
    creation_function: create_post
    side_effects:
      - generates UUID id
      - initializes empty engagement dict
      - supports scheduled_at for future publishing
    created_by: []
  - name: media
    independently_created: true
    creation_file: backend/server.py
    creation_function: upload_media
    side_effects:
      - stores base64 data_url for inline media usage
    created_by: []
---

# Entity Audit

Framework: unknown

## Roots (independently_created: true)

- **users** - register
- **accounts** - connect_account
- **posts** - create_post
- **media** - upload_media

## Dependents (independently_created: false)



## Dual-creation models (independently_created AND created_by)

None
