from rest_framework import permissions

class IsAdmin(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.is_superuser

class IsContractor(permissions.BasePermission):
    def has_permission(self, request, view):
        return not request.user.is_superuser and request.user.is_authenticated

class IsAdminOrContractor(permissions.BasePermission):
    def has_permission(self, request, view):
        return IsAdmin().has_permission(request, view) or IsContractor().has_permission(request, view)

    def has_object_permission(self, request, view, obj):
        return IsAdmin().has_permission(request, view) or (IsContractor().has_permission(request, view) and obj == request.user)
