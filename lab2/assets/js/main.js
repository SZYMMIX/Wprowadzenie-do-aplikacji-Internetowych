document.addEventListener('DOMContentLoaded', () => {

    const preloadImages = (imageUrls) => {
        imageUrls.forEach(url => {
            const img = new Image();
            img.src = url;
        });
    };

    const chronicleBackgrounds = [
        'assets/images/chronicle/chronicle-foundation-background.png',
        'assets/images/chronicle/chronicle-wars-background.png',
        'assets/images/chronicle/chronicle-redsky-background.png',
        'assets/images/chronicle/chronicle-modern-background.png'
    ];

    const gangImages = [
        'assets/images/archive/gangs/gang-6th-street.png',
        'assets/images/archive/gangs/gang-maelstrom.png',
        'assets/images/archive/gangs/gang-tyger-claws.png',
        'assets/images/archive/gangs/gang-valentinos.png',
        'assets/images/archive/gangs/gang-voodoo-boys.png'
    ];

    const districtImages = [
        'assets/images/archive/districts/watson-main.png',
        'assets/images/archive/districts/westbrook-main.png',
        'assets/images/archive/districts/city-center-main.png',
        'assets/images/archive/districts/pacifica-main.png'
    ];

    preloadImages([...chronicleBackgrounds, ...gangImages, ...districtImages]);


    const counterElement = document.querySelector('.death-counter .count');

    if (counterElement) {

        const STORAGE_KEY = 'cyber_death_count';
        const STARTING_DEATHS = 30;
        const formatCount = (num) => num.toString().padStart(4, '0');

        let savedCount = sessionStorage.getItem(STORAGE_KEY);
        let currentVal;

        if (savedCount) {
            currentVal = parseInt(savedCount, 10);
        } else {
            currentVal = STARTING_DEATHS;
        }

        counterElement.innerText = formatCount(currentVal);

        const updateCounter = () => {
            const increment = Math.floor(Math.random() * 4) + 1;
            
            currentVal += increment;

            counterElement.innerText = formatCount(currentVal);

            sessionStorage.setItem(STORAGE_KEY, currentVal);

            const nextUpdateIn = Math.floor(Math.random() * 4000) + 3000;
            setTimeout(updateCounter, nextUpdateIn);
        };

       
        setTimeout(updateCounter, 4000);
    }

    const moonContainer = document.querySelector('.moon-scroll-container');
    
    const textTogether = document.querySelector('.scene-together .moon-text');
    const imgTogether = document.querySelector('.scene-together .moon-visual');
    
    const textAlone = document.querySelector('.scene-alone .moon-text');
    const imgAlone = document.querySelector('.scene-alone .moon-visual');

    if (moonContainer && textTogether && imgTogether && textAlone && imgAlone) {
        window.addEventListener('scroll', () => {
            const containerTop = moonContainer.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            const scrollDistance = moonContainer.offsetHeight - windowHeight;

            let progress = (containerTop * -1) / scrollDistance;

            if (progress < 0) progress = 0;
            if (progress > 1) progress = 1;

            imgTogether.style.opacity = 1 - progress;
            imgAlone.style.opacity = progress;

            let textOp1 = 1 - (progress * 2.2);
            
            let textOp2 = (progress - 0.55) * 2.2;

            textTogether.style.opacity = Math.max(0, Math.min(1, textOp1));
            textAlone.style.opacity    = Math.max(0, Math.min(1, textOp2));
        });
    }

    const jobsDatabase = {
        streetkid: [
            {
                title: "Smuggle Run: Badlands",
                desc: "Transport unverified bio-goods across the border. Avoid border patrol drones. Fast driver needed. Dust storms expected.",
                reward: "3,000 €$"
            },
            {
                title: "Liquor Store Hit",
                desc: "6th Street gang is hoarding supplies. Hit their stash in Arroyo. Grab the cash, leave the booze. Don't kill unless necessary.",
                reward: "1,500 €$"
            },
            {
                title: "Cyber-psycho Bait",
                desc: "We need a distraction while MAX-TAC sets up. You run, he chases. Try not to die. High risk, high reward.",
                reward: "10,000 €$"
            }
        ],
        corpo: [
            {
                title: "Data Extraction: Militech",
                desc: "Infiltrate a subnet in the Downtown branch. Extract project 'Cynosure' files without triggering ICE. Stealth is mandatory.",
                reward: "25,000 €$"
            },
            {
                title: "Asset Liquidation",
                desc: "A junior executive is leaking secrets. Silence him permanently. Make it look like an accident. Clean hands only.",
                reward: "15,000 €$"
            },
            {
                title: "Industrial Espionage",
                desc: "Plant a listening device in the Biotechnica boardroom. No witnesses. You will be disavowed if caught.",
                reward: "8,000 €$"
            }
        ]
    };

    const gangsData = [
    {
        name: "6th Street",
        image: "./assets/images/archive/gangs/gang-6th-street.png", 
        territory: "Santo Domingo, Arroyo",
        threat: "High",
        desc: "Self-proclaimed patriots, heavily armed bullies in practice. They run Santo Domingo with an iron fist and a loaded rifle. Founded by veterans to protect the neighborhood, now just another gang extortion racket."
    },
    {
        name: "Maelstrom",
        image: "./assets/images/archive/gangs/gang-maelstrom.png",
        territory: "Watson, Northside",
        threat: "Extreme",
        desc: "Cyber-psychos obsessed with body modification. They reject humanity in favor of chrome. Unpredictable, violent, and heavily augmented. Engaging them without heavy firepower is suicide."
    },
    {
        name: "Tyger Claws",
        image: "./assets/images/archive/gangs/gang-tyger-claws.png",
        territory: "Westbrook, Japantown",
        threat: "Medium-High",
        desc: "Ruthless protectors of the Japanese community backed by Arasaka. They favor katanas, motorcycles, and glowing tattoos. They control the pleasure districts and gambling dens."
    },
    {
        name: "Valentinos",
        image: "./assets/images/archive/gangs/gang-valentinos.png",
        territory: "Heywood",
        threat: "Medium",
        desc: "One of Night City's largest gangs. Bound by a strict moral code and centuries-old traditions. They are devoted to Santa Muerte and seducing the most beautiful women in the city."
    },
    {
        name: "Voodoo Boys",
        image: "./assets/images/archive/gangs/gang-voodoo-boys.png",
        territory: "Pacifica",
        threat: "Unknown",
        desc: "Expert netrunners devoted to uncovering the secrets of the Old Net and the Blackwall. They operate in the shadows of Pacifica and view the physical world as secondary to the digital one."
    }
    ];

    const districtsData = [
        {
            name: "Watson",
            mainImage: "assets/images/archive/districts/watson-main.png",
            desc: "A district of broken dreams and second chances. Once a corporate paradise, now a melting pot of cultures, black markets, and gangs reclaiming the fallen giant.",
            gallery: [
                "assets/images/archive/districts/watson-grid-1.png",
                "assets/images/archive/districts/watson-grid-2.png",
                "assets/images/archive/districts/watson-grid-3.png",
                "assets/images/archive/districts/watson-grid-4.png"
            ]
        },
        {
            name: "Westbrook",
            mainImage: "assets/images/archive/districts/westbrook-main.png",
            desc: "The playground for the wealthy. Japantown offers endless entertainment by night, while North Oak houses the elite in their secure mansions.",
            gallery: [
                "assets/images/archive/districts/westbrook-grid-1.png",
                "assets/images/archive/districts/westbrook-grid-2.png",
                "assets/images/archive/districts/westbrook-grid-3.png",
                "assets/images/archive/districts/westbrook-grid-4.png"
            ]
        },
        {
            name: "City Center",
            mainImage: "assets/images/archive/districts/cc-main.png",
            desc: "The corporate heart of Night City. Sleek skyscrapers, neon billboards, and the heavy presence of NCPD. This is where the rich play and the powerful rule.",
            gallery: [
                "assets/images/archive/districts/cc-grid-1.png",
                "assets/images/archive/districts/cc-grid-2.png",
                "assets/images/archive/districts/cc-grid-3.png",
                "assets/images/archive/districts/cc-grid-4.png"
            ]
        },
        {
            name: "Pacifica",
            mainImage: "assets/images/archive/districts/pacifica-main.png",
            desc: "A failed resort district abandoned by corporations. Now a lawless combat zone run by the Voodoo Boys. The NCPD doesn't go there. Enter at your own risk.",
            gallery: [
                "assets/images/archive/districts/pacifica-grid-1.png",
                "assets/images/archive/districts/pacifica-grid-2.png",
                "assets/images/archive/districts/pacifica-grid-3.png",
                "assets/images/archive/districts/pacifica-grid-4.png"
            ]
        }
    ];

    let currentPath = ''; 
    let currentJobIndex = 0;

    const viewSelection = document.getElementById('view-selection');
    const viewJobBoard = document.getElementById('view-job-board');
    const viewApplication = document.getElementById('view-application');
    
    const jobTitle = document.getElementById('job-title');
    const jobDesc = document.getElementById('job-desc');
    const jobReward = document.getElementById('job-reward');
    if (viewSelection) {
        function switchView(viewToShow) {
            viewSelection.classList.add('hidden');
            viewJobBoard.classList.add('hidden');
            viewApplication.classList.add('hidden');

            viewToShow.classList.remove('hidden');
            window.scrollTo(0, 0);
        }

        function loadJobData() {
            const jobList = jobsDatabase[currentPath];
            const job = jobList[currentJobIndex];

            jobTitle.textContent = job.title;
            jobDesc.textContent = job.desc;
            jobReward.textContent = "REWARD: " + job.reward;
        }

        const pathButtons = document.querySelectorAll('.path-btn');
        pathButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                currentPath = e.target.getAttribute('data-path');
                const boardHeader = viewJobBoard.querySelector('.board-title');
        
                if (currentPath === 'corpo') {
                    boardHeader.textContent = "CORPORATE DIRECTIVES";
                    boardHeader.style.color = "#ff0000"; 
                } else {
                    boardHeader.textContent = "FIXER'S JOB BOARD";
                    boardHeader.style.color = "#fff"; 
        }
                currentJobIndex = 0;
                
                loadJobData();
                switchView(viewJobBoard); 
            });
        });

        const nextBtn = document.getElementById('next-job');
        const prevBtn = document.getElementById('prev-job');

        if(nextBtn && prevBtn) {
            nextBtn.addEventListener('click', () => {
                const max = jobsDatabase[currentPath].length - 1;
                currentJobIndex++;
                if (currentJobIndex > max) currentJobIndex = 0;
                loadJobData();
            });

            prevBtn.addEventListener('click', () => {
                const max = jobsDatabase[currentPath].length - 1;
                currentJobIndex--;
                if (currentJobIndex < 0) currentJobIndex = max;
                loadJobData();
            });
        }

        const signupBtn = document.getElementById('signup-btn');
        if(signupBtn) {
            signupBtn.addEventListener('click', () => {
                const currentTitle = jobsDatabase[currentPath][currentJobIndex].title;
                document.getElementById('form-job-title').textContent = currentTitle;
                
                switchView(viewApplication);
            });
        }

        const backFromBoard = viewJobBoard.querySelector('.back-tab');
        
        if(backFromBoard) {
            backFromBoard.addEventListener('click', () => {
                switchView(viewSelection);
            });
        }

        const backFromForm = viewApplication.querySelector('.back-arrow');
        if(backFromForm) {
            backFromForm.addEventListener('click', () => {
                switchView(viewJobBoard);
            });
        }

        const form = document.getElementById('faction-form');
        const idInput = document.getElementById('netrunner-id');
        const errorMsg = document.getElementById('id-error');

        if(form) {
            idInput.addEventListener('input', () => {
                idInput.classList.remove('input-error');
                errorMsg.style.display = 'none';
            });

            form.addEventListener('submit', (e) => {
                e.preventDefault();

                const emailValue = idInput.value.trim(); 
                let specificError = ""; 
                
                if (emailValue === "") {
                    specificError = "NULL_INPUT: ID required.";
                
                } else if (!emailValue.includes('@')) {
                    specificError = "SYNTAX_ERROR: Missing '@' separator.";
                
                } else {
                    const parts = emailValue.split('@');
                    const user = parts[0];
                    const domain = parts[1];

                    if (user.length === 0) {
                        specificError = "INVALID_USER: Username missing.";
                    
                    } else if (!domain.includes('.')) {
                        specificError = "NETWORK_ERROR: Invalid host/domain.";
                    
                    } else if (domain.split('.')[1].length < 2) {
                        specificError = "PROTOCOL_ERR: Domain extension too short.";
                    }
                }
                
                if (specificError !== "") {
                    idInput.classList.add('input-error');
                    errorMsg.textContent = specificError; 
                    errorMsg.style.display = 'block';
                    
                } else {
                    alert("CREDENTIALS VERIFIED. DATA UPLOADED TO THE NET.");
                    form.reset();
                    
                    idInput.classList.remove('input-error');
                    errorMsg.style.display = 'none';
                    
                    switchView(viewSelection);
                }
            });
        }
    }
    const carouselContainer = document.querySelector('.gang-carousel');
    if (carouselContainer) {
        const prevGangBtn = document.getElementById('prev-gang');
        const nextGangBtn = document.getElementById('next-gang');
        
        const headerName = document.getElementById('gang-name-header');
        const cardTitle = document.getElementById('gang-card-title');
        const territorySpan = document.getElementById('gang-territory');
        const threatSpan = document.getElementById('gang-threat');
        const descP = document.getElementById('gang-desc');

        let currentGangIndex = 0;

        function initGangCarousel() {
            if (!carouselContainer) return;

            carouselContainer.innerHTML = ''; 

            gangsData.forEach((gang, index) => {
                const slide = document.createElement('div');
                slide.classList.add('gang-slide');
                
                const img = document.createElement('img');
                img.src = gang.image;
                img.alt = gang.name;

                slide.appendChild(img);
                carouselContainer.appendChild(slide);
            });

            updateGangView(); 
        }

        function updateGangView() {
            if (!carouselContainer) return;

            const slides = document.querySelectorAll('.gang-slide');
            const total = slides.length;
            const prevIndex = (currentGangIndex - 1 + total) % total;
            const nextIndex = (currentGangIndex + 1) % total;

            slides.forEach((slide, index) => {
                slide.className = 'gang-slide'; 

                if (index === currentGangIndex) {
                    slide.classList.add('active');
                } else if (index === prevIndex) {
                    slide.classList.add('prev');
                } else if (index === nextIndex) {
                    slide.classList.add('next');
                } else {
                    slide.classList.add('hidden');
                }
            });

            const currentGang = gangsData[currentGangIndex];

            const infoCard = document.querySelector('.gang-info-card');
            
            if(infoCard) {
                if(headerName) headerName.textContent = currentGang.name;
                if(cardTitle) cardTitle.textContent = currentGang.name.toUpperCase();
                if(territorySpan) territorySpan.textContent = currentGang.territory;
                if(threatSpan) threatSpan.textContent = currentGang.threat;
                if(descP) descP.textContent = currentGang.desc;
            }
        }

        if (prevGangBtn && nextGangBtn) {
            initGangCarousel(); 

            prevGangBtn.addEventListener('click', () => {
                currentGangIndex--;
                if (currentGangIndex < 0) currentGangIndex = gangsData.length - 1;
                updateGangView();
            });

            nextGangBtn.addEventListener('click', () => {
                currentGangIndex++;
                if (currentGangIndex >= gangsData.length) currentGangIndex = 0;
                updateGangView();
            });
        }


        const prevDistBtn = document.getElementById('prev-district');
        const nextDistBtn = document.getElementById('next-district');
        
        const distName = document.getElementById('district-name');
        const distMainImg = document.getElementById('district-main-img');
        const distDesc = document.getElementById('district-desc');
        
        let currentDistIndex = 0;

        function updateDistrictView() {
            const data = districtsData[currentDistIndex];

            if(distName) distName.textContent = data.name.toUpperCase();
            if(distMainImg) distMainImg.src = data.mainImage;
            if(distDesc) distDesc.textContent = data.desc;

            data.gallery.forEach((imgSrc, index) => {
                const imgElement = document.getElementById(`dist-img-${index}`);
                if(imgElement) {
                    imgElement.src = imgSrc;
                }
            });
        }

        if(prevDistBtn && nextDistBtn) {
            updateDistrictView();

            prevDistBtn.addEventListener('click', () => {
                currentDistIndex--;
                if(currentDistIndex < 0) currentDistIndex = districtsData.length - 1;
                updateDistrictView();
            });

            nextDistBtn.addEventListener('click', () => {
                currentDistIndex++;
                if(currentDistIndex >= districtsData.length) currentDistIndex = 0;
                updateDistrictView();
            });
        }
    }

    const timelineContainer = document.querySelector('.timeline-container');

    if (timelineContainer) {
        console.log("Initializing Chronicle Logic...");

        const eras = document.querySelectorAll('.era-section');
        const glitchLayer = document.getElementById('glitch-overlay');
        let currentTheme = '';

        const eraObserverOptions = {
            threshold: 0,
            rootMargin: "-50% 0px -50% 0px" 
        };

        const eraObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const newTheme = entry.target.getAttribute('data-theme');
                    
                    if (newTheme !== currentTheme) {
                        document.body.className = `theme-${newTheme}`;
                        
                        if (glitchLayer) {
                            glitchLayer.classList.remove('glitch-active');
                            void glitchLayer.offsetWidth; 
                            glitchLayer.classList.add('glitch-active');
                        }

                        currentTheme = newTheme;
                    }
                }
            });
        }, eraObserverOptions);

        eras.forEach(era => eraObserver.observe(era));

        const events = document.querySelectorAll('.timeline-event');

        const eventObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                } else {
                    entry.target.classList.remove('visible'); 
                }
            });
        }, { threshold: 0.5 }); 

        events.forEach(event => eventObserver.observe(event));
    }
});