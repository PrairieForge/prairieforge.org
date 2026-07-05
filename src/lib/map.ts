import type { CollectionEntry } from 'astro:content';
import L from 'leaflet';

import 'leaflet/dist/leaflet.css';

export const initMap = () => {
	const map = L.map('hs-grayscale-leaflet', {
		center: [44.055610590165614, -93.49532598361576],
		zoom: 9,
	});

	L.tileLayer(
		'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
		{
			maxZoom: 19,
			minZoom: 2,
			attribution: '© <a href="https://carto.com/attributions">CARTO</a>',
		},
	).addTo(map);

	return map;
};

const createPopupContent = ({
	name,
	pastor,
	email,
	url,
}: {
	name: string;
	pastor: string;
	email: string;
	url: string;
}) => {
	return `
      <div>
        <h2 class='text-lg'>${name}</h2>
        <p>${pastor}</p>
        <p><a href='mailto:${email}'>${email}</a></p>
        <p><a href='${url}'>Website</a></p>
        </div>
      `;
};

const customIcon = L.icon({
	iconUrl: '/map-marker.svg',
	iconSize: [38, 95], // size of the icon
	iconAnchor: [19, 94], // point of the icon which will correspond to marker's location
	popupAnchor: [0, -76], // point from which the popup should open relative to the iconAnchor
});

export const addMarker = (item: CollectionEntry<'churches'>) => {
	const gps: [number, number] = JSON.parse(item.data.gps).coordinates;
	const coords: [number, number] = [gps[1], gps[0]];

	return L.marker(coords, { icon: customIcon }).bindPopup(
		createPopupContent(item.data),
	);
};
