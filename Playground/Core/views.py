from rest_framework import viewsets, filters
from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.settings import api_settings

from .serializers import UserSerializer, PostSerializer, CommentSerializer
from .permissions import UserCRUDPermission

from Accounts.models import User
from Post.models import Post, Comment


class UserViewset(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()

    authentication_classes = (TokenAuthentication,)
    permission_classes = (UserCRUDPermission,)
    filter_backends = (filters.SearchFilter,)
    search_fields = ('first_name', 'last_name', 'username', 'email')


class UserLoginView(ObtainAuthToken):
    renderer_classes = api_settings.DEFAULT_RENDERER_CLASSES


class PostViewset(viewsets.ModelViewSet):
    serializer_class = PostSerializer
    queryset = Post.objects.all()

    def perform_create(self, serializer):
        if not self.request.user.is_authenticated:
            raise ValueError(
                'You need to sign in in-order to create a post')
        serializer.save(owner=self.request.user)


class CommentViewset(viewsets.ModelViewSet):
    serializer_class = CommentSerializer
    queryset = Comment.objects.all()

    def perform_create(self, serializer):
        if not self.request.user.is_authenticated:
            raise ValueError(
                'You need to sign in in-order to create a post')
        serializer.save(owner=self.request.user)
