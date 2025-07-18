import { useForm, usePage } from '@inertiajs/react';
import toast from 'react-hot-toast';
import Dashboard from '../dashboard';

export default function Logos() {
    const { data, setData, processing, post } = useForm();

    const { logos } = usePage().props;

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(route('admin.logos.update'), {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Logo actualizado correctamente');
            },
            onError: (errors) => {
                toast.error('Error al actualizar logo');
                console.log(errors);
            },
        });
    };

    return (
        <Dashboard>
            <div className="p-6">
                <form action="" onSubmit={handleSubmit}>
                    <div className="flex flex-row justify-between gap-5">
                        <div className="w-full">
                            <label htmlFor="logoprincipal" className="block text-xl font-medium text-gray-900">
                                Logo principal
                            </label>
                            <span>Resolucion recomendada: 342x72 px</span>
                            <div className="mt-2 flex justify-between rounded-lg border shadow-lg">
                                <div className="h-[200px] w-1/2 bg-[rgba(0,0,0,0.2)]">
                                    <img className="h-full w-full rounded-md object-contain" src={logos?.logo_principal} alt="" />
                                </div>
                                <div className="flex w-1/2 items-center justify-center">
                                    <div className="h-fit items-center self-center text-center">
                                        <div className="relative mt-4 flex flex-col items-center text-sm/6 text-gray-600">
                                            <label
                                                htmlFor="logoprincipal"
                                                className="bg-primary-color relative cursor-pointer rounded-md px-2 py-1 font-semibold text-white"
                                            >
                                                <span>Cambiar Imagen</span>
                                                <input
                                                    id="logoprincipal"
                                                    name="logoprincipal"
                                                    onChange={(e) => setData('logo_principal', e.target.files[0])}
                                                    type="file"
                                                    className="sr-only"
                                                />
                                            </label>
                                            <p className="absolute top-10 max-w-[200px] break-words"> {data?.logo_principal?.name} </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center justify-start gap-x-6 pt-10">
                        <button
                            type="submit"
                            disabled={processing}
                            className={`bg-primary-color rounded-full px-3 py-2 text-sm font-semibold text-white shadow-sm transition-transform hover:scale-95 ${processing ? 'cursor-not-allowed opacity-70' : ''}`}
                        >
                            {processing ? 'Actualizando...' : 'Actualizar'}
                        </button>
                    </div>
                </form>
            </div>
        </Dashboard>
    );
}
