from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .models import Bookmark
from .serializers import BookmarkSerializer

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def bookmark_list(request):
    """ブックマーク一覧取得・作成"""
    if request.method == 'GET':
        bookmarks = Bookmark.objects.filter(user=request.user)
        serializer = BookmarkSerializer(bookmarks, many=True)
        return Response(serializer.data)
    
    elif request.method == 'POST':
        serializer = BookmarkSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def bookmark_detail(request, pk):
    """ブックマーク詳細取得・更新・削除"""
    try:
        bookmark = Bookmark.objects.get(pk=pk, user=request.user)
    except Bookmark.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'GET':
        serializer = BookmarkSerializer(bookmark)
        return Response(serializer.data)
    
    elif request.method == 'PUT':
        serializer = BookmarkSerializer(bookmark, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        bookmark.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)