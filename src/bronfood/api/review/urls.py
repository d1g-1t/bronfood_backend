from django.urls import path

from .views import ReviewCreateAPIView

app_name = 'review'

urlpatterns = [
    path('create_rating/<int:restaurant_id>',
         ReviewCreateAPIView.as_view(),
         name='review-create'),
]
