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

    // 3. Contact Form Submission Logic (Bilingual-aware & Formspree integrated)
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const submitBtn = document.getElementById('form-submit-btn');
            const originalText = submitBtn.textContent;
            
            const formAction = contactForm.getAttribute('action');
            // Check if endpoint is not configured
            if (!formAction || formAction.includes('YOUR_FORMSPREE_ID_HERE')) {
                const warnMsg = currentLanguage === 'es' 
                    ? 'Por favor, configura tu ID de Formspree en index.html para que los mensajes te lleguen a tu correo.' 
                    : 'Please configure your Formspree ID in index.html so you can receive email messages.';
                alert(warnMsg);
                return;
            }
            
            const sendingText = currentLanguage === 'es' ? 'Enviando...' : 'Sending...';
            const sentText = currentLanguage === 'es' ? '¡Mensaje Enviado!' : 'Message Sent!';
            const errorText = currentLanguage === 'es' ? 'Error al enviar' : 'Error sending';
            
            submitBtn.textContent = sendingText;
            submitBtn.disabled = true;
            
            // Gather form data
            const data = {
                name: document.getElementById('form-name').value,
                email: document.getElementById('form-email').value,
                message: document.getElementById('form-message').value
            };
            
            fetch(formAction, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(response => {
                if (response.ok) {
                    submitBtn.textContent = sentText;
                    submitBtn.style.backgroundColor = 'var(--clr-accent)';
                    contactForm.reset();
                } else {
                    throw new Error('Formspree response error');
                }
            })
            .catch(error => {
                console.error('Submission error:', error);
                submitBtn.textContent = errorText;
                submitBtn.style.backgroundColor = '#b91c1c'; // visual error red
            })
            .finally(() => {
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.style.backgroundColor = '';
                    submitBtn.disabled = false;
                }, 3000);
            });
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
            "reel-title": "REEL CREATIVO",
            "reel-heading": "HGO Creative Reel — Art Direction, Motion & AI",
            "reel-desc": "Un reel creativo personal que combina dirección de arte, diseño de movimiento, narrativa, producción y experimentación con IA.",
            "about-title": "SOBRE MÍ",
            "about-p1": "Soy Hugo Garcia Ortega, un Director de Arte y Senior Motion Designer con más de 9 años de experiencia creando campañas digitales, contenido visual y recursos multimedia para marcas en México y Latinoamérica.",
            "about-p2": "Mi trabajo combina dirección de arte, diseño de movimiento, edición de video, producción creativa y flujos de trabajo basados en IA para convertir ideas en piezas visuales contundentes para redes sociales, plataformas digitales, campañas y contenido de marca.",
            "about-p3": "He liderado equipos creativos, colaborado con equipos de marketing, UX/UI y producto, y desarrollado contenido multimedia para marcas como Samsung, Bimbo, Quaker State, Grupo Roche y Televisa.",
            "about-p4": "Me interesan los proyectos donde convergen el craft, el storytelling, la tecnología y los objetivos de negocio.",
            "about-cv": "Descargar CV",
            "about-skills-title": "Habilidades y Software",
            "skill-1": "Dirección de Arte",
            "skill-2": "Producción Creativa",
            "skill-3": "Diseño de Movimiento 2D / 3D",
            "skill-4": "After Effects & Premiere",
            "skill-5": "Photoshop & Illustrator",
            "skill-6": "Diseño UX/UI & Figma",
            "skill-7": "Flujos de Trabajo de IA Generativa",
            "skill-8": "Producción de Video",
            "skill-9": "Liderazgo de Equipos",
            
            "portfolio-title": "PORTAFOLIO PROFESIONAL",
            "portfolio-desc": "Haz clic en los lomos de los libros para expandir cada caso de estudio profesional.",
            "portfolio-cat-digital": "DIGITAL CAMPAIGNS & SOCIAL CONTENT",
            "portfolio-cat-motion": "MOTION, VIDEO EDITING & POST PRODUCTION",
            "portfolio-cat-personal": "PHOTOGRAPHY & VISUAL PRODUCTION",
            "personal-title": "TRABAJO PERSONAL",
            "personal-desc": "Fotografía, producción visual y experimentación creativa independiente.",

            // Samsung (Digital Campaigns)
            "spine-samsung-title": "SAMSUNG",
            "spine-samsung-cat": "CAMPAIGN",
            "book-samsung-title": "Digital Campaigns & Product Communication",
            "book-samsung-desc": "Assets de campaña, contenido social, key visuals, newsletters e interfaces para Samsung Members y activaciones de producto.",
            "book-samsung-bullet-1": "Dirección de arte y diseño digital para campañas de producto, eventos y promociones.",
            "book-samsung-bullet-2": "Animación y adaptación de piezas para redes sociales, email marketing, web y plataformas digitales.",
            "book-samsung-bullet-3": "Diseño de assets visuales para Samsung Members, lanzamientos y experiencias de marca.",
            "book-samsung-bullet-4": "Optimización visual de interfaces, banners y microcontenidos para mejorar claridad y engagement.",
            "book-samsung-gallery-btn": "Ver Galería de Proyectos",

            // Jafra (Digital Campaigns)
            "spine-jafra-title": "JAFRA",
            "spine-jafra-cat": "CAMPAIGN",
            "book-jafra-title": "Beauty Campaigns & Social Content",
            "book-jafra-desc": "Campañas digitales, videos de producto y piezas de motion para lanzamientos de cosmética, skincare y cuidado personal.",
            "book-jafra-bullet-1": "Dirección de arte y producción visual para campañas de productos de belleza.",
            "book-jafra-bullet-2": "Edición y postproducción de videos promocionales en formato digital.",
            "book-jafra-bullet-3": "Motion graphics, animación tipográfica y composición para piezas de social media.",
            "book-jafra-bullet-4": "Adaptación de formatos para pauta, redes sociales y comunicación comercial.",
            "book-jafra-gallery-btn": "Ver Galería de Proyectos",

            // Ya Ganaste (Digital Campaigns)
            "spine-yaganaste-title": "YA GANASTE",
            "spine-yaganaste-cat": "CAMPAIGN",
            "book-yaganaste-title": "Fintech Campaigns & B2B Content",
            "book-yaganaste-desc": "Contenido social, videos y assets de campaña creados para comunicar soluciones de pago, funciones de la app y herramientas comerciales.",
            "book-yaganaste-bullet-1": "Dirección de arte y producción de contenido para campañas de adquisición B2B.",
            "book-yaganaste-bullet-2": "Videos verticales y piezas sociales para explicar funcionalidades de pago, recargas y terminales.",
            "book-yaganaste-bullet-3": "Diseño de comunicación visual para alianzas comerciales y lanzamientos de producto.",
            "book-yaganaste-bullet-4": "Adaptación de mensajes complejos a formatos claros para usuarios y comercios.",
            "book-yaganaste-gallery-btn-1": "Ver Campañas B2B",
            "book-yaganaste-gallery-btn-2": "Ver Video & Motion",

            // AI Art (Personal -> Digital Campaigns)
            "spine-ai-title": "GENERATIVE AI ART",
            "spine-ai-cat": "AI ART",
            "book-ai-title": "AI Visual Direction & Experiments",
            "book-ai-desc": "Flujos de trabajo híbridos que combinan IA generativa, motion, edición y postproducción para la exploración de contenido visual.",
            "book-ai-bullet-1": "Desarrollo de conceptos visuales y piezas animadas usando herramientas de IA generativa.",
            "book-ai-bullet-2": "Integración de IA, edición, motion graphics y composición en flujos híbridos de producción.",
            "book-ai-bullet-3": "Experimentación con personajes, estilos visuales, metáforas de marca y narrativa audiovisual.",
            "book-ai-bullet-4": "Optimización de procesos creativos para acelerar ideación, prototipado y producción visual.",
            "book-ai-gallery-btn": "Ver Galería de Proyectos",

            // Xanadu Medic (Motion)
            "spine-xanadu-title": "XANADU MEDIC",
            "spine-xanadu-cat": "POST-PROD",
            "book-xanadu-title": "Medical Video & Post-Production",
            "book-xanadu-desc": "Contenido de video de carácter institucional y educativo con edición, motion graphics, diseño de sonido y corrección de color.",
            "book-xanadu-bullet-1": "Edición y postproducción de videos médicos, institucionales y de capacitación.",
            "book-xanadu-bullet-2": "Motion graphics para explicar procesos, servicios e información especializada.",
            "book-xanadu-bullet-3": "Corrección de color, diseño sonoro y pulido final para una estética profesional.",
            "book-xanadu-bullet-4": "Adaptación de información técnica a formatos claros para comunicación digital.",
            "book-xanadu-gallery-btn": "Ver Galería de Proyectos",

            // ISA CUP (Motion)
            "spine-isacup-title": "ISA CUP",
            "spine-isacup-cat": "POST-PROD",
            "book-isacup-title": "Football Event Coverage",
            "book-isacup-desc": "Fotografía, edición de video y motion graphics para contenido de torneos de fútbol y comunicación digital.",
            "book-isacup-bullet-1": "Edición y montaje dinámico de resúmenes de competencia.",
            "book-isacup-bullet-2": "Fotografía y cobertura audiovisual de evento deportivo.",
            "book-isacup-bullet-3": "Motion graphics, títulos, transiciones y recursos visuales para reforzar narrativa.",
            "book-isacup-bullet-4": "Integración de marcas patrocinadoras dentro de piezas promocionales.",
            "book-isacup-gallery-btn": "Ver Galería de Proyectos",

            // Bimbo (Motion)
            "spine-bimbo-title": "BIMBO",
            "spine-bimbo-cat": "POST-PROD",
            "book-bimbo-title": "Corporate Motion & Video Content",
            "book-bimbo-desc": "Motion corporativo, contenido de video y postproducción para comunicación institucional y de marca.",
            "book-bimbo-bullet-1": "Animación y edición de contenidos corporativos y promocionales.",
            "book-bimbo-bullet-2": "Motion graphics para explicar procesos, recorridos y comunicación interna.",
            "book-bimbo-bullet-3": "Postproducción audiovisual alineada a lineamientos de marca.",
            "book-bimbo-bullet-4": "Desarrollo de piezas claras para comunicación institucional y canales digitales.",
            "book-bimbo-gallery-btn": "Ver Galería de Proyectos",

            // Personal Work (Combined)
            "spine-personal-work-title": "PERSONAL WORK",
            "spine-personal-work-cat": "PERSONAL",
            "book-personal-work-title": "Photography & Visual Production",
            "book-personal-work-desc": "Fotografía personal, video relacionado con la música e experimentos visuales independientes enfocados en la atmósfera y la narrativa.",
            "book-personal-work-bullet-1": "Fotografía de retrato, composición, atmósfera y narrativa visual.",
            "book-personal-work-bullet-2": "Edición y producción de video y piezas audiovisuales independientes.",
            "book-personal-work-bullet-3": "Dirección de arte aplicada a proyectos y exploraciones personales.",
            "book-personal-work-bullet-4": "Desarrollo de una mirada estética y autoral complementaria al trabajo comercial.",
            "book-personal-gallery-btn-1": "Ver Fotos",
            "book-personal-gallery-btn-2": "Ver Videos",

            "contact-title": "CONTACTO",
            "contact-heading": "Colaboremos",
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
            "nav-about": "About",
            "nav-portfolio": "Portfolio",
            "nav-personal": "Personal Work",
            "nav-contact": "Contact",
            "logo-text": "H G O <span class=\"logo-subtitle\">| Art Director & Senior Motion Designer.</span>",
            "reel-title": "CREATIVE REEL",
            "reel-heading": "HGO Creative Reel — Art Direction, Motion & AI",
            "reel-desc": "A personal creative reel combining art direction, motion design, storytelling, production and AI experimentation.",
            "about-title": "ABOUT ME",
            "about-p1": "I’m Hugo Garcia Ortega, an Art Director and Senior Motion Designer with 9+ years of experience creating digital campaigns, visual content and multimedia assets for brands across Mexico and Latin America.",
            "about-p2": "My work combines art direction, motion design, video editing, creative production and AI-powered workflows to turn ideas into strong visual pieces for social media, digital platforms, campaigns and branded content.",
            "about-p3": "I’ve led creative teams, collaborated with marketing, UX/UI and product teams, and developed multimedia content for brands such as Samsung, Bimbo, Quaker State, Roche Group and Televisa.",
            "about-p4": "I’m interested in projects where craft, storytelling, technology and business goals meet.",
            "about-cv": "Download CV",
            "about-skills-title": "Skills & Software",
            "skill-1": "Art Direction",
            "skill-2": "Creative Production",
            "skill-3": "2D / 3D Motion Design",
            "skill-4": "After Effects & Premiere",
            "skill-5": "Photoshop & Illustrator",
            "skill-6": "UX/UI Design & Figma",
            "skill-7": "Generative AI Workflows",
            "skill-8": "Video Production",
            "skill-9": "Team Leadership",
            
            "portfolio-title": "PROFESSIONAL PORTFOLIO",
            "portfolio-desc": "Click on the book spines to expand each professional case study.",
            "portfolio-cat-digital": "DIGITAL CAMPAIGNS & SOCIAL CONTENT",
            "portfolio-cat-motion": "MOTION, VIDEO EDITING & POST PRODUCTION",
            "portfolio-cat-personal": "PHOTOGRAPHY & VISUAL PRODUCTION",
            "personal-title": "PERSONAL WORK",
            "personal-desc": "Photography, visual production and independent creative experimentation.",

            // Samsung (Digital Campaigns)
            "spine-samsung-title": "SAMSUNG",
            "spine-samsung-cat": "CAMPAIGN",
            "book-samsung-title": "Digital Campaigns & Product Communication",
            "book-samsung-desc": "Campaign assets, social content, key visuals, newsletters and interface work for Samsung Members and product activations.",
            "book-samsung-bullet-1": "Art direction and digital design for product campaigns, events, and promotions.",
            "book-samsung-bullet-2": "Animation and asset adaptation for social networks, email marketing, web, and digital platforms.",
            "book-samsung-bullet-3": "Visual asset design for Samsung Members, launches, and brand experiences.",
            "book-samsung-bullet-4": "Visual optimization of interfaces, banners, and micro-content to improve clarity and engagement.",
            "book-samsung-gallery-btn": "View Projects Gallery",

            // Jafra (Digital Campaigns)
            "spine-jafra-title": "JAFRA",
            "spine-jafra-cat": "CAMPAIGN",
            "book-jafra-title": "Beauty Campaigns & Social Content",
            "book-jafra-desc": "Digital campaigns, product videos and motion pieces for beauty, skincare and personal care launches.",
            "book-jafra-bullet-1": "Art direction and visual production for beauty product campaigns.",
            "book-jafra-bullet-2": "Editing and postproduction of promotional videos in digital format.",
            "book-jafra-bullet-3": "Motion graphics, typographic animation, and composition for social media assets.",
            "book-jafra-bullet-4": "Format adaptation for digital ads, social networks, and commercial communication.",
            "book-jafra-gallery-btn": "View Projects Gallery",

            // Ya Ganaste (Digital Campaigns)
            "spine-yaganaste-title": "YA GANASTE",
            "spine-yaganaste-cat": "CAMPAIGN",
            "book-yaganaste-title": "Fintech Campaigns & B2B Content",
            "book-yaganaste-desc": "Social content, videos and campaign assets created to communicate payment solutions, app features and business tools.",
            "book-yaganaste-bullet-1": "Art direction and content production for B2B acquisition campaigns.",
            "book-yaganaste-bullet-2": "Vertical videos and social assets to explain payment, top-up, and POS terminal features.",
            "book-yaganaste-bullet-3": "Visual communication design for commercial partnerships and product launches.",
            "book-yaganaste-bullet-4": "Adaptation of complex messages into clear formats for users and merchants.",
            "book-yaganaste-gallery-btn-1": "View B2B Campaigns",
            "book-yaganaste-gallery-btn-2": "View Video & Motion",

            // AI Art (Personal -> Digital Campaigns)
            "spine-ai-title": "GENERATIVE AI ART",
            "spine-ai-cat": "AI ART",
            "book-ai-title": "AI Visual Direction & Experiments",
            "book-ai-desc": "Hybrid workflows combining generative AI, motion, editing and post-production for visual content exploration.",
            "book-ai-bullet-1": "Development of visual concepts and animated pieces using generative AI tools.",
            "book-ai-bullet-2": "Integration of AI, editing, motion graphics, and composition in hybrid production workflows.",
            "book-ai-bullet-3": "Experimentation with characters, visual styles, brand metaphors, and audiovisual narrative.",
            "book-ai-bullet-4": "Creative process optimization to accelerate ideation, prototyping, and visual production.",
            "book-ai-gallery-btn": "View Projects Gallery",

            // Xanadu Medic (Motion)
            "spine-xanadu-title": "XANADU MEDIC",
            "spine-xanadu-cat": "POST-PROD",
            "book-xanadu-title": "Medical Video & Post-Production",
            "book-xanadu-desc": "Institutional and educational video content with editing, motion graphics, sound design and color correction.",
            "book-xanadu-bullet-1": "Editing and postproduction of medical, institutional, and training videos.",
            "book-xanadu-bullet-2": "Motion graphics to explain processes, services, and specialized information.",
            "book-xanadu-bullet-3": "Color correction, sound design, and final polish for a professional aesthetic.",
            "book-xanadu-bullet-4": "Adaptation of technical information to clear formats for digital communication.",
            "book-xanadu-gallery-btn": "View Projects Gallery",

            // ISA CUP (Motion)
            "spine-isacup-title": "ISA CUP",
            "spine-isacup-cat": "POST-PROD",
            "book-isacup-title": "Football Event Coverage",
            "book-isacup-desc": "Photography, video editing and motion graphics for football event content and digital communication.",
            "book-isacup-bullet-1": "Editing and dynamic assembly of highlights.",
            "book-isacup-bullet-2": "Photography and audiovisual coverage of sports events.",
            "book-isacup-bullet-3": "Motion graphics, titles, transitions, and visual assets to reinforce narrative.",
            "book-isacup-bullet-4": "Integration of sponsor brands within promotional pieces.",
            "book-isacup-gallery-btn": "View Projects Gallery",

            // Bimbo (Motion)
            "spine-bimbo-title": "BIMBO",
            "spine-bimbo-cat": "POST-PROD",
            "book-bimbo-title": "Corporate Motion & Video Content",
            "book-bimbo-desc": "Corporate motion, video content, and post-production for branded and institutional communication.",
            "book-bimbo-bullet-1": "Animation and editing of corporate and promotional content.",
            "book-bimbo-bullet-2": "Motion graphics to explain processes, walkthroughs, and internal communication.",
            "book-bimbo-bullet-3": "Audiovisual postproduction aligned with brand guidelines.",
            "book-bimbo-bullet-4": "Development of clear pieces for institutional communication and digital channels.",
            "book-bimbo-gallery-btn": "View Projects Gallery",

            // Personal Work (Combined)
            "spine-personal-work-title": "PERSONAL WORK",
            "spine-personal-work-cat": "PERSONAL",
            "book-personal-work-title": "Photography & Visual Production",
            "book-personal-work-desc": "Personal photography, music-related video and independent visual experiments focused on atmosphere and storytelling.",
            "book-personal-work-bullet-1": "Portrait photography, composition, atmosphere, and visual narrative.",
            "book-personal-work-bullet-2": "Editing and production of independent videos and audiovisual pieces.",
            "book-personal-work-bullet-3": "Art direction applied to personal projects and visual explorations.",
            "book-personal-work-bullet-4": "Development of an aesthetic and authorial perspective complementary to commercial work.",
            "book-personal-gallery-btn-1": "View Photos",
            "book-personal-gallery-btn-2": "View Videos",

            "contact-title": "CONTACT",
            "contact-heading": "Let's collaborate",
            "contact-desc": "Open to opportunities as an Art Director, Senior Motion Designer, Creative Producer and AI Visual Content profile.",
            "contact-location-label": "Location:",
            "contact-location": "Mexico, CDMX",
            "form-name-label": "Name",
            "form-name-ph": "Your name",
            "form-email-label": "Email",
            "form-email-ph": "Your email",
            "form-message-label": "Message",
            "form-message-ph": "What kind of project are you thinking of?",
            "form-submit": "Send Message",
            "footer-copy": "&copy; 2026 Hugo García Ortega (H G O). All rights reserved."
        }
    };

    // 7. i18n Language Toggle Logic
    let currentLanguage = localStorage.getItem('portfolio-lang') || 'en';
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
