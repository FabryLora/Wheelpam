import {
    faBars,
    faBellConcierge,
    faBoxArchive,
    faChevronRight,
    faCircleCheck,
    faEnvelope,
    faGear,
    faHouse,
    faImage,
    faMoneyCheckDollar,
    faNewspaper,
    faShield,
    faUser,
    faUsers,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import logo from '../../images/logo.png';

/* import bronzenLogo from "../assets/logos/bronzen-logo.png"; */

export default function Dashboard({ children }) {
    const { auth } = usePage().props;
    const { user } = auth;

    const [sidebar, setSidebar] = useState(true);

    const MotionFontAwesomeIcon = motion(FontAwesomeIcon);
    const MotionLink = motion.create(Link);

    // Obtenemos la ruta actual desde Inertia
    const currentRoute = usePage().url;

    // Procesamos la ruta para mostrar el título de la página
    const cleanPathname = currentRoute.replace(/^\/+/, '').replace(/-/g, ' ').split('/');

    cleanPathname.shift();
    const finalPath = cleanPathname.join('/');

    const [dropdowns, setDropdowns] = useState([
        {
            id: 'inicio',
            open: false,
            title: 'Inicio',
            icon: faHouse,
            href: '#',
            subHref: [
                { title: 'Slider', href: '/dashboard/slider' },
                { title: 'Contenido', href: '/dashboard/contenido' },
            ],
        },
        {
            id: 'nosotros',
            open: false,
            title: 'Nosotros',
            icon: faUsers,
            href: 'nosotros',
            subHref: [
                { title: 'Banner', href: '/dashboard/nosotros-banner' },
                { title: 'Contenido', href: '/dashboard/nosotros' },
                { title: 'Valores', href: '/dashboard/valores' },
            ],
        },
        {
            id: 'productos',
            open: false,
            title: 'Productos',
            icon: faBoxArchive,
            href: '#',
            subHref: [
                { title: 'Banner', href: '/dashboard/productos-banner' },

                { title: 'Categorias', href: '/dashboard/categorias' },
                { title: 'Sub-categorias', href: '/dashboard/sub-categorias' },

                {
                    title: 'Productos',
                    href: '/dashboard/productos',
                },
                {
                    title: 'Medidas',
                    href: '/dashboard/medidas',
                },
            ],
        },
        {
            id: 'servicios',
            open: false,
            title: 'Servicios',
            icon: faBellConcierge,
            href: '#',
            subHref: [
                { title: 'Banner', href: '/dashboard/servicios-banner' },
                { title: 'Contenido', href: '/dashboard/servicios' },
            ],
        },
        {
            id: 'garantia',
            open: false,
            title: 'Garantia',
            icon: faCircleCheck,
            href: '#',
            subHref: [
                { title: 'Banner', href: '/dashboard/garantia-banner' },
                { title: 'Contenido', href: '/dashboard/garantia' },
            ],
        },
        {
            id: 'novedades',
            open: false,
            title: 'Novedades',
            icon: faNewspaper,
            href: 'novedades',
            subHref: [
                { title: 'Banner', href: '/dashboard/novedades-banner' },
                { title: 'Contenido', href: '/dashboard/novedades' },
            ],
        },
        {
            id: 'solicitud',
            open: false,
            title: 'Solicitud de presupuesto',
            icon: faMoneyCheckDollar,
            href: 'novedades',
            subHref: [{ title: 'Banner', href: '/dashboard/solicitud-banner' }],
        },

        {
            id: 'contacto',
            open: false,
            title: 'Contacto',
            icon: faEnvelope,
            href: 'contacto',
            subHref: [
                { title: 'Banner', href: '/dashboard/banner-contacto' },
                { title: 'Contenido', href: '/dashboard/contacto' },
            ],
        },

        {
            id: 'administradores',
            open: false,
            title: 'Administradores',
            icon: faShield,
            href: '/dashboard/administradores',
            barra: true,
            subHref: [],
        },
        {
            id: 'metadatos',
            open: false,
            title: 'Metadatos',
            icon: faGear,
            href: '/dashboard/metadatos',
            subHref: [],
        },
        {
            id: 'logos',
            open: false,
            title: 'Logos',
            icon: faImage,
            href: '/dashboard/logos',
            subHref: [],
        },
    ]);

    const [userMenu, setUserMenu] = useState(false);

    const toggleDropdown = (id) => {
        setDropdowns((prevDropdowns) =>
            prevDropdowns.map((drop) => ({
                ...drop,
                open: drop.id === id ? !drop.open : false,
            })),
        );
    };

    const logout = () => {
        // Usando Inertia para el logout
        router.post(
            '/logout',
            {},
            {
                onSuccess: () => {
                    // No es necesario manejar la redirección, Inertia lo hará automáticamente
                },
                onError: (error) => {
                    console.error('Error during logout:', error);
                    // Incluso si hay error, podemos intentar navegar manualmente
                    router.visit('/adm');
                },
            },
        );
    };

    // Reemplazamos la verificación de token por la verificación de autenticación de Inertia
    /* if (!auth.admin) {
        // Inertia maneja la redirección de manera diferente
        router.visit('/adm');
        return null;
    } */

    return (
        <div className="font-red-hat flex flex-row">
            <Head>
                <title>Administrador</title>
            </Head>
            <Toaster />
            {/* Sidebar */}
            <AnimatePresence>
                {sidebar && (
                    <motion.div
                        initial={{ x: -300 }}
                        animate={{ x: 0 }}
                        exit={{ x: -300 }}
                        transition={{ ease: 'linear', duration: 0.2 }}
                        className="scrollbar-hide flex h-screen w-[300px] flex-col overflow-y-auto bg-white text-black"
                    >
                        <Link href={'/'} className="flex w-full items-center justify-center p-6">
                            <img className="object-cover" src={logo} alt="" />
                        </Link>
                        <nav className="">
                            <ul className="">
                                <AnimatePresence>
                                    {dropdowns.map((drop) => (
                                        <li key={drop.id} className={drop.barra ? 'border-primary-color border-t-2' : ''}>
                                            {drop?.subHref.length > 0 ? (
                                                <button
                                                    onClick={() => {
                                                        toggleDropdown(drop.id);
                                                    }}
                                                    className="flex w-full flex-row items-center justify-between p-4"
                                                >
                                                    <div className="flex flex-row items-center gap-2">
                                                        <div className="flex h-4 w-4 items-center justify-center">
                                                            <FontAwesomeIcon size="sm" icon={drop.icon} color="#ef3620" />
                                                        </div>

                                                        <p>{drop.title}</p>
                                                    </div>

                                                    <MotionFontAwesomeIcon
                                                        animate={{
                                                            rotate: drop.open ? 90 : 0,
                                                        }}
                                                        transition={{
                                                            ease: 'linear',
                                                            duration: 0.1,
                                                        }}
                                                        size="xs"
                                                        icon={faChevronRight}
                                                    />
                                                </button>
                                            ) : (
                                                <Link href={drop.href} className="flex w-full flex-row items-center justify-between p-4">
                                                    <div className="flex flex-row items-center gap-2">
                                                        <div className="flex h-4 w-4 items-center justify-center">
                                                            <FontAwesomeIcon size="sm" icon={drop.icon} color="#ef3620" />
                                                        </div>

                                                        <p>{drop.title}</p>
                                                    </div>
                                                </Link>
                                            )}

                                            <AnimatePresence>
                                                {drop.open && drop.subHref.length > 0 && (
                                                    <ul className="border-primary-color ml-6 flex h-fit flex-col gap-2 overflow-hidden border-l py-2">
                                                        {drop.subHref.map((sub, index) => (
                                                            <Link
                                                                className="hover:bg-primary-color mx-4 rounded-full px-2 py-1 transition duration-200 hover:text-white"
                                                                key={index}
                                                                href={sub.href}
                                                            >
                                                                {sub.title}
                                                            </Link>
                                                        ))}
                                                    </ul>
                                                )}
                                            </AnimatePresence>
                                        </li>
                                    ))}
                                </AnimatePresence>
                            </ul>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
            <div className="flex h-screen w-full flex-col overflow-y-auto bg-[#f5f5f5]">
                <div className="sticky top-0 z-50 flex flex-row items-center justify-between bg-white px-6 py-3 shadow-md">
                    <div className="flex flex-row gap-3">
                        <button onClick={() => setSidebar(!sidebar)}>
                            <FontAwesomeIcon icon={faBars} size="lg" color="#000" />
                        </button>
                        <h1 className="text-2xl">{finalPath.charAt(0).toUpperCase() + finalPath.slice(1) || 'Bienvenido al Dashboard'}</h1>
                    </div>

                    <div className="flex flex-row gap-3">
                        <div className="">
                            <h2 className="font-medium">{user?.name?.toUpperCase()}</h2>
                        </div>
                        <button className="relative" onClick={() => setUserMenu(!userMenu)}>
                            <FontAwesomeIcon color="#000" icon={faUser} />
                        </button>
                        <AnimatePresence>
                            {userMenu && (
                                <motion.div
                                    initial={{ opacity: 0, y: -30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -30 }}
                                    transition={{
                                        duration: 0.1,
                                        ease: 'linear',
                                    }}
                                    className="shadow- absolute top-12 right-2 flex h-fit w-[300px] flex-col items-start gap-4 border-2 bg-white p-4"
                                >
                                    <Link method="post" href={route('logout')} className="bg-primary-color h-[40px] w-full text-white">
                                        Cerrar Sesion
                                    </Link>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
                {children}
            </div>
        </div>
    );
}
