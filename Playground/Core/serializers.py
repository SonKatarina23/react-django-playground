from rest_framework import serializers
from Accounts.models import User
from Post.models import Post, Comment


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            'id', 'first_name', 'last_name', 'username', 'email', 'password',
            'gender', 'phone_number', 'bio', 'profile_picture'
        )

        extra_kwargs = {
            'id': {'read_only': True},
            'first_name': {'write_only': True},
            'first_name': {'write_only': True},
            'password': {
                'write_only': True,
                'style': {'input_type': 'password'}
            },
            'phone_number': {'write_only': True},
        }

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

# Write it above here so that Post can use it a related field


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'
        extra_kwargs = {
            'id': {'read_only': True},
            'owner': {'read_only': True},
        }

    def create(self, validated_data):
        comment = Comment.objects.create(**validated_data)
        return comment


class PostSerializer(serializers.ModelSerializer):
    # NESTED SERIALIZER FOR REVERSE RELATIONSHIP
    comments = CommentSerializer(many=True)

    class Meta:
        model = Post
        fields = '__all__'
        extra_kwargs = {
            'id': {'read_only': True},
            'owner': {'read_only': True},
            'liked_by': {'read_only': True}
        }

    def create(self, validated_data):
        post = Post.objects.create(**validated_data)
        return post
