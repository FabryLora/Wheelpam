import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useForm } from '@inertiajs/react';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import CustomReactQuill from '../customReactQuill';

export default function ValorAdminRow({ valor }) {
    const [edit, setEdit] = useState(false);

    const updateForm = useForm({
        order: valor?.order,
        title: valor?.title,
        text: valor?.text,
        id: valor?.id,
    });

    const [text, setText] = useState(valor?.text);

    useEffect(() => {
        updateForm.setData('text', text);
    }, [text]);

    const handleUpdate = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        updateForm.post(route('admin.valores.update'), {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Campo actualizado correctamente');
                setEdit(false);
            },
            onError: (errors) => {
                toast.error('Error al actualizar campo');
                console.log(errors);
            },
        });
    };

    const deleteCampo = () => {
        if (confirm('¿Estas seguro de eliminar este campo?')) {
            updateForm.delete(route('admin.valores.destroy'), {
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
            <td className="align-middle">{valor?.order}</td>
            <td className="h-[90px] w-[90px] px-8">
                <img className="h-full w-full object-contain" src={valor?.image} alt="" />
            </td>
            <td className="align-middle">{valor?.title}</td>

            <td>
                <div dangerouslySetInnerHTML={{ __html: valor?.text }} />
            </td>

            <td className="w-[140px] text-center">
                <div className="flex flex-row justify-center gap-3">
                    <button onClick={() => setEdit(true)} className="h-10 w-10 rounded-md border border-blue-500 px-2 py-1 text-white">
                        <FontAwesomeIcon icon={faPen} size="lg" color="#3b82f6" />
                    </button>
                    <button onClick={deleteCampo} className="h-10 w-10 rounded-md border border-red-500 px-2 py-1 text-white">
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
                                    <label htmlFor="imagenn">Imagen</label>

                                    <span className="text-base font-normal">Resolucion recomendada: 501x181px</span>
                                    <div className="flex flex-row">
                                        <input
                                            type="file"
                                            name="imagen"
                                            id="imagenn"
                                            onChange={(e) => updateForm.setData('image', e.target.files[0])}
                                            className="hidden"
                                        />
                                        <label
                                            className="border-primary-color text-primary-color hover:bg-primary-color cursor-pointer rounded-md border px-2 py-1 transition duration-300 hover:text-white"
                                            htmlFor="imagenn"
                                        >
                                            Elegir imagen
                                        </label>
                                        <p className="self-center px-2">{updateForm?.data?.image?.name}</p>
                                    </div>
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

                                    <CustomReactQuill value={text} onChange={setText} />

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
