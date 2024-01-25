# urls.py
from django.urls import path
from .views import ContractorRegistrationView, ContractorDetailView

urlpatterns = [
    path('', ContractorRegistrationView.as_view(), name='contractor-register'),
    path('<int:pk>/', ContractorDetailView.as_view(), name='contractor-detail'),
]
