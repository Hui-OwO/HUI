/* document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.querySelector('.dark-light-toggle');
    const body = document.body;

    // 테마를 적용하는 함수
    const applyTheme = (theme) => {
        if (theme === 'light') {
            body.classList.add('light-mode');
        } else {
            body.classList.remove('light-mode');
        }
    };

    // 저장된 테마 적용 (기본은 다크 모드)
    const savedTheme = localStorage.getItem('theme') || 'dark';
    applyTheme(savedTheme);

    // 토글 버튼 클릭 이벤트
    if (toggleButton) {
        toggleButton.addEventListener('click', () => {
            if (body.classList.contains('light-mode')) {
                localStorage.setItem('theme', 'dark');
                applyTheme('dark');
            } else {
                localStorage.setItem('theme', 'light');
                applyTheme('light');
            }
        });
    }
}); */


// HTML 문서가 완전히 로드된 후 스크립트가 실행되도록 합니다.
document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.querySelector('.dark-light-toggle');
    const body = document.body;

    // 저장된 테마나 선택된 테마를 적용하는 함수
    const applyTheme = (theme) => {
        if (theme === 'light') {
            body.classList.add('light-mode');
        } else {
            body.classList.remove('light-mode');
        }
    };

    // 사용자가 저장한 테마가 있는지 확인하고, 없으면 'dark' 모드를 기본으로 설정합니다.
    const savedTheme = localStorage.getItem('theme') || 'dark';
    applyTheme(savedTheme);

    // 토글 버튼에 클릭 이벤트 리스너를 추가합니다.
    toggleButton.addEventListener('click', () => {
        // 'light-mode' 클래스의 존재 여부로 새로운 테마를 결정합니다.
        const newTheme = body.classList.contains('light-mode') ? 'dark' : 'light';
        
        // 새로운 테마 설정을 localStorage에 저장합니다.
        localStorage.setItem('theme', newTheme);
        
        // 새로운 테마를 페이지에 적용합니다.
        applyTheme(newTheme);
    });



    // works 나열방식 토글
    const gridBtn = document.querySelector('.view-btn.grid');
    const listBtn = document.querySelector('.view-btn.list');
    const worksGrid = document.querySelector('.works-grid');

    if (gridBtn && listBtn && worksGrid) {
        gridBtn.addEventListener('click', () => {
            gridBtn.classList.add('active');
            listBtn.classList.remove('active');
            worksGrid.classList.add('grid-view');
            worksGrid.classList.remove('list-view');
        });
        listBtn.addEventListener('click', () => {
            listBtn.classList.add('active');
            gridBtn.classList.remove('active');
            worksGrid.classList.add('list-view');
            worksGrid.classList.remove('grid-view');
        });
        // 기본값: grid-view
        worksGrid.classList.add('grid-view');
    }
});