// Tab Navigation
function switchTab(tabName) {

    // ==========================================
    // HIDE ALL TAB CONTENTS
    // ==========================================

    const tabContents =
        document.querySelectorAll('.tab-content, .results-section');

    tabContents.forEach(content => {
        content.classList.remove('active');
    });


    // ==========================================
    // REMOVE ACTIVE FROM ALL NAV LINKS
    // ==========================================

    const navLinks =
        document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        link.classList.remove('active');
    });


    // ==========================================
    // SHOW SELECTED TAB
    // ==========================================

    const selectedTab =
        document.getElementById(tabName);

    if (selectedTab) {
        selectedTab.classList.add('active');
    } else {
        console.error(
            'Tab not found:',
            tabName
        );
        return;
    }


    // ==========================================
    // ACTIVE NAVIGATION LINK
    // ==========================================

    const selectedLink =
        document.querySelector(
            `.nav-link[data-tab="${tabName}"]`
        );

    if (selectedLink) {

        selectedLink.classList.add('active');

    }


    // ==========================================
    // CLOSE MOBILE MENU
    // ==========================================

    const navMenu =
        document.getElementById('navMenu');

    const mobileMenuToggle =
        document.getElementById('mobileMenuToggle');

    if (navMenu) {
        navMenu.classList.remove('active');
    }

    if (mobileMenuToggle) {

        mobileMenuToggle.classList.remove(
            'menu-open'
        );

        mobileMenuToggle.setAttribute(
            'aria-label',
            'Open menu'
        );

    }

    document.body.classList.remove(
        'mobile-menu-open'
    );


    // ==========================================
    // SCROLL TO TOP
    // ==========================================

    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });

}
// Event listeners for navigation links
document.addEventListener('DOMContentLoaded', function () {

    // ==========================================
    // MOBILE NAVIGATION ELEMENTS
    // ==========================================

    const mobileMenuToggle =
        document.getElementById('mobileMenuToggle');

    const navMenu =
        document.getElementById('navMenu');

    let lastScrollY = window.scrollY;
    let ticking = false;


    // ==========================================
    // MOBILE HAMBURGER MENU
    // ==========================================

    if (mobileMenuToggle && navMenu) {

        mobileMenuToggle.addEventListener('click', function () {

            navMenu.classList.toggle('active');

            const isOpen =
                navMenu.classList.contains('active');

            mobileMenuToggle.classList.toggle(
                'menu-open',
                isOpen
            );

            mobileMenuToggle.setAttribute(
                'aria-label',
                isOpen ? 'Close menu' : 'Open menu'
            );

            if (isOpen) {

                document.body.classList.add(
                    'mobile-menu-open'
                );

                document.body.classList.remove(
                    'navbar-hidden'
                );

            } else {

                document.body.classList.remove(
                    'mobile-menu-open'
                );

            }

        });


        // Close menu after selecting a tab

        navMenu.querySelectorAll('.nav-link').forEach(link => {

            link.addEventListener('click', function () {

                navMenu.classList.remove('active');

                mobileMenuToggle.classList.remove(
                    'menu-open'
                );

                mobileMenuToggle.setAttribute(
                    'aria-label',
                    'Open menu'
                );

                document.body.classList.remove(
                    'mobile-menu-open'
                );

            });

        });

    }


    // ==========================================
    // MOBILE NAVBAR SCROLL ANIMATION
    // ==========================================

    function handleMobileScroll() {

        if (window.innerWidth > 768) {

            document.body.classList.remove(
                'navbar-hidden'
            );

            return;
        }


        // Keep navbar visible when menu is open

        if (
            navMenu &&
            navMenu.classList.contains('active')
        ) {

            document.body.classList.remove(
                'navbar-hidden'
            );

            lastScrollY = window.scrollY;

            return;
        }


        const currentScrollY =
            window.scrollY;


        // Always show at top

        if (currentScrollY <= 20) {

            document.body.classList.remove(
                'navbar-hidden'
            );

            lastScrollY = currentScrollY;

            return;
        }


        // Scrolling DOWN → hide

        if (
            currentScrollY > lastScrollY &&
            currentScrollY > 80
        ) {

            document.body.classList.add(
                'navbar-hidden'
            );

        }


        // Scrolling UP → show

        else if (
            currentScrollY < lastScrollY
        ) {

            document.body.classList.remove(
                'navbar-hidden'
            );

        }


        lastScrollY = currentScrollY;

    }


    window.addEventListener(
        'scroll',
        function () {

            if (!ticking) {

                window.requestAnimationFrame(
                    function () {

                        handleMobileScroll();

                        ticking = false;

                    }
                );

                ticking = true;

            }

        },
        { passive: true }
    );


    window.addEventListener(
        'resize',
        function () {

            if (window.innerWidth > 768) {

                document.body.classList.remove(
                    'navbar-hidden'
                );

                document.body.classList.remove(
                    'mobile-menu-open'
                );

                if (navMenu) {

                    navMenu.classList.remove(
                        'active'
                    );

                }

                if (mobileMenuToggle) {

                    mobileMenuToggle.classList.remove(
                        'menu-open'
                    );

                }

            }

        }
    );


    // ==========================================
    // NAVIGATION
    // ==========================================

    const navLinks =
        document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {

        link.addEventListener('click', function (e) {

            e.preventDefault();

            const tabName =
                this.getAttribute('data-tab');

            if (typeof switchTab === 'function') {

                switchTab(tabName);

            }

        });

    });


    // ==========================================
    // SUCCESS POPUP
    // ==========================================

    const successPopup =
        document.getElementById('successPopup');

    const successPopupClose =
        document.getElementById('successPopupClose');

    const successPopupOk =
        document.getElementById('successPopupOk');


    function showSuccessPopup() {

        if (successPopup) {

            successPopup.classList.add('show');

        }

    }


    function closeSuccessPopup() {

        if (successPopup) {

            successPopup.classList.remove('show');

        }

    }


    if (successPopupClose) {

        successPopupClose.addEventListener(
            'click',
            closeSuccessPopup
        );

    }


    if (successPopupOk) {

        successPopupOk.addEventListener(
            'click',
            closeSuccessPopup
        );

    }


    if (successPopup) {

        successPopup.addEventListener(
            'click',
            function (e) {

                if (e.target === successPopup) {

                    closeSuccessPopup();

                }

            }
        );

    }


    // ==========================================
    // CONTACT FORM → GOOGLE SHEETS
    // ==========================================

    const GOOGLE_SHEETS_CONTACT_URL =
        'https://script.google.com/macros/s/AKfycbz10c-0BVU9Xj3WeyKuBvDPzm1_nDaORz6QjhxBX-ooIWGOyp16ZcJYNkyk8vEd3vt2UA/exec';


    const contactForm =
        document.getElementById('contactForm');


    if (contactForm) {

        contactForm.addEventListener(
            'submit',
            async function (e) {

                e.preventDefault();


                const formData =
                    new FormData(contactForm);


                const data = {

                    name:
                        formData.get('name') || '',

                    email:
                        formData.get('email') || '',

                    subject:
                        formData.get('subject') || '',

                    message:
                        formData.get('message') || '',

                    newsletter:
                        formData.get('newsletter')
                            ? 'Yes'
                            : 'No',

                    timestamp:
                        new Date().toLocaleString()

                };


                // Validation

                if (
                    !data.name.trim() ||
                    !data.email.trim() ||
                    !data.subject.trim() ||
                    !data.message.trim()
                ) {

                    alert(
                        '⚠️ Please complete all required fields before sending your message.'
                    );

                    return;

                }


                const emailRegex =
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


                if (!emailRegex.test(data.email)) {

                    alert(
                        '⚠️ Please enter a valid email address.'
                    );

                    return;

                }


                const submitButton =
                    contactForm.querySelector(
                        'button[type="submit"]'
                    );


                const originalButtonText =
                    submitButton
                        ? submitButton.textContent
                        : 'Send Message';


                if (submitButton) {

                    submitButton.disabled = true;

                    submitButton.textContent =
                        'Sending...';

                }


                try {

                    await fetch(
                        GOOGLE_SHEETS_CONTACT_URL,
                        {

                            method: 'POST',

                            mode: 'no-cors',

                            headers: {

                                'Content-Type':
                                    'text/plain;charset=utf-8'

                            },

                            body:
                                JSON.stringify(data)

                        }
                    );


                    showSuccessPopup();

                    contactForm.reset();


                } catch (error) {

                    console.error(
                        'Contact form error:',
                        error
                    );


                    alert(
                        '❌ Unable to send your message.\n\n' +
                        'Please check your internet connection and try again.'
                    );

                } finally {

                    if (submitButton) {

                        submitButton.disabled = false;

                        submitButton.textContent =
                            originalButtonText;

                    }

                }

            }
        );

    }


    // ==========================================
    // STUDENT REGISTRATION → GOOGLE SHEETS
    // ==========================================

    const GOOGLE_SHEETS_REGISTRATION_URL =
        'https://script.google.com/macros/s/AKfycbyYK7sgBSPiYaVdiA7R4XrL27TI2mZrOGTAr8PRXb0T4-3Yd4WCDI03plT7K-qg0LkQUw/exec';


    const registrationForm =
        document.getElementById(
            'registrationForm'
        );


    if (registrationForm) {

        registrationForm.addEventListener(
            'submit',
            async function (e) {

                e.preventDefault();


                const formData =
                    new FormData(registrationForm);


                const data =
                    Object.fromEntries(formData);


                // SUBJECT CHECKBOXES

                const subjectsCheckboxes =
                    document.querySelectorAll(
                        'input[name="subjects"]:checked'
                    );


                const selectedSubjects =
                    Array.from(subjectsCheckboxes)
                        .map(cb => cb.value);


                // REQUIRED FIELDS

                const requiredFields = [

                    'studentName',
                    'dob',
                    'gender',
                    'classGrade',
                    'school',
                    'board',
                    'parentName',
                    'parentPhone',
                    'parentEmail',
                    'course',
                    'batch',
                    'center',
                    'address',
                    'city',
                    'state',
                    'pincode'

                ];


                let missingFields = [];


                requiredFields.forEach(field => {

                    if (
                        !data[field] ||
                        data[field].trim() === ''
                    ) {

                        missingFields.push(field);

                    }

                });


                if (missingFields.length > 0) {

                    alert(
                        '⚠️ Please complete all required registration fields before submitting.'
                    );

                    return;

                }


                // EMAIL VALIDATION

                const emailRegex =
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


                if (
                    !emailRegex.test(
                        data.parentEmail
                    )
                ) {

                    alert(
                        '⚠️ Please enter a valid parent/guardian email address.'
                    );

                    return;

                }


                // PHONE VALIDATION

                const phoneRegex =
                    /^[0-9]{10}$/;


                if (
                    !phoneRegex.test(
                        data.parentPhone
                    )
                ) {

                    alert(
                        '⚠️ Please enter a valid 10-digit mobile number.'
                    );

                    return;

                }


                // PIN CODE VALIDATION

                const pincodeRegex =
                    /^[0-9]{6}$/;


                if (
                    !pincodeRegex.test(
                        data.pincode
                    )
                ) {

                    alert(
                        '⚠️ Please enter a valid 6-digit PIN code.'
                    );

                    return;

                }


                // TERMS VALIDATION

                if (
                    !data.terms ||
                    !data.accuracy
                ) {

                    alert(
                        '⚠️ Please agree to the required terms and confirm that the information provided is accurate.'
                    );

                    return;

                }


                // PREPARE REGISTRATION DATA

                const registrationData = {

                    studentName:
                        data.studentName || '',

                    dob:
                        data.dob || '',

                    gender:
                        data.gender || '',

                    classGrade:
                        data.classGrade || '',

                    school:
                        data.school || '',

                    board:
                        data.board || '',

                    parentName:
                        data.parentName || '',

                    parentPhone:
                        data.parentPhone || '',

                    parentEmail:
                        data.parentEmail || '',

                    course:
                        data.course || '',

                    batch:
                        data.batch || '',

                    center:
                        data.center || '',

                    subjects:
                        selectedSubjects.join(', '),

                    address:
                        data.address || '',

                    city:
                        data.city || '',

                    state:
                        data.state || '',

                    pincode:
                        data.pincode || '',

                    timestamp:
                        new Date().toLocaleString()

                };


                // SUBMIT BUTTON

                const submitButton =
                    registrationForm.querySelector(
                        'button[type="submit"]'
                    );


                const originalButtonText =
                    submitButton
                        ? submitButton.textContent
                        : 'Submit Registration';


                if (submitButton) {

                    submitButton.disabled = true;

                    submitButton.textContent =
                        'Submitting...';

                }


                // SEND TO GOOGLE SHEETS

                try {

                    await fetch(
                        GOOGLE_SHEETS_REGISTRATION_URL,
                        {

                            method: 'POST',

                            mode: 'no-cors',

                            headers: {

                                'Content-Type':
                                    'text/plain;charset=utf-8'

                            },

                            body:
                                JSON.stringify(
                                    registrationData
                                )

                        }
                    );


                    showSuccessPopup();

                    registrationForm.reset();


                } catch (error) {

                    console.error(
                        'Registration error:',
                        error
                    );


                    alert(
                        '❌ Registration could not be submitted.\n\n' +
                        'Please check your internet connection and try again.'
                    );

                } finally {

                    if (submitButton) {

                        submitButton.disabled = false;

                        submitButton.textContent =
                            originalButtonText;

                    }

                }

            }
        );

    }


    // ==========================================
    // FOOTER LINKS
    // ==========================================

    const footerLinks =
        document.querySelectorAll(
            '.footer-section a'
        );


    footerLinks.forEach(link => {

        link.addEventListener(
            'click',
            function (e) {

                e.preventDefault();


                const href =
                    this.getAttribute('href');


                if (
                    href &&
                    href.startsWith('#')
                ) {

                    const tabName =
                        href.substring(1);


                    if (
                        typeof switchTab ===
                        'function'
                    ) {

                        switchTab(tabName);

                    }

                }

            }
        );

    });


    // ==========================================
    // PRICING BUTTONS
    // ==========================================

    const pricingButtons =
        document.querySelectorAll(
            '.pricing-button'
        );


    pricingButtons.forEach(button => {

        button.addEventListener(
            'click',
            function () {

                if (
                    typeof switchTab ===
                    'function'
                ) {

                    switchTab(
                        'registration'
                    );

                }

            }
        );

    });


    // ==========================================
    // GALLERY FILTER
    // ==========================================

    const filterButtons =
        document.querySelectorAll(
            '.gallery-filter'
        );


    const galleryItems =
        document.querySelectorAll(
            '.gallery-item'
        );


    filterButtons.forEach(button => {

        button.addEventListener(
            'click',
            function () {

                filterButtons.forEach(btn => {

                    btn.classList.remove(
                        'active'
                    );

                });


                this.classList.add(
                    'active'
                );


                const filterValue =
                    this.getAttribute(
                        'data-filter'
                    );


                galleryItems.forEach(item => {

                    if (
                        filterValue === 'all' ||
                        item.getAttribute(
                            'data-category'
                        ) === filterValue
                    ) {

                        item.style.display =
                            'flex';

                        item.style.animation =
                            'fadeIn 0.5s ease';

                    } else {

                        item.style.display =
                            'none';

                    }

                });

            }
        );

    });


    // ==========================================
    // RESULTS / ACHIEVEMENTS
    // ==========================================

    const resultsSection =
        document.querySelector(
            '#results'
        );


    const statNumbers =
        document.querySelectorAll(
            '.stat-number'
        );


    let resultsAnimated = false;


    // ------------------------------------------
    // ANIMATED STAT COUNTERS
    // ------------------------------------------

    function animateCounter(element) {

        const target =
            parseInt(
                element.getAttribute(
                    'data-target'
                )
            );


        if (isNaN(target)) {
            return;
        }


        const duration = 2000;

        const startTime =
            performance.now();


        function updateCounter(currentTime) {

            const elapsed =
                currentTime - startTime;


            const progress =
                Math.min(
                    elapsed / duration,
                    1
                );


            // Smooth easing

            const easedProgress =
                1 -
                Math.pow(
                    1 - progress,
                    3
                );


            const currentValue =
                Math.floor(
                    easedProgress * target
                );


            element.textContent =
                currentValue.toLocaleString();


            if (progress < 1) {

                requestAnimationFrame(
                    updateCounter
                );

            } else {

                element.textContent =
                    target.toLocaleString();

            }

        }


        requestAnimationFrame(
            updateCounter
        );

    }


    // ------------------------------------------
    // START RESULTS ANIMATION
    // ------------------------------------------

    function animateResults() {

        if (resultsAnimated) {
            return;
        }


        resultsAnimated = true;


        statNumbers.forEach(
            (number, index) => {

                setTimeout(
                    function () {

                        animateCounter(
                            number
                        );

                    },
                    index * 200
                );

            }
        );


        // Animate achievement cards

        const achievementCards =
            document.querySelectorAll(
                '.achievement-card'
            );


        achievementCards.forEach(
            (card, index) => {

                setTimeout(
                    function () {

                        card.classList.add(
                            'show'
                        );

                    },
                    index * 150
                );

            }
        );

    }


    // ------------------------------------------
    // INTERSECTION OBSERVER
    // ------------------------------------------

    if (
        resultsSection &&
        statNumbers.length > 0
    ) {

        const resultsObserver =
            new IntersectionObserver(
                function (entries) {

                    entries.forEach(entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            animateResults();

                            resultsObserver.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.25
                }
            );


        resultsObserver.observe(
            resultsSection
        );

    }


    // ==========================================
    // RESULTS / ACHIEVEMENTS HOVER EFFECT
    // ==========================================

    const achievementCards =
        document.querySelectorAll(
            '.achievement-card'
        );


    achievementCards.forEach(card => {

        card.addEventListener(
            'mouseenter',
            function () {

                this.classList.add(
                    'achievement-hover'
                );

            }
        );


        card.addEventListener(
            'mouseleave',
            function () {

                this.classList.remove(
                    'achievement-hover'
                );

            }
        );

    });


    // ==========================================
    // TOPPER CARD CLICK EFFECT
    // ==========================================

    const topperCards =
        document.querySelectorAll(
            '.topper-card'
        );


    topperCards.forEach(card => {

        card.addEventListener(
            'click',
            function () {

                topperCards.forEach(
                    otherCard => {

                        otherCard.classList.remove(
                            'selected'
                        );

                    }
                );


                this.classList.add(
                    'selected'
                );

            }
        );

    });


});

