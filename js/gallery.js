/* ==========================================================================
   글숲 (Geulsoop) Gallery & Detail View Controller (Phase 4 Final)
   ========================================================================== */

class GalleryManager {
    constructor() {
        this.works = getAllWorksCombined();
        this.currentGenre = 'all';
        this.currentSubGenre = 'all';
        this.currentSort = 'latest'; // latest, popular, views, comments
        this.searchQuery = '';
        this.viewMode = 'grid'; // grid, list

        this.initDOM();
        this.parseURLParams();
        this.bindEvents();
        this.render();
    }

    initDOM() {
        this.gridContainer = document.getElementById('galleryGrid');
        this.genreTabs = document.getElementById('galleryGenreTabs');
        this.subGenreContainer = document.getElementById('gallerySubGenrePills');
        this.sortSelect = document.getElementById('gallerySortSelect');
        this.searchInput = document.getElementById('gallerySearchInput');
        this.viewToggleGrid = document.getElementById('viewToggleGrid');
        this.viewToggleList = document.getElementById('viewToggleList');
        this.totalCountEl = document.getElementById('galleryTotalCount');
    }

    parseURLParams() {
        const urlParams = new URLSearchParams(window.location.search);
        const genreParam = urlParams.get('genre');
        const idParam = urlParams.get('id');

        if (genreParam && ['verse', 'prose', 'drama', 'music'].includes(genreParam)) {
            this.currentGenre = genreParam;
            if (this.genreTabs) {
                this.genreTabs.querySelectorAll('.tab-btn').forEach(b => {
                    b.classList.toggle('active', b.dataset.genre === genreParam);
                });
            }
            this.renderSubGenres();
        }

        if (idParam) {
            const targetWork = this.works.find(w => w.id === idParam);
            if (targetWork) {
                setTimeout(() => this.openDetailModal(targetWork), 300);
            }
        }
    }

    bindEvents() {
        if (this.genreTabs) {
            this.genreTabs.addEventListener('click', (e) => {
                const btn = e.target.closest('.tab-btn');
                if (!btn) return;
                this.genreTabs.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                this.currentGenre = btn.dataset.genre;
                this.currentSubGenre = 'all';
                this.renderSubGenres();
                this.render();
            });
        }

        if (this.subGenreContainer) {
            this.subGenreContainer.addEventListener('click', (e) => {
                const pill = e.target.closest('.subgenre-pill');
                if (!pill) return;
                this.subGenreContainer.querySelectorAll('.subgenre-pill').forEach(p => p.classList.remove('active'));
                pill.classList.add('active');

                this.currentSubGenre = pill.dataset.subgenre;
                this.render();
            });
        }

        if (this.sortSelect) {
            this.sortSelect.addEventListener('change', (e) => {
                this.currentSort = e.target.value;
                this.render();
            });
        }

        if (this.searchInput) {
            this.searchInput.addEventListener('input', (e) => {
                this.searchQuery = e.target.value.toLowerCase().trim();
                this.render();
            });
        }

        if (this.viewToggleGrid && this.viewToggleList) {
            this.viewToggleGrid.addEventListener('click', () => {
                this.viewMode = 'grid';
                this.viewToggleGrid.classList.add('active');
                this.viewToggleList.classList.remove('active');
                this.render();
            });
            this.viewToggleList.addEventListener('click', () => {
                this.viewMode = 'list';
                this.viewToggleList.classList.add('active');
                this.viewToggleGrid.classList.remove('active');
                this.render();
            });
        }

        this.initDetailModalEvents();
    }

    getSubGenreOptions(genre) {
        switch (genre) {
            case 'verse':
                return ['전체', '시', '시조', '동시', '디카시'];
            case 'prose':
                return ['전체', '수필', '단편소설', '에세이'];
            case 'drama':
                return ['전체', '시나리오', '희곡', '웹소설/대본'];
            case 'music':
                return ['전체', '음악 가사', '팟캐스트 대본'];
            default:
                return [];
        }
    }

    renderSubGenres() {
        if (!this.subGenreContainer) return;
        const options = this.getSubGenreOptions(this.currentGenre);

        if (options.length === 0) {
            this.subGenreContainer.style.display = 'none';
            this.subGenreContainer.innerHTML = '';
            return;
        }

        this.subGenreContainer.style.display = 'flex';
        this.subGenreContainer.innerHTML = options.map(opt => {
            const val = opt === '전체' ? 'all' : opt;
            const isActive = this.currentSubGenre === val ? 'active' : '';
            return `<button class="subgenre-pill ${isActive}" data-subgenre="${val}">${opt}</button>`;
        }).join('');
    }

