-- Add tags table
CREATE TABLE IF NOT EXISTS tags (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Add media_tags junction table
CREATE TABLE IF NOT EXISTS media_tags (
    media_id INTEGER REFERENCES media(id) ON DELETE CASCADE,
    tag_id INTEGER REFERENCES tags(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (media_id, tag_id)
);

-- Add API keys table
CREATE TABLE IF NOT EXISTS api_keys (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    key_hash VARCHAR(255) NOT NULL UNIQUE,
    scopes TEXT[] NOT NULL DEFAULT '{}',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP,
    last_used_at TIMESTAMP,
    is_active BOOLEAN DEFAULT true
);

-- Add storage configuration table
CREATE TABLE IF NOT EXISTS storage_config (
    id SERIAL PRIMARY KEY,
    provider VARCHAR(50) NOT NULL, -- 's3' or 'google-drive'
    credentials JSONB NOT NULL,
    bucket_name VARCHAR(255),
    base_path VARCHAR(255),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Add full-text search capabilities to media table
ALTER TABLE media 
    ADD COLUMN IF NOT EXISTS search_vector tsvector,
    ADD COLUMN IF NOT EXISTS file_metadata JSONB,
    ADD COLUMN IF NOT EXISTS tags TEXT[] DEFAULT '{}';

-- Create search index
CREATE INDEX IF NOT EXISTS media_search_idx ON media USING GIN(search_vector);
CREATE INDEX IF NOT EXISTS media_tags_idx ON media USING GIN(tags);

-- Create function to update search vector
CREATE OR REPLACE FUNCTION media_search_vector_update() RETURNS trigger AS $$
BEGIN
    NEW.search_vector := 
        setweight(to_tsvector('english', COALESCE(NEW.caption, '')), 'A') ||
        setweight(to_tsvector('english', COALESCE(NEW.filename, '')), 'B') ||
        setweight(to_tsvector('english', COALESCE(array_to_string(NEW.tags, ' '), '')), 'C');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for search vector updates
DROP TRIGGER IF EXISTS media_search_update ON media;
CREATE TRIGGER media_search_update
    BEFORE INSERT OR UPDATE ON media
    FOR EACH ROW
    EXECUTE FUNCTION media_search_vector_update(); 