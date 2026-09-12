import { useEffect, useState } from "react";

const getDeviceType = () => {
    const width = window.innerWidth;

    if (width < 576) return "mobile";
    if (width < 992) return "tablet";
    return "desktop";
};

export default function useDeviceType() {
    const [deviceType, setDeviceType] = useState(getDeviceType());
    const [isMobileView, setIsMobileView] = useState(false);

    useEffect(() => {
        setIsMobileView(deviceType === 'mobile')
    }, [deviceType]);

    useEffect(() => {
        const handleResize = () => {
            setDeviceType(getDeviceType());
        };
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return [deviceType, isMobileView];
}