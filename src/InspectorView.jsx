import { Container, Box } from "@mui/material";
import { RichTreeView } from "@mui/x-tree-view";
import { entitiesTree } from "./data/entity/entities";

const styles = {
    container: {
      height: '100vh',
      width: '10vw',
      minWidth: 'max-content',
      padding: '16px',
      margin: 0,
      position: 'fixed',
      right: 0,
      backgroundColor: 'white',
      zIndex: 1000, 
      opacity: 0.5
    }
  };

function InspectorView() {
    return (
        <Container style={styles.container}>
            <Box>
                <RichTreeView items={entitiesTree}/>
            </Box>
        </Container>
    );
}

export default InspectorView;