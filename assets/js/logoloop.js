(function() {
  'use strict';

  const ANIMATION_CONFIG = {
    SMOOTH_TAU: 0.25,
    MIN_COPIES: 2,
    COPY_HEADROOM: 2
  };

  class LogoLoop {
    constructor(container, options = {}) {
      this.container = container;
      this.options = {
        logos: options.logos || [],
        speed: options.speed || 120,
        direction: options.direction || 'left',
        logoHeight: options.logoHeight || 28,
        gap: options.gap || 32,
        pauseOnHover: options.pauseOnHover !== false,
        fadeOut: options.fadeOut !== false,
        scaleOnHover: options.scaleOnHover !== false
      };

      this.trackRef = null;
      this.seqRef = null;
      this.seqWidth = 0;
      this.copyCount = ANIMATION_CONFIG.MIN_COPIES;
      this.isHovered = false;

      this.rafId = null;
      this.lastTimestamp = null;
      this.offset = 0;
      this.velocity = 0;

      this.init();
    }

    init() {
      this.setupDOM();
      this.setupStyles();
      this.setupEventListeners();
      this.waitForImages(() => {
        this.updateDimensions();
        this.startAnimation();
      });
    }

    setupDOM() {
      const { logos, fadeOut, scaleOnHover } = this.options;

      const classList = ['logoloop'];
      if (fadeOut) classList.push('logoloop--fade');
      if (scaleOnHover) classList.push('logoloop--scale-hover');

      this.container.className = classList.join(' ');

      const track = document.createElement('div');
      track.className = 'logoloop__track';
      this.trackRef = track;

      const firstList = document.createElement('ul');
      firstList.className = 'logoloop__list';
      firstList.setAttribute('role', 'list');
      this.seqRef = firstList;

      logos.forEach(logo => {
        const li = document.createElement('li');
        li.className = 'logoloop__item';
        li.setAttribute('role', 'listitem');

        if (logo.node) {
          const span = document.createElement('span');
          span.className = 'logoloop__node';
          span.innerHTML = logo.node;
          if (logo.href) {
            const a = document.createElement('a');
            a.className = 'logoloop__link';
            a.href = logo.href;
            a.target = '_blank';
            a.rel = 'noreferrer noopener';
            a.setAttribute('aria-label', logo.ariaLabel || logo.title || 'logo link');
            a.appendChild(span);
            li.appendChild(a);
          } else {
            li.appendChild(span);
          }
        } else {
          const img = document.createElement('img');
          img.src = logo.src;
          if (logo.srcSet) img.srcSet = logo.srcSet;
          if (logo.sizes) img.sizes = logo.sizes;
          if (logo.width) img.width = logo.width;
          if (logo.height) img.height = logo.height;
          img.alt = logo.alt || '';
          if (logo.title) img.title = logo.title;
          img.loading = 'lazy';
          img.decoding = 'async';
          img.draggable = false;

          if (logo.href) {
            const a = document.createElement('a');
            a.className = 'logoloop__link';
            a.href = logo.href;
            a.target = '_blank';
            a.rel = 'noreferrer noopener';
            a.setAttribute('aria-label', logo.alt || logo.title || 'logo link');
            a.appendChild(img);
            li.appendChild(a);
          } else {
            li.appendChild(img);
          }
        }

        firstList.appendChild(li);
      });

      track.appendChild(firstList);
      this.container.appendChild(track);
    }

    setupStyles() {
      const { logoHeight, gap } = this.options;
      this.container.style.setProperty('--logoloop-logoHeight', `${logoHeight}px`);
      this.container.style.setProperty('--logoloop-gap', `${gap}px`);
    }

    setupEventListeners() {
      if (this.options.pauseOnHover) {
        this.container.addEventListener('mouseenter', () => {
          this.isHovered = true;
        });
        this.container.addEventListener('mouseleave', () => {
          this.isHovered = false;
        });
      }

      window.addEventListener('resize', () => this.updateDimensions());
    }

    waitForImages(callback) {
      const images = this.seqRef.querySelectorAll('img');
      if (images.length === 0) {
        callback();
        return;
      }

      let remaining = images.length;
      const onLoad = () => {
        remaining--;
        if (remaining === 0) callback();
      };

      images.forEach(img => {
        if (img.complete) {
          onLoad();
        } else {
          img.addEventListener('load', onLoad, { once: true });
          img.addEventListener('error', onLoad, { once: true });
        }
      });
    }

    updateDimensions() {
      const containerWidth = this.container.clientWidth;
      const seqWidth = this.seqRef.getBoundingClientRect().width;

      if (seqWidth > 0) {
        this.seqWidth = Math.ceil(seqWidth);
        const needed = Math.ceil(containerWidth / seqWidth) + ANIMATION_CONFIG.COPY_HEADROOM;
        const newCount = Math.max(ANIMATION_CONFIG.MIN_COPIES, needed);

        if (newCount !== this.copyCount) {
          this.copyCount = newCount;
          this.rebuildCopies();
        }
      }
    }

    rebuildCopies() {
      while (this.trackRef.children.length > 1) {
        this.trackRef.removeChild(this.trackRef.lastChild);
      }

      for (let i = 1; i < this.copyCount; i++) {
        const clone = this.seqRef.cloneNode(true);
        clone.setAttribute('aria-hidden', 'true');
        this.trackRef.appendChild(clone);
      }
    }

    startAnimation() {
      const { speed, direction, pauseOnHover } = this.options;
      const magnitude = Math.abs(speed);
      const dirMul = direction === 'left' ? 1 : -1;
      const speedMul = speed < 0 ? -1 : 1;
      const targetVelocity = magnitude * dirMul * speedMul;

      const animate = timestamp => {
        if (this.lastTimestamp === null) {
          this.lastTimestamp = timestamp;
        }

        const deltaTime = Math.max(0, timestamp - this.lastTimestamp) / 1000;
        this.lastTimestamp = timestamp;

        const target = (pauseOnHover && this.isHovered) ? 0 : targetVelocity;
        const easingFactor = 1 - Math.exp(-deltaTime / ANIMATION_CONFIG.SMOOTH_TAU);
        this.velocity += (target - this.velocity) * easingFactor;

        if (this.seqWidth > 0) {
          let nextOffset = this.offset + this.velocity * deltaTime;
          nextOffset = ((nextOffset % this.seqWidth) + this.seqWidth) % this.seqWidth;
          this.offset = nextOffset;

          this.trackRef.style.transform = `translate3d(${-this.offset}px, 0, 0)`;
        }

        this.rafId = requestAnimationFrame(animate);
      };

      this.rafId = requestAnimationFrame(animate);
    }

    destroy() {
      if (this.rafId !== null) {
        cancelAnimationFrame(this.rafId);
        this.rafId = null;
      }
      window.removeEventListener('resize', () => this.updateDimensions());
    }
  }

  window.LogoLoop = LogoLoop;
})();

