import { Outlet } from "react-router-dom";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import WhatsAppButton from "../components/common/WhatsAppButton";

export default function AppLayout() {
    return (
        <div className="flex flex-col min-h-screen bg-base">
            <Header />
            <main className="flex-grow pt-16"> {/* pt-16 evita que el header lo cubra */}
                <Outlet />
            </main>
            <Footer />
            <WhatsAppButton />
        </div>
    );
}