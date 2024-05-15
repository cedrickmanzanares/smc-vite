import Column from 'src/CMS/Column/column';
import PageBanner from 'src/CMS/PageBanner/PageBanner';
import Pillar from 'src/CMS/Pillar/Pillar';
import Section from 'src/CMS/Section/Section';
import Fade from 'src/Layout/Fade/Fade';
import Footer from 'src/Layout/Footer/footer';
import { useGetContent } from 'src/data/data';
import React from 'react';
import parse from 'html-react-parser';
import StackedImages from 'src/CMS/StackedImages/stackedimages';
import OurStoryTab from 'src/CMS/OurStoryTab/ourstorytab';
import Marquee from 'src/CMS/Marquee/Marquee';
import SingleImage from 'src/CMS/SingleImage/SingleImage';
import FullPageBanner from 'src/CMS/FullPageBanner/fullpagebanner';

export default function Builder() {
	// const location = useLocation();
	// const sections = useState([]);

	const { title, sections } = useGetContent();

	return (
		<Fade>
			{sections.length !== 0 &&
				sections.map((section) => {
					console.log(section);
					let widgets = section.api_widgets;

					let sectionClasses = section.section_class
						? section.section_class.join(' ')
						: '';

					let containerClasses =
						section.container_class !== null
							? section.container_class.join(' ')
							: '';

					if (
						!containerClasses.includes('full') &&
						!containerClasses.includes('small')
					)
						containerClasses += ' medium';

					let hasColumn = sectionClasses.includes('column');

					if (!hasColumn) sectionClasses += 'column-1';

					if (!sectionClasses.includes('skip-section')) {
						return (
							<Section
								key={section.section_code}
								sectionClass={sectionClasses}
								containerClass={containerClasses}>
								{widgets.length !== 0 && (
									<Widgets widgets={widgets} hasColumn={hasColumn} />
								)}
							</Section>
						);
					} else
						return (
							<React.Fragment key={section.section_code}>
								{widgets.length !== 0 && (
									<Widgets
										key={section.section_code}
										widgets={widgets}
										hasColumn={hasColumn}
									/>
								)}
							</React.Fragment>
						);
				})}
			<div style={{ height: '100vh' }}></div>
			<div style={{ height: '100vh' }}></div>
			<div style={{ height: '100vh' }}></div>
			<div style={{ height: '100vh' }}></div>
			<div style={{ height: '100vh' }}></div>
		</Fade>
	);
}

