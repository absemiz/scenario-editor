import { Container, Box, Tabs, Tab, Button, Divider } from '@mui/material';
import { RichTreeView } from '@mui/x-tree-view';


import { EntitiesTree, Entities } from "./data/entities/entities";
import { MarkersTree } from "./data/markers/markers";
import InspectorTreeItem from "./InspectorTreeItem";


import { useState, useContext } from 'react';
import ApplicationState from './utility/state/state';
import AddEntityDialogView from './AddEntityDialogView';
import { ApplicationContext } from './ApplicationContext';

const styles = {
    container: {
        height: '100vh',
        width: '20vw',
        minWidth: '250px',
        padding: '16px',
        margin: 0,
        position: 'fixed',
        right: 0,
        backgroundColor: '#1e1e1e',
        color: 'white',
        zIndex: 1000,
        opacity: 0.9,
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.7)',
        
    },
    box: {
        flexGrow: 1,
        overflow: 'auto',
        paddingTop: '24px',
    },
    appBar: {
        backgroundColor: '#333',
        borderBottom: '1px solid #444',
        '& .MuiTabs-indicator': {
            backgroundColor: '#fff',
        },
    },
    tab: {
        color: '#bbb',
        fontWeight: 'normal',
        '&.Mui-selected': {
            color: '#fff',
            fontWeight: 'bold',
        },
        '&:hover': {
            color: '#fff',
            backgroundColor: '#444',
        },
    },
    button: {
      width: '50%',
      margin: 'auto',
      marginBottom: '48px',
      backgroundColor: '#1DB954',
      color: '#1E1E1E',
      '&:hover': {
          backgroundColor: '#17A74B',
      },
      '&:disabled': {
          backgroundColor: '#757575',
          color: '#B0B0B0',
      },
    },
    divider: {
        marginY: 2,
    },
};

function InspectorView({ properties }) {
    const { getApplicationState, setApplicationState } = useContext(ApplicationContext);
    
    const [tabValue, setTabValue] = useState('entities');
    const [tabContent, setTabContent] = useState(EntitiesTree);
    const [addButtonText, setAddButtonText] = useState('Add Entity');
    const [addButtonEnabled, setAddButtonEnabled] = useState(false);

    const [lastClickedItem, setLastClickedItem] = useState(null);


    const onTabChanged = (event, newTabValue) => {
        setTabValue(newTabValue);
        setTabContent(newTabValue === 'entities' ? EntitiesTree : MarkersTree);
        setAddButtonText(newTabValue === 'entities' ? 'Add Entity' : 'Add Marker');
        setAddButtonEnabled(false);
    };

    const onAddButtonClicked = (event) => {
      setApplicationState(ApplicationState.ADD_TO_MAP);
      event.stopPropagation();
    }

    const onTreeItemClicked = (event, itemId) => {
      setAddButtonEnabled(!itemId.startsWith('root'));
      setLastClickedItem(Entities.find((entity) => entity.id === itemId));
    }

    /*          <Button 
                    sx={styles.button}
                    onClick={onAddButtonClicked}
                    disabled={!addButtonEnabled}
                >
                    {addButtonText}
                </Button>
     */

    return (
        <Container style={styles.container}>
            <AddEntityDialogView />
            <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <Box sx={{ width: '100%', borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs 
                        value={tabValue} 
                        onChange={ onTabChanged }
                        variant="fullWidth"
                        sx={styles.appBar}
                    >
                        <Tab value='entities' label='Assets' sx={styles.tab} />
                        <Tab value='markers' label='Markers' sx={styles.tab} />
                    </Tabs>
                </Box>
                <Box sx={styles.box}>
                    <RichTreeView 
                        items={tabContent}
                        slots={{ item: InspectorTreeItem }}
                        onItemClick={ onTreeItemClicked }
                    />
                </Box>
                <Divider sx={styles.divider} />
            </Box>
        </Container>
    );
}

export default InspectorView;