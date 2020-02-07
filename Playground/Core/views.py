from rest_framework import viewsets, filters
from rest_framework.response import Response
from rest_framework.generics import GenericAPIView
from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.settings import api_settings
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from .serializers import UserSerializer, PostSerializer, CommentSerializer
from .permissions import UserCRUDPermission, PostCommentPermission

from Accounts.models import User
from Post.models import Post, Comment


class UserViewset(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()

    authentication_classes = (TokenAuthentication,)
    permission_classes = (UserCRUDPermission,)
    filter_backends = (filters.SearchFilter,)
    search_fields = ('first_name', 'last_name', 'username', 'email')

    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
            'user': UserSerializer(user, context=self.get_serializer_context()).data,
            'token': Token.objects.create(user=user).key
        })


class UserLoginView(ObtainAuthToken):
    renderer_classes = api_settings.DEFAULT_RENDERER_CLASSES

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data,
                                           context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        return Response({
            'token': Token.objects.get_or_create(user=user)[0].key,
            'user': UserSerializer(user).data
        })


class PostViewset(viewsets.ModelViewSet):
    serializer_class = PostSerializer
    queryset = Post.objects.all()
    permission_classes = (IsAuthenticatedOrReadOnly, UserCRUDPermission,)

    def get_queryset(self):
        user_id = self.request.query_params.get('by', None)
        if user_id is None:
            queryset = Post.objects.all()
        else:
            queryset = Post.objects.filter(owner__id=user_id)
        return queryset

    def perform_create(self, serializer):
        if not self.request.user.is_authenticated:
            raise ValueError(
                'You need to sign in in-order to create a post')
        serializer.save(owner=self.request.user)


class CommentViewset(viewsets.ModelViewSet):
    serializer_class = CommentSerializer
    queryset = Comment.objects.all()
    permission_classes = (IsAuthenticatedOrReadOnly, UserCRUDPermission,)

    def perform_create(self, serializer):
        if not self.request.user.is_authenticated:
            raise ValueError(
                'You need to sign in in-order to create a post')
        serializer.save(owner=self.request.user)
