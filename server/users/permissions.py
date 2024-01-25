# permissions.py
from rest_framework import permissions

class IsAdminOrContractor(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.user.is_superuser:  # Check if the user is an admin
            return True
        elif request.user.is_authenticated:  # Check if the user is authenticated
            return True
        return False

    def has_object_permission(self, request, view, obj):
        if request.user.is_superuser:  # Admin has permission for all objects
            return True
        elif obj == request.user:  # Contractors can only modify their own profile
            return True
        return False