// Add active state to nav items on scroll (optional enhancement)
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('.tab-content');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-tab') === current) {
            link.classList.add('active');
        }
    });
});
// =========================================
// MOBILE HAMBURGER MENU
// =========================================

document.addEventListener('DOMContentLoaded', function () {

    const menuButton =
        document.getElementById('mobileMenuToggle');

    const navMenu =
        document.getElementById('navMenu');

    if (!menuButton || !navMenu) {
        console.warn(
            'Mobile menu elements not found.'
        );
        return;
    }

    // OPEN / CLOSE

    menuButton.addEventListener(
        'click',
        function (e) {

            e.stopPropagation();

            const opened =
                navMenu.classList.toggle('active');

            menuButton.classList.toggle(
                'active',
                opened
            );

            menuButton.setAttribute(
                'aria-expanded',
                opened ? 'true' : 'false'
            );

        }
    );


    // CLOSE AFTER CLICKING A LINK

    navMenu
        .querySelectorAll('.nav-link')
        .forEach(function (link) {

            link.addEventListener(
                'click',
                function () {

                    navMenu.classList.remove(
                        'active'
                    );

                    menuButton.classList.remove(
                        'active'
                    );

                    menuButton.setAttribute(
                        'aria-expanded',
                        'false'
                    );

                }
            );

        });


    // CLOSE WHEN CLICKING OUTSIDE

    document.addEventListener(
        'click',
        function (e) {

            if (
                navMenu.classList.contains('active') &&
                !navMenu.contains(e.target) &&
                !menuButton.contains(e.target)
            ) {

                navMenu.classList.remove(
                    'active'
                );

                menuButton.classList.remove(
                    'active'
                );

                menuButton.setAttribute(
                    'aria-expanded',
                    'false'
                );

            }

        }
    );


    // RESET WHEN GOING BACK TO DESKTOP

    window.addEventListener(
        'resize',
        function () {

            if (window.innerWidth > 767) {

                navMenu.classList.remove(
                    'active'
                );

                menuButton.classList.remove(
                    'active'
                );

                menuButton.setAttribute(
                    'aria-expanded',
                    'false'
                );

            }

        }
    );

});
// ==========================================
// MOBILE MENU TOGGLE
// ==========================================
// ==========================================
// MOBILE MENU TOGGLE + SCROLL ANIMATION
// ==========================================

