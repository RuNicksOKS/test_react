from django.db import models

# Create your models here.
class UserList(models.Model):
    email = models.EmailField(primary_key=True)  # email 컬럼, 이메일 형식 필드 기본키
    pw = models.CharField(max_length=100)  # pw 컬럼, 최대 길이 100

    def __str__(self):
        return self.email