import { icon, Icon } from "leaflet";
import MarkerIconsURLs from "../../assets/marker-icons/marker-icons";
import { LocationOn } from "@mui/icons-material";
import { KeyboardTab } from "@mui/icons-material";

const defaultIconSize = 36;

const MarkerIconUtility = {
    getMarkerComponentIcon: function (id) {
        switch (id)
        {
            case "waypoint":
                return LocationOn;
            case "trigger":
                return KeyboardTab;
            default:
                return null;
        }
    },
    getMarkerIconURL: function (id) {
        switch (id)
        {
            case "waypoint":
                return `data:image/svg+xml;charset=utf-8;base64,${btoa(MarkerIconsURLs.waypoint)}`;
            case "trigger":
                return `data:image/svg+xml;charset=utf-8;base64,${btoa(MarkerIconsURLs.trigger)}`;
            default:
                return null;
        }
    },
    getLeafletMarkerIcon: function (id) {
        const iconURL = this.getMarkerIconURL(id);
        const leafletIcon = new Icon(
            {
                iconUrl: iconURL,
                iconSize: [defaultIconSize, defaultIconSize]
            }
        );
        return leafletIcon;
    }
};

export default MarkerIconUtility;