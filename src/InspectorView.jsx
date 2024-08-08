import { Container, Box, AppBar, Tab, Tabs } from "@mui/material";
import { RichTreeView } from '@mui/x-tree-view';

import { entitiesTree } from "./data/entities/entities";
import { MarkersTree } from "./data/markers/markers";
import { useState } from "react";
import { Marker } from "react-leaflet";

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
      paddingTop: '16px',
    },
    appBar: {
      backgroundColor: '#333',
      borderBottom: '1px solid #444',
    },
    tab: {
      color: '#bbb', 
      '&.Mui-selected': {
        color: '#fff',
        fontWeight: 'bold',
      },
    },
};

function InspectorView() {

    const [tabValue, setTabValue] = useState('entities');
    const [tabContent, setTabContent] = useState(entitiesTree);

    const onTabChanged = function (event, newTabValue) {
        setTabValue(newTabValue);
        setTabContent(newTabValue === 'entities' ? entitiesTree : MarkersTree);
    }

    return (
        <Container style={styles.container}>
            <Box>
                <Box sx={{ width: '100%', borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs 
                        value={tabValue} 
                        onChange={onTabChanged}
                        TabIndicatorProps={{ style: { backgroundColor: '#fff' } }}
                        variant="fullWidth"
                        sx={styles.appBar}
                    >
                        <Tab value='entities' label='Entities' sx={styles.tab} />
                        <Tab value='markers' label='Markers' sx={styles.tab} />
                    </Tabs>
                </Box>
                <Box sx={styles.box}>
                    <RichTreeView items={tabContent}/>
                </Box>
            </Box>
        </Container>
    );
}

export default InspectorView;