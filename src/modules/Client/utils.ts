

export const formatarData = (stringData: string) => {
    const date = new Date(stringData);
    const dataInvalida = date.toString() === "Invalid Date";
   
    if (dataInvalida) {
        return null;
    } else {
        const ano = date.getFullYear().toString().padStart(4, "0");
        const mes = (date.getMonth() + 1).toString().padStart(2, "0");
       
        const dia = date.getDate().toString().padStart(2, "0");

        return `${ano}/${mes}/${dia}`;
    }
}
