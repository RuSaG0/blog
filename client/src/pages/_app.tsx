// Styles
import "@styles/fonts.css";
import "@styles/typography.css";
import "@styles/palette.css";

import "@styles/animation.css";

import "@styles/global.css";

// Types
import { AppProps } from "next/app";

// Components
import { Footer } from '@entities/Footer';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <div className="content">
                <Component {...pageProps} />
            </div>

            <Footer />
        </>
    );
}

export default MyApp;