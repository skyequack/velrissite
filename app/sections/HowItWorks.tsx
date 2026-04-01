'use client';

import { useRef } from 'react';
import { cn } from '@/lib/utils';
import { cambo } from '@/lib/fonts';
import { useRevealOnIntersect } from '@/hooks/useRevealOnIntersect';
import { useScrollProgress } from '@/hooks/useScrollProgress';
import styles from './SectionAnimations.module.css';

export function HowItWorks() {
	const sectionRef = useRef<HTMLElement | null>(null);
	const isVisible = useRevealOnIntersect(sectionRef, { threshold: 0.25 });
	const scrollProgress = useScrollProgress(sectionRef);

	const glowShiftX = 45 + scrollProgress * 25;
	const structuredGradientPosition = `${scrollProgress * 100}% 50%`;
	const predictableGradientPosition = `${100 - scrollProgress * 100}% 50%`;

	const steps = [
		{
			number: '1',
			title: 'Define',
			description: 'Scope, objectives, deliverables, timeline, and budget parameters confirmed in writing.',
			delay: 0.12,
		},
		{
			number: '2',
			title: 'Architect',
			description: 'Creative direction, shot lists, deliverable map, and execution roadmap finalized before production begins.',
			delay: 0.24,
		},
		{
			number: '3',
			title: 'Execute',
			description: 'Production and post-production under quality control with milestone checkpoints.',
			delay: 0.36,
		},
		{
			number: '4',
			title: 'Deliver',
			description: 'Organized, properly formatted, ready-to-publish assets with clean documentation.',
			delay: 0.48,
		},
	];

	return (
		<section
			id="how-it-works"
			ref={sectionRef}
			className="w-full min-h-screen bg-background py-8 md:py-12"
			aria-label="How it works"
		>
			<div className="mx-auto flex min-h-[calc(100vh-7.5rem)] max-w-7xl flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
				<div className="w-full">
					{/* Header Section */}
					<div className="mb-12 md:mb-16">
						<p
							className={cn(styles.reveal, isVisible && styles.visible, 'font-mono text-sm uppercase tracking-[0.28em] text-highlight')}
						>
							How It Works
						</p>
						<div
							className={cn(styles.line, isVisible && styles.visible, 'mt-3 h-px w-28 bg-linear-to-r from-highlight to-transparent')}
						/>

						<div className={cn(cambo.className, 'mt-6 flex flex-wrap gap-1')}>
							<span
								className={cn(styles.reveal, styles.delay1, isVisible && styles.visible, 'font-serif text-3xl font-bold leading-tight text-white sm:text-4xl')}
							>
								We keep delivery&nbsp;
							</span>
							<span
								className={cn(
									styles.reveal,
									styles.delay1,
									isVisible && styles.visible,
									styles.structureColorAnimate,
									'font-serif text-3xl font-bold leading-tight sm:text-4xl'
								)}
								style={{ backgroundPosition: structuredGradientPosition }}
							>
								structured&nbsp;
							</span>
							<span
								className={cn(styles.reveal, styles.delay1, isVisible && styles.visible, 'font-serif text-3xl font-bold leading-tight text-white sm:text-4xl')}
							>
							 and&nbsp;
							</span>
							<span
								className={cn(
									styles.reveal,
									styles.delay1,
									isVisible && styles.visible,
									styles.predictableColorAnimate,
									'font-serif text-3xl font-bold leading-tight sm:text-4xl'
								)}
								style={{ backgroundPosition: predictableGradientPosition }}
							>
								predictable.
							</span>
						</div>
					</div>

					{/* Steps Grid */}
					<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
						{steps.map((step, idx) => (
							<div
								key={step.number}
								className={cn(styles.reveal, styles[`delay${idx + 2}` as keyof typeof styles], isVisible && styles.visible, styles.nitStepCard, 'relative overflow-hidden rounded-xl p-6 md:p-7 lg:p-8')}
								style={{
									animationDelay: `${step.delay}s`,
								}}
							>
								{/* Glow effect that responds to scroll */}
								<div
									className="pointer-events-none absolute inset-0"
									style={{
										background: `radial-gradient(circle at ${glowShiftX}% 20%, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0) 60%)`,
									}}
								/>

								<div className="relative z-10">
									<div className={`${styles.nitStepNumber} mb-4`}>{step.number}</div>
								<h3 className="font-sans text-lg font-bold text-white md:text-xl">
										{step.title}
									</h3>
									<p className="mt-3 font-sans text-xs leading-relaxed text-secondary md:text-sm">
										{step.description}
									</p>
								</div>
							</div>
						))}
					</div>

					{/* Footer Info */}
					<div className={cn(styles.reveal, styles.delay4, isVisible && styles.visible, 'mt-12 md:mt-16')}>
							<div className="rounded-xl border border-primary/40 bg-black/20 p-5 md:p-6">
								<p className="font-mono text-xs uppercase tracking-[0.18em] text-primary md:text-sm">
								Delivery Standard
							</p>
							<p className="mt-3 font-sans text-sm font-semibold leading-relaxed text-white md:text-base">
								Usable exports | Labeled folders | Platform-ready formats
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
