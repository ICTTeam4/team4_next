# team4_next


## Issue 먼저 만들기 
먼저 Issue에서 만드려는 기능을 제목으로 설정 하고 project 주소 등을 설정하고 확인을 누르면 브랜치를 만들 수 있습니다.
브랜치를 만들고 나오는 코드를 git에다 복사해서 실행합니다. 그리고 코드를 작성하시면 됩니다.

## 브랜치 만들기
- git checkout -b 브랜치 이름
- 브랜치 만든거를 반영하기위해서
- git push --set-upstream origin 브랜치 이름

## 브래치 바꾸기
- git switch 브랜치 이름

## 브랜치를 파고 해당 브랜치로 코드를 넣고 싶을때
- (필수)git pull origin 가져오고 싶은 브랜치 이름
- git add . 혹은 git add 특정 파일 이름
- git commit -m "메시지"
- git push origin 도착지 브랜치 이름

## develop 브랜치에 넣을땐 push를 하지 마세요!
반드시 pull request로 요청을 해주셔야 합니다!
검토를 받고 다시 merge를 하게 됩니다.

### 만약 pull 했을때 코드가 겹치거나 수정사항이 같은 곳에서 발생하면 어떻게 되나요?
- 일단 pull 하시면 vscode에 충돌 나는 부분들이 있습니다 vscode 에서 해당 지역을 자세히 알려주는데 거기서
   현재 수정사항으로 바꿀지, 가져오려는 브랜치의 사항으로 덮어씌울지 선택하는 버튼들이 vscode에 뜨게 됩니다. 거기서 선택을 하시고
   git add . 후에 git commit -m "" git push origin 넣고싶은 브랜치 이름 하시면 정상 복구 됩니다!  
