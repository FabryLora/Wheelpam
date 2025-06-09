import SubcategoriaAdminRow from '@/components/admin/subcategoriaAdminRow';
import { useForm, usePage } from '@inertiajs/react';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import toast from 'react-hot-toast';
import Dashboard from '../dashboard';

export default function SubcategoriasAdmin() {
    const { subcategorias, categorias } = usePage().props;

    const { data, setData, post, reset } = useForm({
        title: '',
    });

    const [createView, setCreateView] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        post(route('admin.subcategorias.store'), {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Sub-categoria creada correctamente');
                reset();
                setCreateView(false);
            },
            onError: (errors) => {
                toast.error('Error al crear sub-categoria');
                console.log(errors);
            },
        });
    };

    return (
        <Dashboard>
            <div className="flex w-full flex-col p-6">
                <AnimatePresence>
                    {createView && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed top-0 left-0 z-50 flex h-full w-full items-center justify-center bg-black/50 text-left"
                        >
                            <form onSubmit={handleSubmit} method="POST" className="text-black">
                                <div className="w-[500px] rounded-md bg-white p-4">
                                    <h2 className="mb-4 text-2xl font-semibold">Crear Sub-categoria</h2>
                                    <div className="flex flex-col gap-4">
                                        <label htmlFor="ordennn">Orden</label>
                                        <input
                                            className="focus:outline-primary-color rounded-md p-2 outline outline-gray-300 focus:outline"
                                            type="text"
                                            name="ordennn"
                                            id="ordennn"
                                            onChange={(e) => setData('order', e.target.value)}
                                        />
                                        <label htmlFor="nombree">
                                            Titulo <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            className="focus:outline-primary-color rounded-md p-2 outline outline-gray-300 focus:outline"
                                            type="text"
                                            name="nombree"
                                            id="nombree"
                                            onChange={(e) => setData('title', e.target.value)}
                                        />
                                        <span className="text-base font-normal">Resolucion recomendada: 501x181px</span>
                                        <div className="flex flex-row">
                                            <input
                                                type="file"
                                                name="imagen"
                                                id="imagenn"
                                                onChange={(e) => setData('image', e.target.files[0])}
                                                className="hidden"
                                            />
                                            <label
                                                className="border-primary-color text-primary-color hover:bg-primary-color cursor-pointer rounded-md border px-2 py-1 transition duration-300 hover:text-white"
                                                htmlFor="imagenn"
                                            >
                                                Elegir imagen
                                            </label>
                                            <p className="self-center px-2">{data?.image?.name}</p>
                                        </div>
                                        <label htmlFor="categoria">
                                            Categoria <span className="text-red-500">*</span>
                                        </label>
                                        <select
                                            className="focus:outline-primary-color rounded-md p-2 outline outline-gray-300 focus:outline"
                                            onChange={(e) => setData('categoria_id', e.target.value)}
                                            name=""
                                            id=""
                                        >
                                            <option value="">Seleccione una categoria</option>
                                            {categorias?.map((categoria) => (
                                                <option key={categoria.id} value={categoria.id}>
                                                    {categoria.title}
                                                </option>
                                            ))}
                                        </select>

                                        <div className="flex justify-end gap-4">
                                            <button
                                                type="button"
                                                onClick={() => setCreateView(false)}
                                                className="border-primary-color text-primary-color hover:bg-primary-color rounded-md border px-2 py-1 transition duration-300 hover:text-white"
                                            >
                                                Cancelar
                                            </button>
                                            <button
                                                type="submit"
                                                className="border-primary-color text-primary-color hover:bg-primary-color rounded-md border px-2 py-1 transition duration-300 hover:text-white"
                                            >
                                                Guardar
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </motion.div>
                    )}
                </AnimatePresence>
                <div className="mx-auto flex w-full flex-col gap-3">
                    <div className="flex h-fit w-full flex-row gap-5">
                        <h2 className="border-primary-color text-primary-color text-bold w-full border-b-2 text-2xl">Sub-categorias</h2>
                        <button
                            onClick={() => setCreateView(true)}
                            className="bg-primary-color w-[200px] rounded px-4 py-1 font-bold text-white hover:bg-red-400"
                        >
                            Crear sub-categoria
                        </button>
                    </div>

                    <div className="flex w-full justify-center">
                        <table className="w-full border text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
                            <thead className="bg-gray-300 text-sm font-medium text-black uppercase">
                                <tr>
                                    <td className="text-center">ORDEN</td>
                                    <td className="text-center">TITULO</td>
                                    <td className="w-[400px] px-3 py-2 text-center">IMAGEN</td>
                                    <td className="px-3 py-2 text-center">CATEGORIA</td>
                                    <td className="text-center">EDITAR</td>
                                </tr>
                            </thead>
                            <tbody className="text-center">
                                {subcategorias?.map((subcategoria) => <SubcategoriaAdminRow key={subcategoria.id} subcategoria={subcategoria} />)}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Dashboard>
    );
}
