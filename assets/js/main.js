(function() {
  "use strict";

  /**
   * Header toggle
   */
  const headerToggleBtn = document.querySelector('.header-toggle');

  function headerToggle() {
    document.querySelector('#header').classList.toggle('header-show');
    headerToggleBtn.classList.toggle('bi-list');
    headerToggleBtn.classList.toggle('bi-x');
  }
  headerToggleBtn.addEventListener('click', headerToggle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.header-show')) {
        headerToggle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Init typed.js
   */
  const selectTyped = document.querySelector('.typed');
  if (selectTyped) {
    let typed_strings = selectTyped.getAttribute('data-typed-items');
    typed_strings = typed_strings.split(',');
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Animate the skills items on reveal
   */
  let skillsAnimation = document.querySelectorAll('.skills-animation');
  skillsAnimation.forEach((item) => {
    new Waypoint({
      element: item,
      offset: '80%',
      handler: function(direction) {
        let progress = item.querySelectorAll('.progress .progress-bar');
        progress.forEach(el => {
          el.style.width = el.getAttribute('aria-valuenow') + '%';
        });
      }
    });
  });

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        
        const filter = this.getAttribute('data-filter');
        const container = isotopeItem.querySelector('.isotope-container');
        
        // Check if "All" filter is selected
        if (filter === '*') {
          container.classList.add('filter-all-active');
          document.body.classList.add('portfolio-all-active');
          // smooth scroll to standalone stack section
          const stack = document.querySelector('#stack');
          if (stack) {
            const scrollMarginTop = getComputedStyle(stack).scrollMarginTop;
            window.scrollTo({
              top: stack.offsetTop - parseInt(scrollMarginTop),
              behavior: 'smooth'
            });
          }
        } else {
          container.classList.remove('filter-all-active');
          document.body.classList.remove('portfolio-all-active');
          initIsotope.arrange({
            filter: filter
          });
        }
        
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

  // Apply initial All state on load if All is default
  window.addEventListener('load', function() {
    document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
      const defaultFilter = isotopeItem.getAttribute('data-default-filter') ?? '*';
      if (defaultFilter === '*') {
        const container = isotopeItem.querySelector('.isotope-container');
        if (container) {
          container.classList.add('filter-all-active');
          document.body.classList.add('portfolio-all-active');
        }
      }
    });
  });

  /**
   * Stack Cards - sticky + IntersectionObserver
   */
  (function initStackCards() {
    const containers = document.getElementsByClassName('js-stack-cards');
    const intersectionObserverSupported = ('IntersectionObserver' in window && 'IntersectionObserverEntry' in window && 'intersectionRatio' in window.IntersectionObserverEntry.prototype);
    if (!containers.length || !intersectionObserverSupported) return;

    function StackCards(element) {
      this.element = element;
      this.items = this.element.getElementsByClassName('js-stack-cards__item');
      this.cardHeight = this.items[0] ? this.items[0].offsetHeight : 0;
      this.marginY = 32; // px spacing between cards
      this.cardTop = this.element.getBoundingClientRect().top + window.scrollY + 16;
      this.scrollingListener = false;
      this.scrolling = false;
      initObserver(this);
    }

    function initObserver(instance) {
      const observer = new IntersectionObserver(stackCardsCallback.bind(instance), { threshold: 0 });
      observer.observe(instance.element);
    }

    function stackCardsCallback(entries) {
      if (entries[0].isIntersecting) {
        if (this.scrollingListener) return;
        this.scrollingListener = stackCardsOnScroll.bind(this);
        window.addEventListener('scroll', this.scrollingListener);
      } else {
        if (!this.scrollingListener) return;
        window.removeEventListener('scroll', this.scrollingListener);
        this.scrollingListener = false;
      }
    }

    function stackCardsOnScroll() {
      if (this.scrolling) return;
      this.scrolling = true;
      window.requestAnimationFrame(animateStackCards.bind(this));
    }

    function animateStackCards() {
      const top = this.element.getBoundingClientRect().top;
      for (let i = 0; i < this.items.length; i++) {
        const scrolling = this.cardTop - (window.scrollY + top) - i * (this.cardHeight + this.marginY);
        if (scrolling > 0) {
          const scale = Math.max(0.88, Math.min(1, 1 - (scrolling * 0.0008)));
          this.items[i].style.transform = `translateY(${this.marginY * i}px) scale(${scale})`;
        } else {
          this.items[i].style.transform = `translateY(${this.marginY * i}px) scale(1)`;
        }
      }
      this.scrolling = false;
    }

    for (let i = 0; i < containers.length; i++) new StackCards(containers[i]);
  })();

  /**
   * Initialize Portfolio Stack Cards
   */
  (function initPortfolioStackCards() {
    const portfolioContainers = document.querySelectorAll('.portfolio-stack-cards.js-stack-cards');
    const intersectionObserverSupported = ('IntersectionObserver' in window && 'IntersectionObserverEntry' in window && 'intersectionRatio' in window.IntersectionObserverEntry.prototype);
    if (!portfolioContainers.length || !intersectionObserverSupported) return;

    function PortfolioStackCards(element) {
      this.element = element;
      this.items = this.element.getElementsByClassName('js-stack-cards__item');
      this.cardHeight = this.items[0] ? this.items[0].offsetHeight : 0;
      this.marginY = 32; // px spacing between cards
      this.cardTop = this.element.getBoundingClientRect().top + window.scrollY + 16;
      this.scrollingListener = false;
      this.scrolling = false;
      initObserver(this);
    }

    function initObserver(instance) {
      const observer = new IntersectionObserver(stackCardsCallback.bind(instance), { threshold: 0 });
      observer.observe(instance.element);
    }

    function stackCardsCallback(entries) {
      if (entries[0].isIntersecting) {
        if (this.scrollingListener) return;
        this.scrollingListener = stackCardsOnScroll.bind(this);
        window.addEventListener('scroll', this.scrollingListener);
      } else {
        if (!this.scrollingListener) return;
        window.removeEventListener('scroll', this.scrollingListener);
        this.scrollingListener = false;
      }
    }

    function stackCardsOnScroll() {
      if (this.scrolling) return;
      this.scrolling = true;
      window.requestAnimationFrame(animateStackCards.bind(this));
    }

    function animateStackCards() {
      const top = this.element.getBoundingClientRect().top;
      for (let i = 0; i < this.items.length; i++) {
        const scrolling = this.cardTop - (window.scrollY + top) - i * (this.cardHeight + this.marginY);
        if (scrolling > 0) {
          const scale = Math.max(0.88, Math.min(1, 1 - (scrolling * 0.0008)));
          this.items[i].style.transform = `translateY(${this.marginY * i}px) scale(${scale})`;
        } else {
          this.items[i].style.transform = `translateY(${this.marginY * i}px) scale(1)`;
        }
      }
      this.scrolling = false;
    }

    for (let i = 0; i < portfolioContainers.length; i++) new PortfolioStackCards(portfolioContainers[i]);
  })();

})();