from django.core.management.base import BaseCommand
from achievements.models import Achievement
from django.db.models import Count, Avg, Max, Min

class Command(BaseCommand):
    help = 'Display detailed achievement statistics'

    def handle(self, *args, **options):
        total_achievements = Achievement.objects.count()
        active_achievements = Achievement.objects.filter(is_active=True).count()
        
        if total_achievements == 0:
            self.stdout.write(self.style.WARNING('No achievements found in database.'))
            self.stdout.write('Run: python manage.py load_achievements')
            return

        # Basic stats
        self.stdout.write('🎯 ' + '='*50)
        self.stdout.write(self.style.SUCCESS('ACHIEVEMENT STATISTICS'))
        self.stdout.write('='*52)
        
        self.stdout.write(f'📊 Total Achievements: {total_achievements}')
        self.stdout.write(f'✅ Active Achievements: {active_achievements}')
        self.stdout.write(f'❌ Inactive Achievements: {total_achievements - active_achievements}')
        
        # Rarity breakdown
        self.stdout.write('\n🎨 RARITY BREAKDOWN:')
        rarity_stats = Achievement.objects.values('rarity').annotate(count=Count('rarity')).order_by('rarity')
        rarity_emojis = {
            'common': '⚪',
            'rare': '🔵',
            'epic': '🟣',
            'legendary': '🟡',
            'mythic': '🔴'
        }
        
        for stat in rarity_stats:
            rarity = stat['rarity']
            count = stat['count']
            percentage = (count / total_achievements) * 100
            emoji = rarity_emojis.get(rarity, '⚫')
            self.stdout.write(f'   {emoji} {rarity.title()}: {count} ({percentage:.1f}%)')
        
        # Click requirements
        self.stdout.write('\n🎯 CLICK REQUIREMENTS:')
        click_stats = Achievement.objects.aggregate(
            min_clicks=Min('unlock_at'),
            max_clicks=Max('unlock_at'),
            avg_clicks=Avg('unlock_at')
        )
        
        self.stdout.write(f'   🔽 Minimum: {click_stats["min_clicks"]:,} clicks')
        self.stdout.write(f'   🔼 Maximum: {click_stats["max_clicks"]:,} clicks')
        self.stdout.write(f'   📊 Average: {click_stats["avg_clicks"]:,.0f} clicks')
        
        # Speed and multiplier stats
        self.stdout.write('\n⚡ POWER STATS:')
        power_stats = Achievement.objects.aggregate(
            max_speed=Max('speed'),
            avg_speed=Avg('speed'),
            max_multiplier=Max('click_multiplier'),
            avg_multiplier=Avg('click_multiplier')
        )
        
        self.stdout.write(f'   🚀 Max Speed: {power_stats["max_speed"]:.1f}/sec')
        self.stdout.write(f'   📈 Avg Speed: {power_stats["avg_speed"]:.1f}/sec')
        self.stdout.write(f'   💪 Max Multiplier: {power_stats["max_multiplier"]:.1f}x')
        self.stdout.write(f'   📊 Avg Multiplier: {power_stats["avg_multiplier"]:.2f}x')
        
        # Top 5 most powerful achievements
        self.stdout.write('\n🏆 TOP 5 MOST POWERFUL:')
        top_achievements = Achievement.objects.order_by('-speed', '-click_multiplier')[:5]
        
        for i, achievement in enumerate(top_achievements, 1):
            self.stdout.write(
                f'   {i}. {achievement.icon} {achievement.name} '
                f'({achievement.unlock_at:,} clicks, {achievement.speed}/sec, {achievement.click_multiplier}x)'
            )
        
        # Milestone achievements
        self.stdout.write('\n🎖️  MAJOR MILESTONES:')
        milestones = [1000, 10000, 100000, 1000000, 10000000]
        
        for milestone in milestones:
            milestone_achievements = Achievement.objects.filter(unlock_at__gte=milestone).count()
            if milestone_achievements > 0:
                self.stdout.write(f'   🎯 {milestone:,}+ clicks: {milestone_achievements} achievements')
        
        # Recent additions (if created_at exists)
        try:
            recent = Achievement.objects.order_by('-created_at')[:3]
            if recent:
                self.stdout.write('\n🆕 RECENTLY ADDED:')
                for achievement in recent:
                    self.stdout.write(f'   • {achievement.icon} {achievement.name}')
        except:
            pass  # created_at field might not exist in older versions
        
        self.stdout.write('\n' + '='*52)
        self.stdout.write('🎮 Ready to conquer these achievements!')
        self.stdout.write('='*52)
