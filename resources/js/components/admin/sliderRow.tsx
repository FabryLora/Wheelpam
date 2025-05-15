import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useForm } from '@inertiajs/react';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import toast from 'react-hot-toast';
import MediaDisplayAdvanced from './mediaDisplayAdvanced';

export default function SliderRow({ sliderObject }) {
    const [edit, setEdit] = useState(false);

    const updateForm = useForm({
        order: sliderObject?.order,
        title: sliderObject?.title,
        subtitle: sliderObject?.subtitle,
        id: sliderObject?.id,
    });

    const handleUpdate = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        updateForm.post(route('admin.slider.update'), {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Slider actualizado correctamente');
                setEdit(false);
            },
            onError: (errors) => {
                toast.error('Error al actualizar slider');
                console.log(errors);
            },
        });
    };

    const deleteMarca = () => {
        if (confirm('¿Estas seguro de eliminar este campo?')) {
            updateForm.delete(route('admin.slider.destroy'), {
                preserveScroll: true,
                onSuccess: () => {
                    toast.success('Campo eliminado correctamente');
                },
                onError: (errors) => {
                    toast.error('Error al eliminar campo');
                    console.log(errors);
                },
            });
        }
    };

    return (
        <tr className={`border text-black odd:bg-gray-100 even:bg-white`}>
            <td className="align-middle">{sliderObject?.order}</td>
            <td className="align-middle">{sliderObject?.title}</td>

            <td className="h-[90px]">{sliderObject?.subtitle}</td>
            <td className="align-middle">{sliderObject?.link}</td>

            <td className="align-middle">
                <MediaDisplayAdvanced mediaPath={sliderObject?.media} />
            </td>

            <td className="w-[140px] text-center">
                <div className="flex flex-row justify-center gap-3">
                    <button onClick={() => setEdit(true)} className="h-10 w-10 rounded-md border border-blue-500 px-2 py-1 text-white">
                        <FontAwesomeIcon icon={faPen} size="lg" color="#3b82f6" />
                    </button>
                    <button onClick={deleteMarca} className="h-10 w-10 rounded-md border border-red-500 px-2 py-1 text-white">
                        <FontAwesomeIcon icon={faTrash} size="lg" color="#fb2c36" />
                    </button>
                </div>
            </td>
            <AnimatePresence>
                {edit && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed top-0 left-0 z-50 flex h-full w-full items-center justify-center bg-black/50 text-left"
                    >
                        <form onSubmit={handleUpdate} method="POST" className="text-black">
                            <div className="w-[500px] rounded-md bg-white p-4">
                                <h2 className="mb-4 text-2xl font-semibold">Actualizar Campo</h2>
                                <div className="flex flex-col gap-4">
                                    <label htmlFor="ordennn">Orden</label>
                                    <input
                                        className="focus:outline-primary-color rounded-md p-2 outline outline-gray-300 focus:outline"
                                        type="text"
                                        name="ordennn"
                                        id="ordennn"
                                        value={updateForm?.data?.order}
                                        onChange={(e) => updateForm.setData('order', e.target.value)}
                                    />
                                    <label htmlFor="nombree">
                                        Titulo <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        className="focus:outline-primary-color rounded-md p-2 outline outline-gray-300 focus:outline"
                                        type="text"
                                        name="nombree"
                                        id="nombree"
                                        value={updateForm?.data?.title}
                                        onChange={(e) => updateForm.setData('title', e.target.value)}
                                    />
                                    <label htmlFor="nombree">
                                        Sub-titulo <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        className="focus:outline-primary-color rounded-md p-2 outline outline-gray-300 focus:outline"
                                        type="text"
                                        name="nombree"
                                        id="nombree"
                                        value={updateForm?.data?.subtitle}
                                        onChange={(e) => updateForm.setData('subtitle', e.target.value)}
                                    />
                                    <label htmlFor="link">Link</label>
                                    <input
                                        className="focus:outline-primary-color rounded-md p-2 outline outline-gray-300 focus:outline"
                                        type="text"
                                        name="link"
                                        id="link"
                                        value={updateForm?.data?.link}
                                        onChange={(e) => updateForm.setData('link', e.target.value)}
                                    />
                                    <label htmlFor="imagenn">Multimedia</label>

                                    <span className="text-base font-normal">Resolucion recomendada: 501x181px</span>
                                    <div className="flex flex-row">
                                        <input
                                            type="file"
                                            name="imagen"
                                            id="imagenn"
                                            onChange={(e) => updateForm.setData('media', e.target.files[0])}
                                            className="hidden"
                                        />
                                        <label
                                            className="border-primary-color text-primary-color hover:bg-primary-color cursor-pointer rounded-md border px-2 py-1 transition duration-300 hover:text-white"
                                            htmlFor="imagenn"
                                        >
                                            Elegir multimedia
                                        </label>
                                        <p className="self-center px-2">{updateForm?.data?.media?.name}</p>
                                    </div>

                                    <div className="flex justify-end gap-4">
                                        <button
                                            type="button"
                                            onClick={() => setEdit(false)}
                                            className="border-primary-color text-primary-color hover:bg-primary-color rounded-md border px-2 py-1 transition duration-300 hover:text-white"
                                        >
                                            Cancelar
                                        </button>
                                        <button
                                            type="submit"
                                            className="border-primary-color text-primary-color hover:bg-primary-color rounded-md border px-2 py-1 transition duration-300 hover:text-white"
                                        >
                                            Actualizar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>
        </tr>
    );
}
