import { useEffect, useState } from "react";
import { getPromotions } from "../services/api";
import { Link } from "react-router-dom";

const PromotionBanner = () => {
    const [promotions, setPromotions] = useState([]);

    useEffect(() => {
        const fetchPromotions = async () => {
            const promoData = await getPromotions();
            setPromotions(promoData.results || []);
        };

        fetchPromotions();
    }, []);
};

export default PromotionBanner;
