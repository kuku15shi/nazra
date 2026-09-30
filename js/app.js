/**
 * NAZRA Online Educational Academy
 * Interactive Application Logic & WhatsApp Integration
 */

// Course Database
const COURSES_DATA = [
  {
    id: 'quran-nazra',
    category: 'quran',
    categoryLabel: 'Quran Studies',
    title: 'Nazra Quran & Noorani Qaida',
    desc: 'Foundational Quran recitation with accurate pronunciation, letter articulation (Makharij), and gentle personalized pacing.',
    duration: '3 - 6 Months (Flexible)',
    format: '1-on-1 Live Online',
    suitableFor: 'Children & Beginners of all ages',
    outcomes: [
      'Mastery of Arabic alphabet and phonetic rules with Noorani Qaida',
      'Fluent and correct Nazra recitation of the Holy Quran',
      'Daily revision and recitation practice under gentle supervision',
      'Basic Islamic manners, daily Duas, and Salah guidance'
    ]
  },
  {
    id: 'quran-tajweed',
    category: 'quran',
    categoryLabel: 'Quran Studies',
    title: 'Advanced Tajweed & Recitation',
    desc: 'Master the intricate rules of Tajweed, rhythmic modulation, Noon Sakinah, Meem Sakinah, and breath control.',
    duration: '4 Months',
    format: 'Live 1-on-1 / Small Cohort',
    suitableFor: 'Intermediate reciters & Adults',
    outcomes: [
      'Accurate identification and application of all Tajweed rules',
      'Voice clarity, confident rhythm, and correct pauses (Waqf)',
      'Correction of common subtle articulation errors',
      'Confidence in leading family prayers and regular recitation'
    ]
  },
  {
    id: 'quran-hifz',
    category: 'quran',
    categoryLabel: 'Quran Studies',
    title: 'Guided Quran Hifz (Memorization)',
    desc: 'Structured memorization program with systematic daily Sabak, Sabki, and Manzil revisions suited to individual memory capacity.',
    duration: 'Custom Pace',
    format: 'Daily Live 1-on-1',
    suitableFor: 'Dedicated students & youth',
    outcomes: [
      'Personalized daily memorization milestones with continuous tracking',
      'Rigorous revision system to preserve memorized Surahs permanently',
      'Regular one-on-one testing and motivation sessions',
      'Spiritual mentorship and discipline development'
    ]
  },
  {
    id: 'lang-spoken-english',
    category: 'language',
    categoryLabel: 'Language Skills',
    title: 'Spoken English & Communication',
    desc: 'Overcome hesitation and speak fluent, clear English with confidence in daily life, school, and professional interactions.',
    duration: '2 - 3 Months',
    format: 'Interactive Live Sessions',
    suitableFor: 'School students, Homemakers & Working individuals',
    outcomes: [
      'Hesitation-free speaking practice through daily conversation scenarios',
      'Core vocabulary building and practical sentence structures',
      'Accent neutrality, pronunciation clarity, and active listening',
      'Confidence in public speaking, presentations, and interviews'
    ]
  },
  {
    id: 'lang-arabic-comms',
    category: 'language',
    categoryLabel: 'Language Skills',
    title: 'Arabic Communication & Grammar',
    desc: 'Practical Arabic language coaching focusing on spoken conversation, grammar basics, and understanding Quranic vocabulary.',
    duration: '3 - 4 Months',
    format: 'Live Online Classroom',
    suitableFor: 'Beginners & Enthusiasts',
    outcomes: [
      'Conversational skills for daily Arabic communication and travel',
      'Elementary Arabic grammar (Nahw & Sarf simplified)',
      'Vocabulary enrichment to comprehend Quranic verses and Hadith',
      'Reading and writing proficiency with structured exercises'
    ]
  },
  {
    id: 'acad-school-tuition',
    category: 'academic',
    categoryLabel: 'Academic Tuition',
    title: 'School Foundation & Subject Tuition',
    desc: 'Comprehensive academic tutoring for school subjects (Mathematics, Science, English, Social Studies) with dedicated personal mentors.',
    duration: 'Academic Year / Monthly',
    format: '1-on-1 & Micro Batches',
    suitableFor: 'Grades 1 to 10 Students',
    outcomes: [
      'Strong conceptual clarity in core syllabus topics',
      'Daily homework assistance and exam-oriented problem solving',
      'Periodic assessments with constructive parent progress reports',
      'Study techniques that boost grades and eliminate subject fear'
    ]
  },
  {
    id: 'acad-madrasa-tuition',
    category: 'academic',
    categoryLabel: 'Academic Tuition',
    title: 'Madrasa Board Tuition & Support',
    desc: 'Dedicated coaching for students attending Madrasa boards to excel in their religious and academic curriculum without stress.',
    duration: 'Ongoing Guidance',
    format: 'Personalized Online Support',
    suitableFor: 'Madrasa students of all grades',
    outcomes: [
      'Complete syllabus coverage aligned with the student’s Madrasa board',
      'Clarification of difficult textbook lessons, Arabic, and Fiqh topics',
      'Exam preparation and revision mock tests',
      'Flexible scheduling around regular school and madrasa hours'
    ]
  }
];

