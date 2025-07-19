# Spacebar Clicker Achievement Backend

Django REST API backend for managing achievements in the Spacebar Clicker game.

## Setup Instructions

### 1. Install Dependencies

\`\`\`bash
cd backend
pip install -r requirements.txt
\`\`\`

### 2. Run Migrations

\`\`\`bash
python manage.py makemigrations
python manage.py migrate
\`\`\`

### 3. Create Superuser (Optional)

\`\`\`bash
python manage.py createsuperuser
\`\`\`

### 4. Load Initial Achievements

\`\`\`bash
python scripts/setup_initial_achievements.py
\`\`\`

### 5. Start Development Server

\`\`\`bash
python manage.py runserver 127.0.0.1:8000
\`\`\`

## API Endpoints

- `GET /api/achievements/` - Get all achievements
- `POST /api/achievements/create/` - Create new achievement
- `GET /api/achievements/{id}/` - Get specific achievement
- `PUT /api/achievements/{id}/` - Update achievement
- `DELETE /api/achievements/{id}/` - Delete achievement
- `GET /api/achievements/stats/` - Get achievement statistics

## Admin Interface

Access the Django admin at `http://127.0.0.1:8000/admin/` to manage achievements through a web interface.

## Frontend Integration

The frontend will automatically connect to `http://127.0.0.1:8000/api` and load achievements from the backend.

## Adding New Achievements

### Via Admin Interface:
1. Go to `http://127.0.0.1:8000/admin/`
2. Login with superuser credentials
3. Click "Achievements" → "Add Achievement"
4. Fill in the form and save

### Via API:
\`\`\`bash
curl -X POST http://127.0.0.1:8000/api/achievements/create/ \
  -H "Content-Type: application/json" \
  -d '{
    "name": "New Achievement",
    "description": "Description here",
    "unlock_at": 1000,
    "speed": 5.0,
    "click_multiplier": 1.5,
    "icon": "🎉",
    "rarity": "rare",
    "theme_primary": "from-purple-400 to-purple-600",
    "theme_secondary": "purple-500",
    "theme_accent": "purple-400",
    "theme_background": "purple-900",
    "theme_bg_class": "bg-purple-950"
  }'
