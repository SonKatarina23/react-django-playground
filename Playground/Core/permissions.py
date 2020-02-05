from rest_framework import permissions


class UserCRUDPermission(permissions.BasePermission):

    # Basically if you're not a superuser, you cannot create an account while being logged in
    def has_permission(self, request, view):
        if request.method == 'POST' and request.user.is_authenticated and not request.user.is_superuser:
            return False
        return True

    # You cannot alter a User unless : 1) You're that user itself or 2) You're a super user
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return request.user.id == obj.id or request.user.is_superuser


class PostCommentPermission(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return request.user.id == obj.owner.id
