import Swal from "sweetalert2";

export function showModal(options) {
    return Swal.fire(options).then(async (res) => {
        if (res.isConfirmed && options.hasOwnProperty("callUrlOnConfirm")) {
            await callUrl(options.callUrlOnConfirm);
        }
    });
}

async function callUrl(url) {
    console.log(`Calling url "${url}"...`);
    const res = await fetch(url, {
        method: "GET",
        mode: "no-cors",
    });
    //console.log(res)
    const data = await res.text();
    //console.log(data);
}
