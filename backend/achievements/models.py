from django.db import models

class Achievement(models.Model):
    RARITY_CHOICES = [
        ('common', 'Common'),
        ('rare', 'Rare'),
        ('epic', 'Epic'),
        ('legendary', 'Legendary'),
        ('mythic', 'Mythic'),
    ]
    
    name = models.CharField(max_length=100)
    description = models.TextField()
    unlock_at = models.IntegerField(help_text="Number of clicks required to unlock")
    speed = models.FloatField(default=0, help_text="Auto-clicker speed per second")
    click_multiplier = models.FloatField(default=1.0, help_text="Click multiplier bonus")
    icon = models.CharField(max_length=10, default="🏆", help_text="Emoji icon for achievement")
    rarity = models.CharField(max_length=20, choices=RARITY_CHOICES, default='common')
    
    # Theme colors
    theme_primary = models.CharField(max_length=100, default="from-blue-400 to-blue-600")
    theme_secondary = models.CharField(max_length=50, default="blue-500")
    theme_accent = models.CharField(max_length=50, default="blue-400")
    theme_background = models.CharField(max_length=50, default="blue-900")
    theme_bg_class = models.CharField(max_length=100, default="bg-blue-950")
    
    # Metadata
    is_active = models.BooleanField(default=True, help_text="Whether this achievement is active in the game")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    order = models.IntegerField(default=0, help_text="Display order (lower numbers first)")
    
    class Meta:
        ordering = ['order', 'unlock_at']
    
    def __str__(self):
        return f"{self.name} ({self.unlock_at} clicks)"
    
    def to_frontend_format(self):
        """Convert to format expected by frontend"""
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'unlockAt': self.unlock_at,
            'speed': self.speed,
            'clickMultiplier': self.click_multiplier,
            'unlocked': False,  # Will be determined by frontend based on user progress
            'activated': False,  # Will be determined by frontend based on user progress
            'icon': self.icon,
            'rarity': self.rarity,
            'theme': {
                'primary': self.theme_primary,
                'secondary': self.theme_secondary,
                'accent': self.theme_accent,
                'background': self.theme_background,
                'bgClass': self.theme_bg_class,
            }
        }
