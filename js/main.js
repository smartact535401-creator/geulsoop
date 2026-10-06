/* ==========================================================================
   글숲 (Geulsoop) Main Controller JavaScript (Phase 4 Final)
   ========================================================================== */

let currentActiveWork = null;

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Hero Slider Banner
    if (typeof HeroSlider !== 'undefined' && GEULSOOP_DATA.featuredWorks) {
        new HeroSlider('heroSlider', GEULSOOP_DATA.featuredWorks);
    }

    // 2. Render Real-time Popular Works Cards Grid
    renderPopularWorks('all');

    // 3. Render News Feed & Writer Spotlight
    renderNewsList();
    renderWriterSpotlight();

    // 4. Register Event Listeners
    initGenreTabs();
    initMobileNav();
    initReadingModal();
    initGlobalSearch();
});

/* --------------------------------------------------------------------------
   Popular Works Render & Filter Functionality
   -------------------------------------------------------------------------- */
function renderPopularWorks(genreFilter = 'all') {
    const popularGrid = document.getElementById('popularGrid');
    if (!popularGrid) return;

    const allWorksList = getAllWorksCombined();
    const filteredWorks = genreFilter === 'all' 
        ? allWorksList 
        : allWorksList.filter(w => w.genreKey === genreFilter);

    if (filteredWorks.length === 0) {
        popularGrid.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 48px; color: var(--text-muted);">
                <i class="fa-regular fa-folder-open" style="font-size: 2.5rem; margin-bottom: 12px; display: block;"></i>
                해당 장르의 등록된 작품이 아직 없습니다. 첫 작품의 주인공이 되어보세요!
            </div>
        `;
        return;
    }

    popularGrid.innerHTML = filteredWorks.map(work => {
        const commentCount = work.comments ? work.comments.length : 0;
        return `
            <article class="work-card" data-id="${work.id}">
                <div>
                    <div class="card-top">
                        <span class="card-genre-badge">${work.genre || work.genreLabel} · ${work.subGenre || '일반'}</span>
                        <span style="font-size: 0.8rem; color: var(--text-light);">${work.date}</span>
                    </div>
                    <h3 class="card-title">${work.title}</h3>
                    <p class="card-snippet">${work.snippet || work.excerpt}</p>
                </div>
                <div class="card-bottom">
                    <div class="author-meta">
                        <div class="author-avatar">${work.authorAvatar || work.author[0]}</div>
                        <span class="author-name">${work.author}</span>
                    </div>
                    <div class="card-stats">
                        <span class="stat-item"><i class="fa-regular fa-heart"></i> ${work.likes || 0}</span>
                        <span class="stat-item"><i class="fa-regular fa-eye"></i> ${work.views || 0}</span>
                        <span class="stat-item"><i class="fa-regular fa-comment"></i> ${commentCount}</span>
                    </div>
                </div>
            </article>
        `;
    }).join('');

    popularGrid.querySelectorAll('.work-card').forEach(card => {
        card.addEventListener('click', () => {
            const workId = card.dataset.id;
            const allList = getAllWorksCombined();
            const workData = allList.find(w => w.id === workId);
            if (workData) {
                openReadingModal(workData);
            }
        });
    });
}

function initGenreTabs() {
    const genreTabs = document.getElementById('genreTabs');
    if (!genreTabs) return;

    genreTabs.addEventListener('click', (e) => {
        const btn = e.target.closest('.tab-btn');
        if (!btn) return;

        genreTabs.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const genre = btn.dataset.genre;
        renderPopularWorks(genre);
    });
}

function renderNewsList() {
    const newsList = document.getElementById('newsList');
    if (!newsList || !GEULSOOP_DATA.news) return;

    newsList.innerHTML = GEULSOOP_DATA.news.map(item => `
        <li class="news-item">
            <span class="news-category ${item.category}">${item.categoryLabel}</span>
            <a href="pages/lounge.html" class="news-title">${item.title}</a>
            <span class="news-date">${item.date}</span>
        </li>
    `).join('');
}

function renderWriterSpotlight() {
    const spotlightContainer = document.getElementById('writerSpotlight');
    if (!spotlightContainer || !GEULSOOP_DATA.spotlightWriter) return;

    const w = GEULSOOP_DATA.spotlightWriter;
    spotlightContainer.innerHTML = `
        <div class="writer-profile-header">
            <div class="writer-big-avatar">${w.avatar}</div>
            <div class="writer-info-text">
                <h4>${w.name}</h4>
                <p class="writer-tagline">${w.tagline}</p>
            </div>
        </div>
        <div class="writer-quote-box">
            ${w.quote}
        </div>
        <div class="writer-top-works">
            <h5>대표 작품 모음</h5>
            ${w.representativeWorks.map(work => `<span class="work-mini-pill"><i class="fa-solid fa-feather"></i> ${work}</span>`).join('')}
        </div>
    `;
}

/* --------------------------------------------------------------------------
   Reading Modal Controls (Likes & Comments Add/Delete Engine)
   -------------------------------------------------------------------------- */
let currentFontSize = 1.1;

function initReadingModal() {
    const modal = document.getElementById('readingModal');
    const closeBtn = document.getElementById('closeModalBtn');
    const fontIncBtn = document.getElementById('fontIncBtn');
    const fontDecBtn = document.getElementById('fontDecBtn');
    const themeDots = document.querySelectorAll('.theme-dot');
    const modalText = document.getElementById('modalText');
    const likeBtn = document.getElementById('likeBtn');
    const modalContainer = modal ? modal.querySelector('.modal-card') : null;
    const commentForm = document.getElementById('homeModalCommentForm');

    if (!modal) return;

    if (closeBtn) closeBtn.addEventListener('click', closeReadingModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeReadingModal();
    });

    if (fontIncBtn && fontDecBtn && modalText) {
        fontIncBtn.addEventListener('click', () => {
            if (currentFontSize < 1.6) {
                currentFontSize += 0.1;
                modalText.style.fontSize = `${currentFontSize}rem`;
            }
        });
        fontDecBtn.addEventListener('click', () => {
            if (currentFontSize > 0.85) {
                currentFontSize -= 0.1;
                modalText.style.fontSize = `${currentFontSize}rem`;
            }
        });
    }

    themeDots.forEach(dot => {
        dot.addEventListener('click', () => {
            themeDots.forEach(d => d.classList.remove('active'));
            dot.classList.add('active');
            const theme = dot.dataset.theme;
            
            if (modalContainer) {
                modalContainer.className = 'modal-card';
                if (theme !== 'ivory') {
                    modalContainer.classList.add(`theme-${theme}`);
                }
            }
        });
    });

    // Like Action + LocalStorage Save
    if (likeBtn) {
        likeBtn.addEventListener('click', () => {
            if (!currentActiveWork) return;
            currentActiveWork.likes = (currentActiveWork.likes || 0) + 1;
            saveWorkDynamicState(currentActiveWork.id, { likes: currentActiveWork.likes });

            document.getElementById('likeCount').textContent = currentActiveWork.likes;
            const icon = likeBtn.querySelector('i');
            icon.className = 'fa-solid fa-heart';
            icon.style.color = '#E74C3C';
            
            renderPopularWorks(document.querySelector('.tab-btn.active')?.dataset.genre || 'all');
        });
    }

    // Comment Add Form Handler
    if (commentForm) {
        commentForm.addEventListener('submit', (e) => {
            e.preventDefault();
            if (!currentActiveWork) return;

            const author = document.getElementById('homeCommentAuthor').value.trim() || '익명독자';
            const text = document.getElementById('homeCommentText').value.trim();

            if (!text) return;

            if (!currentActiveWork.comments) {
                currentActiveWork.comments = [];
            }

            const newComment = {
                id: 'c-home-' + Date.now(),
                author: author,
                avatar: author[0],
                date: new Date().toLocaleDateString('ko-KR') + ' ' + new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' }),
                text: text,
                likes: 0
            };

            currentActiveWork.comments.unshift(newComment);
            saveWorkDynamicState(currentActiveWork.id, { comments: currentActiveWork.comments });

            document.getElementById('homeCommentText').value = '';

            renderHomeModalComments();
            renderPopularWorks(document.querySelector('.tab-btn.active')?.dataset.genre || 'all');
        });
    }

    document.addEventListener('click', (e) => {
        const readBtn = e.target.closest('.read-work-btn');
        if (readBtn) {
            const id = readBtn.dataset.id;
            const all = getAllWorksCombined();
            const item = all.find(w => w.id === id);
            if (item) openReadingModal(item);
        }
    });
}

function renderHomeModalComments() {
    const listContainer = document.getElementById('modalCommentsList');
    const countEl = document.getElementById('modalCommentsCount');
    if (!listContainer || !currentActiveWork) return;

    const comments = currentActiveWork.comments || [];
    if (countEl) countEl.textContent = comments.length;

    if (comments.length === 0) {
        listContainer.innerHTML = `
            <div style="text-align: center; padding: 20px; color: var(--text-muted); font-size: 0.9rem;">
                아직 남겨진 댓글이 없습니다. 작가님께 첫 따뜻한 댓글을 남겨보세요! 🌿
            </div>
        `;
        return;
    }

    listContainer.innerHTML = comments.map(c => `
        <div class="comment-item" data-id="${c.id}">
            <div class="comment-avatar">${c.avatar || c.author[0]}</div>
            <div class="comment-content" style="flex-grow: 1;">
                <div class="comment-header" style="justify-content: space-between;">
                    <div>
                        <span class="comment-author">${c.author}</span>
                        <span class="comment-date">${c.date}</span>
                    </div>
                    <button class="btn-comment-delete" data-id="${c.id}" title="댓글 삭제">
                        <i class="fa-solid fa-trash-can"></i> 삭제
                    </button>
                </div>
                <div class="comment-body">${c.text}</div>
            </div>
        </div>
    `).join('');

    // Attach Delete Action in Home Modal
    listContainer.querySelectorAll('.btn-comment-delete').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const commentId = btn.dataset.id;
            if (confirm('댓글을 삭제하시겠습니까?')) {
                currentActiveWork.comments = currentActiveWork.comments.filter(c => c.id !== commentId);
                saveWorkDynamicState(currentActiveWork.id, { comments: currentActiveWork.comments });
                renderHomeModalComments();
                renderPopularWorks(document.querySelector('.tab-btn.active')?.dataset.genre || 'all');
            }
        });
    });
}

function openReadingModal(work) {
    currentActiveWork = work;
    const modal = document.getElementById('readingModal');
    if (!modal) return;

    // View Count Increment
    work.views = (work.views || 0) + 1;
    saveWorkDynamicState(work.id, { views: work.views });

    document.getElementById('modalGenre').textContent = `${work.genre || work.genreLabel || '작품'} · ${work.subGenre || ''}`;
    document.getElementById('modalTitle').textContent = work.title;
    document.getElementById('modalAuthor').textContent = work.author;
    document.getElementById('modalDate').textContent = work.date || '2026.10.01';
    document.getElementById('modalText').textContent = work.fullContent || work.excerpt;
    document.getElementById('likeCount').textContent = work.likes || 0;
    document.getElementById('viewCount').textContent = work.views || 0;

    const modalTags = document.getElementById('modalTags');
    if (modalTags) {
        modalTags.innerHTML = (work.tags || []).map(t => `<span class="modal-tag">${t}</span>`).join('');
    }

    renderHomeModalComments();

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeReadingModal() {
    const modal = document.getElementById('readingModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function initMobileNav() {
    const mobileBtn = document.getElementById('mobileMenuBtn');
    const closeBtn = document.getElementById('closeMobileNav');
    const mobileNav = document.getElementById('mobileNav');

    if (mobileBtn && mobileNav) {
        mobileBtn.addEventListener('click', () => mobileNav.classList.add('open'));
    }

    if (closeBtn && mobileNav) {
        closeBtn.addEventListener('click', () => mobileNav.classList.remove('open'));
    }
}

function initGlobalSearch() {
    const searchInput = document.getElementById('globalSearch');
    if (!searchInput) return;

    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const query = searchInput.value.trim();
            if (query) {
                window.location.href = `pages/gallery.html?search=${encodeURIComponent(query)}`;
            }
        }
    });
}
