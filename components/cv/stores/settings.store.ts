import create from 'zustand';
import { Template4 } from '../templates/layouts/Template4';
import { Template5 } from '../templates/layouts/Template5';
import { Template6 } from '../templates/layouts/Template6';

import ProfessionalImg from '../../../public/img/professional.png';
import LegacyImg from '../../../public/img/legacy.png';
import FancyImg from '../../../public/img/fancy.png';
import NewImg from '../../../public/img/new.png';
import dynamic from 'next/dynamic';

const ProfessionalTemplate = dynamic(() => import('../templates/layouts/ProfessionalTemplate'), {
    ssr: false,
});
const LegacyTemplate = dynamic(() => import('../templates/layouts/LegacyTemplate'), {
    ssr: false,
});
const Template3 = dynamic(() => import('../templates/layouts/Template3'), {
    ssr: false,
});

export const templates = [ProfessionalTemplate, LegacyTemplate, Template3, Template4, Template5, Template6];
export const templatesSrc = [ProfessionalImg, LegacyImg, FancyImg, NewImg, NewImg, NewImg];
export const templatesName = ['Professional', 'legacy', 'template3', 'template4', 'template5', 'template6'];

export const useTemplates = create((set: any) => ({
    index: 0,
    template: templates[0],

    setTemplate: (index: number) => set({ index, template: templates[index] }),
}));

export const useItems = create((set: any) => ({
    isPhotoDisplayed: true,

    setIsPhotoDisplayed: (isPhotoDisplayed: boolean) => set({ isPhotoDisplayed }),
}));

export const useZoom = create((set: any) => ({
    zoom: 0,

    update: (value: number) => {
        const zoomLevel = +value.toFixed(1);

        set((state: any) => {
            if (zoomLevel > 0.5) state.zoom = 0.5;
            else if (zoomLevel < -0.5) state.zoom = -0.5;
            else state.zoom = zoomLevel;
        });
    },
}));
