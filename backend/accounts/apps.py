from django.apps import AppConfig


class AccountsConfig(AppConfig):
    default_auto_field = 'django.db.models.AutoField'  # 필요한 경우 자동 필드를 설정합니다.
    name = 'accounts'  # 애플리케이션의 이름을 설정합니다.
    verbose_name = 'accounts'  # 애플리케이션의 표시 이름을 설정합니다.


# 만약 애플리케이션 초기화나 추가 설정이 필요하다면 다음과 같이 메서드를 추가할 수 있습니다.

# def ready(self):
#     # 애플리케이션 초기화 로직을 추가합니다.
#     pass