    getFilteredAndSortedWorks() {
        this.works = getAllWorksCombined(); // refresh latest state
        let result = [...this.works];

        if (this.currentGenre !== 'all') {
            result = result.filter(w => w.genreKey === this.currentGenre);
        }

        if (this.currentSubGenre !== 'all') {
            result = result.filter(w => w.subGenre === this.currentSubGenre);
        }

        if (this.searchQuery) {
            result = result.filter(w => 
                w.title.toLowerCase().includes(this.searchQuery) ||
                w.author.toLowerCase().includes(this.searchQuery) ||
                w.fullContent.toLowerCase().includes(this.searchQuery) ||
                (w.tags && w.tags.some(t => t.toLowerCase().includes(this.searchQuery)))
            );
        }

        switch (this.currentSort) {
            case 'popular':
                result.sort((a, b) => (b.likes || 0) - (a.likes || 0));
                break;
            case 'views':
                result.sort((a, b) => (b.views || 0) - (a.views || 0));
                break;
            case 'comments':
                result.sort((a, b) => (b.comments ? b.comments.length : 0) - (a.comments ? a.comments.length : 0));
                break;
            case 'latest':
            default:
                result.sort((a, b) => new Date(b.date) - new Date(a.date));
                break;
        }

        return result;
    }

    render() {
        if (!this.gridContainer) return;

        const filtered = this.getFilteredAndSortedWorks();

        if (this.totalCountEl) {
            this.totalCountEl.textContent = filtered.length;
        }

        if (filtered.length === 0) {
            this.gridContainer.innerHTML = `
                <div class="empty-gallery-state">
                    <i class="fa-regular fa-folder-open"></i>
                    <h3>조건에 맞는 작품이 없습니다.</h3>
                    <p>상단 메뉴의 '글쓰기'를 눌러 첫 작품을 등록해 보세요!</p>
                </div>
            `;
            return;
        }

        if (this.viewMode === 'grid') {
            this.gridContainer.className = 'cards-grid';
            this.gridContainer.innerHTML = filtered.map(work => this.createCardHTML(work)).join('');
        } else {
            this.gridContainer.className = 'list-rows';
            this.gridContainer.innerHTML = filtered.map(work => this.createRowHTML(work)).join('');
        }

        this.gridContainer.querySelectorAll('.work-card, .work-list-item').forEach(el => {
            el.addEventListener('click', () => {
                const workId = el.dataset.id;
                const targetWork = this.works.find(w => w.id === workId);
                if (targetWork) {
                    this.openDetailModal(targetWork);
                }
            });
        });
    }

    createCardHTML(work) {
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
    }

    createRowHTML(work) {
        const commentCount = work.comments ? work.comments.length : 0;
        return `
            <article class="work-list-item" data-id="${work.id}">
                <div class="list-item-left">
                    <span class="card-genre-badge">${work.subGenre || work.genreLabel}</span>
                    <h3 class="list-item-title">${work.title}</h3>
                    <span class="list-item-author">by ${work.author}</span>
                </div>
                <div class="list-item-right">
                    <div class="card-stats">
                        <span class="stat-item"><i class="fa-regular fa-heart"></i> ${work.likes || 0}</span>
                        <span class="stat-item"><i class="fa-regular fa-comment"></i> ${commentCount}</span>
                    </div>
                    <span class="list-item-date">${work.date}</span>
                </div>
            </article>
        `;
    }