function Widgets({ widgets, hasColumn }) {
	let our_story_tabs = [];
	return (
		<>
			{widgets.map((widget) => {
				let children = widget.api_childrens;
				let key = widget.page_section_widget_code;

				let widgetClasses = widget.widgets_class;

				if (widgetClasses) widgetClasses = widgetClasses.join(' ');
				else widgetClasses = '';

				// CMS Pillars
				if (widget.widgets_name === 'Pillars') {
					let content = {
						d: {
							bg: children[0].elements_attributes.src,
							focus: children[2].elements_attributes.src,
						},
						m: {
							bg: children[1].elements_attributes.src,
							focus: children[3].elements_attributes.src,
						},

						text1: children[4].elements_slot,
						text2: children[5].elements_slot,
						text3: children[6].elements_slot,
					};
					return (
						<Pillar key={key} content={content} widgetClasses={widgetClasses} />
					);
				}

				if (widget.widgets_name === 'Page Banner') {
					let image = children[0].elements_attributes.src;
					let title = children[1].elements_slot;
					let subtitle = '';
					subtitle = children[2] ? children[2].elements_slot : '';
					let noBg = widgetClasses.includes('no-bg') ? true : false;

					return (
						<PageBanner
							key={key}
							image={image}
							title={title}
							subtitle={subtitle}
							widgetClasses={widgetClasses}
							noBg={noBg}
						/>
					);
				}

				if (widget.widgets_name === 'Section Title') {
					console.log(children[1]);
					let titleClass = children[0].elements_class
						? children[0].elements_class.join(' ')
						: '';

					return (
						<React.Fragment key={key}>
							<h2 className={`heading-2 ${titleClass}`}>
								{parse(children[0].elements_slot)}
							</h2>
							{children[1].elements_slot && parse(children[1].elements_slot)}
						</React.Fragment>
					);
				}

				if (widget.widgets_name === 'Text Content') {
					let childrenClasses =
						children[0].elements_class !== null
							? children[0].elements_class.join(' ')
							: '';

					let content = children[0].elements_slot
						? children[0].elements_slot
						: '';

					console.log(children[0].elements_class);
					return (
						<Column key={key} columnClasses={childrenClasses}>
							{parse(content)}
						</Column>
					);
				}

				if (widget.widgets_name === 'Text Column') {
					return (
						<Column key={key}>
							<h2>{children[0].elements_slot}</h2>
							{parse(children[1].elements_slot)}
						</Column>
					);
				}

				if (widget.widgets_name === 'Stacked Images') {
					return (
						<Column key={key}>
							<StackedImages
								images={[
									children[0].elements_attributes,
									children[1].elements_attributes,
									children[2].elements_attributes,
								]}
							/>
						</Column>
					);
				}

				if (widget.widgets_name === 'Single Image') {
					return (
						<Column key={key}>
							<SingleImage image={children[0].elements_attributes} />
						</Column>
					);
				}

				if (widget.widgets_name === 'Image Content') {
					const elementClasses = children[0].elements_class
						? children[0].elements_class.join(' ')
						: '';
					return (
						<Column key={key}>
							<div className={`${elementClasses} img-container`}>
								<img
									src={children[0].elements_attributes.src}
									alt={children[0].elements_attributes.alt}
								/>
							</div>
						</Column>
					);
				}

				if (widget.widgets_name === 'Image - Marquee') {
					let images = [];
					children.forEach((image) => images.push(image.elements_attributes));
					return (
						<Column key={key}>
							<Marquee images={images} widgetClasses={widgetClasses} />
						</Column>
					);
				}

				if (widget.widgets_name === 'Banner - Full Page') {
					console.log('widgetClasses', widgetClasses);

					return (
						<FullPageBanner
							key={key}
							image={children[0].elements_attributes}
							caption={children[1].elements_slot}
						/>
					);
				}

				if (widget.widgets_name === 'MV Item') {
					console.log('children[0]', children[0]);
					console.log('children[1]', children[1]);
					console.log('children[2]', children[2]);
					console.log('children[3]', children[3]);

					let elementClasses_1 = children[1].elements_class
						? children[1].elements_class.join(' ')
						: '';
					let elementClasses_2 = children[2].elements_class
						? children[2].elements_class.join(' ')
						: '';
					let elementClasses_3 = children[3].elements_class
						? children[3].elements_class.join(' ')
						: '';

					return (
						<Column key={key}>
							<div className='mv-item'>
								<div className='img-container'>
									<img
										src={children[0].elements_attributes.src}
										alt={children[0].elements_attributes.alt}
									/>
								</div>

								<div className='desc-container'>
									<div className={elementClasses_1}>
										{parse(children[1].elements_slot)}
									</div>
									<div className={elementClasses_2}>
										{' '}
										{parse(children[2].elements_slot)}
									</div>
									<div className={elementClasses_3}>
										{' '}
										{parse(children[3].elements_slot)}
									</div>
								</div>
							</div>
						</Column>
					);
				}

				if (widget.widgets_name === 'Business Item') {
					return (
						<Column key={key}>
							<div class='business-item'>
								<div class='img-container'>
									<img
										src={children[0].elements_attributes.src}
										alt={children[0].elements_attributes.alt}
									/>
								</div>
								<div class='desc-container'>
									<h2 class='heading-4'>{children[1].elements_slot}</h2>
									{children[2].elements_slot &&
										parse(children[2].elements_slot)}
									{}
								</div>
							</div>
						</Column>
					);
				}

				if (widget.widgets_name === 'Our Story Tabs - Test') {
					our_story_tabs.push(widget);
				}

				if (our_story_tabs.length) {
					console.log(our_story_tabs);
					<OurStoryTab />;
				}
			})}
		</>
	);
}
