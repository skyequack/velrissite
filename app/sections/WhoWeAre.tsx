'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { cambo } from '@/lib/fonts';
import { useRevealOnIntersect } from '@/hooks/useRevealOnIntersect';
import { useScrollProgress } from '@/hooks/useScrollProgress';
import styles from './SectionAnimations.module.css';

export function WhoWeAre() {
	const sectionRef = useRef<HTMLElement | null>(null);
	const isVisible = useRevealOnIntersect(sectionRef, { threshold: 0.35 });
	const scrollProgress = useScrollProgress(sectionRef);

	const glowShiftX = 45 + scrollProgress * 25;

	return (
		<section
			id="about"
			ref={sectionRef}
			className="w-full bg-background py-8 md:py-12"
			aria-label="Who we are"
		>
			<div className="mx-auto flex max-w-7xl items-center px-4 sm:px-6 lg:px-8">
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
								className={cn(styles.reveal, isVisible && styles.visible, 'font-mono text-sm uppercase tracking-[0.28em] text-highlight')}
							>
								Who We Are
							</p>
							<div
								className={cn(styles.line, isVisible && styles.visible, 'mt-3 h-px w-28 bg-linear-to-r from-highlight to-transparent')}
							/>

							<h2
								className={cn(styles.reveal, styles.delay1, isVisible && styles.visible, cambo.className, 'mt-6 text-3xl font-bold leading-tight text-white')}
							>
								Velris is a strategy-led creative partner for brands that have outgrown improvisation.
							</h2>

							<p
								className={cn(styles.reveal, styles.delay2, isVisible && styles.visible, 'mt-5 max-w-2xl font-sans text-base leading-relaxed text-secondary sm:text-lg')}
							>
								We operate with structure, process, and quality control. We are not a freelancer. We are
								not a loose collective.
							</p>

							<p
								className={cn(styles.reveal, styles.delay2, isVisible && styles.visible, 'mt-4 max-w-2xl font-sans text-base leading-relaxed text-secondary sm:text-lg')}
							>
								Velris is a structured delivery model: strategy, production, direction, and execution under
								one system, with one accountable lead from brief to handover.
							</p>

							<div
								className={cn(styles.reveal, styles.delay3, isVisible && styles.visible, 'mt-6 rounded-xl border border-highlight/25 bg-black/20 p-4 sm:p-5')}
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
									className={cn(styles.whoPlaceholder, 'group relative col-span-2 min-h-44 overflow-hidden rounded-[5px] sm:min-h-52')}
								>
									<Image
										src="/images/whoweare3.jpeg"
										alt="Creative direction and handover workflow"
										fill
										className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
										sizes="(min-width: 1024px) 33vw, 100vw"
									/>
									<div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/75 via-black/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
									<p className="pointer-events-none absolute bottom-3 left-3 right-3 font-mono text-[11px] uppercase tracking-[0.14em] text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:text-xs">
										Creative Direction + Clean Handover
									</p>
								</div>

								<div
									className={cn(styles.whoPlaceholder, 'group relative min-h-36 overflow-hidden rounded-[5px] sm:min-h-40')}
								>
									<Image
										src="/images/whoweare2.jpeg"
										alt="Production quality control setup"
										fill
										className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
										sizes="(min-width: 1024px) 16vw, 50vw"
									/>
									<div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/75 via-black/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
									<p className="pointer-events-none absolute bottom-3 left-3 right-3 font-mono text-[11px] uppercase tracking-[0.14em] text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
										Production Quality Control
									</p>
								</div>

								<div
									className={cn(styles.whoPlaceholder, 'group relative min-h-36 overflow-hidden rounded-[5px] sm:min-h-40')}
								>
									<Image
										src="/images/whoweare1.jpeg"
										alt="Strategy planning workspace"
										fill
										className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
										sizes="(min-width: 1024px) 16vw, 50vw"
									/>
									<div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/75 via-black/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
									<p className="pointer-events-none absolute bottom-3 left-3 right-3 font-mono text-[11px] uppercase tracking-[0.14em] text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
										Strategy Architecture
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