// ==========================================
// MOBILE MENU
// ==========================================

const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navMenu = document.getElementById('navMenu');

if (mobileMenuToggle && navMenu) {

    // OPEN / CLOSE MENU
    mobileMenuToggle.addEventListener('click', function () {

        const isOpen = navMenu.classList.toggle('active');

        mobileMenuToggle.classList.toggle('menu-open', isOpen);

        mobileMenuToggle.setAttribute(
            'aria-label',
            isOpen ? 'Close menu' : 'Open menu'
        );

        // Always reset scroll effect when clicked
        navMenu.classList.remove('scroll-hiding');

    });


    // CLOSE MENU WHEN A TAB IS CLICKED
    navMenu.querySelectorAll('.nav-link').forEach(function (link) {

        link.addEventListener('click', function () {

            navMenu.classList.remove('active');
            navMenu.classList.remove('scroll-hiding');

            mobileMenuToggle.classList.remove('menu-open');

            mobileMenuToggle.setAttribute(
                'aria-label',
                'Open menu'
            );

        });

    });


    // ==========================================
    // HIDE MENU WHILE SCROLLING DOWN
    // ==========================================

    let lastScrollPosition = window.scrollY;
    let ticking = false;

    window.addEventListener('scroll', function () {

        if (!navMenu.classList.contains('active')) {
            return;
        }

        if (!ticking) {

            window.requestAnimationFrame(function () {

                const currentScrollPosition = window.scrollY;

                // SCROLL DOWN
                if (currentScrollPosition > lastScrollPosition + 5) {

                    navMenu.classList.add('scroll-hiding');

                }

                // SCROLL UP
                if (currentScrollPosition < lastScrollPosition - 5) {

                    navMenu.classList.remove('scroll-hiding');

                }

                lastScrollPosition = currentScrollPosition;

                ticking = false;

            });

            ticking = true;
        }

    }, { passive: true });

}