import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function FullPageBanner({ image, caption, children }) {
	const banner = useRef();
	const { scrollYProgress } = useScroll({
		target: banner,
		offset: ['start start', 'end 10%'],
	});

	const y = useTransform(scrollYProgress, [0, 1], ['-5%', '5%']);
	const y2 = useTransform(scrollYProgress, [0, 1], ['0', '10%']);
	const width = useTransform(scrollYProgress, [0, 1], ['100%', '80%']);
	const padding = useTransform(scrollYProgress, [0, 1], ['0', '4rem']);
	const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
	// const z = useTransform(scrollYProgress, [0, 1], ['0%', '-100%']);

	return (
		<motion.div className='image-content fullbanner' ref={banner}>
			<motion.div
				className='container-fluid-width'
				style={{
					paddingTop: padding,
					paddingBottom: padding,
					width: width,
					y: y2,
				}}>
				{/* <SingleParallax scrollYProgress_start={scrollYProgress}> */}
				<div className='img-container'>
					<motion.div
						className='fullbanner-img'
						style={{
							backgroundImage: `url(${image.src})`,
							y: y,
							scale: scale,
						}}></motion.div>

					{/* </SingleParallax> */}
				</div>
				<div className='image-caption'>
					<h3 className='fullbanner-title heading-1'>{caption}</h3>
				</div>
			</motion.div>
		</motion.div>
	);
}
