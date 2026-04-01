'use client';

import { FormEvent, useCallback, useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { cambo } from '@/lib/fonts';
import { useRevealOnIntersect } from '@/hooks/useRevealOnIntersect';
import { useScrollProgress } from '@/hooks/useScrollProgress';
import styles from './SectionAnimations.module.css';

type InquiryType = 'project' | 'call';
type SubmitStatus = 'idle' | 'pending' | 'success' | 'error';

export function FinalCta() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const dialogPanelRef = useRef<HTMLDivElement | null>(null);
  const firstInputRef = useRef<HTMLInputElement | null>(null);
  const lastActiveElementRef = useRef<HTMLElement | null>(null);
  const closeTimerRef = useRef<number | null>(null);
  const isVisible = useRevealOnIntersect(sectionRef, { threshold: 0.25 });
  const scrollProgress = useScrollProgress(sectionRef);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalClosing, setIsModalClosing] = useState(false);
  const [inquiryType, setInquiryType] = useState<InquiryType>('project');
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>('idle');
  const [submitMessage, setSubmitMessage] = useState('');

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
      setSubmitStatus('idle');
      setSubmitMessage('');
      setIsModalClosing(false);
      lastActiveElementRef.current = document.activeElement as HTMLElement | null;
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
    setSubmitStatus('idle');
    setSubmitMessage('');
    setIsModalClosing(false);
    lastActiveElementRef.current = document.activeElement as HTMLElement | null;
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
      setSubmitStatus('idle');
      setSubmitMessage('');
      lastActiveElementRef.current?.focus();
      closeTimerRef.current = null;
    }, 260);
  }, [isModalClosing, isModalOpen]);

  useEffect(() => {
    if (!isModalOpen) {
      document.body.style.overflow = '';
      return;
    }

    document.body.style.overflow = 'hidden';
    window.requestAnimationFrame(() => {
      firstInputRef.current?.focus();
    });

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeModal();
        return;
      }

      if (event.key !== 'Tab' || !dialogPanelRef.current) {
        return;
      }

      const focusableElements = Array.from(
        dialogPanelRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      );

      if (focusableElements.length === 0) {
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
      const activeElement = document.activeElement as HTMLElement | null;

      if (!event.shiftKey && activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }

      if (event.shiftKey && activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      }
    };

    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [closeModal, isModalOpen]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const payload = {
      inquiryType,
      name: String(formData.get('name') ?? ''),
      email: String(formData.get('email') ?? ''),
      company: String(formData.get('company') ?? ''),
      timeline: String(formData.get('timeline') ?? ''),
      scope: String(formData.get('scope') ?? ''),
      message: String(formData.get('message') ?? ''),
    };

    try {
      setSubmitStatus('pending');
      setSubmitMessage('Sending your request...');

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = (await response.json()) as { message?: string; error?: string };

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong while sending your request.');
      }

      setSubmitStatus('success');
      setSubmitMessage(data.message || 'Request sent successfully.');
      event.currentTarget.reset();

      window.setTimeout(() => {
        closeModal();
      }, 900);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unable to send request. Please try again.';
      setSubmitStatus('error');
      setSubmitMessage(message);
    }
  };

  return (
    <>
      <section
        id="contact"
        ref={sectionRef}
        className="w-full max-h-[calc(100vh-190px)]  min-h-[calc(100vh-190px)] bg-background py-8 md:py-12"
        aria-label="Final call to action"
      >
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

            <div className={`${styles.finalOrb} pointer-events-none absolute -right-16 top-8 h-44 w-44 rounded-full opacity-35 blur-2xl`} style={{ background: 'radial-gradient(circle, rgba(212, 175, 55, 0.5), transparent 68%)' }} />
            <div className={`${styles.finalOrb} pointer-events-none absolute -left-12 bottom-8 h-36 w-36 rounded-full opacity-30 blur-2xl`} style={{ background: 'radial-gradient(circle, rgba(74, 139, 143, 0.6), transparent 68%)', animationDelay: '1.2s' }} />

            <div className="relative z-10 max-w-4xl">


              <h2 className={cn(styles.reveal, styles.delay1, isVisible && styles.visible, cambo.className, 'text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl')}>
                Tell us what you need. We will respond with a clear execution plan.
              </h2>

              <p className={cn(styles.reveal, styles.delay2, isVisible && styles.visible, 'mt-5 max-w-3xl font-sans text-base leading-relaxed text-secondary sm:text-lg')}>
                Share your scope and timeline. We will return structured next steps and a defined quotation.
              </p>

              <div className={cn(styles.reveal, styles.delay3, isVisible && styles.visible, 'mt-8 flex flex-col gap-4 sm:flex-row')}>
                <button
                  type="button"
                  onClick={() => openModal('project')}
                  className={`${styles.finalCtaPrimary} rounded-lg px-7 py-3 text-sm font-semibold uppercase tracking-wide`}
                >
                  Start a Project
                </button>
                <button
                  type="button"
                  onClick={() => openModal('call')}
                  className={`${styles.finalCtaSecondary} rounded-lg px-7 py-3 text-sm font-semibold uppercase tracking-wide`}
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
            isModalClosing ? styles.modalBackdropOut : styles.modalBackdropIn
          }`}
          onClick={closeModal}
          role="presentation"
        >
          <div
            ref={dialogPanelRef}
            className={`relative w-full max-w-2xl overflow-hidden rounded-xl border border-white/10 bg-foreground p-6 sm:p-7 ${
              isModalClosing ? styles.modalPanelOut : styles.modalPanelIn
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
                isModalClosing ? styles.modalContentOut : `${styles.modalContentIn} ${styles.modalDelay1}`
              }`}
            >
              Contact Us
            </h3>
            <p
              className={`mt-2 text-sm text-secondary ${
                isModalClosing ? styles.modalContentOut : `${styles.modalContentIn} ${styles.modalDelay1}`
              }`}
            >
              {inquiryType === 'project' ? 'Project inquiry' : 'Call request'} selected. Share your details and we will get back with structured next steps.
            </p>

            <form
              className={`mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 ${
                isModalClosing ? styles.modalContentOut : `${styles.modalContentIn} ${styles.modalDelay2}`
              }`}
              onSubmit={handleSubmit}
            >
              <input type="hidden" name="inquiryType" value={inquiryType} />

              <label className="flex flex-col gap-2 text-sm text-secondary">
                <span>Name</span>
                <input
                  ref={firstInputRef}
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
                  disabled={submitStatus === 'pending'}
                  className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-background transition hover:opacity-90"
                >
                  {submitStatus === 'pending' ? 'Sending...' : 'Send Request'}
                </button>
              </div>

              {submitMessage && (
                <p
                  className={cn(
                    'sm:col-span-2 text-sm font-medium',
                    submitStatus === 'error' ? 'text-red-300' : 'text-secondary'
                  )}
                  role={submitStatus === 'error' ? 'alert' : 'status'}
                >
                  {submitMessage}
                </p>
              )}
            </form>
          </div>
        </div>
      )}
    </>
  );
}
