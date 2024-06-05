from rest_framework import serializers
from bronfood.core.review.models import Review


class ReviewSerializer(serializers.ModelSerializer):
    comment = serializers.CharField(required=False)

    class Meta:
        model = Review
        fields = [
            'id',
            'client',
            'restaurant',
            'comment',
            'rating',
            'created_at',
        ]
        read_only_fields = ['created_at']