// WhatsApp Contact Configuration
const PRIMARY_WHATSAPP = '919895470070';
const ALTERNATE_WHATSAPP = '917012558128';

// DOM Ready initialization
document.addEventListener('DOMContentLoaded', () => {
  // Initialize Theme (Dark / Light)
  initTheme();

  // Initialize Preloader Book Animation
  initPreloader();

  // Initialize Lucide icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // Render Initial Course List
  renderCourses('all');

  // Setup Event Listeners
  initNavigation();
  initCourseFilters();
  initModal();
  initEnquiryForm();
  initSmoothScroll();
});

/* ===================================================================
   PRELOADER CONTROLLER
   =================================================================== */
function initPreloader() {
  const preloader = document.getElementById('pagePreloader');
  if (!preloader) return;

  const hidePreloader = () => {
    preloader.classList.add('loaded');
  };

  // Reveal page after brief smooth book opening animation
  if (document.readyState === 'complete') {
    setTimeout(hidePreloader, 850);
  } else {
    window.addEventListener('load', () => {
      setTimeout(hidePreloader, 850);
    });
  }

  // Safety fallback
  setTimeout(hidePreloader, 1800);
}

/* ===================================================================
   DARK / LIGHT THEME TOGGLE
   =================================================================== */
function initTheme() {
  const savedTheme = localStorage.getItem('nazra_theme');
  const systemPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');

  applyTheme(initialTheme);

  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const mobileThemeToggleBtn = document.getElementById('mobileThemeToggleBtn');

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', toggleTheme);
  }
  if (mobileThemeToggleBtn) {
    mobileThemeToggleBtn.addEventListener('click', toggleTheme);
  }
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('nazra_theme', theme);

  const isDark = theme === 'dark';
  const iconName = isDark ? 'sun' : 'moon';

  const themeIcon = document.getElementById('themeIcon');
  const mobileThemeIcon = document.getElementById('mobileThemeIcon');

  if (themeIcon) {
    themeIcon.setAttribute('data-lucide', iconName);
  }
  if (mobileThemeIcon) {
    mobileThemeIcon.setAttribute('data-lucide', iconName);
  }

  if (window.lucide) {
    window.lucide.createIcons();
  }
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  applyTheme(newTheme);
}

/* ===================================================================
   NAVIGATION & SCROLL EFFECTS
   =================================================================== */
function initNavigation() {
  const navbarWrapper = document.querySelector('.navbar-wrapper');
  const menuToggleBtn = document.getElementById('menuToggleBtn');
  const mobileNavDrawer = document.getElementById('mobileNavDrawer');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-drawer .nav-link');

  // Scroll glass effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbarWrapper.classList.add('scrolled');
    } else {
      navbarWrapper.classList.remove('scrolled');
    }
    updateActiveNavLink();
  });

  // Mobile menu toggle
  if (menuToggleBtn && mobileNavDrawer) {
    menuToggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      mobileNavDrawer.classList.toggle('open');
      const isOpen = mobileNavDrawer.classList.contains('open');
      menuToggleBtn.setAttribute('aria-expanded', isOpen);
    });

    // Close on click outside
    document.addEventListener('click', (e) => {
      if (!mobileNavDrawer.contains(e.target) && !menuToggleBtn.contains(e.target)) {
        mobileNavDrawer.classList.remove('open');
      }
    });

    // Close on clicking any mobile link
    mobileNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileNavDrawer.classList.remove('open');
      });
    });
  }
}

// Active link highlighting on scroll
function updateActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const scrollPosition = window.scrollY + 140;

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');

    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      document.querySelectorAll('.nav-menu .nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });
}

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '') return;
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const navOffset = 90;
        const elementPosition = targetEl.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - navOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

/* ===================================================================
   COURSES RENDERING & FILTERING
   =================================================================== */
function renderCourses(categoryFilter = 'all') {
  const coursesContainer = document.getElementById('coursesGrid');
  if (!coursesContainer) return;

  const filteredCourses = categoryFilter === 'all'
    ? COURSES_DATA
    : COURSES_DATA.filter(course => course.category === categoryFilter);

  coursesContainer.innerHTML = filteredCourses.map(course => `
    <div class="course-card" data-category="${course.category}">
      <div class="course-card-top">
        <span class="course-category-tag">${escapeHtml(course.categoryLabel)}</span>
        <span class="course-format-pill">
          <i data-lucide="video"></i> ${escapeHtml(course.format)}
        </span>
      </div>
      <h3>${escapeHtml(course.title)}</h3>
      <p class="course-desc">${escapeHtml(course.desc)}</p>
      
      <div class="course-meta-row">
        <div class="meta-item">
          <i data-lucide="clock"></i>
          <span>${escapeHtml(course.duration)}</span>
        </div>
        <div class="meta-item">
          <i data-lucide="users"></i>
          <span>Live Online</span>
        </div>
      </div>

      <div class="course-card-footer">
        <button class="btn btn-glass" onclick="openCourseModal('${course.id}')">
          <span>View Details</span>
          <i data-lucide="arrow-right"></i>
        </button>
        <button class="btn btn-whatsapp" onclick="enrollDirectly('${course.id}')" title="Chat on WhatsApp">
          <i data-lucide="message-circle"></i>
          <span>Join</span>
        </button>
      </div>
    </div>
  `).join('');

  if (window.lucide) {
    window.lucide.createIcons();
  }
}

