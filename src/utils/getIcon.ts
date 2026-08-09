const icons = {
	blog: 'mdi:document-sign',
	slide: 'mdi:presentation',
	video: 'mdi:video-youtube',
};

export const getIcon = (type: keyof typeof icons): string => {
	return icons[type];
};
