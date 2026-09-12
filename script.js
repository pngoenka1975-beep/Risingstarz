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


        if (currentScrollY <= 20) {

            document.body.classList.remove(
                'navbar-hidden'
            );

            lastScrollY = currentScrollY;

            return;
        }


        if (
            currentScrollY > lastScrollY &&
            currentScrollY > 80
        ) {

            document.body.classList.add(
                'navbar-hidden'
            );

        } else if (
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
    // MAIN NAVIGATION
    // ==========================================

    const navLinks =
        document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {

        link.addEventListener('click', function (e) {

            e.preventDefault();

            const tabName =
                this.getAttribute('data-tab');

            if (
                tabName &&
                typeof switchTab === 'function'
            ) {

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
    // COURSE FILTER SYSTEM
    // ==========================================

    const courseFilterButtons =
        document.querySelectorAll(
            '.rs-course-filter'
        );

    const courseCards =
        document.querySelectorAll(
            '.rs-course-card'
        );


    if (
        courseFilterButtons.length > 0 &&
        courseCards.length > 0
    ) {

        courseFilterButtons.forEach(button => {

            button.addEventListener(
                'click',
                function () {

                    const selectedFilter =
                        this.getAttribute(
                            'data-filter'
                        );


                    courseFilterButtons.forEach(
                        filterButton => {

                            filterButton.classList.remove(
                                'active'
                            );

                        }
                    );


                    this.classList.add(
                        'active'
                    );


                    courseCards.forEach(card => {

                        const cardCategory =
                            card.getAttribute(
                                'data-category'
                            );


                        if (
                            selectedFilter === 'all' ||
                            cardCategory === selectedFilter
                        ) {

                            card.style.display = '';

                            card.classList.remove(
                                'rs-course-filter-show'
                            );

                            void card.offsetWidth;

                            card.classList.add(
                                'rs-course-filter-show'
                            );

                        } else {

                            card.style.display = 'none';

                        }

                    });

                }
            );

        });

    }


    // ==========================================
    // COURSE DETAILS MODAL
    // ==========================================

    const exploreCourseButtons =
        document.querySelectorAll(
            '.rs-explore-btn'
        );


    const courseDetailsModal =
        document.getElementById(
            'courseDetailsModal'
        );


    // IMPORTANT:
    // Your HTML has class="course-details-overlay"
    // but does not have id="courseDetailsOverlay".
    // Therefore we support BOTH.

    const courseDetailsOverlay =
        document.getElementById(
            'courseDetailsOverlay'
        ) ||
        document.querySelector(
            '#courseDetailsModal .course-details-overlay'
        );


    const courseDetailsClose =
        document.getElementById(
            'courseDetailsClose'
        );


    const courseDetailsIcon =
        document.getElementById(
            'courseDetailsIcon'
        );


    const courseDetailsBadge =
        document.getElementById(
            'courseDetailsBadge'
        );


    const courseDetailsTitle =
        document.getElementById(
            'courseDetailsTitle'
        );


    const courseDetailsBoard =
        document.getElementById(
            'courseDetailsBoard'
        );


    const courseDetailsSubjects =
        document.getElementById(
            'courseDetailsSubjects'
        );


    const courseDetailsHighlights =
        document.getElementById(
            'courseDetailsHighlights'
        );


    const courseDetailsDuration =
        document.getElementById(
            'courseDetailsDuration'
        );


    const courseDetailsBatch =
        document.getElementById(
            'courseDetailsBatch'
        );


    const courseDetailsRegister =
        document.getElementById(
            'courseDetailsRegister'
        );


    // ==========================================
    // CURRENTLY SELECTED COURSE
    // ==========================================

    let currentlySelectedCourse = null;


    // ==========================================
    // OPEN COURSE DETAILS
    // ==========================================

    function openCourseDetails(courseCard) {

        if (!courseCard) {

            console.warn(
                'Course card not found.'
            );

            return;

        }


        if (!courseDetailsModal) {

            console.error(
                'Course details modal HTML is missing.'
            );

            return;

        }


        // COURSE TITLE

        const titleElement =
            courseCard.querySelector('h3');


        // BOARD

        const boardElement =
            courseCard.querySelector(
                '.rs-course-board'
            );


        // BADGE

        const badgeElement =
            courseCard.querySelector(
                '.rs-course-badge'
            );


        // ICON

        const iconElement =
            courseCard.querySelector(
                '.rs-course-icon'
            );


        // SUBJECTS

        const subjectElements =
            courseCard.querySelectorAll(
                '.rs-course-subjects li'
            );


        // HIGHLIGHTS

        const highlightElements =
            courseCard.querySelectorAll(
                '.rs-course-highlights li'
            );


        // COURSE DATA

        const courseTitle =
            titleElement
                ? titleElement.textContent.trim()
                : 'Selected Course';


        const courseBoard =
            boardElement
                ? boardElement.textContent.trim()
                : '';


        const courseBadge =
            badgeElement
                ? badgeElement.textContent.trim()
                : 'Course';


        const courseIcon =
            iconElement
                ? iconElement.textContent.trim()
                : '📘';


        const courseId =
            courseCard.getAttribute(
                'data-course-id'
            );


        // SAVE CURRENT COURSE

        currentlySelectedCourse = {

            id: courseId || '',

            name: courseTitle,

            board: courseBoard,

            card: courseCard

        };


        // ==========================================
        // SAVE TO LOCAL STORAGE
        // ==========================================

        try {

            if (courseId) {

                localStorage.setItem(
                    'selectedCourseId',
                    courseId
                );

            }

            localStorage.setItem(
                'selectedCourseName',
                courseTitle
            );

            localStorage.setItem(
                'selectedCourseBoard',
                courseBoard
            );

        } catch (error) {

            console.warn(
                'Could not save selected course:',
                error
            );

        }


        // ==========================================
        // FILL ICON
        // ==========================================

        if (courseDetailsIcon) {

            courseDetailsIcon.textContent =
                courseIcon;

        }


        // ==========================================
        // FILL BADGE
        // ==========================================

        if (courseDetailsBadge) {

            courseDetailsBadge.textContent =
                courseBadge;

        }


        // ==========================================
        // FILL TITLE
        // ==========================================

        if (courseDetailsTitle) {

            courseDetailsTitle.textContent =
                courseTitle;

        }


        // ==========================================
        // FILL BOARD
        // ==========================================

        if (courseDetailsBoard) {

            courseDetailsBoard.textContent =
                courseBoard;

        }


        // ==========================================
        // FILL SUBJECTS
        // ==========================================

        if (courseDetailsSubjects) {

            courseDetailsSubjects.innerHTML = '';

            subjectElements.forEach(
                subject => {

                    const li =
                        document.createElement(
                            'li'
                        );

                    li.textContent =
                        subject.textContent.trim();

                    courseDetailsSubjects.appendChild(
                        li
                    );

                }
            );

        }


        // ==========================================
        // FILL HIGHLIGHTS
        // ==========================================

        if (courseDetailsHighlights) {

            courseDetailsHighlights.innerHTML = '';

            highlightElements.forEach(
                highlight => {

                    const li =
                        document.createElement(
                            'li'
                        );

                    li.textContent =
                        highlight.textContent.trim();

                    courseDetailsHighlights.appendChild(
                        li
                    );

                }
            );

        }


        // ==========================================
        // FILL DURATION
        // ==========================================

        if (courseDetailsDuration) {

            const duration =
                courseCard.getAttribute(
                    'data-duration'
                );

            courseDetailsDuration.textContent =
                duration || 'Academic Year';

        }


        // ==========================================
        // FILL BATCH SIZE
        // ==========================================

        if (courseDetailsBatch) {

            const batch =
                courseCard.getAttribute(
                    'data-batch'
                );

            courseDetailsBatch.textContent =
                batch || '15–20 Students';

        }


        // ==========================================
        // SHOW MODAL
        // ==========================================

        courseDetailsModal.classList.add(
            'show'
        );

        courseDetailsModal.setAttribute(
            'aria-hidden',
            'false'
        );

        document.body.classList.add(
            'course-modal-open'
        );

    }


    // ==========================================
    // CLOSE COURSE DETAILS
    // ==========================================

    function closeCourseDetails() {

        if (!courseDetailsModal) {

            return;

        }


        courseDetailsModal.classList.remove(
            'show'
        );

        courseDetailsModal.setAttribute(
            'aria-hidden',
            'true'
        );

        document.body.classList.remove(
            'course-modal-open'
        );

    }


    // ==========================================
    // EXPLORE BUTTONS
    // ==========================================

    exploreCourseButtons.forEach(
        button => {

            button.addEventListener(
                'click',
                function (e) {

                    e.preventDefault();

                    e.stopPropagation();


                    const courseId =
                        this.getAttribute(
                            'data-course-id'
                        );


                    if (!courseId) {

                        console.warn(
                            'Explore Course button is missing data-course-id.'
                        );

                        return;

                    }


                    const courseCard =
                        document.querySelector(
                            '.rs-course-card[data-course-id="' +
                            CSS.escape(courseId) +
                            '"]'
                        );


                    if (!courseCard) {

                        console.warn(
                            'Course card not found:',
                            courseId
                        );

                        return;

                    }


                    openCourseDetails(
                        courseCard
                    );

                }
            );

        }
    );


    // ==========================================
    // REGISTER FOR THIS COURSE
    // ==========================================

    if (courseDetailsRegister) {

        courseDetailsRegister.addEventListener(
            'click',
            function (e) {

                e.preventDefault();

                e.stopPropagation();


                // Make sure a course was selected

                if (!currentlySelectedCourse) {

                    console.warn(
                        'No course selected for registration.'
                    );

                    return;

                }


                const selectedCourse =
                    currentlySelectedCourse;


                // ==========================================
                // SAVE COURSE AGAIN
                // ==========================================

                try {

                    if (selectedCourse.id) {

                        localStorage.setItem(
                            'selectedCourseId',
                            selectedCourse.id
                        );

                    }

                    localStorage.setItem(
                        'selectedCourseName',
                        selectedCourse.name
                    );

                    localStorage.setItem(
                        'selectedCourseBoard',
                        selectedCourse.board
                    );

                } catch (error) {

                    console.warn(
                        'Could not save registration course:',
                        error
                    );

                }


                // ==========================================
                // CLOSE MODAL
                // ==========================================

                closeCourseDetails();


                // ==========================================
                // OPEN REGISTRATION TAB
                // ==========================================

                if (
                    typeof switchTab ===
                    'function'
                ) {

                    switchTab(
                        'registration'
                    );

                } else {

                    console.warn(
                        'switchTab() function is not available.'
                    );

                    return;

                }


                // ==========================================
                // WAIT FOR REGISTRATION SECTION
                // ==========================================

                setTimeout(
                    function () {

                        // COURSE FIELD

                        const courseField =
                            document.getElementById(
                                'course'
                            ) ||
                            document.querySelector(
                                '[name="course"]'
                            );


                        if (courseField) {

                            let matched = false;


                            // Try to match option value/text

                            if (
                                courseField.tagName ===
                                'SELECT'
                            ) {

                                Array.from(
                                    courseField.options
                                ).forEach(
                                    option => {

                                        const optionText =
                                            option.textContent
                                                .trim()
                                                .toLowerCase();

                                        const optionValue =
                                            option.value
                                                .trim()
                                                .toLowerCase();

                                        const selectedName =
                                            selectedCourse.name
                                                .trim()
                                                .toLowerCase();


                                        if (
                                            optionText ===
                                                selectedName ||
                                            optionValue ===
                                                selectedName
                                        ) {

                                            courseField.value =
                                                option.value;

                                            matched = true;

                                        }

                                    }
                                );


                                // Fallback:
                                // match Class number

                                if (!matched) {

                                    Array.from(
                                        courseField.options
                                    ).forEach(
                                        option => {

                                            if (
                                                option.textContent
                                                    .toLowerCase()
                                                    .includes(
                                                        selectedCourse.name
                                                            .toLowerCase()
                                                    )
                                            ) {

                                                courseField.value =
                                                    option.value;

                                                matched = true;

                                            }

                                        }
                                    );

                                }

                            } else {

                                courseField.value =
                                    selectedCourse.name;

                                matched = true;

                            }


                            // Trigger change event

                            courseField.dispatchEvent(
                                new Event(
                                    'change',
                                    {
                                        bubbles: true
                                    }
                                )
                            );

                        }


                        // ==========================================
                        // CLASS / GRADE FIELD
                        // ==========================================

                        const classGradeField =
                            document.getElementById(
                                'classGrade'
                            ) ||
                            document.querySelector(
                                '[name="classGrade"]'
                            );


                        if (classGradeField) {

                            const classMatch =
                                selectedCourse.name.match(
                                    /class\s*(\d+(?:\.\d+)?)/i
                                );


                            if (classMatch) {

                                const classNumber =
                                    classMatch[1];


                                if (
                                    classGradeField.tagName ===
                                    'SELECT'
                                ) {

                                    Array.from(
                                        classGradeField.options
                                    ).forEach(
                                        option => {

                                            const text =
                                                option.textContent
                                                    .trim()
                                                    .toLowerCase();

                                            const value =
                                                option.value
                                                    .trim()
                                                    .toLowerCase();


                                            if (
                                                text.includes(
                                                    'class ' +
                                                    classNumber
                                                ) ||
                                                value ===
                                                    classNumber
                                            ) {

                                                classGradeField.value =
                                                    option.value;

                                            }

                                        }
                                    );

                                } else {

                                    classGradeField.value =
                                        classNumber;

                                }


                                classGradeField.dispatchEvent(
                                    new Event(
                                        'change',
                                        {
                                            bubbles: true
                                        }
                                    )
                                );

                            }

                        }


                        // ==========================================
                        // SCROLL TO REGISTRATION FORM
                        // ==========================================

                        if (registrationForm) {

                            registrationForm.scrollIntoView(
                                {
                                    behavior: 'smooth',
                                    block: 'start'
                                }
                            );

                        }

                    },
                    250
                );

            }
        );

    }


    // ==========================================
    // CLOSE BUTTON
    // ==========================================

    if (courseDetailsClose) {

        courseDetailsClose.addEventListener(
            'click',
            function (e) {

                e.preventDefault();

                closeCourseDetails();

            }
        );

    }


    // ==========================================
    // CLOSE BY CLICKING OUTSIDE
    // ==========================================

    if (courseDetailsOverlay) {

        courseDetailsOverlay.addEventListener(
            'click',
            function () {

                closeCourseDetails();

            }
        );

    }


    // ==========================================
    // ESCAPE KEY
    // ==========================================

    document.addEventListener(
        'keydown',
        function (e) {

            if (
                e.key === 'Escape' &&
                courseDetailsModal &&
                courseDetailsModal.classList.contains(
                    'show'
                )
            ) {

                closeCourseDetails();

            }

        }
    );


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

                const href =
                    this.getAttribute('href');


                if (
                    href &&
                    href.startsWith('#')
                ) {

                    e.preventDefault();


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


    // ==========================================
    // ANIMATED STAT COUNTER
    // ==========================================

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


    // ==========================================
    // START RESULTS ANIMATION
    // ==========================================

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


        const performerCards =
            document.querySelectorAll(
                '.performer-card'
            );


        performerCards.forEach(
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


    // ==========================================
    // RESULTS INTERSECTION OBSERVER
    // ==========================================

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
    // ACHIEVEMENT HOVER EFFECT
    // ==========================================

    const performerCards =
        document.querySelectorAll(
            '.performer-card'
        );


    performerCards.forEach(card => {

        card.addEventListener(
            'mouseenter',
            function () {

                this.classList.add(
                    'performer-hover'
                );

            }
        );


        card.addEventListener(
            'mouseleave',
            function () {

                this.classList.remove(
                    'performer-hover'
                );

            }
        );

    });


    // ==========================================
    // INITIALIZE COURSE FILTER
    // ==========================================

    const initialCourseFilter =
        document.querySelector(
            '.rs-course-filter.active'
        );


    if (
        initialCourseFilter &&
        courseCards.length > 0
    ) {

        const initialFilter =
            initialCourseFilter.getAttribute(
                'data-filter'
            );


        courseCards.forEach(card => {

            const category =
                card.getAttribute(
                    'data-category'
                );


            if (
                initialFilter === 'all' ||
                category === initialFilter
            ) {

                card.style.display = '';

            } else {

                card.style.display = 'none';

            }

        });

    }


    // ==========================================
    // INITIALIZE SELECTED COURSE FROM STORAGE
    // ==========================================

    try {

        const savedCourseName =
            localStorage.getItem(
                'selectedCourseName'
            );

        const savedCourseId =
            localStorage.getItem(
                'selectedCourseId'
            );

        const savedCourseBoard =
            localStorage.getItem(
                'selectedCourseBoard'
            );


        if (savedCourseName) {

            currentlySelectedCourse = {

                id:
                    savedCourseId || '',

                name:
                    savedCourseName,

                board:
                    savedCourseBoard || '',

                card:
                    null

            };

        }

    } catch (error) {

        console.warn(
            'Could not restore selected course:',
            error
        );

    }


    // ==========================================
    // SCROLL SPY
    // ==========================================

    const sections =
        document.querySelectorAll(
            '.tab-content, .results-section'
        );

    const scrollNavLinks =
        document.querySelectorAll(
            '.nav-link'
        );

    window.addEventListener(
        'scroll',
        function () {

            let current = '';

            sections.forEach(section => {

                const sectionTop =
                    section.offsetTop;

                const sectionHeight =
                    section.clientHeight;

                if (
                    scrollY >=
                    sectionTop - 200
                ) {

                    current =
                        section.getAttribute(
                            'id'
                        );

                }

            });

            scrollNavLinks.forEach(link => {

                link.classList.remove(
                    'active'
                );

                if (
                    link.getAttribute(
                        'data-tab'
                    ) === current
                ) {

                    link.classList.add(
                        'active'
                    );

                }

            });

        }
    );

});