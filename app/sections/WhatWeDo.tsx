'use client';

import { useEffect, useRef, useState } from 'react';

export function WhatWeDo() {
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
			<style>{`
				@keyframes whatRevealUp {
					from {
						opacity: 0;
						transform: translateY(20px);
					}
					to {
						opacity: 1;
						transform: translateY(0);
					}
				}

				@keyframes whatLineGrow {
					from {
						transform: scaleX(0);
						opacity: 0;
					}
					to {
						transform: scaleX(1);
						opacity: 1;
					}
				}

				@keyframes whatServiceFloat {
					0% {
						transform: translateY(0px);
					}
					50% {
						transform: translateY(-4px);
					}
					100% {
						transform: translateY(0px);
					}
				}

				.what-reveal {
					opacity: 0;
					transform: translateY(20px);
				}

				.what-reveal.is-visible {
					animation: whatRevealUp 0.75s ease forwards;
				}

				.what-delay-1.is-visible {
					animation-delay: 0.12s;
				}

				.what-delay-2.is-visible {
					animation-delay: 0.24s;
				}

				.what-delay-3.is-visible {
					animation-delay: 0.36s;
				}

				.what-delay-4.is-visible {
					animation-delay: 0.48s;
				}

				.what-delay-5.is-visible {
					animation-delay: 0.6s;
				}

				.what-line {
					transform-origin: left center;
					transform: scaleX(0);
					opacity: 0;
				}

				.what-line.is-visible {
					animation: whatLineGrow 0.8s ease forwards;
					animation-delay: 0.2s;
				}

				.what-service-box {
					background:
						radial-gradient(circle at 18% 22%, rgba(212, 175, 55, 0.15), transparent 46%),
						linear-gradient(140deg, rgba(74, 139, 143, 0.12), rgba(255, 255, 255, 0.01));
					border: 1px solid rgba(212, 175, 55, 0.2);
					box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.02), 0 12px 24px rgba(0, 0, 0, 0.24);
					animation: whatServiceFloat 6s ease-in-out infinite;
				}
			`}</style>

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
									className={`what-reveal what-delay-2 ${isVisible ? 'is-visible' : ''} what-service-box relative min-h-32 rounded-xl p-4 sm:min-h-36`}
									style={{ transform: `translateY(${serviceParallaxY2}px)` }}
								>
									<p className="font-mono text-[11px] uppercase tracking-[0.18em] text-highlight">Brand Cohesion</p>
									<p className="mt-2 font-sans text-xs leading-relaxed text-secondary">
										Unified look, tone, and messaging.
									</p>
								</div>

								<div
									className={`what-reveal what-delay-3 ${isVisible ? 'is-visible' : ''} what-service-box relative min-h-32 rounded-xl p-4 sm:min-h-36`}
									style={{ transform: `translateY(${serviceParallaxY3}px)` }}
								>
									<p className="font-mono text-[11px] uppercase tracking-[0.18em] text-highlight">Execution Model</p>
									<p className="mt-2 font-sans text-xs leading-relaxed text-secondary">
										Strategy to delivery, one accountable lead.
									</p>
								</div>

								<div
									className={`what-reveal what-delay-4 ${isVisible ? 'is-visible' : ''} what-service-box relative col-span-2 min-h-40 rounded-xl p-4 sm:min-h-48`}
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
								className={`what-reveal ${isVisible ? 'is-visible' : ''} font-mono text-sm uppercase tracking-[0.28em] text-highlight`}
							>
								What We Do
							</p>
							<div
								className={`what-line ${isVisible ? 'is-visible' : ''} mt-3 h-px w-32 bg-linear-to-r from-highlight to-transparent`}
							/>

							<div className="mt-8 space-y-5">
								{services.map((service, index) => (
									<div
										key={service.number}
										className={`what-reveal what-delay-${index + 1} ${isVisible ? 'is-visible' : ''}`}
									>
										<div className="flex gap-3 items-start">
											<span className="font-sans text-sm font-bold text-highlight flex-shrink-0 pt-0.5">
												{service.number}
											</span>
											<div className="flex-grow">
												<h3 className="font-sans text-sm font-bold text-white">
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