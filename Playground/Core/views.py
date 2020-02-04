from rest_framework import viewsets, filters
from rest_framework.authentication import TokenAuthentication
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


class PostViewset(viewsets.ModelViewSet):
    serializer_class = PostSerializer
    queryset = Post.objects.all()


class CommentViewset(viewsets.ModelViewSet):
    serializer_class = CommentSerializer
    queryset = Comment.objects.all()
