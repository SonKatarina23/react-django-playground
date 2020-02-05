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
