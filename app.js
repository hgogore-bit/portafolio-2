document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const menuToggle = document.getElementById('menu-toggle-btn');
    const mainNavigation = document.getElementById('main-navigation');
    
    if (menuToggle && mainNavigation) {
        menuToggle.addEventListener('click', () => {
            mainNavigation.classList.toggle('active');
            menuToggle.classList.toggle('active');
            
            // Transform toggle bars into an X
            const bars = menuToggle.querySelectorAll('.bar');
            if (menuToggle.classList.contains('active')) {
                bars[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
                bars[1].style.opacity = '0';
                bars[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
            } else {
                bars[0].style.transform = 'none';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'none';
            }
        });
        
        // Close menu when clicking a link
        const navLinks = mainNavigation.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mainNavigation.classList.remove('active');
                menuToggle.classList.remove('active');
                const bars = menuToggle.querySelectorAll('.bar');
                bars[0].style.transform = 'none';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'none';
            });
        });
    }

    // 2. Header Style on Scroll
    const header = document.getElementById('main-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.padding = '0.4rem 0';
            header.style.backgroundColor = 'rgba(9, 10, 13, 0.95)';
            header.style.boxShadow = '0 10px 30px -10px rgba(0, 0, 0, 0.6)';
        } else {
            header.style.padding = '0.8rem 0';
            header.style.backgroundColor = 'transparent';
            header.style.boxShadow = 'none';
        }
    });

    // 3. Contact Form Submission Logic (Bilingual-aware)
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const submitBtn = document.getElementById('form-submit-btn');
            const originalText = submitBtn.textContent;
            
            const sendingText = currentLanguage === 'es' ? 'Enviando...' : 'Sending...';
            const sentText = currentLanguage === 'es' ? '¡Mensaje Enviado!' : 'Message Sent!';
            
            submitBtn.textContent = sendingText;
            submitBtn.disabled = true;
            
            setTimeout(() => {
                submitBtn.textContent = sentText;
                submitBtn.style.backgroundColor = 'var(--clr-accent)';
                contactForm.reset();
                
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.style.backgroundColor = '';
                    submitBtn.disabled = false;
                }, 3000);
            }, 1500);
        });
    }

    // 4. Bookshelf Accordion Logic (loook.ai style) - Scoped per accordion
    const accordions = document.querySelectorAll('.bookshelf-accordion');
    
    accordions.forEach(accordion => {
        const bookCards = accordion.querySelectorAll('.book-card');
        
        bookCards.forEach(card => {
            const spine = card.querySelector('.book-spine');
            if (spine) {
                spine.addEventListener('click', () => {
                    if (!card.classList.contains('active')) {
                        const currentActive = accordion.querySelector('.book-card.active');
                        if (currentActive) {
                            currentActive.classList.remove('active');
                        }
                        card.classList.add('active');
                    }
                });
            }
        });
    });

    // Samsung Loop Video Controller
    const samsungVideo = document.querySelector('.samsung-loop-video');
    const samsungCard = document.querySelector('[data-book="digital-samsung"]');
    
    if (samsungVideo && samsungCard) {
        const playVideo = () => {
            samsungVideo.play().catch(err => {
                // Ignore autoplay block errors
            });
        };
        const pauseVideo = () => {
            samsungVideo.pause();
        };

        const updateSamsungVideoState = () => {
            if (samsungCard.classList.contains('active') || samsungCard.matches(':hover')) {
                playVideo();
            } else {
                pauseVideo();
            }
        };

        // Hover events
        samsungCard.addEventListener('mouseenter', () => {
            playVideo();
        });
        samsungCard.addEventListener('mouseleave', () => {
            // Only pause if the card is NOT active
            if (!samsungCard.classList.contains('active')) {
                pauseVideo();
            }
        });

        // Listen for changes from clicking spines inside its accordion
        const digitalAccordion = samsungCard.closest('.bookshelf-accordion');
        if (digitalAccordion) {
            const digitalSpines = digitalAccordion.querySelectorAll('.book-spine');
            digitalSpines.forEach(spine => {
                spine.addEventListener('click', () => {
                    // Slight timeout to let DOM updates finish
                    setTimeout(updateSamsungVideoState, 50);
                });
            });
        }
        
    }

    // Jafra Loop Video Controller (Supports both digital-jafra and motion-jafra)
    const jafraLoopVideos = document.querySelectorAll('.jafra-loop-video');
    jafraLoopVideos.forEach(video => {
        const card = video.closest('.book-card');
        if (card) {
            const playVideo = () => {
                video.play().catch(err => {});
            };
            const pauseVideo = () => {
                video.pause();
            };

            const updateVideoState = () => {
                if (card.classList.contains('active') || card.matches(':hover')) {
                    playVideo();
                } else {
                    pauseVideo();
                }
            };

            card.addEventListener('mouseenter', () => {
                playVideo();
            });
            card.addEventListener('mouseleave', () => {
                if (!card.classList.contains('active')) {
                    pauseVideo();
                }
            });

            const accordion = card.closest('.bookshelf-accordion');
            if (accordion) {
                const spines = accordion.querySelectorAll('.book-spine');
                spines.forEach(spine => {
                    spine.addEventListener('click', () => {
                        setTimeout(updateVideoState, 50);
                    });
                });
            }

            if (card.classList.contains('active')) {
                playVideo();
            }
        }
    });

    // Ya Ganaste Loop Video Controller (Supports both digital-yaganaste and motion-yaganaste)
    const yaganasteLoopVideos = document.querySelectorAll('.yaganaste-digital-loop-video, .yaganaste-motion-loop-video');
    yaganasteLoopVideos.forEach(video => {
        const card = video.closest('.book-card');
        if (card) {
            const playVideo = () => {
                video.play().catch(err => {});
            };
            const pauseVideo = () => {
                video.pause();
            };

            const updateVideoState = () => {
                if (card.classList.contains('active') || card.matches(':hover')) {
                    playVideo();
                } else {
                    pauseVideo();
                }
            };

            card.addEventListener('mouseenter', () => {
                playVideo();
            });
            card.addEventListener('mouseleave', () => {
                if (!card.classList.contains('active')) {
                    pauseVideo();
                }
            });

            const accordion = card.closest('.bookshelf-accordion');
            if (accordion) {
                const spines = accordion.querySelectorAll('.book-spine');
                spines.forEach(spine => {
                    spine.addEventListener('click', () => {
                        setTimeout(updateVideoState, 50);
                    });
                });
            }

            if (card.classList.contains('active')) {
                playVideo();
            }
        }
    });

    // AI Art Loop Video Controller
    const aiLoopVideos = document.querySelectorAll('.ai-loop-video');
    aiLoopVideos.forEach(video => {
        const card = video.closest('.book-card');
        if (card) {
            const playVideo = () => {
                video.play().catch(err => {});
            };
            const pauseVideo = () => {
                video.pause();
            };

            const updateVideoState = () => {
                if (card.classList.contains('active') || card.matches(':hover')) {
                    playVideo();
                } else {
                    pauseVideo();
                }
            };

            card.addEventListener('mouseenter', () => {
                playVideo();
            });
            card.addEventListener('mouseleave', () => {
                if (!card.classList.contains('active')) {
                    pauseVideo();
                }
            });

            const accordion = card.closest('.bookshelf-accordion');
            if (accordion) {
                const spines = accordion.querySelectorAll('.book-spine');
                spines.forEach(spine => {
                    spine.addEventListener('click', () => {
                        setTimeout(updateVideoState, 50);
                    });
                });
            }

            if (card.classList.contains('active')) {
                playVideo();
            }
        }
    });

    // Bimbo Loop Video Controller
    const bimboLoopVideos = document.querySelectorAll('.bimbo-loop-video');
    bimboLoopVideos.forEach(video => {
        const card = video.closest('.book-card');
        if (card) {
            const playVideo = () => {
                video.play().catch(err => {});
            };
            const pauseVideo = () => {
                video.pause();
            };

            const updateVideoState = () => {
                if (card.classList.contains('active') || card.matches(':hover')) {
                    playVideo();
                } else {
                    pauseVideo();
                }
            };

            card.addEventListener('mouseenter', () => {
                playVideo();
            });
            card.addEventListener('mouseleave', () => {
                if (!card.classList.contains('active')) {
                    pauseVideo();
                }
            });

            const accordion = card.closest('.bookshelf-accordion');
            if (accordion) {
                const spines = accordion.querySelectorAll('.book-spine');
                spines.forEach(spine => {
                    spine.addEventListener('click', () => {
                        setTimeout(updateVideoState, 50);
                    });
                });
            }

            if (card.classList.contains('active')) {
                playVideo();
            }
        }
    });

    // Xanadu Loop Video Controller
    const xanaduLoopVideos = document.querySelectorAll('.xanadu-loop-video');
    xanaduLoopVideos.forEach(video => {
        const card = video.closest('.book-card');
        if (card) {
            const playVideo = () => {
                video.play().catch(err => {});
            };
            const pauseVideo = () => {
                video.pause();
            };

            const updateVideoState = () => {
                if (card.classList.contains('active') || card.matches(':hover')) {
                    playVideo();
                } else {
                    pauseVideo();
                }
            };

            card.addEventListener('mouseenter', () => {
                playVideo();
            });
            card.addEventListener('mouseleave', () => {
                if (!card.classList.contains('active')) {
                    pauseVideo();
                }
            });

            const accordion = card.closest('.bookshelf-accordion');
            if (accordion) {
                const spines = accordion.querySelectorAll('.book-spine');
                spines.forEach(spine => {
                    spine.addEventListener('click', () => {
                        setTimeout(updateVideoState, 50);
                    });
                });
            }

            if (card.classList.contains('active')) {
                playVideo();
            }
        }
    });

    // Personal Video Loop Controller
    const personalVideoLoopVideos = document.querySelectorAll('.personal-video-loop');
    personalVideoLoopVideos.forEach(video => {
        const card = video.closest('.book-card');
        if (card) {
            const playVideo = () => {
                video.play().catch(err => {});
            };
            const pauseVideo = () => {
                video.pause();
            };

            const updateVideoState = () => {
                if (card.classList.contains('active') || card.matches(':hover')) {
                    playVideo();
                } else {
                    pauseVideo();
                }
            };

            card.addEventListener('mouseenter', () => {
                playVideo();
            });
            card.addEventListener('mouseleave', () => {
                if (!card.classList.contains('active')) {
                    pauseVideo();
                }
            });

            const accordion = card.closest('.bookshelf-accordion');
            if (accordion) {
                const spines = accordion.querySelectorAll('.book-spine');
                spines.forEach(spine => {
                    spine.addEventListener('click', () => {
                        setTimeout(updateVideoState, 50);
                    });
                });
            }

            if (card.classList.contains('active')) {
                playVideo();
            }
        }
    });

    // 5. Smooth Scroll for Header Navigation Links
    const headerNavLinks = document.querySelectorAll('.header-nav-link');
    headerNavLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            
            if (targetId && targetId.startsWith('#') && targetId !== '#') {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const headerOffset = 80;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.scrollY - headerOffset;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // 6. i18n Translations Dictionary
    const translations = {
        es: {
            "nav-home": "Inicio",
            "nav-reel": "Reel",
            "nav-about": "Sobre Mí",
            "nav-portfolio": "Portafolio",
            "nav-personal": "Trabajo Personal",
            "nav-contact": "Contacto",
            "logo-text": "H G O <span class=\"logo-subtitle\">| Director de Arte & Animador Digital.</span>",
            "reel-title": "\\\\ REEL CREATIVO //",
            "reel-heading": "HGO Creative Reel — Art Direction, Motion & AI",
            "reel-desc": "Un reel creativo personal que combina dirección de arte, diseño de movimiento, narrativa, producción y experimentación con IA.",
            "about-title": "\\\\ SOBRE MÍ //",
            "about-p1": "Soy Hugo Garcia Ortega, Art Director & Senior Motion Designer con más de 9 años de experiencia creando campañas digitales, contenido visual y piezas multimedia para marcas en México y Latinoamérica.",
            "about-p2": "Mi trabajo combina dirección de arte, motion design, edición, producción audiovisual y flujos creativos con IA para convertir ideas en contenido visual de alto nivel para social media, plataformas digitales, campañas y branded content.",
            "about-p3": "He liderado equipos creativos y colaborado con áreas de marketing, UX/UI y producto, conectando craft visual, storytelling, tecnología y objetivos de negocio.",
            "about-cv": "Descargar CV (PDF)",
            "about-skills-title": "Habilidades y Software",
            "skill-1": "Dirección de Arte",
            "skill-2": "Animación 2D / 3D",
            "skill-3": "After Effects & Premiere",
            "skill-4": "Photoshop & Illustrator",
            "skill-6": "IA Generativa (Runway, Midjourney)",
            "skill-7": "Producción Audiovisual",
            "skill-8": "Liderazgo de Equipos",
            
            "portfolio-title": "\\\\ PORTAFOLIO PROFESIONAL //",
            "portfolio-desc": "Haz clic en los lomos de los libros para expandir cada caso de estudio profesional.",
            "portfolio-cat-digital": "\\\\ DIGITAL CAMPAIGNS & SOCIAL CONTENT //",
            "portfolio-cat-motion": "\\\\ MOTION, VIDEO EDITING & POST PRODUCTION //",
            "portfolio-cat-personal": "\\\\ PHOTOGRAPHY & VISUAL PRODUCTION //",
            "personal-title": "\\\\ TRABAJO PERSONAL //",
            "personal-desc": "Fotografía, producción visual y experimentación creativa independiente.",

            // Samsung (Digital Campaigns)
            "spine-samsung-title": "SAMSUNG",
            "spine-samsung-cat": "CAMPAIGN",
            "book-samsung-media-tag": "ART DIRECTION & UX/UI",
            "book-samsung-title": "Samsung",
            "book-samsung-bullet-1": "Dirección de Arte y Animación Digital",
            "book-samsung-bullet-2": "Optimización UX/UI y Micro-animaciones",
            "book-samsung-gallery-btn": "Ver Galería de Proyectos",

            // Jafra (Digital Campaigns)
            "spine-jafra-title": "JAFRA",
            "spine-jafra-cat": "CAMPAIGN",
            "book-jafra-media-tag": "DIGITAL CAMPAIGNS",
            "book-jafra-title": "Jafra",
            "book-jafra-bullet-1": "Dirección de Arte Digital",
            "book-jafra-bullet-2": "Branding y Activación",
            "book-jafra-bullet-3": "Optimización de Conversión",
            "book-jafra-gallery-btn": "Ver Galería de Proyectos",

            // Ya Ganaste (Digital Campaigns)
            "spine-yaganaste-title": "YA GANASTE",
            "spine-yaganaste-cat": "CAMPAIGN",
            "book-yaganaste-media-tag": "FINTECH CAMPAIGNS",
            "book-yaganaste-title": "Ya Ganaste",
            "book-yaganaste-bullet-1": "Dirección de Arte",
            "book-yaganaste-bullet-2": "Adquisición B2B",
            "book-yaganaste-bullet-3": "Social Content",
            "book-yaganaste-gallery-btn": "Ver Galería de Proyectos",

            // Price Shoes (Digital Campaigns)
            "spine-priceshoes-title": "PRICE SHOES",
            "spine-priceshoes-cat": "CAMPAIGN",
            "book-priceshoes-media-tag": "RETAIL CAMPAIGNS",
            "book-priceshoes-title": "Price Shoes",
            "book-priceshoes-bullet-1": "Diseño de Catálogos Digitales",
            "book-priceshoes-bullet-2": "Social Media Motion",
            "book-priceshoes-bullet-3": "Dirección de Arte de Producto",

            // Xanadu Medic (Motion)
            "spine-xanadu-title": "XANADU MEDIC",
            "spine-xanadu-cat": "POST-PROD",
            "book-xanadu-media-tag": "MEDICAL ANIMATION & VIDEO",
            "book-xanadu-title": "Xanadu Medic",
            "book-xanadu-bullet-1": "Edición y Postproducción",
            "book-xanadu-bullet-2": "Motion Graphics Médico",
            "book-xanadu-bullet-3": "Diseño de Sonido y Color",
            "book-xanadu-gallery-btn": "Ver Galería de Proyectos",

            // ISA CUP (Motion)
            "spine-isacup-title": "ISA CUP",
            "spine-isacup-cat": "POST-PROD",
            "book-isacup-media-tag": "SPORTS EDITING & BRANDING",
            "book-isacup-title": "ISA Cup",
            "book-isacup-bullet-1": "Postproducción de Eventos",
            "book-isacup-bullet-2": "Motion Graphics en Pantalla",
            "book-isacup-bullet-3": "Dirección Audiovisual",
            "book-isacup-gallery-btn": "Ver Galería de Proyectos",

            // Bimbo (Motion)
            "spine-bimbo-title": "BIMBO",
            "spine-bimbo-cat": "POST-PROD",
            "book-bimbo-media-tag": "COMMERCIAL ANIMATION",
            "book-bimbo-title": "Bimbo",
            "book-bimbo-bullet-1": "Animación Comercial Digital",
            "book-bimbo-bullet-2": "Comunicación Corporativa",
            "book-bimbo-bullet-3": "Postproducción Audiovisual",
            "book-bimbo-gallery-btn": "Ver Galería de Proyectos",

            // Jafra (Motion)
            "spine-jafra-motion-title": "JAFRA",
            "spine-jafra-motion-cat": "POST-PROD",
            "book-jafra-motion-media-tag": "AUDIOVISUAL POST-PRODUCTION",
            "book-jafra-motion-title": "Jafra",
            "book-jafra-motion-bullet-1": "Edición de Comerciales",
            "book-jafra-motion-bullet-2": "Motion Graphics de Belleza",
            "book-jafra-motion-bullet-3": "Formatos Dinámicos",

            // Ya Ganaste (Motion)
            "spine-yaganaste-motion-title": "YA GANASTE",
            "spine-yaganaste-motion-cat": "POST-PROD",
            "book-yaganaste-motion-media-tag": "FINTECH VIDEO & MOTION",
            "book-yaganaste-motion-title": "Ya Ganaste",
            "book-yaganaste-motion-bullet-1": "Spots y Tutoriales",
            "book-yaganaste-motion-bullet-2": "Identidad en Movimiento",
            "book-yaganaste-motion-bullet-3": "Casos de Éxito",

            // MIDE (Personal)
            "spine-mide-title": "MIDE MUSEUMS",
            "spine-mide-cat": "VISUALS",
            "book-mide-media-tag": "INTERACTIVE INSTALLATIONS",
            "book-mide-title": "MIDE (Museos Interactivos)",
            "book-mide-bullet-1": "Diseño de Experiencias",
            "book-mide-bullet-2": "Modelado 3D de Entornos",
            "book-mide-bullet-3": "UX/UI Museográfico",

            // Personal & Outsourcing (Photos)
            "spine-personal-photo-title": "FOTOGRAFÍA",
            "spine-personal-photo-cat": "PHOTOS",
            "book-personal-photo-title": "Fotografía Personal",
            "book-personal-photo-bullet-1": "Fotografía Conceptual",
            "book-personal-photo-bullet-2": "Retrato Fine Art",
            "book-personal-photo-bullet-3": "Dirección de Arte",
            "book-personal-photo-gallery-btn": "Ver Galería de Fotos",

            // Personal & Outsourcing (Videos)
            "spine-personal-video-title": "VIDEOS",
            "spine-personal-video-cat": "VIDEOS",
            "book-personal-video-title": "Video y Producción",
            "book-personal-video-bullet-1": "Cine Independiente",
            "book-personal-video-bullet-2": "Videos Musicales",
            "book-personal-video-bullet-3": "Edición y Documental",
            "book-personal-video-gallery-btn": "Ver Galería de Videos",

            // AR filters (Personal)
            "spine-ar-title": "AUGMENTED REALITY",
            "spine-ar-cat": "VISUALS",
            "book-ar-media-tag": "SOCIAL AR FILTERS",
            "book-ar-title": "Filtros de Realidad Aumentada",
            "book-ar-bullet-1": "Creación de Filtros Sociales",
            "book-ar-bullet-2": "Optimización 3D",
            "book-ar-bullet-3": "Lógica de Interacción",

            // AI Art (Personal)
            "spine-ai-title": "GENERATIVE AI ART",
            "spine-ai-cat": "AI ART",
            "book-ai-media-tag": "GENERATIVE AI EXPERIMENTS",
            "book-ai-title": "Arte Generativo e IA",
            "book-ai-bullet-1": "Experimentación de IA",
            "book-ai-bullet-2": "Animación Híbrida",
            "book-ai-bullet-3": "Flujos Híbridos",

            "contact-title": "\\\\ CONTACTO //",
            "contact-heading": "¿Hacemos algo increíble juntos?",
            "contact-desc": "Abierto a oportunidades como Director de Arte, Senior Motion Designer, Creative Producer y perfiles de contenido visual con IA.",
            "contact-location-label": "Ubicación:",
            "contact-location": "México, CDMX",
            "form-name-label": "Nombre",
            "form-name-ph": "Tu nombre",
            "form-email-label": "Correo Electrónico",
            "form-email-ph": "Tu correo electrónico",
            "form-message-label": "Mensaje",
            "form-message-ph": "¿En qué tipo de proyecto estás pensando?",
            "form-submit": "Enviar Mensaje",
            "footer-copy": "&copy; 2026 Hugo García Ortega (H G O). Todos los derechos reservados."
        },
        en: {
            "nav-home": "Home",
            "nav-reel": "Reel",
            "nav-about": "About Me",
            "nav-portfolio": "Portfolio",
            "nav-personal": "Personal Work",
            "nav-contact": "Contact",
            "logo-text": "H G O <span class=\"logo-subtitle\">| Art Director & Digital Animator.</span>",
            "reel-title": "\\\\ CREATIVE REEL //",
            "reel-heading": "HGO Creative Reel — Art Direction, Motion & AI",
            "reel-desc": "A personal creative reel combining art direction, motion design, storytelling, production and AI experimentation.",
            "about-title": "\\\\ ABOUT ME //",
            "about-p1": "I am Hugo Garcia Ortega, Art Director & Senior Motion Designer with over 9 years of experience creating digital campaigns, visual content, and multimedia pieces for brands in Mexico and Latin America.",
            "about-p2": "My work combines art direction, motion design, editing, audiovisual production, and creative AI workflows to transform ideas into high-level visual content for social media, digital platforms, campaigns, and branded content.",
            "about-p3": "I have led creative teams and collaborated with marketing, UX/UI, and product departments, connecting visual craft, storytelling, technology, and business objectives.",
            "about-cv": "Download CV (PDF)",
            "about-skills-title": "Skills & Software",
            "skill-1": "Art Direction",
            "skill-2": "2D / 3D Animation",
            "skill-3": "After Effects & Premiere",
            "skill-4": "Photoshop & Illustrator",
            "skill-6": "Generative AI (Runway, Midjourney)",
            "skill-7": "Audiovisual Production",
            "skill-8": "Team Leadership",
            
            "portfolio-title": "\\\\ PROFESSIONAL PORTFOLIO //",
            "portfolio-desc": "Click on the book spines to expand each professional case study.",
            "portfolio-cat-digital": "\\\\ DIGITAL CAMPAIGNS & SOCIAL CONTENT //",
            "portfolio-cat-motion": "\\\\ MOTION, VIDEO EDITING & POST PRODUCTION //",
            "portfolio-cat-personal": "\\\\ PHOTOGRAPHY & VISUAL PRODUCTION //",
            "personal-title": "\\\\ PERSONAL WORK //",
            "personal-desc": "Photography, visual production and independent creative experimentation.",

            // Samsung (Digital Campaigns)
            "spine-samsung-title": "SAMSUNG",
            "spine-samsung-cat": "CAMPAIGN",
            "book-samsung-media-tag": "ART DIRECTION & UX/UI",
            "book-samsung-title": "Samsung",
            "book-samsung-bullet-1": "Art Direction & Digital Animation",
            "book-samsung-bullet-2": "UX/UI & Micro-animations",
            "book-samsung-gallery-btn": "View Projects Gallery",

            // Jafra (Digital Campaigns)
            "spine-jafra-title": "JAFRA",
            "spine-jafra-cat": "CAMPAIGN",
            "book-jafra-media-tag": "DIGITAL CAMPAIGNS",
            "book-jafra-title": "Jafra",
            "book-jafra-bullet-1": "Digital Art Direction",
            "book-jafra-bullet-2": "Branding & Activation",
            "book-jafra-bullet-3": "Conversion Optimization",
            "book-jafra-gallery-btn": "View Projects Gallery",

            // Ya Ganaste (Digital Campaigns)
            "spine-yaganaste-title": "YA GANASTE",
            "spine-yaganaste-cat": "CAMPAIGN",
            "book-yaganaste-media-tag": "FINTECH CAMPAIGNS",
            "book-yaganaste-title": "Ya Ganaste",
            "book-yaganaste-bullet-1": "Art Direction",
            "book-yaganaste-bullet-2": "B2B Acquisition",
            "book-yaganaste-bullet-3": "Social Content",
            "book-yaganaste-gallery-btn": "View Projects Gallery",

            // Price Shoes (Digital Campaigns)
            "spine-priceshoes-title": "PRICE SHOES",
            "spine-priceshoes-cat": "CAMPAIGN",
            "book-priceshoes-media-tag": "RETAIL CAMPAIGNS",
            "book-priceshoes-title": "Price Shoes",
            "book-priceshoes-bullet-1": "Digital Catalog Design",
            "book-priceshoes-bullet-2": "Social Media Motion",
            "book-priceshoes-bullet-3": "Product Art Direction",

            // Xanadu Medic (Motion)
            "spine-xanadu-title": "XANADU MEDIC",
            "spine-xanadu-cat": "POST-PROD",
            "book-xanadu-media-tag": "MEDICAL ANIMATION & VIDEO",
            "book-xanadu-title": "Xanadu Medic",
            "book-xanadu-bullet-1": "Editing & Post-production",
            "book-xanadu-bullet-2": "Medical Motion Graphics",
            "book-xanadu-bullet-3": "Sound & Color Design",
            "book-xanadu-gallery-btn": "View Projects Gallery",

            // ISA CUP (Motion)
            "spine-isacup-title": "ISA CUP",
            "spine-isacup-cat": "POST-PROD",
            "book-isacup-media-tag": "SPORTS EDITING & BRANDING",
            "book-isacup-title": "ISA Cup",
            "book-isacup-bullet-1": "Event Post-production",
            "book-isacup-bullet-2": "On-screen Motion Graphics",
            "book-isacup-bullet-3": "Audiovisual Direction",
            "book-isacup-gallery-btn": "View Projects Gallery",

            // Bimbo (Motion)
            "spine-bimbo-title": "BIMBO",
            "spine-bimbo-cat": "POST-PROD",
            "book-bimbo-media-tag": "COMMERCIAL ANIMATION",
            "book-bimbo-title": "Bimbo",
            "book-bimbo-bullet-1": "Digital Commercial Animation",
            "book-bimbo-bullet-2": "Corporate Communication",
            "book-bimbo-bullet-3": "Audiovisual Post-production",
            "book-bimbo-gallery-btn": "View Projects Gallery",

            // Jafra (Motion)
            "spine-jafra-motion-title": "JAFRA",
            "spine-jafra-motion-cat": "POST-PROD",
            "book-jafra-motion-media-tag": "AUDIOVISUAL POST-PRODUCTION",
            "book-jafra-motion-title": "Jafra",
            "book-jafra-motion-bullet-1": "Commercial Editing",
            "book-jafra-motion-bullet-2": "Beauty Motion Graphics",
            "book-jafra-motion-bullet-3": "Dynamic Formats",

            // Ya Ganaste (Motion)
            "spine-yaganaste-motion-title": "YA GANASTE",
            "spine-yaganaste-motion-cat": "POST-PROD",
            "book-yaganaste-motion-media-tag": "FINTECH VIDEO & MOTION",
            "book-yaganaste-motion-title": "Ya Ganaste",
            "book-yaganaste-motion-bullet-1": "Spots & Tutorials",
            "book-yaganaste-motion-bullet-2": "Identity in Motion",
            "book-yaganaste-motion-bullet-3": "Success Stories",

            // MIDE (Personal)
            "spine-mide-title": "MIDE MUSEUMS",
            "spine-mide-cat": "VISUALS",
            "book-mide-media-tag": "INTERACTIVE INSTALLATIONS",
            "book-mide-title": "MIDE (Interactive Museums)",
            "book-mide-bullet-1": "Experience Design",
            "book-mide-bullet-2": "3D Environment Modeling",
            "book-mide-bullet-3": "Museum UX/UI",

            // Personal & Outsourcing (Photos)
            "spine-personal-photo-title": "PHOTOS",
            "spine-personal-photo-cat": "PHOTOS",
            "book-personal-photo-title": "Personal Photography",
            "book-personal-photo-bullet-1": "Conceptual Photography",
            "book-personal-photo-bullet-2": "Fine Art Portraits",
            "book-personal-photo-bullet-3": "Art Direction",
            "book-personal-photo-gallery-btn": "View Photos Gallery",

            // Personal & Outsourcing (Videos)
            "spine-personal-video-title": "VIDEOS",
            "spine-personal-video-cat": "VIDEOS",
            "book-personal-video-title": "Video & Production",
            "book-personal-video-bullet-1": "Independent Film",
            "book-personal-video-bullet-2": "Music Videos",
            "book-personal-video-bullet-3": "Editing & Documentary",
            "book-personal-video-gallery-btn": "View Videos Gallery",

            // AR filters (Personal)
            "spine-ar-title": "AUGMENTED REALITY",
            "spine-ar-cat": "VISUALS",
            "book-ar-media-tag": "SOCIAL AR FILTERS",
            "book-ar-title": "Augmented Reality Filters",
            "book-ar-bullet-1": "Social Filter Creation",
            "book-ar-bullet-2": "3D Optimization",
            "book-ar-bullet-3": "Interaction Logic",

            // AI Art (Personal)
            "spine-ai-title": "GENERATIVE AI ART",
            "spine-ai-cat": "AI ART",
            "book-ai-media-tag": "GENERATIVE AI EXPERIMENTS",
            "book-ai-title": "Generative AI Art",
            "book-ai-bullet-1": "AI Experimentation",
            "book-ai-bullet-2": "Hybrid Animation",
            "book-ai-bullet-3": "Hybrid Workflows",

            "contact-title": "\\\\ CONTACT //",
            "contact-heading": "Should we make something amazing together?",
            "contact-desc": "Open to opportunities as an Art Director, Senior Motion Designer, Creative Producer, and visual content profiles with AI.",
            "contact-location-label": "Location:",
            "contact-location": "Mexico City, Mexico",
            "form-name-label": "Name",
            "form-name-ph": "Your name",
            "form-email-label": "Email Address",
            "form-email-ph": "Your email address",
            "form-message-label": "Message",
            "form-message-ph": "What type of project are you thinking of?",
            "form-submit": "Send Message",
            "footer-copy": "&copy; 2026 Hugo García Ortega (H G O). All rights reserved."
        }
    };

    // 7. i18n Language Toggle Logic
    let currentLanguage = localStorage.getItem('portfolio-lang') || 'es';
    const langBtn = document.getElementById('language-toggle-btn');
    
    if (langBtn) {
        langBtn.addEventListener('click', () => {
            currentLanguage = currentLanguage === 'es' ? 'en' : 'es';
            translatePage(currentLanguage);
        });
    }

    function translatePage(lang) {
        localStorage.setItem('portfolio-lang', lang);
        // Translate text elements with [data-i18n]
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[lang] && translations[lang][key]) {
                // Check if element is input or textarea
                if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                    el.placeholder = translations[lang][key];
                } else {
                    el.innerHTML = translations[lang][key];
                }
            }
        });
        
        // Update language switcher button text
        if (langBtn) {
            langBtn.textContent = lang === 'es' ? 'EN' : 'ES';
        }

        // Update HTML lang attribute
        document.documentElement.lang = lang;

        // Update video source based on language
        const video = document.querySelector('.reel-video');
        if (video) {
            const desiredSrc = lang === 'es' 
                ? 'https://dl.dropboxusercontent.com/scl/fi/km42ksbkhhepfxih7s39d/FInal_ES.mp4?rlkey=o2ftt7p2rhfgd7njcotehqlbl&st=ujj7ok6y&raw=1' 
                : 'https://dl.dropboxusercontent.com/scl/fi/20xf2zst21bnl09d1w8ne/DEMO_ENG.mp4?rlkey=eczuqvul582zrehc16lt930yj&st=1wgj94ag&raw=1';
            if (video.getAttribute('src') !== desiredSrc) {
                video.src = desiredSrc;
                video.load();
            }
        }
    }
    
    // Initial translation load to guarantee everything is synchronized
    translatePage(currentLanguage);
});
