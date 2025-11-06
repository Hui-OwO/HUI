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
document.addEventListener('DOMContentLoaded', function () {

    // 다크/라이트 모드 토글
    const toggleButton = document.querySelector('.dark-light-toggle');
    if (toggleButton) {
        toggleButton.addEventListener('click', () => {
            document.body.classList.toggle('light-mode');
        });
    }

    // Contact 모달
    const openContactButtons = document.querySelectorAll('.open-contact');
    const closeContactButtons = document.querySelectorAll('[data-close]');
    const contactModal = document.querySelector('.contact-modal');

    if (contactModal) {
        openContactButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                contactModal.classList.add('open');
                document.body.classList.add('modal-open');
            });
        });

        closeContactButtons.forEach(button => {
            button.addEventListener('click', () => {
                contactModal.classList.remove('open');
                document.body.classList.remove('modal-open');
            });
        });

        // 탭 기능 제거됨. Quick connect 만 사용하므로 탭 초기화/전환 로직 삭제.
    }

    // --- 드롭다운 메뉴 로직 추가 ---
    const navItemMore = document.querySelector('.nav-item-more');
    if (navItemMore) {
        let closeTimer;
        const delay = 150; // 150ms 지연

        navItemMore.addEventListener('mouseenter', () => {
            clearTimeout(closeTimer); // 닫기 타이머 취소
            navItemMore.classList.add('is-open');
        });

        navItemMore.addEventListener('mouseleave', () => {
            // 마우스가 떠나면 닫기 타이머 설정
            closeTimer = setTimeout(() => {
                navItemMore.classList.remove('is-open');
            }, delay);
        });
    }
    // --- 여기까지 추가 ---

    // --- Work 페이지 뷰 토글 기능 추가 ---
    const gridViewBtn = document.querySelector('.view-btn.grid');
    const listViewBtn = document.querySelector('.view-btn.list');
    const worksGrid = document.querySelector('.works-grid');

    if (gridViewBtn && listViewBtn && worksGrid) {
        // 초기 상태 설정
        worksGrid.classList.add('grid-view');

        gridViewBtn.addEventListener('click', () => {
            if (!gridViewBtn.classList.contains('active')) {
                worksGrid.classList.add('grid-view');
                worksGrid.classList.remove('list-view');
                gridViewBtn.classList.add('active');
                listViewBtn.classList.remove('active');
            }
        });

        listViewBtn.addEventListener('click', () => {
            if (!listViewBtn.classList.contains('active')) {
                worksGrid.classList.remove('grid-view');
                worksGrid.classList.add('list-view');
                listViewBtn.classList.add('active');
                gridViewBtn.classList.remove('active');
            }
        });
    }
    // --- 여기까지 추가 ---
});