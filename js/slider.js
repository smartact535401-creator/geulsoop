/* ==========================================================================
   글숲 (Geulsoop) Hero Slider Banner Component
   ========================================================================== */

class HeroSlider {
    constructor(containerId, data) {
        this.container = document.getElementById(containerId);
        this.slidesContainer = document.getElementById('slidesContainer');
        this.dotsContainer = document.getElementById('sliderDots');
        this.prevBtn = document.getElementById('sliderPrev');
        this.nextBtn = document.getElementById('sliderNext');
        
        this.slidesData = data || [];
        this.currentIndex = 0;
        this.autoPlayInterval = null;
        this.isHovered = false;

        this.init();
    }

    init() {
        if (!this.slidesContainer || this.slidesData.length === 0) return;

        this.renderSlides();
        this.renderDots();
        this.bindEvents();
        this.updateSlidePosition();
        this.startAutoPlay();
    }

    renderSlides() {
        this.slidesContainer.innerHTML = this.slidesData.map((item, idx) => `
            <div class="slide-item" data-index="${idx}">
                <div class="slide-content">
                    <div class="slide-meta">
                        <span class="slide-genre">${item.genre}</span>
                        <span class="slide-author"><i class="fa-regular fa-user"></i> ${item.author}</span>
                    </div>
                    <h3 class="slide-title">${item.title}</h3>
                    <p class="slide-excerpt">"${item.excerpt}"</p>
                    <div>
                        <button class="btn btn-gold read-work-btn" data-id="${item.id}">
                            <i class="fa-solid fa-book-open"></i> 작품 감상하기
                        </button>
                    </div>
                </div>
                <div class="slide-cover-art">
                    <div class="cover-card-mock">
                        <div class="cover-title">${item.title}</div>
                        <div class="cover-author">${item.author} 著</div>
                    </div>
                </div>
            </div>
        `).join('');
    }

    renderDots() {
        if (!this.dotsContainer) return;
        this.dotsContainer.innerHTML = this.slidesData.map((_, idx) => `
            <span class="dot ${idx === 0 ? 'active' : ''}" data-index="${idx}"></span>
        `).join('');
    }

    bindEvents() {
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => {
                this.prev();
                this.resetAutoPlay();
            });
        }

        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => {
                this.next();
                this.resetAutoPlay();
            });
        }

        if (this.dotsContainer) {
            this.dotsContainer.addEventListener('click', (e) => {
                if (e.target.classList.contains('dot')) {
                    const idx = parseInt(e.target.dataset.index, 10);
                    this.goToSlide(idx);
                    this.resetAutoPlay();
                }
            });
        }

        if (this.container) {
            this.container.addEventListener('mouseenter', () => {
                this.isHovered = true;
                this.stopAutoPlay();
            });

            this.container.addEventListener('mouseleave', () => {
                this.isHovered = false;
                this.startAutoPlay();
            });
        }
    }

    goToSlide(index) {
        if (index < 0) {
            this.currentIndex = this.slidesData.length - 1;
        } else if (index >= this.slidesData.length) {
            this.currentIndex = 0;
        } else {
            this.currentIndex = index;
        }
        this.updateSlidePosition();
    }

    next() {
        this.goToSlide(this.currentIndex + 1);
    }

    prev() {
        this.goToSlide(this.currentIndex - 1);
    }

    updateSlidePosition() {
        const offset = -this.currentIndex * 100;
        this.slidesContainer.style.transform = `translateX(${offset}%)`;

        // Update Dots
        const dots = this.dotsContainer.querySelectorAll('.dot');
        dots.forEach((dot, idx) => {
            dot.classList.toggle('active', idx === this.currentIndex);
        });
    }

    startAutoPlay() {
        if (this.autoPlayInterval) clearInterval(this.autoPlayInterval);
        this.autoPlayInterval = setInterval(() => {
            if (!this.isHovered) {
                this.next();
            }
        }, 5000);
    }

    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }

    resetAutoPlay() {
        this.stopAutoPlay();
        this.startAutoPlay();
    }
}
