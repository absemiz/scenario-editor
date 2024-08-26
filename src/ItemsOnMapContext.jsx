import React from "react";
import { createContext, useState } from "react";
import { Entities } from "./data/entities/entities";
import { Markers } from "./data/markers/markers";
import SymbolFactory from "./utility/symbology/factory";
import MarkerIconUtility from "./utility/marker/marker-icon-utility";

const ItemsOnMapContext = createContext();

const ItemsOnMapProvider = ({ children }) => {
    const [itemsOnMap, setItemsOnMap] = useState([]);

    const addItemToMap = (item, position) => {
        setItemsOnMap(
            (currentItems) => [...currentItems, { ...item, position, key: currentItems.length, callsign: `${item.name}-${currentItems.length}` }]
        );
    };

    const removeItemFromMap = (itemID) =>  {
        setItemsOnMap(
            (currentItems) => currentItems.filter(
                (item) => item.id !== itemID
            )
        );
    }

    const updateItem = (itemKey, updateFunction) => {
        setItemsOnMap(
            (currentItems) => {
                const updatedItems = currentItems.map((item) => {
                    return item.key === itemKey ? updateFunction(item) : item;
                });
                return [...updatedItems];
            }
        );
    }

    const getEntities = (filterFunction) => {
        const entitiesOnMap = itemsOnMap.filter((item) => Entities.find((entity) => item.id === entity.id));
        return entitiesOnMap.filter(filterFunction);
    }

    const getMarkers = (filterFunction) => { 
        const markersOnMap = itemsOnMap.filter((item) => Markers.find((marker) => item.id === marker.id));
        return markersOnMap.filter(filterFunction);
    }
        
    const getIconOf = (itemKey) => {
        
        const item = itemsOnMap.at(itemKey);
        if (!item) return null;
        if (item.sidc)
        {
            return SymbolFactory.createComponentIcon(item.sidc);
        }
        else
        {
            return MarkerIconUtility.getMarkerComponentIcon(item.id);
        }
    }

    const getCallsignOf = (itemKey) => {
        const item = itemsOnMap.at(itemKey);
        if (!item) return null;
        if (item.callsign) {
            return item.callsign;
        }
        else
        {
            return item.label;
        }
    }

    return (
      <ItemsOnMapContext.Provider value={{ itemsOnMap, addItemToMap, removeItemFromMap, updateItem, getEntities, getMarkers, getIconOf, getCallsignOf }}>
        { children }
      </ItemsOnMapContext.Provider>  
    );
}

export { ItemsOnMapContext, ItemsOnMapProvider };