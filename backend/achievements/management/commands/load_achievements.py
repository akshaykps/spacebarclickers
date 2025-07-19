from django.core.management.base import BaseCommand
from achievements.models import Achievement

class Command(BaseCommand):
    help = 'Load 20 predefined achievements into the database'

    def add_arguments(self, parser):
        parser.add_argument(
            '--clear',
            action='store_true',
            help='Clear existing achievements before loading new ones',
        )
        parser.add_argument(
            '--update',
            action='store_true',
            help='Update existing achievements if they exist',
        )

    def handle(self, *args, **options):
        if options['clear']:
            self.stdout.write('Clearing existing achievements...')
            Achievement.objects.all().delete()
            self.stdout.write(self.style.SUCCESS('✅ Cleared all existing achievements'))

        achievements_data = [
            {
                'name': 'First Click',
                'description': 'Take your first step into the clicking world',
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
                'name': 'Getting Started',
                'description': 'Click 10 times to warm up your fingers',
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
                'name': 'Novice Clicker',
                'description': 'Reach 50 clicks and prove your dedication',
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
                'name': 'Century Club',
                'description': 'Join the elite with 100 clicks',
                'unlock_at': 100,
                'speed': 0.5,
                'click_multiplier': 1.3,
                'icon': '💯',
                'rarity': 'common',
                'theme_primary': 'from-yellow-400 to-yellow-600',
                'theme_secondary': 'yellow-500',
                'theme_accent': 'yellow-400',
                'theme_background': 'yellow-900',
                'theme_bg_class': 'bg-yellow-950',
                'order': 4,
            },
            {
                'name': 'Quarter Master',
                'description': 'Achieve 250 clicks with style',
                'unlock_at': 250,
                'speed': 1.0,
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
                'description': 'Hit 500 clicks at lightning speed',
                'unlock_at': 500,
                'speed': 2.0,
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
                'name': 'Thousand Warrior',
                'description': 'Conquer the 1,000 click milestone',
                'unlock_at': 1000,
                'speed': 3.0,
                'click_multiplier': 1.6,
                'icon': '⚔️',
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
                'description': 'Unleash 2,500 clicks of pure power',
                'unlock_at': 2500,
                'speed': 5.0,
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
                'name': 'Click Royalty',
                'description': 'Ascend to 5,000 clicks and claim your throne',
                'unlock_at': 5000,
                'speed': 8.0,
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
                'name': 'Ten Thousand Legend',
                'description': 'Enter the hall of fame with 10,000 clicks',
                'unlock_at': 10000,
                'speed': 12.0,
                'click_multiplier': 1.9,
                'icon': '🏆',
                'rarity': 'epic',
                'theme_primary': 'from-red-400 to-red-600',
                'theme_secondary': 'red-500',
                'theme_accent': 'red-400',
                'theme_background': 'red-900',
                'theme_bg_class': 'bg-red-950',
                'order': 10,
            },
            {
                'name': 'Click Overlord',
                'description': 'Dominate with 25,000 clicks of supremacy',
                'unlock_at': 25000,
                'speed': 20.0,
                'click_multiplier': 2.0,
                'icon': '👹',
                'rarity': 'legendary',
                'theme_primary': 'from-violet-400 to-purple-600',
                'theme_secondary': 'violet-500',
                'theme_accent': 'violet-400',
                'theme_background': 'violet-900',
                'theme_bg_class': 'bg-violet-950',
                'order': 11,
            },
            {
                'name': 'Lightning Fingers',
                'description': 'Strike with 50,000 clicks of electric power',
                'unlock_at': 50000,
                'speed': 30.0,
                'click_multiplier': 2.2,
                'icon': '⚡',
                'rarity': 'legendary',
                'theme_primary': 'from-blue-400 to-purple-600',
                'theme_secondary': 'blue-500',
                'theme_accent': 'blue-400',
                'theme_background': 'blue-900',
                'theme_bg_class': 'bg-blue-950',
                'order': 12,
            },
            {
                'name': 'Click Tsunami',
                'description': 'Unleash a wave of 100,000 clicks',
                'unlock_at': 100000,
                'speed': 50.0,
                'click_multiplier': 2.4,
                'icon': '🌊',
                'rarity': 'legendary',
                'theme_primary': 'from-teal-400 to-blue-600',
                'theme_secondary': 'teal-500',
                'theme_accent': 'teal-400',
                'theme_background': 'teal-900',
                'theme_bg_class': 'bg-teal-950',
                'order': 13,
            },
            {
                'name': 'Quarter Million Master',
                'description': 'Achieve the impossible: 250,000 clicks',
                'unlock_at': 250000,
                'speed': 80.0,
                'click_multiplier': 2.6,
                'icon': '🔱',
                'rarity': 'mythic',
                'theme_primary': 'from-yellow-400 to-red-500',
                'theme_secondary': 'yellow-500',
                'theme_accent': 'yellow-400',
                'theme_background': 'yellow-900',
                'theme_bg_class': 'bg-gradient-to-br from-yellow-950 to-red-950',
                'order': 14,
            },
            {
                'name': 'Half Million Hero',
                'description': 'Transcend reality with 500,000 clicks',
                'unlock_at': 500000,
                'speed': 120.0,
                'click_multiplier': 2.8,
                'icon': '♾️',
                'rarity': 'mythic',
                'theme_primary': 'from-purple-400 to-pink-600',
                'theme_secondary': 'purple-500',
                'theme_accent': 'purple-400',
                'theme_background': 'purple-900',
                'theme_bg_class': 'bg-gradient-to-br from-purple-950 to-pink-950',
                'order': 15,
            },
            {
                'name': 'Million Click Deity',
                'description': 'Ascend to godhood with 1,000,000 clicks',
                'unlock_at': 1000000,
                'speed': 200.0,
                'click_multiplier': 3.0,
                'icon': '🌟',
                'rarity': 'mythic',
                'theme_primary': 'from-red-400 to-pink-600',
                'theme_secondary': 'red-500',
                'theme_accent': 'red-400',
                'theme_background': 'red-900',
                'theme_bg_class': 'bg-gradient-to-br from-red-950 to-pink-950',
                'order': 16,
            },
            {
                'name': 'Cosmic Clicker',
                'description': 'Reach across the universe with 2,500,000 clicks',
                'unlock_at': 2500000,
                'speed': 350.0,
                'click_multiplier': 3.5,
                'icon': '🌌',
                'rarity': 'mythic',
                'theme_primary': 'from-indigo-400 to-purple-600',
                'theme_secondary': 'indigo-500',
                'theme_accent': 'indigo-400',
                'theme_background': 'indigo-900',
                'theme_bg_class': 'bg-gradient-to-br from-indigo-950 to-purple-950',
                'order': 17,
            },
            {
                'name': 'Reality Shaper',
                'description': 'Bend existence with 5,000,000 clicks',
                'unlock_at': 5000000,
                'speed': 500.0,
                'click_multiplier': 4.0,
                'icon': '🌀',
                'rarity': 'mythic',
                'theme_primary': 'from-cyan-400 to-blue-600',
                'theme_secondary': 'cyan-500',
                'theme_accent': 'cyan-400',
                'theme_background': 'cyan-900',
                'theme_bg_class': 'bg-gradient-to-br from-cyan-950 to-blue-950',
                'order': 18,
            },
            {
                'name': 'Time Weaver',
                'description': 'Control time itself with 10,000,000 clicks',
                'unlock_at': 10000000,
                'speed': 800.0,
                'click_multiplier': 4.5,
                'icon': '⏰',
                'rarity': 'mythic',
                'theme_primary': 'from-emerald-400 to-teal-600',
                'theme_secondary': 'emerald-500',
                'theme_accent': 'emerald-400',
                'theme_background': 'emerald-900',
                'theme_bg_class': 'bg-gradient-to-br from-emerald-950 to-teal-950',
                'order': 19,
            },
            {
                'name': 'Omnipotent Clicker',
                'description': 'Achieve ultimate power with 25,000,000 clicks',
                'unlock_at': 25000000,
                'speed': 1200.0,
                'click_multiplier': 5.0,
                'icon': '🔮',
                'rarity': 'mythic',
                'theme_primary': 'from-pink-400 to-purple-600',
                'theme_secondary': 'pink-500',
                'theme_accent': 'pink-400',
                'theme_background': 'pink-900',
                'theme_bg_class': 'bg-gradient-to-br from-pink-950 via-purple-950 to-indigo-950',
                'order': 20,
            },
        ]

        created_count = 0
        updated_count = 0
        skipped_count = 0

        for achievement_data in achievements_data:
            try:
                achievement, created = Achievement.objects.get_or_create(
                    name=achievement_data['name'],
                    defaults=achievement_data
                )
                
                if created:
                    created_count += 1
                    self.stdout.write(
                        self.style.SUCCESS(f'✅ Created: {achievement.name}')
                    )
                elif options['update']:
                    # Update existing achievement
                    for key, value in achievement_data.items():
                        if key != 'name':  # Don't update the name (used for lookup)
                            setattr(achievement, key, value)
                    achievement.save()
                    updated_count += 1
                    self.stdout.write(
                        self.style.WARNING(f'🔄 Updated: {achievement.name}')
                    )
                else:
                    skipped_count += 1
                    self.stdout.write(
                        self.style.HTTP_INFO(f'⏭️  Skipped: {achievement.name} (already exists)')
                    )
                    
            except Exception as e:
                self.stdout.write(
                    self.style.ERROR(f'❌ Error creating {achievement_data["name"]}: {str(e)}')
                )

        # Summary
        self.stdout.write('\n' + '='*50)
        self.stdout.write(self.style.SUCCESS(f'📊 SUMMARY:'))
        self.stdout.write(f'   ✅ Created: {created_count} achievements')
        if options['update']:
            self.stdout.write(f'   🔄 Updated: {updated_count} achievements')
        self.stdout.write(f'   ⏭️  Skipped: {skipped_count} achievements')
        self.stdout.write(f'   📈 Total in database: {Achievement.objects.count()} achievements')
        self.stdout.write('='*50)

        # Display rarity breakdown
        self.stdout.write('\n🎯 RARITY BREAKDOWN:')
        for rarity, _ in Achievement.RARITY_CHOICES:
            count = Achievement.objects.filter(rarity=rarity).count()
            rarity_emoji = {
                'common': '⚪',
                'rare': '🔵', 
                'epic': '🟣',
                'legendary': '🟡',
                'mythic': '🔴'
            }.get(rarity, '⚫')
            self.stdout.write(f'   {rarity_emoji} {rarity.title()}: {count}')

        self.stdout.write('\n🎮 Ready to play! Your achievements are loaded and waiting!')
