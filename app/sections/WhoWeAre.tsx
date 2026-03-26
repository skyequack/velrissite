'use client';

import { useEffect, useRef, useState } from 'react';

export function WhoWeAre() {
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
				threshold: 0.35,
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

	const imageParallaxY = (scrollProgress - 0.5) * 24;
	const glowShiftX = 45 + scrollProgress * 25;

	return (
		<section
			id="about"
			ref={sectionRef}
			className="w-full min-h-screen bg-background py-8 md:py-12"
			aria-label="Who we are"
		>
			<style>{`
				@keyframes whoRevealUp {
					from {
						opacity: 0;
						transform: translateY(20px);
					}
					to {
						opacity: 1;
						transform: translateY(0);
					}
				}

				@keyframes whoLineGrow {
					from {
						transform: scaleX(0);
						opacity: 0;
					}
					to {
						transform: scaleX(1);
						opacity: 1;
					}
				}

				@keyframes whoImageFloat {
					0% {
						transform: translateY(0px);
					}
					50% {
						transform: translateY(-5px);
					}
					100% {
						transform: translateY(0px);
					}
				}

				.who-reveal {
					opacity: 0;
					transform: translateY(20px);
				}

				.who-reveal.is-visible {
					animation: whoRevealUp 0.75s ease forwards;
				}

				.who-delay-1.is-visible {
					animation-delay: 0.12s;
				}

				.who-delay-2.is-visible {
					animation-delay: 0.24s;
				}

				.who-delay-3.is-visible {
					animation-delay: 0.36s;
				}

				.who-line {
					transform-origin: left center;
					transform: scaleX(0);
					opacity: 0;
				}

				.who-line.is-visible {
					animation: whoLineGrow 0.8s ease forwards;
					animation-delay: 0.2s;
				}

				.who-placeholder {
					background:
						radial-gradient(circle at 18% 22%, rgba(212, 175, 55, 0.2), transparent 46%),
						linear-gradient(140deg, rgba(74, 139, 143, 0.16), rgba(255, 255, 255, 0.02));
					border: 1px solid rgba(212, 175, 55, 0.22);
					box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.03), 0 24px 44px rgba(0, 0, 0, 0.32);
					animation: whoImageFloat 5s ease-in-out infinite;
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
							background: `radial-gradient(circle at ${glowShiftX}% 24%, rgba(255, 255, 255, 0.13) 0%, rgba(255, 255, 255, 0) 60%)`,
						}}
					/>

					<div className="relative z-10 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
						<div className="lg:col-span-7">
							<p
								className={`who-reveal ${isVisible ? 'is-visible' : ''} font-mono text-sm uppercase tracking-[0.28em] text-highlight`}
							>
								Who We Are
							</p>
							<div
								className={`who-line ${isVisible ? 'is-visible' : ''} mt-3 h-px w-28 bg-linear-to-r from-highlight to-transparent`}
							/>

							<h2
								className={`who-reveal who-delay-1 ${isVisible ? 'is-visible' : ''} mt-6 font-sans text-3xl font-bold leading-tight text-white sm:text-4xl`}
							>
								Velris is a strategy-led creative partner for brands that have outgrown improvisation.
							</h2>

							<p
								className={`who-reveal who-delay-2 ${isVisible ? 'is-visible' : ''} mt-5 max-w-2xl font-sans text-base leading-relaxed text-secondary sm:text-lg`}
							>
								We operate with structure, process, and quality control. We are not a freelancer. We are
								not a loose collective.
							</p>

							<p
								className={`who-reveal who-delay-2 ${isVisible ? 'is-visible' : ''} mt-4 max-w-2xl font-sans text-base leading-relaxed text-secondary sm:text-lg`}
							>
								Velris is a structured delivery model: strategy, production, direction, and execution under
								one system, with one accountable lead from brief to handover.
							</p>

							<div
								className={`who-reveal who-delay-3 ${isVisible ? 'is-visible' : ''} mt-6 rounded-xl border border-highlight/25 bg-black/20 p-4 sm:p-5`}
							>
								<p className="font-mono text-sm uppercase tracking-[0.18em] text-highlight">What this means for you</p>
								<p className="mt-3 font-sans text-sm font-semibold leading-relaxed text-white sm:text-base">
									Clear communication | Defined milestones | Consistent standards | Controlled revisions |
									Clean handover
								</p>
								<p className="mt-3 font-sans text-sm font-bold uppercase tracking-widest text-secondary">
									No confusion. No creative drift. No surprises.
								</p>
							</div>
						</div>

						<div className="lg:col-span-5">
							<div className="grid h-full grid-cols-2 gap-4 sm:gap-5">
								<div
									className={`who-reveal who-delay-2 ${isVisible ? 'is-visible' : ''} who-placeholder relative col-span-2 min-h-44 rounded-xl p-4 sm:min-h-52`}
									style={{ transform: `translateY(${imageParallaxY}px)` }}
								>
									<p className="font-mono text-xs uppercase tracking-[0.22em] text-highlight">Placeholder image 01</p>
									<p className="mt-3 max-w-[18rem] font-sans text-sm leading-relaxed text-secondary">
										Strategy mapping board and campaign architecture references.
									</p>
								</div>

								<div
									className={`who-reveal who-delay-3 ${isVisible ? 'is-visible' : ''} who-placeholder relative min-h-36 rounded-xl p-4 sm:min-h-40`}
									style={{ transform: `translateY(${imageParallaxY * 0.65}px)` }}
								>
									<p className="font-mono text-[11px] uppercase tracking-[0.18em] text-highlight">Placeholder image 02</p>
									<p className="mt-2 font-sans text-xs leading-relaxed text-secondary">
										Production quality controls.
									</p>
								</div>

								<div
									className={`who-reveal who-delay-3 ${isVisible ? 'is-visible' : ''} who-placeholder relative min-h-36 rounded-xl p-4 sm:min-h-40`}
									style={{ transform: `translateY(${imageParallaxY * -0.55}px)` }}
								>
									<p className="font-mono text-[11px] uppercase tracking-[0.18em] text-highlight">Placeholder image 03</p>
									<p className="mt-2 font-sans text-xs leading-relaxed text-secondary">
										Creative direction and clean handover.
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
