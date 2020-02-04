from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register('User', views.UserViewset)
router.register('Post', views.PostViewset)
router.register('Comment', views.CommentViewset)

urlpatterns = [
    path('login/', views.UserLoginView.as_view()),
    path('', include(router.urls)),
]

# Carin cf89177a222a0e0341b44565f6c7555b6f7d7b0f
