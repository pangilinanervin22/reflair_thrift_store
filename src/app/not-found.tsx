import NavigationBar from "@/components/NavigationBar/NavigationBar";
import FooterBar from "@/components/FooterBar/FooterBar";
import NotFoundContent from "@/components/NotFound/NotFoundContent";
import shop from "./(shop)/layout.module.scss";

// The root not-found handles every unmatched URL. It renders outside
// (shop)/layout.tsx, so it draws the shop chrome itself.
export default function NotFound() {
    return (
        <>
            <NavigationBar />
            <main className={shop.main_container}>
                <NotFoundContent />
            </main>
            <FooterBar />
        </>
    )
}
