/*
 * @Author: your name
 * @Date: 2020-06-06 12:01:45
 * @LastEditTime: 2020-06-06 23:57:21
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /typescript-learnings/effective_typescript/item34.ts
 */

/**Item 36: Name Types Using the Language of Your Problem
Domain */

/***Things to Remember
• Reuse names from the domain of your problem where possible to increase the
readability and level of abstraction of your code.
• Avoid using different names for the same thing: make distinctions in names
meaningful. */

/***There are only two hard problems in Computer Science: cache invalidation and nam‐
ing things */

interface Animal {
    name: string;
    endangered: boolean;
    habitat: string;
}

const leopard: Animal = {
    name: 'Snow Leopard',
    endangered: false,
    habitat: 'tundra',
};

// more meaningful declaration 

interface Animal {
    commonName: string;
    genus: string;
    species: string;
    status: ConservationStatus;
    climates: KoppenClimate[];
}
type ConservationStatus = 'EX' | 'EW' | 'CR' | 'EN' | 'VU' | 'NT' | 'LC';
type KoppenClimate = |
    'Af' | 'Am' | 'As' | 'Aw' |
    'BSh' | 'BSk' | 'BWh' | 'BWk' |
    'Cfa' | 'Cfb' | 'Cfc' | 'Csa' | 'Csb' | 'Csc' | 'Cwa' | 'Cwb' | 'Cwc' |
    'Dfa' | 'Dfb' | 'Dfc' | 'Dfd' |
    'Dsa' | 'Dsb' | 'Dsc' | 'Dwa' | 'Dwb' | 'Dwc' | 'Dwd' |
    'EF' | 'ET';

const snowLeopard: Animal = {
    commonName: 'Snow Leopard',
    genus: 'Panthera',
    species: 'Uncia',
    status: 'VU', // vulnerable
    climates: ['ET', 'EF', 'Dfd'], // alpine or subalpine
};

