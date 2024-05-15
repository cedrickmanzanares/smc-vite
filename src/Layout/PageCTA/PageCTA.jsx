'use client';
import { motion, useScroll, useTransform } from 'framer-motion';

import { useRef } from 'react';
import Button from '@/components/button/button';

export default function PageCTA() {
	const cta = useRef();
	const { scrollYProgress } = useScroll({
		target: cta,
		offset: ['start end', 'end start'],
	});

	const images = [
		'src/images/CTA/cta-1.png',
		'src/images/CTA/cta-2.png',
		'src/images/CTA/cta-3.png',
	];

	let yValues = [
		useTransform(scrollYProgress, [0, 1], ['0%', `${(0 * 25) / 2}%`]),
		useTransform(scrollYProgress, [0, 1], ['0%', `${(1 * 25) / 2}%`]),
		useTransform(scrollYProgress, [0, 1], ['0%', `${(2 * 25) / 2}%`]),
		useTransform(scrollYProgress, [0, 1], ['0%', `${(3 * 25) / 2}%`]),
	];

	let yTextValues = useTransform(
		scrollYProgress,
		[0, 0.5, 1],
		['-50%', `0%`, `100%`]
	);

	return (
		<div className='pageCTA' ref={cta}>
			<div className='container-fluid-width'>
				<div className='cta-images'>
					{images.map((val, index) => {
						return (
							<motion.img
								key={`cta_image_${index}`}
								style={{ zIndex: index, y: yValues[index - 1] }}
								src={val}
							/>
						);
					})}
					<motion.h2
						className='heading-2'
						style={{
							x: '-50%',
							y: yTextValues,
							zIndex: images.length / 2 - 1,
						}}>
						At vero eos et accusamus
					</motion.h2>
					<div className='pageCTA-btn'>
						<Button href='/' className='btn btn-bordered white' link='/'>
							Visit our sustainability site
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}
