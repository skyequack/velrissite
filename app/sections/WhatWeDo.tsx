'use client';

import { useRef } from 'react';
import { cn } from '@/lib/utils';
import { cambo } from '@/lib/fonts';
import { useRevealOnIntersect } from '@/hooks/useRevealOnIntersect';
import { useScrollProgress } from '@/hooks/useScrollProgress';
import styles from './SectionAnimations.module.css';

export function WhatWeDo() {
	const sectionRef = useRef<HTMLElement | null>(null);
	const isVisible = useRevealOnIntersect(sectionRef, { threshold: 0.25 });
	const scrollProgress = useScrollProgress(sectionRef);

	const serviceParallaxY1 = (scrollProgress - 0.5) * 20;
	const serviceParallaxY2 = (scrollProgress - 0.5) * -16;
	const serviceParallaxY3 = (scrollProgress - 0.5) * 18;
	const glowShiftX = 55 + scrollProgress * 20;

	const services = [
		{
			number: '01',
			title: 'Structured Production',
			description: 'Photography, videography, events, post-production. Planning and direction are embedded into every project.',
			highlight: 'You are not paying for a camera. You are paying for publish-ready assets.',
		},
		{
			number: '02',
			title: 'Brand Direction & Positioning',
			description:
				'We align look, tone, and messaging so the brand holds together across platforms. From visual hierarchy to campaign rollout, everything connects.',
		},
		{
			number: '03',
			title: 'Marketing Execution',
			description:
				'Campaign planning, rollout management, and structured content systems. Not random posting. Not reactive marketing. Execution aligned to outcomes.',
		},
		{
			number: '04',
			title: 'AI Creative Production (Generative)',
			description:
				'AI-enhanced visuals and motion for speed, scale, and variation when traditional production is not required. Used for concept visuals, ad variations, mockups, and short-form creative, always aligned to brand standards and approved direction.',
		},
		{
			number: '05',
			title: 'Digital Add-Ons (Managed)',
			description:
				'Websites, landing pages, company profiles, and light automation. When digital support is needed, Velris manages vetted partners under structured oversight so delivery remains controlled. You deal with one accountable lead.',
		},
	];

	return (
		<section
			id="services"
			ref={sectionRef}
			className="w-full min-h-screen bg-background py-8 md:py-12"
			aria-label="What we do"
		>
			<div className="mx-auto flex min-h-[calc(100vh-7.5rem)] max-w-7xl items-center px-4 sm:px-6 lg:px-8">
				<div
					className="relative w-full overflow-hidden rounded-xl border border-white/5 bg-foreground p-6 md:p-8 lg:p-10"
					style={{ boxShadow: '0 0 1px 1px rgba(212, 175, 37, 0.25)' }}
				>
					<div
						className="pointer-events-none absolute inset-0"
						style={{
							background: `radial-gradient(circle at ${glowShiftX}% 32%, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 60%)`,
						}}
					/>

					<div className="relative z-10 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
						<div className="lg:col-span-5">
							<div className="grid h-full grid-cols-2 gap-4 sm:gap-5">
								<div
									className={cn(styles.whatServiceBox, 'relative min-h-32 rounded-xl p-4 sm:min-h-36')}
									style={{ transform: `translateY(${serviceParallaxY2}px)` }}
								>
									<p className="font-mono text-[11px] uppercase tracking-[0.18em] text-highlight">Brand Cohesion</p>
									<p className="mt-2 font-sans text-xs leading-relaxed text-secondary">
										Unified look, tone, and messaging.
									</p>
								</div>

								<div
									className={cn(styles.whatServiceBox, 'relative min-h-32 rounded-xl p-4 sm:min-h-36')}
									style={{ transform: `translateY(${serviceParallaxY3}px)` }}
								>
									<p className="font-mono text-[11px] uppercase tracking-[0.18em] text-highlight">Execution Model</p>
									<p className="mt-2 font-sans text-xs leading-relaxed text-secondary">
										Strategy to delivery, one accountable lead.
									</p>
								</div>

								<div
									className={cn(styles.whatServiceBox, 'relative col-span-2 min-h-40 rounded-xl p-4 sm:min-h-48')}
									style={{ transform: `translateY(${serviceParallaxY1}px)` }}
								>
									<p className="font-mono text-xs uppercase tracking-[0.22em] text-highlight">Production Quality</p>
									<p className="mt-3 max-w-xs font-sans text-xs leading-relaxed text-secondary">
										Structured planning, direction, and post-production excellence.
									</p>
								</div>
							</div>
						</div>

						<div className="lg:col-span-7">
							<p
								className={cn(styles.reveal, isVisible && styles.visible, 'font-mono text-sm uppercase tracking-[0.28em] text-highlight')}
							>
								What We Do
							</p>
							<div
								className={cn(styles.line, isVisible && styles.visible, 'mt-3 h-px w-32 bg-linear-to-r from-highlight to-transparent')}
							/>

							<div className="mt-8 space-y-5">
								{services.map((service, index) => (
									<div
										key={service.number}
										className={cn(styles.reveal, styles[`delay${index + 1}` as keyof typeof styles], isVisible && styles.visible)}
									>
										<div className="flex gap-3 items-start">
											<span className="font-sans text-sm font-bold text-highlight shrink-0 pt-0.5">
												{service.number}
											</span>
											<div className="grow">
												<h3 className={cn(cambo.className, 'text-base font-bold text-white')}>
													{service.title}
												</h3>
												<p className="mt-2 font-sans text-xs leading-relaxed text-secondary">
													{service.description}
												</p>
												{service.highlight && (
													<p className="mt-2 font-sans text-xs font-semibold leading-relaxed text-highlight">
														{service.highlight}
													</p>
												)}
											</div>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}