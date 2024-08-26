
import React from "react";
import { useContext, useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography, Input, ToggleButton, ToggleButtonGroup } from "@mui/material";
import ApplicationState from "./utility/state/state";
import SymbolFactory from "./utility/symbology/factory";
import { ApplicationContext } from "./ApplicationContext";
import { ItemsOnMapContext } from "./ItemsOnMapContext";
import Symbols from "./data/symbols/symbols";
import EntityModifier from "./utility/entity/entity-modifier";

function AddEntityDialogView({ properties }) {

    const { getApplicationState, setApplicationState } = useContext(ApplicationContext);
    const { itemsOnMap, addItemToMap, removeItemFromMap, updateItem } = useContext(ItemsOnMapContext);
    
    const [affiliation, setAffiliation] = useState('unknown');
    

    const DefaultUnknownSymbol = SymbolFactory.createComponentIcon(Symbols.defaultUnknown, 24);
    const DefaultNeutralSymbol = SymbolFactory.createComponentIcon(Symbols.defaultNeutral, 24);
    const DefaultFriendSymbol  = SymbolFactory.createComponentIcon(Symbols.defaultFriend , 24);
    const DefaultHostileSymbol = SymbolFactory.createComponentIcon(Symbols.defaultHostile, 24);

    const entity = itemsOnMap.at(-1);
    const [callsign, setCallsign] = useState(entity ? entity.callsign : `ALPHA${itemsOnMap.length}`);

    const handleOKOnClick = () => {
        setApplicationState(ApplicationState.INITIALIZATION);
        updateItem(entity.key, (targetEntity) => {
            return EntityModifier.setCallsign(targetEntity, callsign)
        });
        updateItem(entity.key, (targetEntity) => {
            return EntityModifier.setAffiliation(targetEntity, affiliation);
        });
        setTimeout(() => setAffiliation('unknown'), 500);
        setTimeout(() => setCallsign(`ALPHA${itemsOnMap.length}`), 500);
    }

    const handleCancelOnClick = () => {
        setApplicationState(ApplicationState.INITIALIZATION);
        setTimeout(() => setAffiliation('unknown'), 500);
        setTimeout(() => setCallsign(`ALPHA${itemsOnMap.length}`), 500);
    }

    const handleCallsignChange = (event) => {
        setCallsign(event.target.value);
        updateItem(entity.key, (targetEntity) => {
            return EntityModifier.setCallsign(entity, event.target.value)
        });
    };

    const handleSetAffilition = (event, affiliation) => {
        setAffiliation(affiliation);
        updateItem(entity.key, () => {
            return EntityModifier.setAffiliation(entity, affiliation);
        });
    }
    return (
        <Dialog
            open={getApplicationState() === ApplicationState.ADD_ENTITY_TO_MAP}
            PaperProps={{
                component: 'form',
                sx: {
                    bgcolor: '#1e1e1e',
                    color: '#ffffff',
                },
            }}
        >
            <DialogTitle sx={{ bgcolor: '#333', color: '#ffffff' }}>
                Add {entity && entity.name}
            </DialogTitle>
            <DialogContent sx={{ bgcolor: '#1e1e1e', color: '#ffffff' }}>
                <Typography>Affiliation:</Typography>
                <ToggleButtonGroup 
                value={affiliation} 
                orientation="horizontal" 
                spacing={3} 
                exclusive 
                onChange={handleSetAffilition}
                radioGroup="true"
                sx={{
                    '& .MuiToggleButton-root': {
                        width: '64px',
                        height: '64px',
                        color: '#ffffff',
                        borderColor: '#4f4f4f',
                        '&.Mui-selected': {
                            color: '#000000',
                            bgcolor: '#1DB954',
                            borderColor: '#1DB954',
                            '&:hover': {
                                bgcolor: '#17a845',
                            },
                        },
                        '&:hover': {
                            bgcolor: '#333',
                        },
                    },
                }}>
                    <ToggleButton value="unknown">
                        <DefaultUnknownSymbol />
                    </ToggleButton>
                    <ToggleButton value="neutral">
                        <DefaultNeutralSymbol />
                    </ToggleButton>
                    <ToggleButton value="friend">
                        <DefaultFriendSymbol />
                    </ToggleButton>
                    <ToggleButton value="hostile">
                        <DefaultHostileSymbol />
                    </ToggleButton>
                </ToggleButtonGroup>

                <Typography sx={{ mt: 2 }}>Callsign:</Typography>
                <Input
                    value={callsign}
                    onChange={ handleCallsignChange }
                    sx={{
                        bgcolor: '#333',
                        color: '#ffffff',
                        mt: 1,
                        p: 1,
                        width: '100%',
                    }}
                />
            </DialogContent>
            <DialogActions sx={{ bgcolor: '#333' }}>
                <Button onClick={ handleCancelOnClick } sx={{ color: '#ffffff' }}>Cancel</Button>
                <Button onClick={ handleOKOnClick }     sx={{ color: '#1DB954' }}>OK</Button>
            </DialogActions>
        </Dialog>
    );
}

export default AddEntityDialogView;