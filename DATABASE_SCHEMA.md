# Supabase Database Schema

This document describes the database tables needed for the Commuter Buddy application.

## Tables

### 1. commute_requests
```sql
CREATE TABLE commute_requests (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  university TEXT NOT NULL,
  university_address TEXT NOT NULL,
  bus_number TEXT NOT NULL,
  departure_time TIME NOT NULL,
  latitude DECIMAL(10, 8) NOT NULL,
  longitude DECIMAL(11, 8) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS (Row Level Security)
ALTER TABLE commute_requests ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view all commute requests" ON commute_requests
    FOR SELECT USING (true);

CREATE POLICY "Users can insert their own commute requests" ON commute_requests
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own commute requests" ON commute_requests
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own commute requests" ON commute_requests
    FOR DELETE USING (auth.uid() = user_id);
```

### 2. chat_messages
```sql
CREATE TABLE chat_messages (
  id SERIAL PRIMARY KEY,
  room_id TEXT NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  user_name TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS (Row Level Security)
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view messages in rooms they have access to" ON chat_messages
    FOR SELECT USING (true);

CREATE POLICY "Users can insert messages" ON chat_messages
    FOR INSERT WITH CHECK (auth.uid() = user_id);
```

## Setup Instructions

1. Go to your Supabase project dashboard
2. Navigate to the SQL Editor
3. Run the SQL commands above to create the tables
4. The RLS policies ensure users can only modify their own data
5. Chat messages are visible to all users (you can customize this based on your needs)

## Environment Variables

Create a `.env` file in your project root with:

```
REACT_APP_SUPABASE_URL=your_supabase_project_url
REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key
```

You can find these values in your Supabase project settings under "API".