function initCourseFilters() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filterValue = btn.getAttribute('data-filter');
      renderCourses(filterValue);
    });
  });
}

/* ===================================================================
   COURSE DETAILS MODAL
   =================================================================== */
function initModal() {
  const modalOverlay = document.getElementById('courseModalOverlay');
  const modalCloseBtn = document.getElementById('modalCloseBtn');

  if (modalCloseBtn && modalOverlay) {
    modalCloseBtn.addEventListener('click', closeModal);
    
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        closeModal();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modalOverlay.classList.contains('open')) {
        closeModal();
      }
    });
  }
}

function openCourseModal(courseId) {
  const course = COURSES_DATA.find(c => c.id === courseId);
  if (!course) return;

  const modalOverlay = document.getElementById('courseModalOverlay');
  const modalTag = document.getElementById('modalCourseTag');
  const modalTitle = document.getElementById('modalCourseTitle');
  const modalDesc = document.getElementById('modalCourseDesc');
  const modalDuration = document.getElementById('modalDuration');
  const modalFormat = document.getElementById('modalFormat');
  const modalAudience = document.getElementById('modalAudience');
  const modalOutcomesList = document.getElementById('modalOutcomesList');
  const modalEnrollBtn = document.getElementById('modalEnrollBtn');

  if (modalTag) modalTag.textContent = course.categoryLabel;
  if (modalTitle) modalTitle.textContent = course.title;
  if (modalDesc) modalDesc.textContent = course.desc;
  if (modalDuration) modalDuration.textContent = course.duration;
  if (modalFormat) modalFormat.textContent = course.format;
  if (modalAudience) modalAudience.textContent = course.suitableFor;

  if (modalOutcomesList) {
    modalOutcomesList.innerHTML = course.outcomes.map(item => `
      <li>
        <i data-lucide="check-circle-2"></i>
        <span>${escapeHtml(item)}</span>
      </li>
    `).join('');
  }

  if (modalEnrollBtn) {
    modalEnrollBtn.onclick = () => {
      enrollDirectly(course.id);
    };
  }

  modalOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';

  if (window.lucide) {
    window.lucide.createIcons();
  }
}

function closeModal() {
  const modalOverlay = document.getElementById('courseModalOverlay');
  if (modalOverlay) {
    modalOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }
}

/* ===================================================================
   WHATSAPP INTEGRATION & ENQUIRY FORM
   =================================================================== */
function enrollDirectly(courseId) {
  const course = COURSES_DATA.find(c => c.id === courseId);
  const courseName = course ? course.title : 'NAZRA Online Courses';

  const message = `Assalamu Alaikum / Hello NAZRA Academy,

I am interested in enrolling in the following program:
*Course:* ${courseName}

Could you please share details regarding available timings, batch slots, and the enrollment process?

Thank you!`;

  openWhatsAppMessage(PRIMARY_WHATSAPP, message);
}

function initEnquiryForm() {
  const form = document.getElementById('quickEnquiryForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('enquiryName').value.trim();
    const phone = document.getElementById('enquiryPhone').value.trim();
    const course = document.getElementById('enquiryCourse').value;
    const notes = document.getElementById('enquiryMessage').value.trim();
    const numberSelect = document.getElementById('enquiryNumberChoice')?.value || PRIMARY_WHATSAPP;

    if (!name || !phone) {
      alert('Please fill in your name and contact number.');
      return;
    }

    const message = `Assalamu Alaikum / Hello NAZRA Academy,

*New Admission / Quick Enquiry*
---------------------------------------
• *Name:* ${name}
• *Contact:* ${phone}
• *Selected Course:* ${course || 'General Guidance'}
• *Student Notes / Requirements:* ${notes || 'Looking for course details and class timings.'}
---------------------------------------
Sent via NAZRA Online Educational Academy Website.`;

    openWhatsAppMessage(numberSelect, message);
  });
}

function openWhatsAppMessage(phoneNumber, messageText) {
  const cleanNumber = phoneNumber.replace(/[^0-9]/g, '');
  const encodedText = encodeURIComponent(messageText);
  const waUrl = `https://wa.me/${cleanNumber}?text=${encodedText}`;
  window.open(waUrl, '_blank', 'noopener,noreferrer');
}

/* Helper: Escape HTML string */
function escapeHtml(str) {
  if (!str) return '';
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