    /* ----------------------------------------------------------------------
       Detail & Reading View Modal + Comments Add/Delete Engine
       ---------------------------------------------------------------------- */
    openDetailModal(work) {
        this.activeWork = work;
        const modal = document.getElementById('workDetailModal');
        if (!modal) return;

        document.getElementById('detailGenre').textContent = `${work.genre || work.genreLabel} · ${work.subGenre || ''}`;
        document.getElementById('detailTitle').textContent = work.title;
        document.getElementById('detailAuthor').textContent = work.author;
        document.getElementById('detailAuthorAvatar').textContent = work.authorAvatar || work.author[0];
        document.getElementById('detailAuthorBio').textContent = work.authorBio || '글숲에서 다정한 서사를 지어가는 창작자입니다.';
        document.getElementById('detailDate').textContent = work.date;
        document.getElementById('detailText').textContent = work.fullContent || work.excerpt;
        document.getElementById('detailLikesCount').textContent = work.likes || 0;
        document.getElementById('detailViewsCount').textContent = work.views || 0;

        const tagsContainer = document.getElementById('detailTags');
        if (tagsContainer) {
            tagsContainer.innerHTML = (work.tags || []).map(t => `<span class="modal-tag">${t}</span>`).join('');
        }

        // View Count Increment + LocalStorage persistence
        work.views = (work.views || 0) + 1;
        saveWorkDynamicState(work.id, { views: work.views });
        document.getElementById('detailViewsCount').textContent = work.views;

        this.renderCommentsList();

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    closeDetailModal() {
        const modal = document.getElementById('workDetailModal');
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    renderCommentsList() {
        const commentsListEl = document.getElementById('detailCommentsList');
        const commentsCountEl = document.getElementById('detailCommentsCount');
        if (!commentsListEl || !this.activeWork) return;

        const comments = this.activeWork.comments || [];
        if (commentsCountEl) commentsCountEl.textContent = comments.length;

        if (comments.length === 0) {
            commentsListEl.innerHTML = `
                <div class="no-comments-box">
                    <p style="text-align:center; color: var(--text-muted); padding: 20px 0;">아직 남겨진 감상이 없습니다. 작가님께 첫 따뜻한 댓글을 남겨주세요! 🌿</p>
                </div>
            `;
            return;
        }

        commentsListEl.innerHTML = comments.map(c => `
            <div class="comment-item" data-id="${c.id}">
                <div class="comment-avatar">${c.avatar || c.author[0]}</div>
                <div class="comment-content" style="flex-grow: 1;">
                    <div class="comment-header" style="justify-content: space-between;">
                        <div>
                            <span class="comment-author">${c.author}</span>
                            <span class="comment-date">${c.date}</span>
                        </div>
                        <!-- Delete Comment Button -->
                        <button class="btn-comment-delete" data-id="${c.id}" title="댓글 삭제">
                            <i class="fa-solid fa-trash-can"></i> 삭제
                        </button>
                    </div>
                    <div class="comment-body">${c.text}</div>
                </div>
            </div>
        `).join('');

        // Attach Delete Comment Handlers
        commentsListEl.querySelectorAll('.btn-comment-delete').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const commentId = btn.dataset.id;
                this.deleteComment(commentId);
            });
        });
    }

    deleteComment(commentId) {
        if (!this.activeWork || !this.activeWork.comments) return;

        if (confirm('이 댓글을 삭제하시겠습니까?')) {
            this.activeWork.comments = this.activeWork.comments.filter(c => c.id !== commentId);
            
            // Persist to LocalStorage
            saveWorkDynamicState(this.activeWork.id, { comments: this.activeWork.comments });

            this.renderCommentsList();
            this.render(); // update background grid comment counter
        }
    }

    initDetailModalEvents() {
        const modal = document.getElementById('workDetailModal');
        const closeBtn = document.getElementById('closeDetailModalBtn');
        const commentForm = document.getElementById('addCommentForm');
        const commentInput = document.getElementById('commentInputText');
        const commentAuthorInput = document.getElementById('commentInputAuthor');
        const mainLikeBtn = document.getElementById('detailLikeBtn');

        if (!modal) return;

        if (closeBtn) closeBtn.addEventListener('click', () => this.closeDetailModal());
        modal.addEventListener('click', (e) => {
            if (e.target === modal) this.closeDetailModal();
        });

        // Add Comment Handler
        if (commentForm) {
            commentForm.addEventListener('submit', (e) => {
                e.preventDefault();
                if (!this.activeWork) return;

                const text = commentInput.value.trim();
                const author = commentAuthorInput.value.trim() || '익명독자';

                if (!text) return;

                if (!this.activeWork.comments) {
                    this.activeWork.comments = [];
                }

                const newComment = {
                    id: 'c-' + Date.now(),
                    author: author,
                    avatar: author[0],
                    date: new Date().toLocaleDateString('ko-KR') + ' ' + new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' }),
                    text: text,
                    likes: 0
                };

                this.activeWork.comments.unshift(newComment);

                // Save to LocalStorage
                saveWorkDynamicState(this.activeWork.id, { comments: this.activeWork.comments });

                commentInput.value = '';
                this.renderCommentsList();
                this.render();
            });
        }

        // Like Work Handler (Persistent toggle)
        if (mainLikeBtn) {
            mainLikeBtn.addEventListener('click', () => {
                if (!this.activeWork) return;
                this.activeWork.likes = (this.activeWork.likes || 0) + 1;
                saveWorkDynamicState(this.activeWork.id, { likes: this.activeWork.likes });

                document.getElementById('detailLikesCount').textContent = this.activeWork.likes;
                const heartIcon = mainLikeBtn.querySelector('i');
                heartIcon.className = 'fa-solid fa-heart';
                heartIcon.style.color = '#E74C3C';

                this.render();
            });
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('galleryGrid')) {
        window.galleryApp = new GalleryManager();
    }
});
