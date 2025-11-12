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

    // 적용된 테마를 로드(기본: dark)
    const savedTheme = localStorage.getItem('theme') || 'dark';
    if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
    } else {
        document.body.classList.remove('light-mode');
    }

    // 다크/라이트 모드 토글
    const toggleButton = document.querySelector('.dark-light-toggle');
    if (toggleButton) {
        toggleButton.addEventListener('click', () => {
            // 토글 결과에 따라 로컬스토리지에 저장
            const isLight = document.body.classList.toggle('light-mode');
            localStorage.setItem('theme', isLight ? 'light' : 'dark');
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

                // message 탭이 선택되면 Name 입력에 포커스
                if (targetId === 'message') {
                    const nameInput = contactModal.querySelector('#userName');
                    if (nameInput) {
                        // 약간의 지연을 줘서 렌더/애니메이션 후 포커스되게 함
                        setTimeout(() => {
                            try {
                                nameInput.focus();
                                if (typeof nameInput.select === 'function') nameInput.select();
                            } catch (e) {
                                // 아무 처리 필요 없음
                            }
                        }, 60);
                    }
                }
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

    // 추가: flip-card 클릭/토글 처리 (터치/모바일에서 hover 대체)
    /* Flip 효과를 제거했으므로 이 부분은 더 이상 필요하지 않습니다.
    (function () {
        const flipCards = document.querySelectorAll('.work-card.flip-card');
        if (!flipCards.length) return;

        flipCards.forEach(card => {
            // 각 내부의 링크/버튼 클릭 시 카드 토글이 발생하지 않도록 전파 차단
            card.querySelectorAll('a, button').forEach(el => {
                el.addEventListener('click', (e) => {
                    // 링크는 정상 동작하되 카드 토글 전파는 막음
                    e.stopPropagation();
                });
            });

            // 터치/클릭에서는 .flipped 토글
            card.addEventListener('click', (e) => {
                // 데스크탑에서 호버가 가능한 경우 클릭으로 토글하지 않음
                if (window.matchMedia && window.matchMedia('(hover: hover)').matches) return;
                card.classList.toggle('flipped');
            });

            // 키보드 접근성: Enter/Space 눌렀을 때 토글
            card.setAttribute('tabindex', '0');
            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    card.classList.toggle('flipped');
                }
            });
        });

    })();
    */
});