from django.shortcuts import render


def index(request):
    return render(request,'pipi/pipi.html')

def about(request):
    return render(request,'pipi/about.html')