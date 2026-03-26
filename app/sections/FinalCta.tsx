'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

type InquiryType = 'project' | 'call';

export function FinalCta() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const closeTimerRef = useRef<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalClosing, setIsModalClosing] = useState(false);
  const [inquiryType, setInquiryType] = useState<InquiryType>('project');

  useEffect(() => {
    const sectionNode = sectionRef.current;

    if (!sectionNode) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.25,
      }
    );

    observer.observe(sectionNode);

    const handleScroll = () => {
      if (!sectionNode) {
        return;
      }

      const rect = sectionNode.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const rawProgress = (viewportHeight - rect.top) / (viewportHeight + rect.height);
      const clampedProgress = Math.max(0, Math.min(rawProgress, 1));
      setScrollProgress(clampedProgress);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    return () => {
      if (closeTimerRef.current !== null) {
        window.clearTimeout(closeTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const handleOpenModal = () => {
      if (closeTimerRef.current !== null) {
        window.clearTimeout(closeTimerRef.current);
        closeTimerRef.current = null;
      }
      setInquiryType('project');
      setIsModalClosing(false);
      setIsModalOpen(true);
    };

    window.addEventListener('openProjectModal', handleOpenModal);

    return () => {
      window.removeEventListener('openProjectModal', handleOpenModal);
    };
  }, []);

  const glowShiftX = 52 + scrollProgress * 22;

  const openModal = (type: InquiryType) => {
    if (closeTimerRef.current !== null) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }

    setInquiryType(type);
    setIsModalClosing(false);
    setIsModalOpen(true);
  };

  const closeModal = useCallback(() => {
    if (!isModalOpen || isModalClosing) {
      return;
    }

    setIsModalClosing(true);
    closeTimerRef.current = window.setTimeout(() => {
      setIsModalOpen(false);
      setIsModalClosing(false);
      closeTimerRef.current = null;
    }, 260);
  }, [isModalClosing, isModalOpen]);

  useEffect(() => {
    if (!isModalOpen) {
      document.body.style.overflow = '';
      return;
    }

    document.body.style.overflow = 'hidden';

    const onEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeModal();
      }
    };

    window.addEventListener('keydown', onEsc);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onEsc);
    };
  }, [closeModal, isModalOpen]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsModalOpen(false);
  };

  return (
    <>
      <section
        id="contact"
        ref={sectionRef}
        className="w-full max-h-[calc(100vh-190px)]  min-h-[calc(100vh-190px)] bg-background py-8 md:py-12"
        aria-label="Final call to action"
      >
        <style>{`
          @keyframes ctaRevealUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes ctaLineGrow {
            from {
              transform: scaleX(0);
              opacity: 0;
            }
            to {
              transform: scaleX(1);
              opacity: 1;
            }
          }

          @keyframes ctaOrbFloat {
            0% {
              transform: translate3d(0, 0, 0);
            }
            50% {
              transform: translate3d(0, -8px, 0);
            }
            100% {
              transform: translate3d(0, 0, 0);
            }
          }

          @keyframes modalBackdropIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }

          @keyframes modalBackdropOut {
            from {
              opacity: 1;
            }
            to {
              opacity: 0;
            }
          }

          @keyframes modalPanelIn {
            from {
              opacity: 0;
              transform: translateY(16px) scale(0.97);
            }
            to {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }

          @keyframes modalPanelOut {
            from {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
            to {
              opacity: 0;
              transform: translateY(10px) scale(0.98);
            }
          }

          @keyframes modalContentIn {
            from {
              opacity: 0;
              transform: translateY(8px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes modalContentOut {
            from {
              opacity: 1;
              transform: translateY(0);
            }
            to {
              opacity: 0;
              transform: translateY(6px);
            }
          }

          .final-reveal {
            opacity: 0;
            transform: translateY(20px);
          }

          .final-reveal.is-visible {
            animation: ctaRevealUp 0.75s ease forwards;
          }

          .final-delay-1.is-visible {
            animation-delay: 0.12s;
          }

          .final-delay-2.is-visible {
            animation-delay: 0.24s;
          }

          .final-delay-3.is-visible {
            animation-delay: 0.36s;
          }

          .final-line {
            transform-origin: left center;
            transform: scaleX(0);
            opacity: 0;
          }

          .final-line.is-visible {
            animation: ctaLineGrow 0.8s ease forwards;
            animation-delay: 0.2s;
          }

          .final-cta-primary {
            background: linear-gradient(135deg, var(--primary-accent), #6f9ea1);
            color: var(--background);
            box-shadow: 0 14px 30px rgba(74, 139, 143, 0.35);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }

          .final-cta-primary:hover {
            transform: translateY(-1px);
            box-shadow: 0 18px 34px rgba(74, 139, 143, 0.42);
          }

          .final-cta-secondary {
            border: 1px solid rgba(212, 175, 55, 0.48);
            color: var(--secondary-accent);
            background: rgba(255, 255, 255, 0.02);
            transition: border-color 0.3s ease, background 0.3s ease;
          }

          .final-cta-secondary:hover {
            border-color: rgba(212, 175, 55, 0.85);
            background: rgba(212, 175, 55, 0.08);
          }

          .final-orb {
            animation: ctaOrbFloat 5s ease-in-out infinite;
          }

          .modal-backdrop-in {
            animation: modalBackdropIn 0.22s ease-out forwards;
          }

          .modal-backdrop-out {
            animation: modalBackdropOut 0.2s ease-in forwards;
          }

          .modal-panel-in {
            animation: modalPanelIn 0.28s cubic-bezier(0.22, 1, 0.36, 1) forwards;
            transform-origin: center;
          }

          .modal-panel-out {
            animation: modalPanelOut 0.2s ease-in forwards;
            transform-origin: center;
          }

          .modal-content-in {
            opacity: 0;
            animation: modalContentIn 0.24s ease-out forwards;
          }

          .modal-content-out {
            animation: modalContentOut 0.16s ease-in forwards;
          }

          .modal-content-in.delay-1 {
            animation-delay: 0.1s;
          }

          .modal-content-in.delay-2 {
            animation-delay: 0.16s;
          }
        `}</style>

        <div className="mx-auto flex min-h-[calc(100vh-7.5rem)] max-w-7xl items-start px-4 sm:px-6 lg:px-8">
          <div
            className="relative mt-5 w-full overflow-hidden rounded-xl border border-white/5 bg-foreground p-6 md:p-8 lg:p-10"
            style={{ boxShadow: '0 0 1px 1px rgba(212, 175, 37, 0.25)' }}
          >
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background: `radial-gradient(circle at ${glowShiftX}% 28%, rgba(255, 255, 255, 0.14) 0%, rgba(255, 255, 255, 0) 62%)`,
              }}
            />

            <div className="final-orb pointer-events-none absolute -right-16 top-8 h-44 w-44 rounded-full opacity-35 blur-2xl" style={{ background: 'radial-gradient(circle, rgba(212, 175, 55, 0.5), transparent 68%)' }} />
            <div className="final-orb pointer-events-none absolute -left-12 bottom-8 h-36 w-36 rounded-full opacity-30 blur-2xl" style={{ background: 'radial-gradient(circle, rgba(74, 139, 143, 0.6), transparent 68%)', animationDelay: '1.2s' }} />

            <div className="relative z-10 max-w-4xl">


              <h2 className={`final-reveal final-delay-1 ${isVisible ? 'is-visible' : ''} font-sans text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl`}>
                Tell us what you need. We will respond with a clear execution plan.
              </h2>

              <p className={`final-reveal final-delay-2 ${isVisible ? 'is-visible' : ''} mt-5 max-w-3xl font-sans text-base leading-relaxed text-secondary sm:text-lg`}>
                Share your scope and timeline. We will return structured next steps and a defined quotation.
              </p>

              <div className={`final-reveal final-delay-3 ${isVisible ? 'is-visible' : ''} mt-8 flex flex-col gap-4 sm:flex-row`}>
                <button
                  type="button"
                  onClick={() => openModal('project')}
                  className="final-cta-primary rounded-lg px-7 py-3 text-sm font-semibold uppercase tracking-wide"
                >
                  Start a Project
                </button>
                <button
                  type="button"
                  onClick={() => openModal('call')}
                  className="final-cta-secondary rounded-lg px-7 py-3 text-sm font-semibold uppercase tracking-wide"
                >
                  Book a Call
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {isModalOpen && (
        <div
          className={`fixed inset-0 z-70 flex items-center justify-center bg-black/70 px-4 ${
            isModalClosing ? 'modal-backdrop-out' : 'modal-backdrop-in'
          }`}
          onClick={closeModal}
          role="presentation"
        >
          <div
            className={`relative w-full max-w-2xl overflow-hidden rounded-xl border border-white/10 bg-foreground p-6 sm:p-7 ${
              isModalClosing ? 'modal-panel-out' : 'modal-panel-in'
            }`}
            style={{ boxShadow: '0 30px 80px rgba(0, 0, 0, 0.45)' }}
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-modal-title"
          >
            <button
              type="button"
              onClick={closeModal}
              className="absolute right-4 top-4 rounded-md border border-white/10 px-2.5 py-1 text-sm text-secondary transition hover:border-highlight/50 hover:text-white"
              aria-label="Close contact form"
            >
              Close
            </button>

            <h3
              id="contact-modal-title"
              className={`pr-16 font-sans text-2xl font-bold text-white ${
                isModalClosing ? 'modal-content-out' : 'modal-content-in delay-1'
              }`}
            >
              Contact Us
            </h3>
            <p
              className={`mt-2 text-sm text-secondary ${
                isModalClosing ? 'modal-content-out' : 'modal-content-in delay-1'
              }`}
            >
              {inquiryType === 'project' ? 'Project inquiry' : 'Call request'} selected. Share your details and we will get back with structured next steps.
            </p>

            <form
              className={`mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 ${
                isModalClosing ? 'modal-content-out' : 'modal-content-in delay-2'
              }`}
              onSubmit={handleSubmit}
            >
              <input type="hidden" name="inquiryType" value={inquiryType} />

              <label className="flex flex-col gap-2 text-sm text-secondary">
                <span>Name</span>
                <input
                  required
                  name="name"
                  className="rounded-lg border border-white/10 bg-black/20 px-3 py-2.5 text-white outline-none transition focus:border-primary"
                  placeholder="Your name"
                />
              </label>

              <label className="flex flex-col gap-2 text-sm text-secondary">
                <span>Email</span>
                <input
                  required
                  type="email"
                  name="email"
                  className="rounded-lg border border-white/10 bg-black/20 px-3 py-2.5 text-white outline-none transition focus:border-primary"
                  placeholder="you@company.com"
                />
              </label>

              <label className="flex flex-col gap-2 text-sm text-secondary sm:col-span-2">
                <span>Company</span>
                <input
                  name="company"
                  className="rounded-lg border border-white/10 bg-black/20 px-3 py-2.5 text-white outline-none transition focus:border-primary"
                  placeholder="Company name"
                />
              </label>

              <label className="flex flex-col gap-2 text-sm text-secondary">
                <span>Timeline</span>
                <input
                  name="timeline"
                  className="rounded-lg border border-white/10 bg-black/20 px-3 py-2.5 text-white outline-none transition focus:border-primary"
                  placeholder="Desired timeline"
                />
              </label>

              <label className="flex flex-col gap-2 text-sm text-secondary">
                <span>Scope</span>
                <input
                  name="scope"
                  className="rounded-lg border border-white/10 bg-black/20 px-3 py-2.5 text-white outline-none transition focus:border-primary"
                  placeholder="What do you need?"
                />
              </label>

              <label className="flex flex-col gap-2 text-sm text-secondary sm:col-span-2">
                <span>Message</span>
                <textarea
                  required
                  name="message"
                  rows={4}
                  className="resize-none rounded-lg border border-white/10 bg-black/20 px-3 py-2.5 text-white outline-none transition focus:border-primary"
                  placeholder="Share details so we can respond with clear next steps."
                />
              </label>

              <div className="sm:col-span-2 mt-1 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={closeModal}
                  className="rounded-lg border border-white/15 px-5 py-2.5 text-sm font-medium text-secondary transition hover:border-white/30 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-background transition hover:opacity-90"
                >
                  Send Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
