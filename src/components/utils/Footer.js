import { BRAND_CONFIG } from "../../config";

export default function Footer() {
    return (
        <footer className="footer">
            <div className="container text-center">
                © 2026 {BRAND_CONFIG.name}. All Rights Reserved.
            </div>
        </footer>
    )
}