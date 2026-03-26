'use client';

import { useEffect, useRef, useState } from 'react';

export function TypicalEngagements() {
	const sectionRef = useRef<HTMLElement | null>(null);
	const [isVisible, setIsVisible] = useState(false);
	const [scrollProgress, setScrollProgress] = useState(0);

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
				threshold: 0.15,
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
			className="w-full min-h-screen bg-background py-8 md:py-12"
			aria-label="Typical engagements"
		>
			<style>{`
				@keyframes engRevealUp {
					from {
						opacity: 0;
						transform: translateY(20px);
					}
					to {
						opacity: 1;
						transform: translateY(0);
					}
				}

				@keyframes engLineGrow {
					from {
						transform: scaleX(0);
						opacity: 0;
					}
					to {
						transform: scaleX(1);
						opacity: 1;
					}
				}

				@keyframes engCardSlideUp {
					from {
						opacity: 0;
						transform: translateY(24px);
					}
					to {
						opacity: 1;
						transform: translateY(0);
					}
				}

				@keyframes glowFloat1 {
					0%, 100% {
						transform: translate(0, 0);
					}
					16% {
						transform: translate(15px, -200px);
					}
					33% {
						transform: translate(-10px, 220px);
					}
					50% {
						transform: translate(12px, -210px);
					}
					66% {
						transform: translate(-15px, 200px);
					}
					83% {
						transform: translate(10px, -190px);
					}
				}

				@keyframes glowFloat2 {
					0%, 100% {
						transform: translate(0, 0);
					}
					16% {
						transform: translate(-12px, 210px);
					}
					33% {
						transform: translate(15px, -200px);
					}
					50% {
						transform: translate(-10px, 220px);
					}
					66% {
						transform: translate(12px, -210px);
					}
					83% {
						transform: translate(-15px, 190px);
					}
				}

				@keyframes glowFloat3 {
					0%, 100% {
						transform: translate(0, 0);
					}
					16% {
						transform: translate(10px, 200px);
					}
					33% {
						transform: translate(-15px, -210px);
					}
					50% {
						transform: translate(15px, 220px);
					}
					66% {
						transform: translate(-12px, -200px);
					}
					83% {
						transform: translate(12px, 210px);
					}
				}

				.eng-reveal {
					opacity: 0;
					transform: translateY(20px);
				}

				.eng-reveal.is-visible {
					animation: engRevealUp 0.75s ease forwards;
				}

				.eng-line {
					transform-origin: left center;
					transform: scaleX(0);
					opacity: 0;
				}

				.eng-line.is-visible {
					animation: engLineGrow 0.8s ease forwards;
					animation-delay: 0.2s;
				}

				.eng-card {
					opacity: 0;
				}

				.eng-card.is-visible {
					animation: engCardSlideUp 0.7s ease forwards;
				}

				.eng-card.is-visible:nth-child(1) {
					animation-delay: 0.3s;
				}

				.eng-card.is-visible:nth-child(2) {
					animation-delay: 0.4s;
				}

				.eng-card.is-visible:nth-child(3) {
					animation-delay: 0.5s;
				}

				.eng-glow {
					animation: var(--glow-animation) 50s ease-in-out infinite;
				}

				.eng-card:nth-child(1) .eng-glow {
					--glow-animation: glowFloat1;
				}

				.eng-card:nth-child(2) .eng-glow {
					--glow-animation: glowFloat2;
				}

				.eng-card:nth-child(3) .eng-glow {
					--glow-animation: glowFloat3;
				}

				.eng-card-number {
					font-size: clamp(2rem, 5vw, 3.5rem);
					font-weight: 700;
					color: rgba(74, 139, 143, 0.15);
					line-height: 1;
				}

				.eng-card-border {
					border: 1px solid rgba(74, 139, 143, 0.3);
					background: 
						radial-gradient(circle at 18% 22%, rgba(74, 139, 143, 0.12), transparent 46%),
						linear-gradient(140deg, rgba(74, 139, 143, 0.08), rgba(255, 255, 255, 0.01));
				}

				.eng-card-accent {
					height: 2px;
					background: linear-gradient(90deg, var(--primary), transparent);
					opacity: 0.7;
				}
			`}</style>

			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				{/* Header */}
				<div className="mb-12 md:mb-16">
					<p
						className={`eng-reveal ${isVisible ? 'is-visible' : ''} font-mono text-sm uppercase tracking-[0.28em] text-highlight`}
					>
						Typical Engagements
					</p>
					<div
						className={`eng-line ${isVisible ? 'is-visible' : ''} mt-3 h-px w-32 bg-linear-to-r from-highlight to-transparent`}
					/>
				</div>

				{/* Cards Grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
					{engagements.map((engagement, index) => (
						<div
							key={engagement.number}
							className={`eng-card ${isVisible ? 'is-visible' : ''} group relative overflow-hidden rounded-lg eng-card-border p-6 md:p-8 flex flex-col h-full transition-all duration-300 hover:border-primary/50`}
							style={{ transform: `translateY(${cardOffsets[index]}px)` }}
						>
							{/* Decorative glow */}
							<div
								className="eng-glow pointer-events-none absolute -top-24 -right-24 h-56 w-56 rounded-full opacity-10"
								style={{
									background: `radial-gradient(circle, rgba(255, 255, 255, 0.3), transparent)`,
									filter: 'blur(50px)',
								}}
							/>

							<div className="relative z-10 flex flex-col h-full">
								<div className="eng-card-number">{engagement.number}</div>

								<h3 className="font-sans text-xl font-bold text-white mt-4 md:text-2xl leading-tight">
									{engagement.title}
								</h3>

								<div className="eng-card-accent my-5 w-12" />

								<p className="font-sans text-sm leading-relaxed text-secondary flex-grow md:text-base">
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
