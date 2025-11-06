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

                // 모달 열 때 기본 탭 초기화 (Quick connect)
                const firstTab = contactModal.querySelector('.contact-modal__tabs .tab-btn[data-tab="quick-connect"]');
                if (firstTab) firstTab.click();
            });
        });

        closeContactButtons.forEach(button => {
            button.addEventListener('click', () => {
                contactModal.classList.remove('open');
                document.body.classList.remove('modal-open');
            });
        });

        // 탭 전환 로직
        const tabButtons = contactModal.querySelectorAll('.contact-modal__tabs .tab-btn');
        const tabContents = contactModal.querySelectorAll('.contact-tab-content');

        if (tabButtons.length && tabContents.length) {
            const showTab = (targetId) => {
                tabButtons.forEach(b => b.classList.toggle('active', b.dataset.tab === targetId));
                tabContents.forEach(c => {
                    const isTarget = c.id === targetId;
                    c.classList.toggle('active', isTarget);
                    c.style.display = isTarget ? 'block' : 'none';
                    c.setAttribute('aria-hidden', isTarget ? 'false' : 'true');
                });
            };

            tabButtons.forEach(btn => {
                btn.addEventListener('click', () => {
                    showTab(btn.dataset.tab);
                });
            });

            const activeBtn = contactModal.querySelector('.contact-modal__tabs .tab-btn.active');
            if (activeBtn) {
                showTab(activeBtn.dataset.tab);
            } else {
                showTab('quick-connect');
            }
        }

        // contact modal 내부(선택적) 폼 서브밋 핸들러 (class가 'contact-form'인 경우)
        const contactForm = contactModal.querySelector('.contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                alert('메시지가 전송되었습니다. 감사합니다.');
                contactModal.classList.remove('open');
                document.body.classList.remove('modal-open');
                contactForm.reset();
            });
        }
    }

    // 드롭다운 메뉴 로직
    const navItemMore = document.querySelector('.nav-item-more');
    if (navItemMore) {
        let closeTimer;
        const delay = 150; // 150ms 지연

        navItemMore.addEventListener('mouseenter', () => {
            clearTimeout(closeTimer);
            navItemMore.classList.add('is-open');
        });

        navItemMore.addEventListener('mouseleave', () => {
            closeTimer = setTimeout(() => {
                navItemMore.classList.remove('is-open');
            }, delay);
        });
    }

    // Work 페이지 뷰 토글 기능
    const gridViewBtn = document.querySelector('.view-btn.grid');
    const listViewBtn = document.querySelector('.view-btn.list');
    const worksGrid = document.querySelector('.works-grid');

    if (gridViewBtn && listViewBtn && worksGrid) {
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

    // 메시지 폼 제출 핸들러 (gform -> Google Apps Script)
    const gforms = document.querySelectorAll('.gform');
    if (gforms.length) {
        gforms.forEach(form => {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                const url = form.action;
                const method = (form.method || 'POST').toUpperCase();
                const formData = new FormData(form);

                fetch(url, {
                    method,
                    body: formData,
                    mode: 'no-cors'
                }).then(() => {
                    const contactModalEl = document.querySelector('.contact-modal');
                    const thankEl = contactModalEl ? contactModalEl.querySelector('.thankyou_message') : document.querySelector('.thankyou_message');

                    // contact 모달 닫기
                    if (contactModalEl) contactModalEl.classList.remove('open');
                    // thankyou 모달 표시
                    if (thankEl) {
                        thankEl.style.display = 'flex';
                        thankEl.setAttribute('aria-hidden', 'false');
                    }

                    form.reset();

                    // 3초 후 thankyou 닫기
                    setTimeout(() => {
                        if (thankEl) {
                            thankEl.style.display = 'none';
                            thankEl.setAttribute('aria-hidden', 'true');
                        }
                    }, 3000);
                }).catch((err) => {
                    console.error('Form submit error:', err);
                    alert('전송 중 오류가 발생했습니다. 다시 시도해 주세요.');
                });
            });
        });
    }

});