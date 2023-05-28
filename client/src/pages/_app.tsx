// Styles
import "@styles/fonts.css";
import "@styles/typography.css";
import "@styles/palette.css";
import "@styles/breakpoints.css";
import "@styles/sizes.css";
import "@styles/grid.css";

import "@styles/animation.css";

import "@styles/global.css";

// Types
import { AppProps } from "next/app";

// Components
import { Footer } from '@entities/Footer';
import { Stretch } from '@entities/Stretch';
import { Center } from '@entities/Center';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <Center>
                <Stretch>
                    <div className="content">
                        <Component {...pageProps} />
                    </div>
                    <Footer />
                </Stretch>
            </Center>
        </>
    );
}

export default MyApp;