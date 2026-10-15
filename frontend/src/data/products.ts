import type { Product, ProductCategory } from '../types/product';

export const categoryLabels: Record<ProductCategory, string> = {
  'electric-bike': 'Electric Bike',
  'road-bike': 'Road Bike',
  'mountain-bike': 'Mountain Bike',
  helmet: 'Road Helmet',
};

export const products: readonly Product[] = [
  {
    id: 'peugeot-lr01', category: 'road-bike', name: 'PEUGEOT – LR01',
    priceCents: 199999, imageKey: 'peugeot-lr01',
    description: 'The LR01 uses the same design as the most iconic bikes from PEUGEOT Cycles\' 130-year history and combines it with agile, dynamic performance that\'s perfectly suited to navigating today\'s cities. As well as a lugged steel frame and iconic PEUGEOT black-and-white chequer design, this city bike also features a 16-speed Shimano Claris drivetrain.',
  },
  {
    id: 'smith-trade', category: 'helmet', name: 'SMITH – Trade',
    priceCents: 12000, imageKey: 'smith-trade',
    description: 'A road helmet for everyday rides.',
  },
  {
    // Additional mock product to exercise the electric filter and staggered grid.
    // Only its image is from Figma; its name and price are demonstration data.
    id: 'electric-sport', category: 'electric-bike', name: 'ELECTRIC – Sport',
    priceCents: 249999, imageKey: 'electric-sport',
    description: 'An electric sport bicycle for your next ride.',
  },
  {
    id: 'pilot-chromoly-520', category: 'road-bike', name: 'PILOT – CHROMOLY 520',
    priceCents: 399999, imageKey: 'pilot-chromoly-520',
    description: 'A chromoly road bicycle with a minimal black finish.',
  },
];
