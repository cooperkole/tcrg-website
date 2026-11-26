// Site photography (Step 5). Every image is also listed in CREDITS.md.
// Sources: Wikimedia Commons. Each was checked by eye for subject, identifiable
// people and third-party branding. Files were resized to 2400px and recompressed;
// beacon-hill.jpg was also cropped (right side removed). CC BY / BY-SA licenses
// require the visible credit rendered by PhotoBand / the home hero.
import type { ImageMetadata } from 'astro';
import bostonDusk from '../assets/photos/boston-skyline-harbor-dusk.jpg';
import rowesWharf from '../assets/photos/boston-rowes-wharf-harbor.jpg';
import customHouse from '../assets/photos/custom-house-tower.jpg';
import beaconHill from '../assets/photos/beacon-hill.jpg';
import lowerManhattan from '../assets/photos/lower-manhattan.jpg';
import ballouHall from '../assets/photos/ballou-hall.jpg';

export interface Photo {
  src: ImageMetadata;
  alt: string;
  author: string;
  authorUrl: string;
  license: string;
  licenseUrl: string;
  source: string;
  /** CSS object-position used when the band crops the frame. */
  focus?: string;
}

export const photos = {
  bostonDusk: {
    src: bostonDusk,
    alt: 'Boston Financial District skyline at dusk, office towers lit across the harbor from East Boston',
    author: '4300streetcar',
    authorUrl: 'https://commons.wikimedia.org/wiki/User:4300streetcar',
    license: 'CC BY 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by/4.0/',
    source: 'https://commons.wikimedia.org/wiki/File:Boston_skyline_at_dusk_from_Jeffries_Point_November_2025_1.jpg',
    focus: '50% 62%',
  },
  rowesWharf: {
    src: rowesWharf,
    alt: 'Downtown Boston towers rising behind the Rowes Wharf arch, seen from the harbor',
    author: 'lovinkat',
    authorUrl: 'https://www.flickr.com/people/28272897@N08',
    license: 'CC BY 2.0',
    licenseUrl: 'https://creativecommons.org/licenses/by/2.0/',
    source: 'https://commons.wikimedia.org/wiki/File:Boston_skyline,_viewed_from_the_harbor_(8904751817).jpg',
    focus: '50% 55%',
  },
  customHouse: {
    src: customHouse,
    alt: 'The Custom House Tower framed between office buildings on Congress Street, Boston',
    author: 'Marco Almbauer',
    authorUrl: 'https://commons.wikimedia.org/wiki/User:A,Ocram',
    license: 'CC0',
    licenseUrl: 'https://creativecommons.org/publicdomain/zero/1.0/',
    source: 'https://commons.wikimedia.org/wiki/File:Custom_House_Tower_in_Boston.jpg',
    focus: '50% 42%',
  },
  beaconHill: {
    src: beaconHill,
    alt: 'Brick Federal-style rowhouse with black shutters and autumn ivy on a Beacon Hill corner, Boston',
    author: 'ajay_suresh',
    authorUrl: 'https://www.flickr.com/people/ajay_suresh/',
    license: 'CC BY 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by/4.0/',
    source: 'https://commons.wikimedia.org/wiki/File:Beacon_Hill,_Boston_(54954550355).jpg',
    focus: '50% 45%',
  },
  lowerManhattan: {
    src: lowerManhattan,
    alt: 'Lower Manhattan skyline and One World Trade Center at sunset, across the Hudson from Jersey City',
    author: 'King of Hearts',
    authorUrl: 'https://commons.wikimedia.org/wiki/User:King_of_Hearts',
    license: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    source: 'https://commons.wikimedia.org/wiki/File:Lower_Manhattan_from_Jersey_City_November_2016_002.jpg',
    focus: '45% 45%',
  },
  ballouHall: {
    src: ballouHall,
    alt: 'Ballou Hall on the Tufts Medford campus in winter, with the bronze Jumbo statue in the foreground',
    author: 'Swampyank',
    authorUrl: 'https://commons.wikimedia.org/wiki/User:Swampyank',
    license: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    source: 'https://commons.wikimedia.org/wiki/File:Ballou_Hall_at_Tufts_University_in_Medford_Massachusetts_USA_built_in_1852_by_Gridley_JF_Bryant.jpg',
    focus: '50% 48%',
  },
} satisfies Record<string, Photo>;
