'use client';

import { useRef } from 'react';
import { cn } from '@/lib/utils';
import { cambo } from '@/lib/fonts';
import { useRevealOnIntersect } from '@/hooks/useRevealOnIntersect';
import { useScrollProgress } from '@/hooks/useScrollProgress';
import styles from './SectionAnimations.module.css';

export function TypicalEngagements() {
	const sectionRef = useRef<HTMLElement | null>(null);
	const isVisible = useRevealOnIntersect(sectionRef, { threshold: 0.15 });
	const scrollProgress = useScrollProgress(sectionRef);

	const cardOffsets = [
		scrollProgress * -6,
		scrollProgress * 4,
		scrollProgress * -5,
	];

	const engagements = [
		{
			number: '01',
			title: 'The Launch System',
			description: 'For new brands, new products, rebrands, and expansions. Rollout-ready assets built to land properly.',
		},
		{
			number: '02',
			title: 'The Monthly Content Engine',
			description: 'For brands that need consistent output without weekly reinvention. We build the system, then maintain it.',
		},
		{
			number: '03',
			title: 'The Corporate Identity Suite',
			description:
				'For credibility and institutional presentation. Corporate profiles, executive positioning, milestone coverage, and structured storytelling built to executive standards.',
		},
	];

	return (
		<section
			id="engagements"
			ref={sectionRef}
			className="w-full bg-background py-8 md:py-12"
			aria-label="Typical engagements"
		>
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				{/* Header */}
				<div className="mb-12 md:mb-16">
					<p
						className={cn(styles.reveal, isVisible && styles.visible, 'font-mono text-sm uppercase tracking-[0.28em] text-highlight')}
					>
						Typical Engagements
					</p>
					<div
						className={cn(styles.line, isVisible && styles.visible, 'mt-3 h-px w-32 bg-linear-to-r from-highlight to-transparent')}
					/>
				</div>

				{/* Cards Grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
					{engagements.map((engagement, index) => (
						<div
							key={engagement.number}
							className={cn(styles.engCard, isVisible && styles.engCardVisible, 'group relative overflow-hidden rounded-lg p-6 md:p-8 flex flex-col h-full transition-all duration-300 hover:border-primary/50', styles.engCardBorder)}
							style={{
								transform: `translateY(${cardOffsets[index]}px)`,
								animationDelay: `${0.3 + index * 0.1}s`,
							}}
						>
							{/* Decorative glow */}
							<div
								className={cn(styles.engGlow, index === 1 && styles.glow2, index === 2 && styles.glow3, 'pointer-events-none absolute -top-24 -right-24 h-56 w-56 rounded-full opacity-10')}
								style={{
									background: `radial-gradient(circle, rgba(255, 255, 255, 0.3), transparent)`,
									filter: 'blur(50px)',
								}}
							/>

							<div className="relative z-10 flex flex-col h-full">
								<div className={styles.engCardNumber}>{engagement.number}</div>

								<h3 className={cn(cambo.className, 'text-xl font-bold text-white mt-4 md:text-2xl leading-tight')}>
									{engagement.title}
								</h3>

								<div className={`${styles.engCardAccent} my-5 w-12`} />

								<p className="font-sans text-sm leading-relaxed text-secondary grow md:text-base">
									{engagement.description}
								</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
