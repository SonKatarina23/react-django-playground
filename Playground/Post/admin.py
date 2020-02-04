from django.contrib import admin
from .models import Post, Comment


class CommentInLine(admin.TabularInline):
    model = Comment
    extra = 3


class PostInLine(admin.TabularInline):
    model = Post


class PostAdmin(admin.ModelAdmin):
    list_display = ('owner', 'photo')
    list_display_links = ('owner', 'photo')
    filter_horizontal = ('liked_by',)
    inlines = [CommentInLine]


admin.site.register(Post, PostAdmin)
