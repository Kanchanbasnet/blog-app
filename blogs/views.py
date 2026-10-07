from django.shortcuts import render

from blogs.models import Post


def home_page(request):
    return render(request, "blogs/index.html")


def post_list(request):
    posts = Post.objects.all().order_by("-created_at")
    context = {
        "posts": posts
    }
    return render(request, "blogs/post.html", context )

# Create your views here.

def blog_detail(request, pk):
    post = Post.objects.get(pk=pk)
    context = {
        "post": post
    }
    return render(request, "blogs/post_detail.html", context)