"""
Script to populate initial achievements in the database
Run this after creating and running migrations
"""
import os
import sys
import django

# Add the backend directory to Python path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'achievement_backend.settings')
django.setup()

from achievements.models import Achievement

def create_initial_achievements():
    """Create the initial set of achievements"""
    
    initial_achievements = [
        {
            'name': 'First Steps',
            'description': 'Make your first click',
            'unlock_at': 1,
            'speed': 0,
            'click_multiplier': 1.0,
            'icon': '🎯',
            'rarity': 'common',
            'theme_primary': 'from-blue-400 to-blue-600',
            'theme_secondary': 'blue-500',
            'theme_accent': 'blue-400',
            'theme_background': 'blue-900',
            'theme_bg_class': 'bg-blue-950',
            'order': 1,
        },
        {
            'name': 'Getting Warmed Up',
            'description': 'Click 10 times',
            'unlock_at': 10,
            'speed': 0.1,
            'click_multiplier': 1.1,
            'icon': '🔥',
            'rarity': 'common',
            'theme_primary': 'from-orange-400 to-red-500',
            'theme_secondary': 'orange-500',
            'theme_accent': 'orange-400',
            'theme_background': 'orange-900',
            'theme_bg_class': 'bg-orange-950',
            'order': 2,
        },
        {
            'name': 'Clicking Novice',
            'description': 'Reach 50 clicks',
            'unlock_at': 50,
            'speed': 0.2,
            'click_multiplier': 1.2,
            'icon': '👶',
            'rarity': 'common',
            'theme_primary': 'from-green-400 to-green-600',
            'theme_secondary': 'green-500',
            'theme_accent': 'green-400',
            'theme_background': 'green-900',
            'theme_bg_class': 'bg-green-950',
            'order': 3,
        },
        {
            'name': 'Steady Progress',
            'description': 'Achieve 100 clicks',
            'unlock_at': 100,
            'speed': 0.5,
            'click_multiplier': 1.3,
            'icon': '⚡',
            'rarity': 'common',
            'theme_primary': 'from-yellow-400 to-yellow-600',
            'theme_secondary': 'yellow-500',
            'theme_accent': 'yellow-400',
            'theme_background': 'yellow-900',
            'theme_bg_class': 'bg-yellow-950',
            'order': 4,
        },
        {
            'name': 'Click Enthusiast',
            'description': 'Reach 250 clicks',
            'unlock_at': 250,
            'speed': 1,
            'click_multiplier': 1.4,
            'icon': '🚀',
            'rarity': 'rare',
            'theme_primary': 'from-purple-400 to-purple-600',
            'theme_secondary': 'purple-500',
            'theme_accent': 'purple-400',
            'theme_background': 'purple-900',
            'theme_bg_class': 'bg-purple-950',
            'order': 5,
        },
        {
            'name': 'Speed Demon',
            'description': 'Hit 500 clicks',
            'unlock_at': 500,
            'speed': 2,
            'click_multiplier': 1.5,
            'icon': '💨',
            'rarity': 'rare',
            'theme_primary': 'from-cyan-400 to-cyan-600',
            'theme_secondary': 'cyan-500',
            'theme_accent': 'cyan-400',
            'theme_background': 'cyan-900',
            'theme_bg_class': 'bg-cyan-950',
            'order': 6,
        },
        {
            'name': 'Click Master',
            'description': 'Achieve 1,000 clicks',
            'unlock_at': 1000,
            'speed': 3,
            'click_multiplier': 1.6,
            'icon': '🎖️',
            'rarity': 'rare',
            'theme_primary': 'from-indigo-400 to-indigo-600',
            'theme_secondary': 'indigo-500',
            'theme_accent': 'indigo-400',
            'theme_background': 'indigo-900',
            'theme_bg_class': 'bg-indigo-950',
            'order': 7,
        },
        {
            'name': 'Rapid Fire',
            'description': 'Reach 2,500 clicks',
            'unlock_at': 2500,
            'speed': 5,
            'click_multiplier': 1.7,
            'icon': '🔫',
            'rarity': 'epic',
            'theme_primary': 'from-pink-400 to-pink-600',
            'theme_secondary': 'pink-500',
            'theme_accent': 'pink-400',
            'theme_background': 'pink-900',
            'theme_bg_class': 'bg-pink-950',
            'order': 8,
        },
        {
            'name': 'Click Legend',
            'description': 'Hit 5,000 clicks',
            'unlock_at': 5000,
            'speed': 8,
            'click_multiplier': 1.8,
            'icon': '👑',
            'rarity': 'epic',
            'theme_primary': 'from-amber-400 to-orange-500',
            'theme_secondary': 'amber-500',
            'theme_accent': 'amber-400',
            'theme_background': 'amber-900',
            'theme_bg_class': 'bg-amber-950',
            'order': 9,
        },
        {
            'name': 'Spacebar Warrior',
            'description': 'Achieve 10,000 clicks',
            'unlock_at': 10000,
            'speed': 12,
            'click_multiplier': 1.9,
            'icon': '⚔️',
            'rarity': 'epic',
            'theme_primary': 'from-red-400 to-red-600',
            'theme_secondary': 'red-500',
            'theme_accent': 'red-400',
            'theme_background': 'red-900',
            'theme_bg_class': 'bg-red-950',
            'order': 10,
        },
    ]
    
    created_count = 0
    for achievement_data in initial_achievements:
        achievement, created = Achievement.objects.get_or_create(
            name=achievement_data['name'],
            defaults=achievement_data
        )
        if created:
            created_count += 1
            print(f"Created achievement: {achievement.name}")
        else:
            print(f"Achievement already exists: {achievement.name}")
    
    print(f"\nCreated {created_count} new achievements")
    print(f"Total achievements in database: {Achievement.objects.count()}")

if __name__ == '__main__':
    create_initial_achievements()
