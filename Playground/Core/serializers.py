from rest_framework import serializers
from Accounts.models import User
from Post.models import Post, Comment


# ============================================== ACCOUNTS APP ===========================================

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            'id', 'first_name', 'last_name', 'username', 'email', 'password',
            'gender', 'phone_number', 'bio', 'profile_picture',
            'followers', 'followings', 'posts',
        )

        read_only_fields = ['id', 'followers', 'followings', 'posts']

        extra_kwargs = {
            'password': {
                'write_only': True,
                'style': {'input_type': 'password'}
            },
            'phone_number': {'write_only': True},
        }

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user


# class LoginSerializer(serializers.Serializer):
#     username = serializers.CharField(required=True)
#     password = serializers.CharField(
#         write_only=True, required=True,
#         style={'input_type': 'password'}
#     )
# ============================================== POST APP ===========================================


class CommentSerializer(serializers.ModelSerializer):
    # owner = UserSerializer(read_only=True)

    class Meta:
        model = Comment
        fields = ('id', 'owner', 'post', 'comment', 'created_at')
        read_only_fields = ['id', 'owner', 'created_at', ]

    def create(self, validated_data):
        comment = Comment.objects.create(**validated_data)
        return comment


class PostSerializer(serializers.ModelSerializer):
    # NESTED SERIALIZER FOR REVERSE RELATIONSHIP
    owner = UserSerializer(read_only=True)
    comments = CommentSerializer(many=True, read_only=True)

    class Meta:
        model = Post
        fields = ('id', 'owner', 'photo', 'captions',
                  'created_at', 'liked_by', 'comments',)
        read_only_fields = ['id', 'owner',
                            'created_at', 'comments', 'liked_by']

    def create(self, validated_data):
        post = Post.objects.create(**validated_data)
        return post
