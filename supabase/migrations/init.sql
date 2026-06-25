-- Users テーブル
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  line_id VARCHAR(255) UNIQUE NOT NULL,
  display_name VARCHAR(255) NOT NULL,
  profile_image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Players テーブル
CREATE TABLE players (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  internal_id VARCHAR(10) NOT NULL,
  display_name VARCHAR(255) NOT NULL,
  full_name VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(user_id, internal_id)
);

-- Leagues テーブル
CREATE TABLE leagues (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Events テーブル
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  league_id UUID NOT NULL REFERENCES leagues(id) ON DELETE CASCADE,
  event_number INTEGER NOT NULL,
  event_date DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Results テーブル
CREATE TABLE results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  player_id UUID NOT NULL REFERENCES players(id) ON DELETE CASCADE,
  points INTEGER,
  rank INTEGER,
  yakuman_count INTEGER,
  yakuman_types TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- RuleSets テーブル
CREATE TABLE rule_sets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  starting_points INTEGER NOT NULL DEFAULT 25000,
  return_points INTEGER NOT NULL DEFAULT 30000,
  uma_first INTEGER NOT NULL,
  uma_second INTEGER NOT NULL,
  oka INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- インデックス作成
CREATE INDEX idx_players_user_id ON players(user_id);
CREATE INDEX idx_leagues_user_id ON leagues(user_id);
CREATE INDEX idx_events_league_id ON events(league_id);
CREATE INDEX idx_results_event_id ON results(event_id);
CREATE INDEX idx_results_player_id ON results(player_id);
CREATE INDEX idx_rule_sets_user_id ON rule_sets(user_id);

-- RLS (Row Level Security) を有効化
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE players ENABLE ROW LEVEL SECURITY;
ALTER TABLE leagues ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE results ENABLE ROW LEVEL SECURITY;
ALTER TABLE rule_sets ENABLE ROW LEVEL SECURITY;

-- RLS ポリシー (自分のデータのみアクセス可能)
CREATE POLICY users_self_select ON users
  FOR SELECT USING (auth.uid()::text = id::text);

CREATE POLICY players_own_select ON players
  FOR SELECT USING (user_id::text = auth.uid()::text);

CREATE POLICY leagues_own_select ON leagues
  FOR SELECT USING (user_id::text = auth.uid()::text);
