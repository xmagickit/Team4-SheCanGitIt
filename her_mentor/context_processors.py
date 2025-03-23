from .models import Notification

def unread_notifications(request):
    if request.user.is_authenticated:
        notes = Notification.objects.filter(user=request.user, is_read=False)
        return {"unread_notifications": notes}
    return {"unread_notifications": []}
