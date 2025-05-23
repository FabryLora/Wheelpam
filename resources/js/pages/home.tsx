import Slider from '@/components/home/slider';
import { Head } from '@inertiajs/react';
import DefaultLayout from './defaultLayout';

export default function Home() {
    return (
        <DefaultLayout>
            <Head>
                <title>Inicio</title>
            </Head>
            <Slider />
        </DefaultLayout>
    );
}
