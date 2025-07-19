from django.core.management.base import BaseCommand
from achievements.models import Achievement
import random

class Command(BaseCommand):
    help = 'Generate additional achievements dynamically'

    def add_arguments(self, parser):
        parser.add_argument(
            '--count',
            type=int,
            default=10,
            help='Number of achievements to generate (default: 10)',
        )
        parser.add_argument(
            '--start-at',
            type=int,
            default=50000000,
            help='Starting click count for generated achievements (default: 50,000,000)',
        )

    def handle(self, *args, **options):
        count = options['count']
        start_at = options['start_at']
        
        # Achievement name templates
        name_templates = [
            "Infinite Level {level}",
            "Cosmic Tier {level}",
            "Dimensional Stage {level}",
            "Quantum Level {level}",
            "Ethereal Rank {level}",
            "Celestial Grade {level}",
            "Transcendent Phase {level}",
            "Omniversal Tier {level}",
            "Hyperdimensional Level {level}",
            "Multiversal Stage {level}",
        ]
        
        # Description templates
        desc_templates = [
            "Transcend reality with {clicks:,} clicks of pure energy",
            "Shatter the boundaries of existence with {clicks:,} clicks",
            "Ascend beyond mortal comprehension with {clicks:,} clicks",
            "Weave the fabric of space-time with {clicks:,} clicks",
            "Command the forces of creation with {clicks:,} clicks",
            "Bend the laws of physics with {clicks:,} clicks",
            "Harness the power of infinity with {clicks:,} clicks",
            "Reshape the multiverse with {clicks:,} clicks",
            "Channel cosmic energy through {clicks:,} clicks",
            "Achieve enlightenment with {clicks:,} clicks",
        ]
        
        # Icon options
        icons = ["∞", "🌌", "⭐", "💫", "🔮", "🌟", "✨", "💎", "🎆", "🌠", "🔥", "⚡", "💥", "🌈", "🎯"]
        
        # Theme variations
        themes = [
            {
                'primary': 'from-purple-400 via-pink-500 to-red-500',
                'secondary': 'purple-500',
                'accent': 'purple-400',
                'background': 'purple-900',
                'bg_class': 'bg-gradient-to-br from-purple-950 via-pink-950 to-red-950',
            },
            {
                'primary': 'from-blue-400 via-cyan-500 to-teal-500',
                'secondary': 'blue-500',
                'accent': 'blue-400',
                'background': 'blue-900',
                'bg_class': 'bg-gradient-to-br from-blue-950 via-cyan-950 to-teal-950',
            },
            {
                'primary': 'from-green-400 via-emerald-500 to-cyan-500',
                'secondary': 'green-500',
                'accent': 'green-400',
                'background': 'green-900',
                'bg_class': 'bg-gradient-to-br from-green-950 via-emerald-950 to-cyan-950',
            },
            {
                'primary': 'from-yellow-400 via-orange-500 to-red-500',
                'secondary': 'yellow-500',
                'accent': 'yellow-400',
                'background': 'yellow-900',
                'bg_class': 'bg-gradient-to-br from-yellow-950 via-orange-950 to-red-950',
            },
            {
                'primary': 'from-indigo-400 via-purple-500 to-pink-500',
                'secondary': 'indigo-500',
                'accent': 'indigo-400',
                'background': 'indigo-900',
                'bg_class': 'bg-gradient-to-br from-indigo-950 via-purple-950 to-pink-950',
            },
        ]

        created_count = 0
        current_clicks = start_at
        
        # Get the highest order number
        max_order = Achievement.objects.aggregate(max_order=models.Max('order'))['max_order'] or 0

        for i in range(count):
            level = i + 1
            name = random.choice(name_templates).format(level=level)
            description = random.choice(desc_templates).format(clicks=current_clicks)
            icon = random.choice(icons)
            theme = random.choice(themes)
            
            # Progressive difficulty scaling
            speed = 1000 + (i * 500)  # Increases by 500 each level
            click_multiplier = 5.0 + (i * 0.5)  # Increases by 0.5 each level
            
            achievement_data = {
                'name': name,
                'description': description,
                'unlock_at': current_clicks,
                'speed': speed,
                'click_multiplier': click_multiplier,
                'icon': icon,
                'rarity': 'mythic',  # All generated achievements are mythic
                'theme_primary': theme['primary'],
                'theme_secondary': theme['secondary'],
                'theme_accent': theme['accent'],
                'theme_background': theme['background'],
                'theme_bg_class': theme['bg_class'],
                'order': max_order + i + 1,
                'is_active': True,
            }
            
            try:
                achievement, created = Achievement.objects.get_or_create(
                    name=achievement_data['name'],
                    defaults=achievement_data
                )
                
                if created:
                    created_count += 1
                    self.stdout.write(
                        self.style.SUCCESS(f'✅ Generated: {achievement.name} ({current_clicks:,} clicks)')
                    )
                else:
                    self.stdout.write(
                        self.style.WARNING(f'⏭️  Skipped: {achievement.name} (already exists)')
                    )
                    
            except Exception as e:
                self.stdout.write(
                    self.style.ERROR(f'❌ Error generating {achievement_data["name"]}: {str(e)}')
                )
            
            # Exponential scaling for next achievement
            current_clicks = int(current_clicks * 2.5)

        # Summary
        self.stdout.write('\n' + '='*60)
        self.stdout.write(self.style.SUCCESS(f'🎯 GENERATION COMPLETE!'))
        self.stdout.write(f'   ✅ Generated: {created_count} new achievements')
        self.stdout.write(f'   📈 Total achievements: {Achievement.objects.count()}')
        self.stdout.write(f'   🎮 Highest unlock requirement: {current_clicks//2.5:,} clicks')
        self.stdout.write('='*60)
