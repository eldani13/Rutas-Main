import { error } from "console";
import Swal from "sweetalert2";

export const getAllFetchDataValues = async (pathForResponse: string): Promise<any> => {
    try {
        const response = await fetch(pathForResponse);
        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
}



export const patchEditVal = async (pathForResponse: string, dataBody: {}, functionDataOk: () => void, modifyName: string): Promise<any> => {
    try {
        const response = await fetch(pathForResponse, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataBody)
        })
        if (response.ok) {
            functionDataOk();

            Swal.fire({
                title: 'Modificado',
                text: `¡${modifyName.charAt(0).toUpperCase() + modifyName.slice(1).toLowerCase()} modificado correctamente!`,
                icon: 'success',
                confirmButtonText: 'Aceptar',
            })
        } else {
            Swal.fire({
                title: 'Error',
                text: `El ${modifyName.toLowerCase()} no se ha modificado correctamente!`,
                icon: 'error',
                confirmButtonText: 'Aceptar',
            })
        }
    } catch (error) {
        throw error;
    }
}


export const postInsertData = async (pathForResponse: string, dataBody: {}, functionDataOk: () => void, modifyName: string): Promise<any> => {
    try {
        const response = await fetch(pathForResponse, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataBody)
        })
        if (response.ok) {
            functionDataOk()
            Swal.fire({
                title: 'Insertado',
                text: `¡${modifyName.charAt(0).toUpperCase() + modifyName.slice(1).toLowerCase()} insertado correctamente!`,
                icon: 'success',
                confirmButtonText: 'Aceptar',
            })
        } else {
            Swal.fire({
                title: 'Error',
                text: `El ${modifyName.toLowerCase()} no se ha insertado correctamente!`,
                icon: 'error',
                confirmButtonText: 'Aceptar',
            })
        }

    } catch (error) {
        throw error;
    }
}
export const deleteRemoveData = async (pathForResponse: string, functionDataOk: () => void, modifyName: string, dataTitleSwal: string): Promise<any> => {
    const swalConten = await Swal.fire({
        title: dataTitleSwal,
        showCancelButton: true,
        cancelButtonText: "Cancelar",
        confirmButtonText: "Eliminar",
        confirmButtonColor: "#DC3741"
    })
    if (swalConten.isConfirmed) {
        try {
            const response = await fetch(pathForResponse, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if (response.ok) {
                functionDataOk()
                Swal.fire({
                    title: 'Eliminado',
                    text: `¡${modifyName.charAt(0).toUpperCase() + modifyName.slice(1).toLowerCase()} eliminado correctamente!`,
                    icon: 'success',
                    confirmButtonText: 'Aceptar',
                })
            } else {
                Swal.fire({
                    title: 'Error',
                    text: `El ${modifyName.toLowerCase()} no se ha eliminado correctamente!`,
                    icon: 'error',
                    confirmButtonText: 'Aceptar',
                })
            }

        } catch (error) {
            throw error;
        }
    }
}