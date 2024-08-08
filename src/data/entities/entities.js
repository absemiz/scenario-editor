/* Stateless Attributes of Entities */

const Entities = [
    {
        id:     'f-16-v',                 
        name:   'F16V',                  /*Entity Name                                            */
        kind:   'Fixed-Wing',            /*Entity Kind                                            */
        sidc:   '30030120001101051709',  /*NATO Standart Symbology (Symbology Identification Code)*/
        label:  'F16/V'
    },
    {
        id:     'f-35-a',
        name:   'F35A',
        kind:   'Fixed-Wing',
        sidc:   '30060100001101051702',
        label:  'F35/A'
    },
];

const EntitiesTree = [
    {
        id: 'fixed-wing',
        label: 'Fixed Wing',
        children: Entities.filter((entity) => entity.kind === 'Fixed-Wing')
    }
];

export { Entities as entities, EntitiesTree as entitiesTree };