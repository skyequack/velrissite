'use client';

import { useEffect, useRef, useState } from 'react';

export function HowItWorks() {
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

	const glowShiftX = 45 + scrollProgress * 25;

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
			<style>{`
				@keyframes nitRevealUp {
					from {
						opacity: 0;
						transform: translateY(20px);
					}
					to {
						opacity: 1;
						transform: translateY(0);
					}
				}

				@keyframes nitLineGrow {
					from {
						transform: scaleX(0);
						opacity: 0;
					}
					to {
						transform: scaleX(1);
						opacity: 1;
					}
				}

				@keyframes nitStepPulse {
					0% {
						box-shadow: inset 0 0 0 1px rgba(212, 175, 55, 0.22), 0 0 0 0 rgba(212, 175, 55, 0.1);
					}
					50% {
						box-shadow: inset 0 0 0 1px rgba(212, 175, 55, 0.22), 0 0 12px 2px rgba(212, 175, 55, 0.15);
					}
					100% {
						box-shadow: inset 0 0 0 1px rgba(212, 175, 55, 0.22), 0 0 0 0 rgba(212, 175, 55, 0.1);
					}
				}

				.nit-reveal {
					opacity: 0;
					transform: translateY(20px);
				}

				.nit-reveal.is-visible {
					animation: nitRevealUp 0.75s ease forwards;
				}

				.nit-delay-1.is-visible {
					animation-delay: 0.12s;
				}

				.nit-delay-2.is-visible {
					animation-delay: 0.24s;
				}

				.nit-delay-3.is-visible {
					animation-delay: 0.36s;
				}

				.nit-delay-4.is-visible {
					animation-delay: 0.48s;
				}

				.nit-line {
					transform-origin: left center;
					transform: scaleX(0);
					opacity: 0;
				}

				.nit-line.is-visible {
					animation: nitLineGrow 0.8s ease forwards;
					animation-delay: 0.2s;
				}

				.nit-step-card {
					background:
						radial-gradient(circle at 30% 20%, rgba(74, 139, 143, 0.15), transparent 50%),
						linear-gradient(140deg, rgba(74, 139, 143, 0.12), rgba(255, 255, 255, 0.01));
					border: 1px solid rgba(74, 139, 143, 0.3);
					box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.03), 0 24px 44px rgba(0, 0, 0, 0.32);
					transition: all 0.4s ease;
				}

				.nit-step-card:hover {
					border-color: rgba(74, 139, 143, 0.5);
					box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.05), 0 24px 60px rgba(74, 139, 143, 0.2);
					background:
						radial-gradient(circle at 30% 20%, rgba(74, 139, 143, 0.25), transparent 50%),
						linear-gradient(140deg, rgba(74, 139, 143, 0.18), rgba(255, 255, 255, 0.02));
				}

				.nit-step-number {
					font-size: 1.875rem;
					font-weight: 700;
					background: linear-gradient(135deg, rgba(74, 139, 143, 0.9), rgba(74, 139, 143, 0.4));
					background-clip: text;
					-webkit-background-clip: text;
					-webkit-text-fill-color: transparent;
				}

				@keyframes gradientLoop {
					0% {
						background-position: 0% 50%;
					}
					50% {
						background-position: 100% 50%;
					}
					100% {
						background-position: 0% 50%;
					}
				}

				.structure-color-animate {
					display: inline-block;
					background: linear-gradient(
						90deg,
						rgba(186, 145, 24, 1) 0%,
						rgba(186, 145, 24, 1) 10%,
						rgba(255, 255, 255, 1) 50%,
						rgba(186, 145, 24, 1) 90%,
						rgba(186, 145, 24, 1) 100%
					);
					background-size: 300% 100%;
					background-clip: text;
					-webkit-background-clip: text;
					-webkit-text-fill-color: transparent;
					animation: gradientLoop 2.3s linear infinite;
					will-change: background-position;
				}

				.predictable-color-animate {
					display: inline-block;
					background: linear-gradient(
						90deg,
						rgba(63, 123, 127, 1) 0%,
						rgba(63, 123, 127, 1) 22%,
						rgba(244, 250, 250, 1) 50%,
						rgba(63, 123, 127, 1) 78%,
						rgba(63, 123, 127, 1) 100%
					);
					background-size: 300% 100%;
					background-clip: text;
					-webkit-background-clip: text;
					-webkit-text-fill-color: transparent;
					animation: gradientLoop 2.3s linear infinite;
					will-change: background-position;
				}
			`}</style>

			<div className="mx-auto flex min-h-[calc(100vh-7.5rem)] max-w-7xl flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
				<div className="w-full">
					{/* Header Section */}
					<div className="mb-12 md:mb-16">
						<p
							className={`nit-reveal ${isVisible ? 'is-visible' : ''} font-mono text-sm uppercase tracking-[0.28em] text-highlight`}
						>
							How It Works
						</p>
						<div
							className={`nit-line ${isVisible ? 'is-visible' : ''} mt-3 h-px w-28 bg-linear-to-r from-highlight to-transparent`}
						/>

						<div className="mt-6 flex flex-wrap gap-1">
							<span
								className={`nit-reveal nit-delay-1 ${isVisible ? 'is-visible' : ''} font-sans text-3xl font-bold leading-tight text-white sm:text-4xl`}
							>
								We keep delivery&nbsp;
							</span>
							<span
								className={`nit-reveal nit-delay-1 ${isVisible ? 'is-visible' : ''} font-sans text-3xl font-bold leading-tight sm:text-4xl structure-color-animate`}
							>
								structured&nbsp;
							</span>
							<span
								className={`nit-reveal nit-delay-1 ${isVisible ? 'is-visible' : ''} font-sans text-3xl font-bold leading-tight text-white sm:text-4xl`}
							>
							 and&nbsp;
							</span>
							<span
								className={`nit-reveal nit-delay-1 ${isVisible ? 'is-visible' : ''} font-sans text-3xl font-bold leading-tight sm:text-4xl predictable-color-animate`}
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
								className={`nit-reveal nit-delay-${idx + 2} ${isVisible ? 'is-visible' : ''} nit-step-card relative overflow-hidden rounded-xl p-6 md:p-7 lg:p-8`}
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
									<div className="nit-step-number mb-4">{step.number}</div>
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
					<div className={`nit-reveal nit-delay-4 ${isVisible ? 'is-visible' : ''} mt-12 md:mt-16`}>
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
