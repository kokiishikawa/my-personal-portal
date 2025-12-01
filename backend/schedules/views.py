from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .models import Schedule
from .serializers import ScheduleSerializer

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def schedule_list(request):
    """スケジュール一覧取得・作成"""
    if request.method == 'GET':
        schedules = Schedule.objects.filter(user=request.user)
        serializer = ScheduleSerializer(schedules, many=True)
        return Response(serializer.data)
    
    elif request.method == 'POST':
        serializer = ScheduleSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def schedule_detail(request, pk):
    """スケジュール詳細取得・更新・削除"""
    try:
        schedule = Schedule.objects.get(pk=pk, user=request.user)
    except Schedule.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'GET':
        serializer = ScheduleSerializer(schedule)
        return Response(serializer.data)
    
    elif request.method == 'PUT':
        serializer = ScheduleSerializer(schedule, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        schedule.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)