from rest_framework.routers import DefaultRouter
from .views import TodoViewSet

router = DefaultRouter()
router.register('api/todos',TodoViewSet,'todos')

urlpatterns = router.urls
