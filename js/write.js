/* ==========================================================================
   글숲 (Geulsoop) Write & Submit Editor Controller (Phase 3)
   ========================================================================== */

class WriterEditor {
    constructor() {
        this.form = document.getElementById('writeForm');
        this.titleInput = document.getElementById('writeTitle');
        this.authorInput = document.getElementById('writeAuthor');
        this.authorBioInput = document.getElementById('writeAuthorBio');
        this.genreSelect = document.getElementById('writePrimaryGenre');
        this.subGenreSelect = document.getElementById('writeSubGenre');
        this.tagsInput = document.getElementById('writeTags');
        this.snippetInput = document.getElementById('writeSnippet');
        this.contentTextarea = document.getElementById('writeContent');

        this.previewModal = document.getElementById('writePreviewModal');
        this.draftSaveBtn = document.getElementById('btnDraftSave');
        this.previewBtn = document.getElementById('btnLivePreview');
        this.loadDraftBtn = document.getElementById('btnLoadDraft');

        this.init();
    }

    init() {
        if (!this.form) return;

        this.bindEvents();
        this.updateSubGenres();
        this.checkDraftExists();
    }

    bindEvents() {
        // Genre selection change -> update subgenre options
        if (this.genreSelect) {
            this.genreSelect.addEventListener('change', () => this.updateSubGenres());
        }

        // Form Submit -> Publish
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.publishWork();
        });

        // Draft Save
        if (this.draftSaveBtn) {
            this.draftSaveBtn.addEventListener('click', () => this.saveDraft());
        }

        // Load Draft
        if (this.loadDraftBtn) {
            this.loadDraftBtn.addEventListener('click', () => this.loadDraft());
        }

        // Live Preview Modal
        if (this.previewBtn) {
            this.previewBtn.addEventListener('click', () => this.openPreviewModal());
        }

        const closePreviewBtn = document.getElementById('closePreviewModalBtn');
        if (closePreviewBtn) {
            closePreviewBtn.addEventListener('click', () => this.closePreviewModal());
        }

        // Preset Templates Buttons
        const templateBtns = document.querySelectorAll('.template-btn');
        templateBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const type = btn.dataset.template;
                this.applyPresetTemplate(type);
            });
        });

        // Editor Toolbar Helpers (Align & Quote)
        const formatBtns = document.querySelectorAll('.editor-format-btn');
        formatBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const action = btn.dataset.action;
                this.applyTextFormatting(action);
            });
        });
    }

    updateSubGenres() {
        const primary = this.genreSelect.value;
        let subOptions = [];

        switch (primary) {
            case 'verse':
                subOptions = ['시', '시조', '동시', '디카시'];
                break;
            case 'prose':
                subOptions = ['수필', '단편소설', '에세이'];
                break;
            case 'drama':
                subOptions = ['시나리오', '희곡', '웹소설/대본'];
                break;
            case 'music':
                subOptions = ['음악 가사', '팟캐스트 대본'];
                break;
            default:
                subOptions = ['기타 창작'];
        }

        this.subGenreSelect.innerHTML = subOptions.map(opt => `<option value="${opt}">${opt}</option>`).join('');
    }

    applyPresetTemplate(type) {
        switch (type) {
            case 'verse':
                this.titleInput.value = '새벽을 걷는 사람';
                this.genreSelect.value = 'verse';
                this.updateSubGenres();
                this.subGenreSelect.value = '시';
                this.tagsInput.value = '#새벽, #시, #감성운문, #걸음';
                this.snippetInput.value = '어둠이 가셔가는 길목마다 조용히 떨어지는 소리 없는 안부들.';
                this.contentTextarea.value = `새벽이 오는 소리에 눈을 뜨면
창문 가득 서린 이슬 방울 하나.

어둠이 가셔가는 길목마다
조용히 떨어지는 소리 없는 안부들.

나는 오늘도 펜을 들어
너에게 닿지 않을 서정을 적는다.`;
                break;

            case 'prose':
                this.titleInput.value = '창가 아래 작은 다락방의 기억';
                this.genreSelect.value = 'prose';
                this.updateSubGenres();
                this.subGenreSelect.value = '에세이';
                this.tagsInput.value = '#에세이, #다락방, #추억, #일상';
                this.snippetInput.value = '어릴 적 나만의 비밀 공간이었던 작은 다락방에는 먼지 싸인 책들과 오래된 카세트테이프가 가득했다.';
                this.contentTextarea.value = `어릴 적 나만의 비밀 공간이었던 작은 다락방에는 먼지 싸인 책들과 오래된 카세트테이프가 가득했다.

비가 내리는 날이면 지붕 위로 떨어지는 빗소리를 악보 삼아 책장을 넘기곤 했다. 
그때 다락방 창가에 쪼그려 앉아 품었던 수많은 꿈과 조용한 고백들은, 어른이 된 지금도 지친 일상을 다정하게 품어주는 든든한 쉼터가 되어준다.

우리는 누구나 마음속에 자신만의 다락방 하나쯤은 품고 살아가는 것은 아닐까.`;
                break;

            case 'music':
                this.titleInput.value = '노을빛 보울더 (City Pop Ver.)';
                this.genreSelect.value = 'music';
                this.updateSubGenres();
                this.subGenreSelect.value = '음악 가사';
                this.tagsInput.value = '#작사, #노랫말, #시티팝, #노을';
                this.snippetInput.value = '붉게 물드는 한강 다리 위로 / 흘러나오는 라디오 멜로디 / 다시 돌아갈 수 없는 그 여름의 약속';
                this.contentTextarea.value = `[Intro - 디스코 베이스 라인 & 신디사이저]

[Verse 1]
붉게 물드는 한강 다리 위로
어깨에 내려앉는 주황빛 조명들
이어폰 너머로 흘러나오는 멜로디
오늘도 난 너와의 추억을 서성인다

[Chorus]
노을빛 아래 우리 약속했던 말들
바람 타고 멀리 흩어져 가도
너라는 노래는 아직 내 가슴속에
영원히 반짝이며 노래하고 있어

[Outro]
지나간 여름의 마지막 페이지처럼...`;
                break;

            case 'drama':
                this.titleInput.value = '달빛 우체국의 밤 정경';
                this.genreSelect.value = 'drama';
                this.updateSubGenres();
                this.subGenreSelect.value = '시나리오';
                this.tagsInput.value = '#대본, #시나리오, #우체국, #판타지';
                this.snippetInput.value = 'S#1. 자정이 넘은 자그마한 시골 우체국. 창밖으로 은빛 달빛이 가득 쏟아진다.';
                this.contentTextarea.value = `S#1. 달빛 우체국 내부 (밤)
조명: 은은한 앰버 스탠드 불빛과 창밖 달빛.
오래된 나무 가구 냄새와 수제 종이 향기.

우체국장 (50대, 돋보기를 고쳐 쓰고 고풍스러운 도장을 만지작거리며):
"자정에 발송되는 편지는 전달되는 주소가 조금 다르답니다."

젊은이 (20대, 긴장한 표정으로 sealed envelope를 쥐고서):
"정말... 이미 세상을 떠난 사람에게도 이 편지가 전달될 수 있습니까?"

우체국장 (따스하게 미소 지으며 편지 봉투를 받는다):
"진심이 담긴 글은 시공간을 넘어 마음으로 배달되는 법이지요."`;
                break;
        }

        this.showToast('✨ 선택하신 장르의 예시 템플릿이 작성되었습니다!');
    }

    applyTextFormatting(action) {
        const textarea = this.contentTextarea;
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const selectedText = textarea.value.substring(start, end);

        let replacement = '';

        switch (action) {
            case 'center':
                textarea.style.textAlign = 'center';
                this.showToast('본문 중앙 정렬이 적용되었습니다. (시/운문 권장)');
                return;
            case 'left':
                textarea.style.textAlign = 'left';
                this.showToast('본문 좌측 정렬이 적용되었습니다.');
                return;
            case 'bold':
                replacement = `**${selectedText || '강조할 텍스트'}**`;
                break;
            case 'quote':
                replacement = `\n> "${selectedText || '인용하거나 강조할 서정적인 구절'}"\n`;
                break;
        }

        textarea.setRangeText(replacement, start, end, 'select');
        textarea.focus();
    }

    saveDraft() {
        const draftData = {
            title: this.titleInput.value,
            author: this.authorInput.value,
            authorBio: this.authorBioInput.value,
            genre: this.genreSelect.value,
            subGenre: this.subGenreSelect.value,
            tags: this.tagsInput.value,
            snippet: this.snippetInput.value,
            content: this.contentTextarea.value,
            updatedAt: new Date().toLocaleString()
        };

        try {
            localStorage.setItem('geulsoop_draft_work', JSON.stringify(draftData));
            this.showToast('💾 작성 중인 원고가 임시 저장되었습니다!');
            this.checkDraftExists();
        } catch (e) {
            alert('임시 저장 중 오류가 발생했습니다.');
        }
    }

    checkDraftExists() {
        const draft = localStorage.getItem('geulsoop_draft_work');
        if (draft && this.loadDraftBtn) {
            this.loadDraftBtn.style.display = 'inline-flex';
        }
    }

    loadDraft() {
        const draftRaw = localStorage.getItem('geulsoop_draft_work');
        if (!draftRaw) return;

        const draft = JSON.parse(draftRaw);
        this.titleInput.value = draft.title || '';
        this.authorInput.value = draft.author || '';
        this.authorBioInput.value = draft.authorBio || '';
        if (draft.genre) this.genreSelect.value = draft.genre;
        this.updateSubGenres();
        if (draft.subGenre) this.subGenreSelect.value = draft.subGenre;
        this.tagsInput.value = draft.tags || '';
        this.snippetInput.value = draft.snippet || '';
        this.contentTextarea.value = draft.content || '';

        this.showToast(`📂 ${draft.updatedAt}에 저장된 임시 원고를 불러왔습니다.`);
    }

    openPreviewModal() {
        const title = this.titleInput.value.trim() || '제목 없음';
        const author = this.authorInput.value.trim() || '무명 작가';
        const genreText = this.genreSelect.options[this.genreSelect.selectedIndex].text;
        const subGenre = this.subGenreSelect.value;
        const content = this.contentTextarea.value.trim() || '본문 내용이 작성되지 않았습니다.';
        const tags = this.tagsInput.value.split(/[,#\s]+/).filter(Boolean).map(t => `#${t}`);

        document.getElementById('previewGenreTag').textContent = `${genreText} · ${subGenre}`;
        document.getElementById('previewModalTitle').textContent = title;
        document.getElementById('previewModalAuthor').textContent = author;
        document.getElementById('previewModalText').textContent = content;
        
        const tagsEl = document.getElementById('previewModalTags');
        if (tagsEl) {
            tagsEl.innerHTML = tags.map(t => `<span class="modal-tag">${t}</span>`).join('');
        }

        this.previewModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    closePreviewModal() {
        if (this.previewModal) {
            this.previewModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    publishWork() {
        const title = this.titleInput.value.trim();
        const author = this.authorInput.value.trim() || '아마추어 작가';
        const authorBio = this.authorBioInput.value.trim() || '글숲에서 따뜻한 글로 독자와 만나는 작가입니다.';
        const genreKey = this.genreSelect.value;
        const genreLabel = this.genreSelect.options[this.genreSelect.selectedIndex].text.split(' ')[0];
        const subGenre = this.subGenreSelect.value;
        const rawTags = this.tagsInput.value;
        const snippet = this.snippetInput.value.trim() || this.contentTextarea.value.trim().substring(0, 80) + '...';
        const fullContent = this.contentTextarea.value.trim();

        if (!title) {
            alert('작품 제목을 입력해주세요.');
            this.titleInput.focus();
            return;
        }

        if (!fullContent) {
            alert('작품 본문을 작성해주세요.');
            this.contentTextarea.focus();
            return;
        }

        // Format tags array
        const tagsArray = rawTags.split(/[,#\s]+/).filter(Boolean).map(t => t.startsWith('#') ? t : `#${t}`);

        // Create new Work Object
        const newWork = {
            id: 'pub-' + Date.now(),
            genreKey: genreKey,
            genreLabel: genreLabel,
            genre: `${genreLabel} · ${subGenre}`,
            subGenre: subGenre,
            title: title,
            author: author,
            authorAvatar: author[0] || '작',
            authorBio: authorBio,
            snippet: snippet,
            excerpt: snippet,
            fullContent: fullContent,
            tags: tagsArray.length > 0 ? tagsArray : ['#글숲작품', '#신작투고'],
            likes: 1, // initial author love
            views: 1,
            commentsCount: 0,
            date: new Date().toLocaleDateString('ko-KR'),
            comments: []
        };

        // Save to localStorage persistence via data.js helper
        saveUserPublishedWork(newWork);

        // Remove draft upon successful publish
        localStorage.removeItem('geulsoop_draft_work');

        // Show Success Toast Celebration
        this.showToast('🎉 축하합니다! 작품이 성공적으로 출간/발행되었습니다.');

        // Redirect after short delay to the Gallery page focused on that genre
        setTimeout(() => {
            window.location.href = `gallery.html?genre=${genreKey}&id=${newWork.id}`;
        }, 1200);
    }

    showToast(message) {
        let toast = document.getElementById('globalToast');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'globalToast';
            toast.style.cssText = `
                position: fixed;
                bottom: 30px;
                right: 30px;
                background-color: var(--color-primary);
                color: #FFF;
                padding: 14px 24px;
                border-radius: 30px;
                box-shadow: 0 8px 24px rgba(0,0,0,0.2);
                z-index: 9999;
                font-size: 0.95rem;
                font-family: var(--font-sans);
                transition: all 0.3s ease;
                display: flex;
                align-items: center;
                gap: 10px;
            `;
            document.body.appendChild(toast);
        }

        toast.innerHTML = `<i class="fa-solid fa-feather-pointed" style="color: var(--color-gold);"></i> ${message}`;
        toast.style.opacity = '1';
        toast.style.transform = 'translateY(0)';

        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateY(20px)';
        }, 3000);
    }
}

// Auto Instantiate Writer Editor on write.html
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('writeForm')) {
        window.writerApp = new WriterEditor();
    }
});
